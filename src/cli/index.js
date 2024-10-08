#!/usr/bin/env node

// const figlet = require("figlet");
const { Command } = require("commander"); // add this line
// const fs = require("fs");
// const path = require("path");

const { addComponent } = require("./actions/add-component");

//add the following line
const program = new Command();

program
  .version("1.0.1")
  .description("An example CLI for managing a directory")
  .option("-l, --ls  [value]", "List directory names")
  .option("-c, --c <value> <value-2>", "Get component")
  .option("-a, --add <name>", "Add a component")
  .option("-t, --touch <value>", "Create a file")
  .parse(process.argv);

const options = program.opts();

// if (options.ls) {
//   const filepath = typeof options.ls === "string" ? options.ls : __dirname;

//   listDirectoryNames().then((names) => {
//     console.log(names);
//   });
// }

// if (options.c) {
//   const filepath = typeof options.ls === "string" ? options.ls : __dirname;
//   const [a, b, c, directoryPath, name] = process.argv;

//   getComponent({
//     name: name || "no-lesson-view.tsx",
//     directoryPath: directoryPath || "nmm",
//   }).then((names) => {
//     console.log(names);
//   });
// }

if (options.add) {
  addComponent(options.add);
}
