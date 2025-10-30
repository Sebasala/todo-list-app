import { PrismaClient } from "@/generated/prisma/client";
import path from "path";

export const prisma = new PrismaClient({
  datasourceUrl: `file:${path.join(process.cwd(), "dev.db")}`,
});
