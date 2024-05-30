const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const EventEmitter = require("events");
const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(100);

// Base directories
const baseDir = __dirname;
const rootDir = path.join(baseDir, "../");
const srcDir = path.join(rootDir, "/src");
const versionDir = path.join(srcDir, "/v1");
const testDir = path.join(rootDir, "/test");

// Version-specific directories
const componentDir = path.join(versionDir, "/components");
const middlewareDir = path.join(versionDir, "/middleware");
const configDir = path.join(versionDir, "/configs");
const errorDir = path.join(versionDir, "/errors");
const constantsDir = path.join(versionDir, "/constants");
const utilsDir = path.join(versionDir, "/utils");
const modelDir = path.join(versionDir, "/models");

// Array of directories
const dirs = [
  srcDir,
  versionDir,
  testDir,
  componentDir,
  middlewareDir,
  configDir,
  errorDir,
  constantsDir,
  utilsDir,
  modelDir,
];

// Create directories if they don't exist
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to create a new component directory
function createComponent(componentName) {
  const newComponentDir = path.join(componentDir, componentName);

  const dirContent = ["controllers", "types", "services"];

  if (!fs.existsSync(newComponentDir)) {
    fs.mkdirSync(newComponentDir);
    dirContent.forEach((dir) => {
      fs.mkdirSync(path.join(newComponentDir, dir));
    });
    fs.appendFileSync(
      `${newComponentDir}/${componentName}.routes.ts`,
      `import { Router } from "express";

const router: Router = Router();

function initMiddleware(router: Router) {}

initMiddleware(router);

function bundleRoutes(router: Router) {}

bundleRoutes(router);

export const ${componentName}Router: Router = router;
`,
      function (err) {}
    );
  } else {
    console.log("Component already exists");
  }
}

// Main function to run the prompts
async function runPrompts() {
  const { todo } = await inquirer.prompt({
    type: "list",
    message: "Choose what to do:",
    name: "todo",
    choices: [
      { name: "Config", value: "config" },
      { name: "Create module", value: "module" },
      { name: "Delete module", value: "Dmodule" },
    ],
  });

  console.log(todo);

  if (todo == "module") {
    const { module } = await inquirer.prompt({
      type: "list",
      message: "What module to create:",
      name: "module",
      choices: ["component", "middleware", "model", "component with model"],
    });

    console.log(module);

    if (module === "component") {
      const { componentName } = await inquirer.prompt({
        type: "input",
        message: "Enter component name:",
        name: "componentName",
      });

      createComponent(componentName);
    }
  }
}

// Run the prompts
runPrompts();
