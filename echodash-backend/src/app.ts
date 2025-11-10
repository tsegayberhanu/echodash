import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.config.js";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import artistRoutes  from "./routes/artist.routes.js";
import albumRoutes from "./routes/album.routes.js"
import songRoutes from "./routes/song.routes.js";
import staticsRoutes from "./routes/songStats.route.js"
import genreRoutes from "./routes/genre.routes.js"
import { healthController } from "./controllers/health.controller.js";
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/artists", artistRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/stats", staticsRoutes);
app.use("/api/health", healthController);


app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
