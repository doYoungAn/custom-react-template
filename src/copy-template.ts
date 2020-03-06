import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import boxen from 'boxen';
import { execSync } from 'child_process';
import templatePackage from './../template/package.json';

const copyTemplate = (project: string) => {

    try {
        fs.mkdirSync(project);
    } catch(e) {
        console.log(chalk.red(`Already exists foleder ${project}`));
        process.exit(0);   
    }

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

    fse.copySync(path.join(__dirname, './../template'), project);
    
    const bufferPackageJSON = fs.readFileSync(`./${project}/package.json`);
    const packageJSON = JSON.parse(bufferPackageJSON.toString('UTF-8'));
    packageJSON['name'] = project;
    fs.writeFileSync(`./${project}/package.json`, JSON.stringify(packageJSON, null, 4));

    process.chdir(project);

    execSync('npm install', {stdio: [0, 1, 2]});

}

export default copyTemplate;
