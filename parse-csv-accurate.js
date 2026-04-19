const fs = require('fs');
const path = require('path');

const csvPath = 'e:\\Backup\\GSI-Site Product list.csv';
const raw = fs.readFileSync(csvPath, 'utf8');
const lines = raw.split(/\r?\n/).map((line) => line.split(','));

// Manually map the 6 categories to their CSV column indices based on the sheet structure
const categoryColumns = {
  'BOXING': 0,
  'Labels and Packaging': 11,
  'STREETWEAR': 11,  // Same column as Labels, separated by empty row
  'MOTORBIKE': 0,    // Appears after BOXING
  'SPORTSWEAR': 11,  // Right side column
  'LEATHER': 0       // Left side, appears later
};

// Parse the sheet more carefully, tracking section breaks
const entries = [];
let currentSection = null;
let boxingStartRow = 0;
let labelsStartRow = 0;
let streetwearStartRow = 0;
let motorbsStartRow = 0;
let sportswearStartRow = 0;
let leatherStartRow = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check for category headers
  for (let j = 0; j < line.length; j++) {
    const cell = line[j].trim();
    
    if (cell === 'BOXING' && !boxingStartRow) {
      boxingStartRow = i;
      console.log(`BOXING starts at row ${i}`);
    } else if (cell === 'Labels and Packaging' && !labelsStartRow) {
      labelsStartRow = i;
      console.log(`Labels and Packaging starts at row ${i}`);
    } else if (cell === 'STREETWEAR' && !streetwearStartRow) {
      streetwearStartRow = i;
      console.log(`STREETWEAR starts at row ${i}`);
    } else if (cell === 'MOTORBIKE' && !motorbsStartRow) {
      motorbsStartRow = i;
      console.log(`MOTORBIKE starts at row ${i}`);
    } else if (cell === 'SPORTSWEAR' && !sportswearStartRow) {
      sportswearStartRow = i;
      console.log(`SPORTSWEAR starts at row ${i}`);
    } else if (cell === 'LEATHER' && !leatherStartRow) {
      leatherStartRow = i;
      console.log(`LEATHER starts at row ${i}`);
    }
  }
}

// Now parse URLs with section awareness
// BOXING (col 0): rows after boxingStartRow until motorbsStartRow
// LABELS (col 11): rows after labelsStartRow until streetwearStartRow
// STREETWEAR (col 11): rows after streetwearStartRow until sportswearStartRow
// MOTORBIKE (col 0): rows after motorbsStartRow until leatherStartRow
// SPORTSWEAR (col 11): rows after sportswearStartRow until end
// LEATHER (col 0): rows after leatherStartRow until motorbsStartRow (checking left column)

const sections = [
  { category: 'BOXING', col: 0, startRow: boxingStartRow + 1, endRow: motorbsStartRow },
  { category: 'Labels and Packaging', col: 11, startRow: labelsStartRow + 1, endRow: streetwearStartRow },
  { category: 'STREETWEAR', col: 11, startRow: streetwearStartRow + 1, endRow: sportswearStartRow },
  { category: 'MOTORBIKE', col: 0, startRow: motorbsStartRow + 1, endRow: leatherStartRow },
  { category: 'SPORTSWEAR', col: 11, startRow: sportswearStartRow + 1, endRow: lines.length },
  { category: 'LEATHER', col: 0, startRow: leatherStartRow + 1, endRow: lines.length }
];

for (const section of sections) {
  for (let row = section.startRow; row < section.endRow; row++) {
    if (row >= lines.length) break;
    const line = lines[row];
    if (section.col < line.length) {
      const cell = line[section.col].trim();
      if (cell && cell.startsWith('https://www.alibaba.com/')) {
        entries.push({
          category: section.category,
          url: cell
        });
      }
    }
  }
}

console.log('\nParsed entries by category:');
const counts = {};
entries.forEach(e => {
  counts[e.category] = (counts[e.category] || 0) + 1;
});
console.log(counts);
console.log(`\nTotal entries: ${entries.length}`);
