const fs = require('fs');
const path = require('path');

const cssFile = path.join(process.cwd(), 'src/index.css');
let css = fs.readFileSync(cssFile, 'utf8');

if (!css.includes('filter: hue-rotate')) {
  css = css.replace('.bg-marble-emerald {', '.bg-marble-emerald {\n  filter: hue-rotate(240deg);\n');
  fs.writeFileSync(cssFile, css, 'utf8');
}

const appFile = path.join(process.cwd(), 'src/App.tsx');
let app = fs.readFileSync(appFile, 'utf8');
app = app.replace(/className=\"([^\"]*?opacity-[0-9]+[^\"]*?)\"/g, (match, p1) => {
  if (p1.includes('object-contain') && !p1.includes('hue-rotate')) {
    return 'className=\"' + p1 + ' hue-rotate-[240deg]\"';
  }
  return match;
});
fs.writeFileSync(appFile, app, 'utf8');
console.log('done');
