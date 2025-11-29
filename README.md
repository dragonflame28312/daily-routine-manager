# Daily Routine Manager

This is a simple web application built with React and Vite that helps you manage and visualize your daily routines. It includes a list of routine items with details and allows you to toggle details and filter items by categories and times of day.

## Features

- Display of routine items with a card-based UI using Tailwind CSS.
- Interactive details and links.
- Filtering by time of day and category.
- Overview statistics.

## Running Locally

### Prerequisites

- Node.js (v16 or later recommended)

### Steps

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:

   ```
   npm run dev
   ```

   The application will be available at `http://localhost:5173` or whichever port Vite outputs.

### Building for Production

To build the app for deployment:

```
npm run build
```

The output will be in the `dist` folder, which can be served with any static hosting service.

## Deployment

This repository includes a GitHub Actions workflow to automatically build and deploy the app to GitHub Pages. On each push to the `main` branch, the workflow will run and publish the `dist` folder. The site will be available at `https://<username>.github.io/<repository>/`.
