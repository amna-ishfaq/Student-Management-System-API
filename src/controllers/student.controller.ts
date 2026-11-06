import { Request, Response } from "express";

interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  course: string;
  isActive: boolean;
}

const students: Student[] = [];
let nextId = 1;

function isValidStudent(body: any): boolean {
  return (
    body !== null && typeof body === "object" && !Array.isArray(body) &&
    typeof body.name === "string" && body.name.trim().length > 0 &&
    Number.isInteger(body.age) && body.age > 0 &&
    typeof body.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) &&
    typeof body.course === "string" && body.course.trim().length > 0 &&
    typeof body.isActive === "boolean"
  );
}

function getDetails(body: any): Omit<Student, "id"> {
  return {
    name: body.name.trim(),
    age: body.age,
    email: body.email,
    course: body.course.trim(),
    isActive: body.isActive,
  };
}

export function getStudents(req: Request, res: Response): void {
  try {
    res.status(200).json(students);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export function getStudentById(req: Request, res: Response): void {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({ message: "ID must be a positive integer" });
      return;
    }
    const student = students.find((student) => student.id === id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    res.status(200).json(student);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export function addStudent(req: Request, res: Response): void {
  try {
    if (!isValidStudent(req.body)) {
      res.status(400).json({ message: "Provide name, positive integer age, valid email, course, and boolean isActive" });
      return;
    }
    const student: Student = { id: nextId++, ...getDetails(req.body) };
    students.push(student);
    res.status(201).json(student);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export function updateStudent(req: Request, res: Response): void {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({ message: "ID must be a positive integer" });
      return;
    }
    const student = students.find((student) => student.id === id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    if (!isValidStudent(req.body)) {
      res.status(400).json({ message: "Provide name, positive integer age, valid email, course, and boolean isActive" });
      return;
    }
    Object.assign(student, getDetails(req.body));
    res.status(200).json(student);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export function deleteStudent(req: Request, res: Response): void {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({ message: "ID must be a positive integer" });
      return;
    }
    const index = students.findIndex((student) => student.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    students.splice(index, 1);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}
