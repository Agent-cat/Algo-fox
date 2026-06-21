const fs = require('fs');
const path = require('path');

const dir = 'components/dashboard';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // In ProblemOverviewCard.tsx, the circular icons were originally "bg-white", but the main inner cards were "bg-gray-50".
    // I previously replaced bg-gray-50 with bg-white.
    // If I just replace "bg-white dark:bg-white/5" with "bg-gray-100 dark:bg-white/5", 
    // it will effectively change all the cards and also the icons.
    content = content.replace(/(?<!:)\bbg-white\/50\b/g, 'bg-gray-100/50');
    content = content.replace(/(?<!:)\bbg-white dark:bg-white\/5\b/g, 'bg-gray-100 dark:bg-white/5');
    
    fs.writeFileSync(filePath, content);
}
console.log('Done');
