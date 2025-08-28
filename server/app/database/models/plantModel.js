import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  common_name: { type: String, required: true },
  scientific_name: { type: String },
  type: { type: String },

  edible: { type: Boolean },
  edible_part: { type: String },

  care_level: { type: String },
  cycle: {
    type: String,
    enum: [
      "Annual",
      "Biennial",
      "Perennial",
      "Short-lived perennial",
      "Tender perennial",
    ],
  },

  drought_tolerant: { type: Boolean },
  flowers: { type: Boolean },
  flower_color: { type: String },
  flowering_season: { type: String },
  growth_rate: { type: String },
  hardiness_zone: {
    min: { type: Number },
    max: { type: Number },
  },

  harvest_season: { type: String },
  image: { type: String },

  poisonous: { type: Boolean },
  sunlight: {
    type: String,
    enum: [
      "Full sun",
      "Partial sun",
      "Partial shade",
      "Full shade",
      "Dappled shade",
    ],
  },

  watering: { type: String },

  days_to_germinate: {
    min: { type: Number },
    max: { type: Number },
  },

  days_to_harvest: { type: Number },
  method: { type: String },
  min_soil_temp: { type: Number },
  max_soil_temp: { type: Number },

  planting_season: { type: String },
  planting_depth: { type: String },
  spacing: { type: String },
  set_out_after_frost: { type: String },

  height_inches: {
    min: { type: Number },
    max: { type: Number },
  },
  width_inches: {
    min: { type: Number },
    max: { type: Number },
  },

  soil_type: { type: String },
  source: { type: String },

  companion_plants: [String],
  incompatible_plants: [String],

  image_info: {
    image_url: { type: String },
    page_url: { type: String },
    license_url: { type: String },
    attribution: { type: String },
    photographer: { type: String },
    license: { type: String },
    platform: { type: String },
  },
});

export default mongoose.model("Plant", plantSchema, "food");
