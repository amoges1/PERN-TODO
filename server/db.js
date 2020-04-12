const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "D3stro",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;