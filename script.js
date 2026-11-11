// Tanggal dan waktu lokal WIB (GMT+7). Acara dimulai 17 Januari 2027 pukul 09.00.
const weddingDate = new Date("2027-01-17T09:00:00+07:00");
function updateCountdown(){
  const diff = Math.max(0, weddingDate.getTime() - Date.now());
  const values = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000)
  };
  Object.entries(values).forEach(([id,value]) => {
    const el = document.getElementById(id);
    if(el) el.textContent = String(value).padStart(2,"0");
  });
}
updateCountdown();
setInterval(updateCountdown,1000);

const audio = document.getElementById("weddingAudio");
const musicToggle = document.getElementById("musicToggle");
let isPlaying = false;
musicToggle.addEventListener("click",async()=>{
  try{
    if(!isPlaying){
      await audio.play();
      isPlaying = true;
      musicToggle.innerHTML = "♫ <span>Jeda musik</span>";
    }else{
      audio.pause();
      isPlaying = false;
      musicToggle.innerHTML = "♫ <span>Putar musik</span>";
    }
  }catch(error){
    musicToggle.innerHTML = "♫ <span>Periksa file MP3</span>";
  }
});

// RSVP: tempel URL Web App Google Apps Script di antara tanda kutip.
// Contoh: const RSVP_ENDPOINT = "https://script.google.com/macros/s/...../exec";
const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbyWPcT5Dr3KIr6v7517E4ypyEeJPuHWBKYAUrbBNyUiVRTL9hU8bIV6b8mR9FpCiXBM/exec";
const form = document.getElementById("rsvpForm");
const statusText = document.getElementById("formStatus");
form.addEventListener("submit",async(event)=>{
  event.preventDefault();
  if(!RSVP_ENDPOINT){
    statusText.textContent = "Form belum terhubung. Ikuti panduan README untuk mengaktifkan Google Sheets RSVP.";
    return;
  }
  const data = new URLSearchParams(new FormData(form));
  statusText.textContent = "Mengirim konfirmasi...";
  try{
    await fetch(RSVP_ENDPOINT,{method:"POST",mode:"no-cors",body:data});
    statusText.textContent = "Terima kasih! Konfirmasi Anda sudah dikirim.";
    form.reset();
  }catch(error){
    statusText.textContent = "Pengiriman belum berhasil. Silakan coba kembali.";
  }
});
// OPENING WEDDING INVITATION

// Ganti baris pencarian tombol di bagian atas script.js dengan kode fleksibel ini:
const openEnvelope = document.getElementById("openEnvelope") || document.getElementById("openInvitation");
const openingScreen = document.getElementById("openingScreen");

// OPENING WEDDING INVITATION

openEnvelope.addEventListener("click", async function() {
  
  openingScreen.classList.add("hide");
  
  // PERBAIKAN: Mengubah kata 'active' menjadi 'active-intro' agar cocok dengan CSS index.html
  document.querySelectorAll('.animate-fade-up-intro').forEach(element => {
    element.classList.add('active-intro');
  });
  
  document.body.style.overflow = "auto";


    // Memulai musik setelah interaksi pengunjung
    try {
        await audio.play();

        isPlaying = true;

        musicToggle.innerHTML = "♫ <span>Jeda musik</span>";

    } catch (error) {
        console.log("Musik belum dapat diputar.");
    }

    setTimeout(function() {

        openingScreen.style.display = "none";

        document.getElementById("home")
            .scrollIntoView({ behavior: "smooth" });

    }, 1000);

});
// SCROLL REVEAL ANIMATION

const revealSections = document.querySelectorAll(
    ".intro, .countdown, .events, .gallery, .rsvp, .closing"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealSections.forEach((section) => {
    revealObserver.observe(section);
});
// GALLERY LIGHTBOX

const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.querySelector(".close-lightbox");

galleryImages.forEach((img) => {

    img.addEventListener("click", () => {

        lightboxImage.src = img.src;
        lightbox.classList.add("active");

    });

});

closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        lightbox.classList.remove("active");
    }

});
function doPost(e) {
  // PERBAIKAN: Tambahkan getActiveSpreadsheet()
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVP");
  
  // Memeriksa jika sheet masih kosong untuk menulis header
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Waktu Kirim",
      "Nama",
      "Jumlah Tamu",
      "Kehadiran",
      "Ucapan"
    ]);
  }
  
  const data = JSON.parse(e.postData.contents);
  
  // Memasukkan data dari form/request ke baris baru
  sheet.appendRow([
    new Date(),
    data.name,
    data.guests,
    data.attendance,
    data.message
  ]);
  
  return ContentService.createTextOutput("Berhasil");
}// Tambahkan kode ini di bagian paling bawah editor Apps Script Anda
function doGet() {
  return ContentService.createTextOutput("Web App RSVP Aktif. Silakan kirim data melalui form undangan.");
}
// Fungsi untuk mengambil nama tamu dari URL
function getGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to'); // Mengambil parameter '?to='

  if (guestName) {
    // Mengganti teks 'Bapak/Ibu/Saudara/i' dengan nama tamu dari link
    const guestElement = document.getElementById('guestName');
    if (guestElement) {
      guestElement.textContent = guestName;
    }
  }
}

// Jalankan fungsi saat halaman web dimuat
window.addEventListener('DOMContentLoaded', getGuestName);
// Mengambil parameter 'to' dari URL link
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('to');

// Jika ada parameter nama di link, ganti tulisan "Bapak/Ibu/Saudara/i" menjadi nama tamu
if (nama) {
    const elemenNama = document.getElementById('guestName');
    if (elemenNama) {
        // Mengubah tanda "+" menjadi spasi agar rapi
        elemenNama.innerText = nama.replace(/\+/g, ' '); 
    }
}



