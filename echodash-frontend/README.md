# echodash-frontend

This is the **frontend dashboard** for echodash, built with **React + Vite + TypeScript + redux-toolkit + redux-saga + emotion/react + emotion/styled**.

## Features

* Responsive dashboard with sidebar navigation
* Pages for Home, Songs, Artists, Albums, Genres
* Artist/Album/Genre detail pages
* 404 Not Found page
* Environment-based API URL

## Requirements

* Node.js >= 22
* npm >= 10
* Backend API URL

## Environment Variables

Create a `.env` file in `echodash-frontend`:

```
VITE_API_BASE_URL=http://localhost:3000
```

Replace with the deployed backend URL in production.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run frontend in dev mode |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

## Run Locally

```bash
cd echodash-frontend
npm ci
npm run dev
```

Frontend will run at `http://localhost:5173`.

## Deployment

deployed at https://echodash-eight.vercel.app
