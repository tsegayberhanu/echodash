# echodash-backend

This is the **backend API** for echodash, built with **Node.js, Express, TypeScript, Docker, MongoDB, and mongoose**.

## Features

* REST API for songs, artists, albums, genres, and stats
* Type-safe with TypeScript
* MongoDB Atlas database
* Handles artist/album/genre detail routes

## Requirements

* Node.js >= 22
* npm >= 10
* MongoDB Atlas account

## Environment Variables

Create a `.env` file in `echodash-backend`:

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/?appName=<clusterName>
NODE_ENV=development
```

## Scripts

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Run backend in dev mode (tsx watch) |
| `npm run build`     | Compile TypeScript to JS            |
| `npm start`         | Run compiled backend                |
| `npm run typecheck` | Run type checks only                |

## Run Locally in dev mode

```bash
cd echodash-backend
npm ci
npm run dev
```

Backend runs at `http://localhost:3000`.

## Run Locally in production mode

* Build with `npm run build` and start with `npm start`.
* Make sure the `.env` variables are set.

## Running using Docker

Development setup uses hot reload with local code mounted inside the container.

```bash
docker compose up --build
```

- Runs npm run dev via tsx watch
- Live reloads on code changes
- Accessible at: http://localhost:3000

Stop development containers:

```bash
docker compose down
```

## Running in Production

Production setup uses a built image with only production dependencies.

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

- Runs npm start using compiled JS files
- No hot reload
- Restart policy: always
- Accessible at: http://localhost:3000

Stop production containers:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml down
```

Cleanup

Remove unused containers and images:

```bash
docker compose down --rmi all
docker image prune -a
```
## Deployment

Deployed on Render (test server) : https://echodash-backend.onrender.com
check health at : https://echodash-backend.onrender.com/api/health
