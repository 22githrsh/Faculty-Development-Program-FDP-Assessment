import "dotenv/config";
import mongoose from "mongoose";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { connectDB } from "../src/config/db.js";
import Student from "../src/models/Student.js";
import { assessmentStudents } from "../src/data/assessmentStudents.js";

export async function seedStudents() {
  await connectDB();
  await Student.init();

  const existingStudents = await Student.find({}, { email: 1 }).lean();
  const existingEmails = new Set(
    existingStudents
      .map(({ email }) => (typeof email === "string" ? email.trim().toLowerCase() : ""))
      .filter(Boolean)
  );
  let inserted = 0;
  let skipped = 0;

  for (const record of assessmentStudents) {
    const email = record.email.trim().toLowerCase();
    if (existingEmails.has(email)) {
      skipped += 1;
      continue;
    }

    try {
      await new Student({ ...record, email }).save();
      existingEmails.add(email);
      inserted += 1;
    } catch (error) {
      if (error.code === 11000) {
        skipped += 1;
        existingEmails.add(email);
        continue;
      }
      throw error;
    }
  }

  console.log(`Assessment seed complete: ${inserted} inserted, ${skipped} already present.`);
  return { inserted, skipped };
}

const isMain = process.argv[1]
  && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  try {
    await seedStudents();
  } catch (error) {
    console.error("Assessment seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch((error) => {
      console.error("Failed to close MongoDB connection:", error.message);
      process.exitCode = 1;
    });
  }
}