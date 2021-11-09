module.exports = () => {
  const mongoose = require("mongoose");
  const mongoURL = process.env.MONGO_DB_URL || "mongodb+srv://cale312:hellsgate312@cluster0.xwgwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));
};
