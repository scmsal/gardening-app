import app from "../app.js";

import mongoose from "mongoose"; // Importing mongoose for MongoDB interactions
import { MongoMemoryServer } from "mongodb-memory-server";
import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";

//Import the model
import plantModel from "../app/database/models/plantModel.js";

//Import sample data
import plantData from "./testData.json";

let mongoServer;

//=== VITEST HOOKS ===
// Setting up an in-memory MongoDB server for testing
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  console.log(mongoServer ? "mongoServer created" : "no MongoServer");
});

// Closing the in-memory MongoDB server after tests
afterAll(async () => {
  await mongoose.disconnect();
  if (mongoose.connection.readyState !== 0) {
    mongoose.connection.removeAllListeners();
  }
  await mongoServer.stop();
});

//Before each test, clear the collection and insert data
beforeEach(async () => {
  await plantModel.deleteMany({});
  await plantModel.create(plantData);
});

//=== VITEST TESTS ===
describe("Food Plant API Tests", () => {
  // Test for fetching all food plants
  it("ping route should work", async () => {
    const response = await request(app).get("/PING");
    console.log("Ping response: ", response.body);
    expect(response.body).toBe("PONG");
  });

  it("should return a number greater than zero for the plant count", async () => {
    const response = await request(app).get("/api/allFoodPlants");
    console.log("Response: ", response);
    expect(response.status).toBe(200); //assert status code
    expect(response.body.length).toBeGreaterThan(0); //assert db is not empty
  });

  it("should fetch all food plants", async () => {
    const response = await request(app).get("/api/allFoodPlants");
    expect(response.status).toBe(200); //assert status code
    expect(response.body).toHaveProperty("data");
  });

  // Test for fetching a food plant by common name
  it("should fetch a food plant by common name", async () => {
    const commonName = "Cabbage";
    const response = await request(app).get(`/api/${commonName}`);
    expect(response.status).toBe(200); //assert status code
    expect(response.body).toHaveProperty("common_name", commonName);
  });

  // Test for fetching a non-existent food plant
  it("should return 404 for non-existent food plant", async () => {
    const commonName = "NonExistentPlant";
    const response = await request(app).get(`/${commonName}`);
    expect(response.status).toBe(404); //assert status code
  });
});
