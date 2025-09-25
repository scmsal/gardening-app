import app from "../app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";
import plantModel from "../app/database/models/plantModel.js";
import plantData from "./testData.json";

let mongoServer;

//=== VITEST HOOKS ===
// Setting up an in-memory MongoDB server for testing
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  console.info(mongoServer ? "mongoServer created" : "no MongoServer");
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
  it("ping route should work", async () => {
    const response = await request(app).get("/PING");
    expect(response.body).toBe("PONG");
  });

  it("should return a number greater than zero for the plant count", async () => {
    const response = await request(app).get("/api/allFoodPlants");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should fetch all food plants", async () => {
    const response = await request(app).get("/api/allFoodPlants");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should fetch a list of all the food plant names", async () => {
    const response = await request(app).get("/api/listAllNames");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toContain("Beans");
  });

  it("should fetch a food plant by common name", async () => {
    const commonName = "Cabbage";
    const response = await request(app)
      .get("/api/getFoodPlantByCommonName")
      .query({ common_name: commonName });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("common_name", commonName);
  });

  it("should return 404 for non-existent food plant", async () => {
    const commonName = "NonExistentPlant";
    const response = await request(app).get("/getFoodPlantByCommonName", {
      params: { common_name: commonName },
    });
    expect(response.status).toBe(404);
  });
});
