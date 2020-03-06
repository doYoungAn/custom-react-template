#!/usr/bin/env node

import figlet from 'figlet';
import program from 'commander';
import chalk from 'chalk';
import copyTemplate from './copy-template';
import packageJSON from './../package.json';

console.log(
    chalk.blueBright(figlet.textSync('react-template'))
)

program
    .version(packageJSON.version)

program
    .description('create custom react template!')
    .requiredOption('-p --project <type>', 'project name')
    .action((type, option) => {
        copyTemplate(type.project);
    });

program.parse(process.argv);

