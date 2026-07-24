import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const getPrismaClient = () => {
  let dbUrl: string;

  if (process.env.NODE_ENV === "production") {
    const sourceDbPath = path.resolve(process.cwd(), "prisma", "dev.db");
    const tmpDbPath = path.join("/tmp", "dev.db");

    try {
      if (fs.existsSync(sourceDbPath) && !fs.existsSync(tmpDbPath)) {
        fs.copyFileSync(sourceDbPath, tmpDbPath);
      }
    } catch (err) {
      console.error("Failed to copy dev.db to /tmp:", err);
    }

    const finalPath = fs.existsSync(tmpDbPath) ? tmpDbPath : sourceDbPath;
    dbUrl = `file:${finalPath}`;
  } else {
    const dbPath = path.resolve(process.cwd(), "prisma", "dev.db");
    dbUrl = `file:${dbPath}`;
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
