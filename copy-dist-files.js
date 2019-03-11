var fs = require('fs');

fs.createReadStream('package.json').pipe(fs.createWriteStream('dist/package.json'));
fs.createReadStream('README.md').pipe(fs.createWriteStream('dist/README.md'));
fs.createReadStream('.gitignore').pipe(fs.createWriteStream('dist/.gitignore'));
fs.createReadStream('prod.env').pipe(fs.createWriteStream('dist/.env'));
var dir0 = __dirname + '/dist/uploads';
if (!fs.existsSync(dir0)) {
  fs.mkdirSync(dir0);
}
var dir = __dirname + '/dist/uploads/avatar';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  fs.createReadStream(__dirname + '/uploads/avatar/.gitkeep').pipe(fs.createWriteStream(__dirname + '/dist/uploads/avatar/.gitkeep'));
} else {
  fs.createReadStream(__dirname + '/uploads/avatar/.gitkeep').pipe(fs.createWriteStream(__dirname + '/dist/uploads/avatar/.gitkeep'));
}