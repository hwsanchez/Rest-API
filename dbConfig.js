const mysql = require("mysql2/promise");

const options = {
  host: "127.0.0.1",
  user: "root",
  database: "node_course",
  password: "",
};

async function connectToDB() {
  return await mysql.createConnection(options);
}

exports.connect = connectToDB;
