const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  password: "root",
  port: 5432,
  database: "socket_chat",
});

pool.connect();

module.exports = pool;
