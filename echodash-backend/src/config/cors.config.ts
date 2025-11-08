const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', "http://localhost:4173/", "https://echodash-eight.vercel.app/"];
export const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};
