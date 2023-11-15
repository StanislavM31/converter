const fs = require('fs');
const path = './storage/storage.json'

function getAll() {
    const array = JSON.parse(fs.readFileSync(path));
    console.log(array);
    return array;
};


function createData(data) {
    try {
      // чистим
      fs.writeFileSync(path, "[]");

      // Записываем
      fs.writeFileSync(path, JSON.stringify(data));

    } catch (error) {
      console.log("Данные не записаны:", error);
    }
  }

module.exports = { getAll, createData };