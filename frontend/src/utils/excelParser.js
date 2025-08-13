/* frontend/src/utils/excelParser.js

import * as XLSX from "xlsx";

export async function parseExcelFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch Excel file");

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet);
}
*/