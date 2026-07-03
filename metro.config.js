const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Notice the path here is updated to look inside the src folder!
module.exports = withNativeWind(config, { input: "./src/global.css" });