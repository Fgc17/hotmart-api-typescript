#!/usr/bin/env node

import { watch } from "fs";
import { generateIndexFile } from "../src/build.js";

let timeout;

function buildTypes() {
  // Clear any existing timeouts to prevent multiple calls
  clearTimeout(timeout);

  // Set a timeout to call the script after a delay, providing a debounce effect
  timeout = setTimeout(() => {
    generateIndexFile();
  }, 300); // 300 ms delay
}

// Initial build
buildTypes();

// Watch for changes in TypeScript files
watch("./src", { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith(".ts") || filename.endsWith(".tsx")) && filename !== "main.ts") {
    console.log(`File ${filename} has been changed, rebuilding types...`);
    buildTypes();
  }
});
