const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function findFiles(dir, filter) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(file, filter));
    } else {
      if (file.endsWith(filter)) results.push(file);
    }
  });
  return results;
}

const files = findFiles(srcDir, '.tsx');

files.forEach(file => {
  if (file.includes('Icons.tsx')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  const lucideImportMatch = content.match(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"];?/);
  if (lucideImportMatch) {
    const importStr = lucideImportMatch[1];
    
    // Get all icon names extracted from the import statement. Filter out "as" aliases initially.
    const icons = importStr.split(',').map(s => s.trim()).filter(s => s).map(s => {
      const parts = s.split(' as ');
      return parts.length === 2 ? { name: parts[0], alias: parts[1] } : { name: s, alias: s };
    });

    // Replace the import
    const depth = file.split(path.sep).length - srcDir.split(path.sep).length;
    let relativePrefix = '../'.repeat(depth - 1) || './';
    if (file.includes('pages')) relativePrefix = '../';
    else if (file.includes('components')) relativePrefix = './';

    let replacementImport = `import { Icons } from '${relativePrefix}components/Icons';`;
    
    // Add CSS import if it's a page
    const filename = path.basename(file, '.tsx');
    if (file.includes('pages')) {
      const cssPath = `${relativePrefix}styles/pages/${filename}.css`;
      replacementImport += `\nimport '${cssPath}';`;
    }

    content = content.replace(lucideImportMatch[0], replacementImport);

    // Replace usages
    icons.forEach(icon => {
      // Regex to find components like <Search or <Search className=...
      const regex = new RegExp(`<(${icon.alias})(\\s|>)`, 'g');
      content = content.replace(regex, `<Icons.$1$2`);
      
      // We might also pass icons as props like icon={Search} although this project might not.
      // E.g. <Filter /> -> <Icons.Filter />
      
      // Let's also fix the duplicate import issue in Navbar
      if (icon.alias === 'UserIcon') {
        const regexUser = new RegExp(`<UserIcon(\\s|>)`, 'g');
        content = content.replace(regexUser, `<Icons.User$1`);
      } else {
        const regexUsage = new RegExp(`\\b${icon.alias}\\b`, 'g');
        // Carefully replace instances where the icon is used as a value/type, skipping Imports.
        // Actually, just replacing <Icon is enough for 99% of cases here. Let's just do <Icon to <Icons.Icon.
      }
    });

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  } else if (file.includes('pages')) {
     const filename = path.basename(file, '.tsx');
     if (!content.includes(`${filename}.css`)) {
        const depth = file.split(path.sep).length - srcDir.split(path.sep).length;
        let relativePrefix = '../'.repeat(depth - 1) || './';
        const cssPath = `${relativePrefix}styles/pages/${filename}.css`;
        content = content.replace(/import {([^}]+)}\s+from\s+['"]react['"];?/, `$& \nimport '${cssPath}';`);
        fs.writeFileSync(file, content, 'utf8');
     }
  }
});
