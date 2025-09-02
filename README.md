# Gardening App 🌱

My first **full stack web application** built from scratch. It provides selected vegetable and herb gardening resources.

## Overview

- Originally started as a **React + Redux app**, fetching plant data from external APIs.
- To improve reliability and customization, plant data was curated into a **JSON file** (with the help of AI), manually enriched with images.
- That JSON data was migrated into a **MongoDB database**, forming the foundation of the current application.
- A custom **backend** was then built to access and serve this database to the frontend.

## Tech Stack

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Backend Testing**: Vitest
- **Deployment**: Vercel (frontend), Render (backend)
- **Data Sources**: AI-assisted JSON enrichment, manually curated images, external API for plant hardiness zone lookup

## Live Demo

- **Frontend (Vercel)**: https://gardening-app-gules.vercel.app
- **Backend API (Render)**: https://gardening-app-hurn.onrender.com
- **Note**: Please allow up to a minute for the backend to wake up

## Features

### Current

- **Search Feature**: Quickly find plants by name.
- **Plant List Display**: Browse a list of vegetable and herb names from the database.
- **Plant Details View**: Each entry includes:
  - Common name & scientific name
  - Planting season and instructions
  - Sunlight requirements
  - Plant hardiness zone
  - Companion planting information

### Planned

- **Filtering**: Display plants by:
  - Planting season
  - Type (vegetable vs. herb)
  - Sunlight requirement
  - Indoor start vs. direct seeding
- **Planting & Harvest Calculator**: Calculate planting and harvesting times based on location and season.
- **Ornamental Plants Section**: A separate database collection and page for non-edible plants.

## Database Notes

- The full production dataset is **not included in this repository**.
- This is intentional because:
  - Additional data cleaning is necessary.
  - The data (excluding manually enriched images) was AI-generated and may contain errors or inconsistencies.
- For local testing, you may use a small **demo dataset** included in the server/test folder.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/scmsal/gardening-app
   cd gardening-app

   ```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**
   Create a .env file in the backend folder with:
   `bash
DATABASE_URI=your-mongodb-connection-string
PORT=5050
`
4. **Seed data**

⚠️ The full dataset used in production is private.

To test locally, upload the samplePlantData.json file in the server/database folder to your own MongoDB database.

5. **Run frontend and backend concurrently**
   From the root folder:

```bash
npm run dev
```

This will start:

- React frontend on [http://localhost:3000](http://localhost:3000/)
- Express backend on [http://localhost:5050](http://localhost:5050/)

### Deployment

Frontend (client folder): Deployed to Vercel by configuring build settings (npm run build) and environment variables set in the dashboard (VITE_BACKEND_URL, NODE_ENV).

Backend (server folder): Deployed to Render with environment variables set in the dashboard (DATABASE_URI, NODE_ENV). PORT is set automatically.

**NOTE**
README file drafted by ChatGPT and edited manually.
