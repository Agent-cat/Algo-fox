const fs = require('fs');
const path = require('path');

const dir = 'components/dashboard';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the main card wrapper styling
    // Typical pattern: bg-white dark:bg-[#24262C] rounded-3xl border border-dashed border-gray-300 dark:border-white/5
    
    content = content.replace(
        /bg-white dark:bg-\[#24262C\] rounded-3xl border border-dashed border-gray-300 dark:border-white\/5/g,
        'bg-[#fafafa] dark:bg-[#1D1E23] rounded-3xl border-2 border-dotted border-gray-300 dark:border-white/20'
    );
    
    fs.writeFileSync(filePath, content);
}
console.log('Done');
