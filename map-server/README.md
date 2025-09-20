# Map Server

Express backend for storing map points in MongoDB.

## Setup

1. Copy `.env.example` to `.env` and set your `MONGODB_URI`.
2. Run `npm install` to install dependencies.
3. Start server: `node index.js`

## API

- `GET /api/points` — fetch all points
- `POST /api/points` — add a new point `{ lat, lng, label }`
