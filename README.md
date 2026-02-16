# Flight Search – Frontend

A minimal flight search UI built with React, TypeScript, and Vite.

## Features

- One-way / Return trip toggle
- Origin and Destination airport dropdowns (destinations update based on selected origin)
- Search button that displays selected criteria and flight results
- Loading and error states when calling the API

## Prerequisites

- Node.js 18+
- npm

## Run Locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the dev server**

   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

**Note:** The app expects the backend API at `http://localhost:5215`. The Vite dev server proxies `/api` requests to that URL. Start the backend before using the search.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start development server |
| `npm run build`| Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |
