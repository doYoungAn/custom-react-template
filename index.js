#!/usr/bin/env node

const figlet = require('figlet');
const program = require('commander');
const chalk = require('chalk');
const copyTemplate = require('./copy-template');

console.log(
    chalk.blueBright(figlet.textSync('react-template'))
)

program
    .description('create custom react template!')
    .requiredOption('-p --project <type>', 'project name')
    .action((type, option) => {
        copyTemplate(type.project);
    });
program.parse(process.argv);

