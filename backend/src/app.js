import express from "express";
import cors from "cors";
import amenintariRouter from "./routes/amenintari.js";

const app = express();

// CORS: browserul blochează cererile de pe :5173 către :3001
// dacă serverul nu spune explicit că le permite
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));

// Transformă corpul JSON al cererii în req.body
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Resursa proprie (din tw.json): /amenintari
app.use("/amenintari", amenintariRouter);

// Rută necunoscută
app.use((req, res) => {
  res.status(404).json({ error: "Ruta nu există" });
});

// Tratare centralizată a erorilor (Express 5 trimite aici și erorile async)
app.use((err, req, res, next) => {
  // JSON stricat în corpul cererii: este greșeala clientului, nu a serverului
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Corpul cererii nu este JSON valid" });
  }
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: status === 500 ? "Eroare internă" : err.message });
});

export default app;
