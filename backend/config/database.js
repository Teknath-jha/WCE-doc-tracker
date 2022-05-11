const mongoose = require("mongoose");

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      UseNewUrlParser: true,
    })
    .then((con) => console.log(`Database Connected:${con.connection.host}`))
    .catch((err) => console.log(err));
};
