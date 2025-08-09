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
  // Testing that the server is working
  it("ping route should work", async () => {
    const response = await request(app).get("/PING");
    console.log("Ping response: ", response.body);
    expect(response.body).toBe("PONG");
  });

  //Testing that the sample dat has loaded
  it("should return a number greater than zero for the plant count", async () => {
    const response = await request(app).get("/api/allFoodPlants");
    console.log(response.headers["content-type"]);

    expect(response.status).toBe(200); //assert status code
    expect(response.body.length).toBeGreaterThan(0); //assert db is not empty
  });

  //Test for fetching all the food plants
  it("should fetch all food plants", async () => {
    const response = await request(app).get("/api/allFoodPlants");
    expect(response.status).toBe(200); //assert status code
    // console.log("Fetch all plants response: ", response);
    expect(response.body).toBeInstanceOf(Array);
  });

  //Test for fetching a list of all the food plant names
  it("should fetch a list of all the food plant names", async () => {
    const response = await request(app).get("/api/listAllNames");
    expect(response.status).toBe(200);
    console.log("List of plant names: ", response.body);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toContain("Beans");
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
