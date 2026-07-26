const fs = require('fs');
const path = require('path');

const contentRoot = path.join(__dirname, '../src/content');
const sections = ['projects', 'posts'];

sections.forEach(section => {
  const dir = path.join(contentRoot, section);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .sort();

  const indexPath = path.join(dir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(files, null, 2));
  console.log(`[content-index] ${section}: ${files.length} file(s) → ${indexPath}`);
});
