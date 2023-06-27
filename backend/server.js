const { MongoConnection } = require("./src/config/database");
const app = require("./src/config/express");
const {
  PORT,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("./src/config/vars");
const colors = require("colors");
const cloudinary = require("cloudinary");

(async () => {
  try {
    const connection = new MongoConnection();
    await connection.connectionToDb();
    console.log("database connected successfully".bgBlue);
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error:", error);
    console.log("Shutting down the server");
    process.exit();
  }
})();
