const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');

function loadData() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]');
  }

  const content = fs.readFileSync(dataPath, 'utf-8').trim();
  if (content === '') return [];

  try {
    return JSON.parse(content);
  } catch (e) {
    console.error('Erro ao parsear JSON:', e);
    return [];
  }
}

function saveData(newEntry) {
  const data = loadData();
  data.push(newEntry);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { loadData, saveData };
