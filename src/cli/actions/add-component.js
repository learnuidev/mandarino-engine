const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
const { components } = require("../components");

const addComponent = (name) => {
  const component = components[name];
  if (!component) {
    console.log(`Component: ${name} does not exist`);
    console.log(
      `The following components are currently supported: ${JSON.stringify(Object.keys(components))}`
    );
    return null;
  }

  console.log(`Installing: ${name}... please wait`);

  const basePath = component.basePath || "./components";
  const baseExtension = component.baseExtension || "js";

  const pathName = path.resolve(`${basePath}/${name}.${baseExtension}`);

  const directoryPath = path.resolve(`${basePath}`);

  if (fs.existsSync(directoryPath)) {
    console.log("folder exists");
  } else {
    console.error("Folder doesnt exist");
  }

  try {
    fsPromises.writeFile(pathName, component?.code).then(() => {
      console.log(`${name}: successfully installed`);
    });
  } catch (err) {
    fsPromises
      .mkdir(directoryPath)
      .then(function () {
        console.log("Directory created successfully");

        fsPromises.writeFile(pathName, component?.code).then(() => {
          console.log(`${name}: successfully installed`);
        });
      })
      .catch(function () {
        console.log("failed to create directory");
      });
  }
};

module.exports.addComponent = addComponent;
