function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVP");
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Waktu Kirim", "Nama", "Jumlah Tamu", "Kehadiran", "Ucapan"]);
  }
  
  let data;
  
  // Deteksi otomatis jika data yang dikirim berformat JSON atau Form Parameter
  try {
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }
  } catch(err) {
    data = e.parameter;
  }
  
  // Mengambil data (mendukung huruf kecil maupun besar pada nama atribut)
  const name = data.name || data.Name || "";
  const guests = data.guests || data.Guests || "";
  const attendance = data.attendance || data.Attendance || "";
  const message = data.message || data.Message || data.ucapan || "";
  
  sheet.appendRow([
    new Date(),
    name,
    guests,
    attendance,
    message
  ]);
  
  return ContentService.createTextOutput("Berhasil");
}
