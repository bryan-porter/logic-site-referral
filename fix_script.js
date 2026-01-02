const fs = require('fs');
let content = fs.readFileSync('client/src/pages/home.tsx', 'utf8');
content = content.replace(/\nAdding to Business: \${values\.addingToBusiness}/g, '');
fs.writeFileSync('client/src/pages/home.tsx', content);
console.log('Done');
