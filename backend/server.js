require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { Connector } = require("@google-cloud/cloud-sql-connector");
const { GoogleAuth } = require("google-auth-library");
const app = express();

app.use(cors({ origin: process.env.CORS_URL }));

let pool;

async function createDatabasePool() {
  const connectorOptions = {};
  const connector = new Connector(connectorOptions);

  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.CLOUD_SQL_MYSQL_INSTANCE,
    ipType: process.env.CLOUD_SQL_MYSQL_IP_TYPE,
  });

  return mysql.createPool({
    ...clientOpts,
    user: process.env.CLOUD_SQL_MYSQL_USER,
    password: process.env.CLOUD_SQL_MYSQL_PASSWORD,
    database: process.env.CLOUD_SQL_MYSQL_DATABASE,
    port: 3306,
  });
}

async function startServer() {
  try {
    pool = await createDatabasePool();
    console.log("Connected to Cloud SQL!");

    app.listen(5000, () => console.log("Server running on port 5000"));
  } catch (e) {
    console.error("Failed to initialize or connect to Cloud SQL:", e.message);
    process.exit(1);
  }
}

startServer();

app.get("/api/get/products", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
