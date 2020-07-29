var fs = require('fs');
var postcss = require('postcss');
var pxtorem = require('postcss-pxtorem');
var css = fs.readFileSync('css/style.css', 'utf8');
var options = {
	rootValue: 10,
    unitPrecision: 5,
    propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'word-spacing', 'margin*', 'padding*']
};
var processedCss = postcss(pxtorem(options)).process(css).css;

fs.writeFile('css/style.css', processedCss, function (err) {
  if (err) {
    throw err;
  }
  console.log('Rem file written.');
});