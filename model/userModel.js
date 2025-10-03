const bcrypt = require("bcryptjs");

const users = [
   {
     id: 1,
     username: "teste1",
     passwordHash: bcrypt.hashSync("12345", 8)
   },
   {
     id: 2,
     username: "bea",
     passwordHash: bcrypt.hashSync("12345", 8)
   }
];

module.exports = { users };
