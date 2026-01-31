import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,

  waitForConnections: true,
  connectionLimit: 75,
  maxIdle: 15,
  queueLimit: 150,
  idleTimeout: 30000,
  connectTimeout: 10000,

  enableKeepAlive: true,
  keepAliveInitialDelay: 30000,

  multipleStatements: false,
  timezone: "+07:00",
});

export async function testConnection() {
  try {
    const connection = await db.getConnection();

    await connection.execute("SET time_zone = '+07:00'");

    console.log("✅ Database connected successfully");
    connection.release();

    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);

    return false;
  }
}

export async function closeDatabase() {
  try {
    await db.end();
    console.log("✅ Database connections closed");
  } catch (error) {
    console.error("❌ Error closing database:", error);
  }
}
