const mongoose = require("mongoose");

const ProvinceSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      index: 1,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const CitySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      index: 1,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    province_id: {
      type: Number,
      required: true,
      index: 1,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
    _id: true,
  }
);

const provinceCollectionName = "province";
const Province = mongoose.model(provinceCollectionName, ProvinceSchema);

const cityCollectionName = "city";
const City = mongoose.model(cityCollectionName, CitySchema);

module.exports = {Province, City};
