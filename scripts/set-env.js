require('dotenv').config();
const { writeFileSync , mkdirSync } = require('fs');

const target = './src/environments';
const fileName = 'environments.ts';
const envFileContent = `
export const environment = {
    baseUrl: "${process.env.baseUrl}"
}`;

mkdirSync(target, {recursive: true});
writeFileSync(`${target}/${fileName}`, envFileContent);