import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative } from "path";

// Function to recursively read all TypeScript files inside a directory
function getFiles(dir, files_) {
  files_ = files_ || [];
  const files = readdirSync(dir);
  for (const i in files) {
    const name = join(dir, files[i]);
    if (statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else if (name.endsWith(".ts") || name.endsWith(".tsx")) {
      files_.push(name);
    }
  }
  return files_;
}

// Function to extract all export types and classes from TypeScript files and group them
function generateExportContent(files, _relativePath, export_types) {
  const groupedExports = {};
  files.forEach((file) => {
    const fileContent = readFileSync(file, "utf8");
    const exportMatches = fileContent.match(/export (type|class|interface|type|function|const)\s+(\w+)/g);

    if (!exportMatches) return;

    const relativePath = relative(_relativePath, file).replace(/\\/g, "/").replace(".ts", "");

    groupedExports[relativePath] = groupedExports[relativePath] || [];
    exportMatches.forEach((match) => {
      const typeNameOrClassName = match.split(" ")[2];
      groupedExports[relativePath].push(typeNameOrClassName);
    });
  });

  let content = "";
  for (const relativePath in groupedExports) {
    content += `export${export_types ? " type " : " "}{ ${groupedExports[relativePath].join(
      ", "
    )} } from './${relativePath}';\n`;
  }

  return content;
}

// Main logic
export function generateIndexFile() {
  const args = process.argv.slice(2); // Extract arguments starting from index 2
  if (args.length !== 1) {
    console.error("Usage: node path_to_script.js project_folder_path");
    process.exit(1);
  }

  const projectFolderPath = args[0]; // Use the provided project folder path

  // Read package.json from the specified project folder
  const packageJsonPath = join(projectFolderPath, "package.json");
  const packageJsonContent = readFileSync(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonContent);

  // Extract values from the "_build-scripts" key
  const buildScripts = packageJson._buildScripts;
  if (!buildScripts || !buildScripts.files || !buildScripts.dist) {
    console.error('Missing or incomplete "_build-scripts" configuration in package.json');
    process.exit(1);
  }

  const directoryPath = join(projectFolderPath, buildScripts.files);
  const outputFilePath = join(projectFolderPath, buildScripts.dist);

  const packageFiles = getFiles(directoryPath);

  const packageIndexContent = generateExportContent(
    packageFiles,
    join(outputFilePath, ".."),
    buildScripts.export_types
  );

  writeFileSync(outputFilePath, packageIndexContent, "utf8");
}
