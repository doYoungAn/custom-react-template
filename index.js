#!/usr/bin/env node

const boxen = require('boxen');
const fs = require('fs');
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const templatePackage = require('./template/package.json');

console.log('create react template...');

const dependencies = [];
const devDependencies = [];
for (let key in templatePackage.dependencies) {
    dependencies.push({ name: key, version: templatePackage.dependencies[key] });
}
for (let key in templatePackage.devDependencies) {
    devDependencies.push({ name: key, version: templatePackage.devDependencies[key] });
}

const maxNameLength = [...dependencies, ...devDependencies]
    .map(obj => obj.name)
    .reduce((prev, next) => prev < next.length ? next.length : prev, 0);
const dependenciesTitle = `${chalk.yellow('Dependencies')}\n`;
const dependenciesStr = dependencies
    .map((obj) => {
        const name = chalk.blueBright(obj.name);
        const version = chalk.greenBright(obj.version); 
        const spaceCount = maxNameLength - obj.name.length;
        const spaces = Array(spaceCount).fill(' ').join('');
        return `${name}${spaces} = ${version}`;
    })
    .join('\n');
const devDependenciesTitle = `\n${chalk.yellow('DevDependencies')}\n`;
const devDependenciesStr = devDependencies
    .map((obj) => {
        const name = chalk.blueBright(obj.name);
        const version = chalk.greenBright(obj.version); 
        const spaceCount = maxNameLength - obj.name.length;
        const spaces = Array(spaceCount).fill(' ').join('');
        return `${name}${spaces} = ${version}`;
    })
    .join('\n');
const description = boxen(`${dependenciesTitle}${dependenciesStr}${devDependenciesTitle}${devDependenciesStr}`, { padding: 1 });

console.log(description);


