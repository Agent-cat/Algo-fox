const fs = require('fs');
const path = require('path');

const dir = 'components/dashboard';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace bg-gray-50/50 with bg-white/50 (if not prefixed by hover:, focus:, etc.)
    content = content.replace(/(?<!:)\bbg-gray-50\/50\b/g, 'bg-white/50');
    
    // Replace bg-gray-50 with bg-white (if not prefixed by hover:, focus:, etc.)
    content = content.replace(/(?<!:)\bbg-gray-50\b/g, 'bg-white');
    
    fs.writeFileSync(filePath, content);
}
console.log('Done');
