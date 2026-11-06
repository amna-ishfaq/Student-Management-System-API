"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_routes_1 = __importDefault(require("./routers/student.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/students", student_routes_1.default);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((error, req, res, next) => {
    const status = error.status === 400 ? 400 : error.status === 413 ? 413 : 500;
    res.status(status).json({
        message: status === 400 ? "Invalid JSON body" : status === 413 ? "Request body too large" : "Internal server error",
    });
});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
