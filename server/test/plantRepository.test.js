//UNIT TESTING of repository functions

import mongoose from "mongoose"; // Importing mongoose for MongoDB interactions
import { MongoMemoryServer } from "mongodb-memory-server";
import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";

//Import sample data
import plantData from "./testData.json";

//Import the unit for testing
import {
  fetchAllFoodPlants,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
} from "./app/database/foodPlantRepository.js";
import plantModel from "../app/database/models/plantModel.js";

let mongoServer;

//=== VITEST HOOKS ===
// Setting up an in-memory MongoDB server for testing
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Closing the in-memory MongoDB server after tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

//Before each test, clear the collection and insert data
beforeEach(async () => {
  await plantModel.deleteMany({});
  await plantModel.insertMany(plantData);
});

//=== UNIT TESTS FOR THE REPOSITORY ===

describe("Food repository tests", () => {
  it("should return all the food plant objects in the collection"),
    async () => {
      const response = await fetchAllFoodPlants();
      console.log("Food plants: ", response);
      expect(response.status).toBe(200);
      expect(response).toBeInstanceOf(Array);
      expect(response.length).toBeGreaterThan(0);
    };
  it("should return a plant with the common_name 'Cabbage"),
    async () => {
      const response = await fetchFoodPlantByCommonName("Cabbage");
      expect(response.status).toBe(200);
      expect(response.common_name).toBe("Cabbage");
    };
});
