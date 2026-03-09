const path = require("path");
const fs = require("fs");

const deploymentType = process.env.APP_ENV || "local";
const filePath1 = path.resolve(__dirname, "./env/" + deploymentType + ".env");
const fileEnvPath = path.resolve(__dirname, "./.env");

try {
  const data = fs.readFileSync(filePath1, { encoding: "utf8" });
  fs.writeFileSync(fileEnvPath, data, { encoding: "utf8" });
} catch (err) {
  console.error("envSetup: " + (err.message || err));
}
