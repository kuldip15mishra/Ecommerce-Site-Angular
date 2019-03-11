var fs = require('fs');

fs.createReadStream('package.json').pipe(fs.createWriteStream('dist/package.json'));
fs.createReadStream('README.md').pipe(fs.createWriteStream('dist/README.md'));
fs.createReadStream('.gitignore').pipe(fs.createWriteStream('dist/.gitignore'));
fs.createReadStream('prod.env').pipe(fs.createWriteStream('dist/.env'));