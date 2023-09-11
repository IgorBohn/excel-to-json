const XLSX = require('xlsx');
const fs = require('fs');

const arquivoExcel = 'planilha.xlsx';
const workbook = XLSX.readFile(arquivoExcel);

const nomeDaPlanilha = workbook.SheetNames[0];
const planilha = workbook.Sheets[nomeDaPlanilha];

const jsonData = XLSX.utils.sheet_to_json(planilha, { header: 1 });

const matriz = jsonData.map(row => {
  return row.filter(cell => typeof cell !== 'undefined');
});

console.log(matriz);

const objetoJSON = { data: matriz };
const jsonString = JSON.stringify(objetoJSON, null, 2);

const nomeDoArquivoDeSaida = 'matriz.json';
fs.writeFileSync(nomeDoArquivoDeSaida, jsonString, 'utf-8');
console.log(`Matriz escrita em ${nomeDoArquivoDeSaida}`);
