import express, { Request, Response, NextFunction } from "express";
import studentRoutes from "./routers/student.routes";

const app = express();
app.use(express.json());
app.use("/students", studentRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status === 400 ? 400 : error.status === 413 ? 413 : 500;
  res.status(status).json({
    message: status === 400 ? "Invalid JSON body" : status === 413 ? "Request body too large" : "Internal server error",
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
