require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mysql = require("mysql2/promise");
const { Connector } = require("@google-cloud/cloud-sql-connector");
const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); 

async function createDatabasePool() {
    const connector = new Connector();

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

let pool;
createDatabasePool().then((p) => {
    pool = p;
    console.log('Connected to Cloud SQL!');
    app.listen(5000, () => console.log('Server running on port 5000!'));
})

app.get("/api/get/products", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
