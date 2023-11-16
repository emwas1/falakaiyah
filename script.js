//Berikut fungsi-fungsi rutin 
//============================//
//Fungsi ini digunakan untuk menghitung Julian Day dari sebuah tanggal dan waktu dalam format Tanggal, Bulan, Tahun, Jam Desimal, dan Timezone. 
//Fungsi ini menerima 5 parameter, yaitu Tanggal (TglM), Bulan (BlnM), Tahun (ThnM), Jam Desimal (JamDes), dan Timezone (TimeZone).
//Fungsi ini berguna untuk menghitung Julian Day dari sebuah tanggal dan waktu dalam aplikasi astronomi atau astrologi. 
//Julian Day adalah sistem penanggalan yang digunakan oleh para ahli astronomi untuk menyederhanakan perhitungan tanggal dan waktu 
//dalam observasi astronomi.

function KMJD(TglM, BlnM, ThnM, JamDes = 0, TimeZone = 0) {
  // Deklarasi Variabel dan Tipe Variabel
  let DDUT, MM, YM, a, b, JD;
  // Proses Perhitungan
  // Tanggal dan Jam Desimal Lokal ke Tanggal Desimal UT
  DDUT = TglM + ((JamDes - TimeZone) / 24);
  // Penyesuaian Bulan dan Tahun untuk memudahkan perhitungan
  if (BlnM > 2) {
    MM = BlnM; YM = ThnM;
  } else {
    MM = BlnM + 12; YM = ThnM - 1;
  }
  // Koreksi Paus Gregorius berlaku sejak tanggal 15 Oktober 1582 M
  if ((ThnM + BlnM / 100 + TglM / 10000) >= 1582.1015) {
    a = Math.floor(YM / 100); b = 2 - a + Math.floor(a / 4);
  } else {
    a = 0; b = 0;
  }
  // Perhitungan Julian Day tahap akhir
  JD = Math.floor(365.25 * (YM + 4716)) + Math.floor(30.6001 * (MM + 1)) + DDUT + b - 1524.5;
  // Hasil Perhitungan
  return JD;
}


//Ini adalah sebuah fungsi bernama JDKM yang digunakan untuk mengonversi tanggal Julian menjadi tanggal Gregorian (Kalender Barat). 
//Fungsi ini mengambil tiga argumen: tanggal Julian (JD), zona waktu (TimeZone) dan opsi hasil (OptResult).
//Fungsi ini melakukan beberapa perhitungan matematika untuk mengonversi tanggal Julian menjadi tanggal Gregorian. 
//fungsi akan mengembalikan hasil dalam bentuk format tertentu, seperti nama hari, pasaran, tanggal, bulan, tahun, dan sebagainya,
//tergantung pada opsi hasil yang diberikan. Ada juga beberapa variabel yang digunakan dalam perhitungan, seperti CJD, Z, F, JamDes, 
//Alpha, a, b, c, D, E, TglM, BlnM, ThnM, ThnMAYNS, ThnMHYNS, NmBlnMDt, NmBlnM, NoHrM, NmHrMDt, NmPsMDt, NmHrM, NmPsM, dan Hasil.

function JDKM(JD, TimeZone = 0, OptResult = '') {
  // Declare variables and their types
  let CJD = 0;
  let Z = 0;
  let F = 0;
  let JamDes = 0;
  let Alpha = 0;
  let a = 0;
  let b = 0;
  let c = 0;
  let D = 0;
  let E = 0;
  let TglM = 0;
  let BlnM = 0;
  let ThnM = 0;
  let ThnMAYNS = '';
  let ThnMHYNS = '';
 // let NmBlnMDt = [];
 //let NmBlnM = '';
 // let NoHrM = 0;
 // let NmHrMDt = [];
 // let NmHrM = '';
//  let NoPsM = 0;
 // let NmPsMDt = [];
 //let NmPsM = '';
 // let Result = '';

  // Calculations
  // Convert to Chronological Julian Day, Chronological Julian Day Number,
  // Fractional Part of the Day, and Decimal Time
  CJD = JD + 0.5 + (TimeZone / 24);
  Z = Math.floor(CJD);
  F = CJD - Z;
  JamDes = F * 24;

  // Correction of Gregorian Pause calculation
  if (Z >= 2298161) {
    Alpha = Math.floor((Z - 1867216.25) / 36524.25);
    a = Z + 1 + Alpha - Math.floor(Alpha / 4);
  } else {
    Alpha = 0;
    a = Z;
  }

  // Core calculation
  b = a + 1524;
  c = Math.floor((b - 122.1) / 365.25);
  D = Math.floor(365.25 * c);
  E = Math.floor((b - D) / 30.6001);

  // Determine the date, month, and year of the Gregorian calendar
  TglM = b - D - Math.floor(30.6001 * E);
  if (E < 14) {
    BlnM = E - 1;
  } else if (E === 14 || E === 15) {
    BlnM = E - 13;
  }
  if (BlnM > 2) {
    ThnM = c - 4716;
  } else if (BlnM === 1 || BlnM === 2) {
    ThnM = c - 4715;
  }

  // ThnMAYNS = Gregorian year with Astronomical Year Numbering System
  // Thnmhyns = Gregorian year with Historical Year Numbering System
  if (ThnM > 0) {
    ThnMHYNS = ThnM + ' M';
    ThnMAYNS = '+' + ThnM;
  } else {
    ThnMHYNS = Math.abs(ThnM) + 1 + ' SM';
    ThnMAYNS = ThnM;
  }

 
  // Penentuan Nama Bulan Miladi
  var NmBlnMDt = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var NmBlnM = NmBlnMDt[BlnM - 1];

  // Penentuan Nama Hari dan Pasaran Berdasarkan Kalender Miladi
  var NoHrM = Z - 7 * Math.floor(Z / 7);
  var NoPsM = Z - 5 * Math.floor(Z / 5);
  var NmHrMDt = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Ahad"];
  var NmPsMDt = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
  var NmHrM = NmHrMDt[NoHrM];
  var NmPsM = NmPsMDt[NoPsM];

  // Penentuan Format Hasil Perhitungan
  var Result;
  switch (OptResult.toUpperCase().replace(/ /g, "")) {
    case "":
      Result = NmHrM + " " + NmPsM + ", " + TglM + " " + NmBlnM + " " + ThnMHYNS;
      break;
    case "JAMDES":
      Result = JamDes;
      break;
    case "PECAHANHARI":
      Result = F;
      break;
    case "TGLM":
    case "TGL":
      Result = TglM;
      break;
    case "BLNM":
    case "BLN":
      Result = BlnM;
      break;
    case "NMBLNM":
      Result = NmBlnM;
      break;
    case "THNM":
    case "THN":
      Result = ThnM;
      break;
    case "THNMAYNS":
      Result = ThnMAYNS;
      break;
    case "THNMHYNS":
      Result = ThnMHYNS;
      break;
    case "HARI":
    case "HR":
      Result = NmHrM;
      break;
    case "PASARAN":
    case "PS":
      Result = NmPsM;
      break;
    case "HARIPASARAN":
      Result = NmHrM + " " + NmPsM;
      break;
      case "TGLBLNTHN":
      Result = TglM + " " + NmBlnM + " " + ThnM;
      break;
    default:
      Result = NmHrM + " " + NmPsM + ", " + TglM + " " + NmBlnM + " " + ThnMHYNS;
  }

  // Hasil Perhitungan
  return Result;
}

// Fungsi Deltat adalah sebuah fungsi JavaScript yang digunakan untuk menghitung nilai Delta T (perbedaan waktu atom dan waktu astronomi)
// berdasarkan Julian Day. Delta T adalah selisih antara waktu atom (waktu yang ditentukan berdasarkan getaran atom) dan waktu astronomi
// (waktu yang ditentukan berdasarkan rotasi Bumi). Fungsi ini memiliki beberapa variabel yang digunakan dalam perhitungan,
// seperti TlM (tahun), JDTlMAw (Julian Day dari awal tahun), JDTlMAk (Julian Day dari akhir tahun), JHrlTlM (jumlah hari dari awal tahun),
// JHrTlM (jumlah hari dalam setahun), dY (tahun desimal), kU, kT (variabel lain yang digunakan dalam perhitungan). 
//Kemudian, fungsi menggunakan serangkaian pernyataan kondisional (if-else) untuk menghitung nilai Delta T berdasarkan tahun desimal.

function Deltat(JD) {
  let TlM = 0;
  let JDTlMAw = 0;
  let JDTlMAk = 0;
  let JHrlTlM = 0;
  let JHrTlM = 0;
  let dY = 0;
  let kU = 0;
  let kT = 0;
  let DltT = 0;
  let sCorr = 0;
  
  TlM = JDKM(JD, 0, "ThnM");
  JDTlMAw = KMJD(1, 1, TlM, 0, 0);
  JDTlMAk = KMJD(31, 12, TlM, 24, 0);
  JHrlTlM = JD - JDTlMAw;
  JHrTlM = JDTlMAk - JDTlMAw;
  dY = TlM + JHrlTlM / JHrTlM;
  
  if (dY <= -500) {
    kU = (dY - 1820) / 100;
    DltT = -20 + 32 * kU * kU;
  } else if (dY > -500 && dY <= 500){
    kU = dY / 100;
    DltT = 10583.6 - 1014.41 * kU + 33.78311 * kU * kU - 5.952053 * kU * kU * kU - 0.1798452 * kU * kU * kU * kU + 0.022174192 * Math.pow(kU, 5) + 0.0090316521 * Math.pow(kU, 6);
  } else if (dY > 500 && dY <= 1600){
    kU = (dY - 1000) / 100;
    DltT = 1574.2 - 556.01 * kU + 71.23472 * kU * kU + 0.319781 * kU * kU * kU - 0.8503463 * kU * kU * kU * kU - 0.005050998 * Math.pow(kU, 5) + 0.0083572073 * Math.pow(kU, 6);
  } else if (dY > 1600 && dY <= 1700){
    kT = dY - 1600;
    DltT = 120 - 0.9808 * kT - 0.01532 * kT * kT + kT * kT * kT / 7129;
  } else if (dY > 1700 && dY <= 1800){
    kT = dY - 1700;
    DltT = 8.83 + 0.1603 * kT - 0.0059285 * kT * kT + 0.00013336 * Math.pow(kT, 3) - Math.pow(kT, 4) / 1174000;
  } else if (dY > 1800 && dY <= 1860) {
    kT = dY - 1800;
    DltT = 13.72 - 0.332447 * kT + 0.0068612 * kT * kT + 0.0041116 * kT * kT * kT - 0.00037436 * kT * kT * kT * kT + 0.0000121272 * kT * kT * kT * kT * kT - 0.0000001699 * kT * kT * kT * kT * kT * kT + 0.000000000875 * kT * kT * kT * kT * kT * kT * kT;

  } else if (dY > 1860 && dY <= 1900) {
    kT = dY - 1860;
    DltT = 7.62 + 0.5737 * kT - 0.251754 * kT * kT + 0.01680668 * kT * kT * kT - 0.0004473624 * kT * kT * kT * kT + kT * kT * kT * kT * kT / 233174;
  } else if (dY > 1900 && dY <= 1920) {
    kT = dY - 1900;
    DltT = -2.79 + 1.494119 * kT - 0.0598939 * kT * kT + 0.0061966 * kT * kT * kT - 0.000197 * kT * kT * kT * kT;
  } else if (dY > 1920 && dY <= 1941) {
    kT = dY - 1920;
    DltT = 21.2 + 0.84493 * kT - 0.0761 * kT * kT + 0.0020936 * kT * kT * kT;
  } else if (dY > 1941 && dY <= 1961) {
    kT = dY - 1950;
    DltT = 29.07 + 0.407 * kT - kT * kT / 233 + kT * kT * kT / 2547;
  } else if (dY > 1961 && dY <= 1986) {
    kT = dY - 1975;
    DltT = 45.45 + 1.067 * kT - kT * kT / 260 - kT * kT * kT / 718;
  } else if (dY > 1986 && dY <= 2005) {
    kT = dY - 2000;
   
        DltT = 63.86 + 0.3345 * kT - 0.060374 * kT * kT  + 0.0017275 * kT * kT * kT  + 0.000651814 * kT * kT * kT * kT  + 0.00002373599 * kT * kT * kT * kT * kT ;
    } else if (dY > 2005 && dY <= 2050){
        kT = dY - 2000;
        DltT = 62.92 + 0.32217 * kT + 0.005589 * kT * kT ;
    } else if (dY > 2050 && dY <= 2150){
        DltT = -20 + 32 * ((dY - 1820) / 100) * ((dY - 1820) / 100) - 0.5628 * (2150 - dY);
    } else if (dY > 2150) {
        kU = (dY - 1820) / 100;
        DltT = -20 + 32 * kU * kU;
    }
    if (dY < 1955 || dY > 2005) {
    sCorr = -0.000012932 * Math.pow(dY - 1955, 2);
    DltT += sCorr;
  } else {
    sCorr = 0;
    DltT = DltT;
  }
  return DltT;
}


// fungsi Deg to Rad, rad to deg deci to DDMS modFDiv

 // Fungsi untuk mengubah radian ke derajat
      function radToDeg(rad) {
        return rad * (180 / Math.PI);
      }

      // Fungsi untuk mengubah derajat ke radian
      function degToRad(deg) {
        return deg * (Math.PI / 180);
      }
      
	// DDDMS adalah sebuah fungsi JavaScript untuk mengkonversi  dari format desimal menjadi format derajat-menit-detik (DMS). 
  //Fungsi ini menerima dua parameter, yaitu koordinat desimal yang akan dikonversi dan opsi hasil yang dapat ditentukan oleh pengguna.
  //Fungsi ini menghitung derajat, menit, dan detik dari koordinat desimal, kemudian mengembalikan hasil dalam format DMS 
  //dengan simbol derajat, menit, dan detik. Fungsi ini juga mendukung opsi hasil, yaitu "L" untuk menambahkan penanda arah utara/selatan, 
  //atau "B" untuk menambahkan penanda arah timur/barat pada hasil konversi.

function DDDMS(decimals, OptResult="") {
  var Result="";
  let decimal = Math.abs(decimals);
  var degrees = Math.floor(decimal);
  var minutes = Math.floor((decimal - degrees) * 60);
  var seconds = (((decimal - degrees) * 60 - minutes) * 60).toFixed(3);

switch (OptResult.replace(/\s/g, "").toUpperCase()) {
  case "":
    Result = (decimals >= 0 ? degrees : "- " + degrees) + "° " + 
    (minutes < 10 ? "0" + minutes : minutes) + "' " + 
    (seconds < 10 ? "0" + seconds : seconds) + "''";
    break; // tambahkan break di sini

  case "L":
    if (decimals < 0) {
      Result = degrees + "° " + 
        (minutes < 10 ? "0" + minutes : minutes) + "' " + 
        (seconds < 10 ? "0" + seconds : seconds) + "''" + " LS";
    } else {
      Result = degrees + "° " + 
        (minutes < 10 ? "0" + minutes : minutes) + "' " + 
        (seconds < 10 ? "0" + seconds : seconds) + "''" + " LU";
    }
    break;

  case "B":
    if (decimals < 0) {
      Result = degrees + "° " + 
        (minutes < 10 ? "0" + minutes : minutes) + "' " + 
        (seconds < 10 ? "0" + seconds : seconds) + "''" + " BB";
    } else {
      Result = degrees + "° " + 
        (minutes < 10 ? "0" + minutes : minutes) + "' " + 
        (seconds < 10 ? "0" + seconds : seconds) + "''" + " BT";
    }
    break;

  default:
    Result = (decimals >= 0 ? degrees : "- " + degrees) + "° " + 
    (minutes < 10 ? "0" + minutes : minutes) + "' " + 
    (seconds < 10 ? "0" + seconds : seconds) + "''";
    break;
}
return Result;
}

//DHHMS ini digunakan untuk mengonversi waktu dalam bentuk desimal jam menjadi format jam:menit:detik atau durasi waktu.

function DHHMS(decimalHourss, OptResult="") {
	var Result;
  var decimalHours =Math.abs(decimalHourss);
  var hours = Math.floor(decimalHours);
  var minutes = Math.floor((decimalHours - hours) * 60);
  var seconds = (((decimalHours - hours) * 60) - minutes) * 60;

  var formattedHours = hours.toString().padStart(2, '0');
  var formattedMinutes = minutes.toString().padStart(2, '0');
  var formattedSeconds = seconds.toFixed(3).toString().padStart(6, '0');
  var tanda ="";
  if (Math.sign(decimalHourss)== -1){
    tanda = "- ";
    tanda2 = "kurang ";
  };
	switch (OptResult.replace(/\s/g, "").toUpperCase()) {
	case "":
    Result = tanda + formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
	break;
	case "DURASI":
    Result = tanda + formattedHours + ' jam ' + formattedMinutes + ' menit ' + formattedSeconds + " detik";
    break;
    default:
    Result = tanda + formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
	break;

	}
  return Result;
}

   
// fungsi untuk pembagian modulo (sisa bagi)
function ModFDiv(dividend, divisor) {
  return dividend - divisor * Math.floor(dividend / divisor);
}
      
// Fungsi "azimuthWithCosine" digunakan untuk menghitung arah sudut antara dua titik koordinat pada permukaan bumi menggunakan rumus kosinus.
//Fungsi ini membutuhkan empat parameter, yaitu lat1 (garis lintang titik awal), long1 (garis bujur titik awal), lat2 (garis lintang titik akhir),
//dan long2 (garis bujur titik akhir).
//Pertama, fungsi ini menghitung selisih bujur antara titik awal dan titik akhir. Selisih ini kemudian diubah ke dalam rentang 0-360 derajat 
//dengan menggunakan fungsi ModFDiv.
//Kemudian, semua parameter diubah dari satuan derajat menjadi satuan radian menggunakan fungsi degToRad. 
//Selanjutnya, jarak antara kedua titik koordinat dihitung menggunakan rumus kosinus.
//Setelah itu, fungsi ini menghitung arah sudut antara dua titik koordinat menggunakan rumus kosinus dan tangen. Hasilnya 
//kemudian dikonversi ke dalam satuan derajat menggunakan fungsi radToDeg.
//Jika selisih bujur lebih besar dari 180 derajat, maka hasil arah sudut akan dikoreksi dengan menguranginya dari 360 derajat.
//Akhirnya, fungsi ini mengembalikan nilai arah sudut dalam satuan derajat.

        function azimuthWithCosine(lat1, long1, lat2, long2) {
        var selisihLong = (long1 + 180) - (long2 + 180);
        
       selisihLong = ModFDiv(selisihLong , 360);
	  /selisihLong = degToRad(selisihLong);/
        lat1 = degToRad(lat1);
        long1 = degToRad(long1);
        lat2 = degToRad(lat2);
        long2 = degToRad(long2);
        var jarak = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(degToRad(selisihLong)));
        var azimuthWithCos = Math.acos(-Math.tan(lat2) / Math.tan(jarak) + Math.sin(lat1) / Math.cos(lat2) / Math.sin(jarak));
	  azimuthWithCos = radToDeg(azimuthWithCos)
        if (selisihLong > 180) {
          azimuthWithCos = 360 - azimuthWithCos;
        }
        return azimuthWithCos;
      }



      // data matahari

      function NutationInLongitude(JD) {
  let T = (JD - 2451545) / 36525;
  let D = 297.85036 + 445267.11148 * T - 0.0019142 * Math.pow(T, 2) + Math.pow(T, 3) / 189474;
  let M = 357.52772 + 35999.05034 * T - 0.0001603 * Math.pow(T, 2) - Math.pow(T, 3) / 300000;
  let M_ = 134.96298 + 477198.867398 * T + 0.0086972 * Math.pow(T, 2) + T * 3 / 56250;
  let F = 93.27191 + 483202.017538 * T - 0.0036825 * Math.pow(T, 2) + Math.pow(T, 3) / 327270;
  let Omg = 125.04452 - 1934.136261 * T + 0.0020708 * Math.pow(T, 2) + Math.pow(T, 3) / 450000;
    D = degToRad(ModFDiv(D, 360));
    M = degToRad(ModFDiv(M, 360));
    M_ = degToRad(ModFDiv( M_, 360));
    F = degToRad(ModFDiv(F, 360));
    Omg = degToRad(ModFDiv(Omg, 360));
    let DltPsi = 0;
    DltPsi += (-171996 + -174.2 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-13187 + -1.6 * T) * Math.sin(-2 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-2274 + -0.2 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (2062 + 0.2 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 0 * F + 2 * Omg);;
    DltPsi += (1426 + -3.4 * T) * Math.sin(0 * D + 1 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (712 + 0.1 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-517 + 1.2 * T) * Math.sin(-2 * D + 1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-386 + -0.4 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-301 + 0 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (217 + -0.5 * T) * Math.sin(-2 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-158 + 0 * T) * Math.sin(-2 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (129 + 0.1 * T) * Math.sin(-2 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (123 + 0 * T) * Math.sin(0 * D + 0 * M + -1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (63 + 0 * T) * Math.sin(2 * D + 0 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (63 + 0.1 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-59 + 0 * T) * Math.sin(2 * D + 0 * M + -1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-58 + -0.1 * T) * Math.sin(0 * D + 0 * M + -1 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-51 + 0 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (48 + 0 * T) * Math.sin(-2 * D + 0 * M + 2 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (46 + 0 * T) * Math.sin(0 * D + 0 * M + -2 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-38 + 0 * T) * Math.sin(2 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-31 + 0 * T) * Math.sin(0 * D + 0 * M + 2 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (29 + 0 * T) * Math.sin(0 * D + 0 * M + 2 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (29 + 0 * T) * Math.sin(-2 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (26 + 0 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 2 * F + 0 * Omg);;
    DltPsi += (-22 + 0 * T) * Math.sin(-2 * D + 0 * M + 0 *  M_ + 2 * F + 0 * Omg);;
    DltPsi += (21 + 0 * T) * Math.sin(0 * D + 0 * M + -1 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (17 + -0.1 * T) * Math.sin(0 * D + 2 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (16 + 0 * T) * Math.sin(2 * D + 0 * M + -1 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-16 + 0.1 * T) * Math.sin(-2 * D + 2 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-15 + 0 * T) * Math.sin(0 * D + 1 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-13 + 0 * T) * Math.sin(-2 * D + 0 * M + 1 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-12 + 0 * T) * Math.sin(0 * D + -1 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (11 + 0 * T) * Math.sin(0 * D + 0 * M + 2 *  M_ + -2 * F + 0 * Omg);;
    DltPsi += (-10 + 0 * T) * Math.sin(2 * D + 0 * M + -1 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-8 + 0 * T) * Math.sin(2 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (7 + 0 * T) * Math.sin(0 * D + 1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-7 + 0 * T) * Math.sin(-2 * D + 1 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-7 + 0 * T) * Math.sin(0 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-7 + 0 * T) * Math.sin(2 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (6 + 0 * T) * Math.sin(2 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (6 + 0 * T) * Math.sin(-2 * D + 0 * M + 2 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (6 + 0 * T) * Math.sin(-2 * D + 0 * M + 1 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-6 + 0 * T) * Math.sin(2 * D + 0 * M + -2 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-6 + 0 * T) * Math.sin(2 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (5 + 0 * T) * Math.sin(0 * D + -1 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-5 + 0 * T) * Math.sin(-2 * D + -1 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-5 + 0 * T) * Math.sin(-2 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-5 + 0 * T) * Math.sin(0 * D + 0 * M + 2 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (4 + 0 * T) * Math.sin(-2 * D + 0 * M + 2 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (4 + 0 * T) * Math.sin(-2 * D + 1 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (4 + 0 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + -2 * F + 0 * Omg);;
    DltPsi += (-4 + 0 * T) * Math.sin(-1 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-4 + 0 * T) * Math.sin(-2 * D + 1 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-4 + 0 * T) * Math.sin(1 * D + 0 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (3 + 0 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 2 * F + 0 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(0 * D + 0 * M + -2 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(-1 * D + -1 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(0 * D + 1 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(0 * D + -1 * M + 1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(2 * D + -1 * M + -1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(0 * D + 0 * M + 3 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(2 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi /= 36000000;
  return DltPsi;
}
//
function NutationInObliquity(JD) {
  let T = (JD - 2451545) / 36525;
  let D = 297.85036 + 445267.11148 * T - 0.0019142 * Math.pow(T, 2) + Math.pow(T, 3) / 189474;
  let M = 357.52772 + 35999.05034 * T - 0.0001603 * Math.pow(T, 2) - Math.pow(T, 3) / 300000;
  let M_ = 134.96298 + 477198.867398 * T + 0.0086972 * Math.pow(T, 2) + T * 3 / 56250;
  let F = 93.27191 + 483202.017538 * T - 0.0036825 * Math.pow(T, 2) + Math.pow(T, 3) / 327270;
  let Omg = 125.04452 - 1934.136261 * T + 0.0020708 * Math.pow(T, 2) + Math.pow(T, 3) / 450000;
    D = degToRad(ModFDiv(D, 360));
    M = degToRad(ModFDiv(M, 360));
    M_ = degToRad(ModFDiv( M_, 360));
    F = degToRad(ModFDiv(F, 360));
    Omg = degToRad(ModFDiv(Omg, 360));

     let   DltEps = 0;
    DltEps += (92025 + 8.9 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (5736 + -3.1 * T) * Math.cos(-2 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (977 + -0.5 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (-895 + 0.5 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 0 * F + 2 * Omg);
    DltEps += (54 + -0.1 * T) * Math.cos(0 * D + 1 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-7 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (224 + -0.6 * T) * Math.cos(-2 * D + 1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (200 + 0 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (129 + -0.1 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (-95 + 0.3 * T) * Math.cos(-2 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-70 + 0 * T) * Math.cos(-2 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (-53 + 0 * T) * Math.cos(0 * D + 0 * M + -1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(2 * D + 0 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-33 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 0 * F + 1 * Omg);
    DltEps += (26 + 0 * T) * Math.cos(2 * D + 0 * M + -1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (32 + 0 * T) * Math.cos(0 * D + 0 * M + -1 *  M_ + 0 * F + 1 * Omg);
    DltEps += (27 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 0 * M + 2 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-24 + 0 * T) * Math.cos(0 * D + 0 * M + -2 *  M_ + 2 * F + 1 * Omg);
    DltEps += (16 + 0 * T) * Math.cos(2 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (13 + 0 * T) * Math.cos(0 * D + 0 * M + 2 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 2 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-12 + 0 * T) * Math.cos(-2 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 2 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 0 * M + 0 *  M_ + 2 * F + 0 * Omg);
    DltEps += (-10 + 0 * T) * Math.cos(0 * D + 0 * M + -1 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 2 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-8 + 0 * T) * Math.cos(2 * D + 0 * M + -1 *  M_ + 0 * F + 1 * Omg);
    DltEps += (7 + 0 * T) * Math.cos(-2 * D + 2 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (9 + 0 * T) * Math.cos(0 * D + 1 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (7 + 0 * T) * Math.cos(-2 * D + 0 * M + 1 *  M_ + 0 * F + 1 * Omg);
    DltEps += (6 + 0 * T) * Math.cos(0 * D + -1 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 2 *  M_ + -2 * F + 0 * Omg);
    DltEps += (5 + 0 * T) * Math.cos(2 * D + 0 * M + -1 *  M_ + 2 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(2 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (-3 + 0 * T) * Math.cos(0 * D + 1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 1 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(0 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(2 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(2 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-3 + 0 * T) * Math.cos(-2 * D + 0 * M + 2 *  M_ + 2 * F + 2 * Omg);
    DltEps += (-3 + 0 * T) * Math.cos(-2 * D + 0 * M + 1 *  M_ + 2 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(2 * D + 0 * M + -2 *  M_ + 0 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(2 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + -1 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(-2 * D + -1 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(-2 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(0 * D + 0 * M + 2 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 0 * M + 2 *  M_ + 0 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 1 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + -2 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-1 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 1 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(1 * D + 0 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 2 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + -2 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-1 * D + -1 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 1 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + -1 * M + 1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(2 * D + -1 * M + -1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 3 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(2 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps /= 36000000
    return DltEps;
}
//
function MeanObliquityOfEcliptic(JD) {
  let T = (JD - 2451545) / 36525;
  let U = T / 100;
  let Eps0 = (23 + 26 / 60 + 21.448 / 3600) + (-4680.93 * U
                                            - 1.55 * Math.pow(U, 2)
                                            + 1999.25 * Math.pow(U, 3)
                                            - 51.38 * Math.pow(U, 4)
                                            - 249.67 * Math.pow(U, 5)
                                            - 39.05 * Math.pow(U, 6)
                                            + 7.12 * Math.pow(U, 7)
                                            + 27.87 * Math.pow(U, 8)
                                            + 5.79 * Math.pow(U, 9)
                                            + 2.45 * Math.pow(U, 10)) / 3600;

  return Eps0;
}

//
function ObliquityOfEcliptic(JD) {
  var Eps0 = MeanObliquityOfEcliptic(JD);
  var DltEps = NutationInObliquity(JD);
  var Eps = Eps0 + DltEps;
  return Eps;
}

function EarthHeliocentricLongitude(JD) {
  let Tau = (JD - 2451545) / 365250;
  let L0 = 0;
  L0 += 175347046 * Math.cos(0 + 0 * Tau);
  L0 += 3341656 * Math.cos(4.6692568 + 6283.07585 * Tau);
  L0 += 34894 * Math.cos(4.6261 + 12566.1517 * Tau);
  L0 += 3497 * Math.cos(2.7441 + 5753.3849 * Tau);
  L0 += 3418 * Math.cos(2.8289 + 3.5231 * Tau);
  L0 += 3136 * Math.cos(3.6277 + 77713.7715 * Tau);
  L0 += 2676 * Math.cos(4.4181 + 7860.4194 * Tau);
  L0 += 2343 * Math.cos(6.1352 + 3930.2097 * Tau);
  L0 += 1324 * Math.cos(0.7425 + 11506.7698 * Tau);
  L0 += 1273 * Math.cos(2.0371 + 529.691 * Tau);
  L0 += 1199 * Math.cos(1.1096 + 1577.3435 * Tau);
  L0 += 990 * Math.cos(5.233 + 5884.927 * Tau);
  L0 += 902 * Math.cos(2.045 + 26.298 * Tau);
  L0 += 857 * Math.cos(3.508 + 398.149 * Tau);
  L0 += 780 * Math.cos(1.179 + 5223.694 * Tau);
  L0 += 753 * Math.cos(2.533 + 5507.553 * Tau);
    L0 += 505 * Math.cos(4.583 + 18849.228 * Tau);
    L0 += 492 * Math.cos(4.205 + 775.523 * Tau);
    L0 += 357 * Math.cos(2.92 + 0.067 * Tau);
    L0 += 317 * Math.cos(5.849 + 11790.629 * Tau);
    L0 += 284 * Math.cos(1.899 + 796.298 * Tau);
    L0 += 271 * Math.cos(0.315 + 10977.079 * Tau);
    L0 += 243 * Math.cos(0.345 + 5486.778 * Tau);
    L0 += 206 * Math.cos(4.806 + 2544.314 * Tau);
    L0 += 205 * Math.cos(1.869 + 5573.143 * Tau);
    L0 += 202 * Math.cos(2.458 + 6069.777 * Tau);
    L0 += 156 * Math.cos(0.833 + 213.299 * Tau);
    L0 += 132 * Math.cos(3.411 + 2942.463 * Tau);
    L0 += 126 * Math.cos(1.083 + 20.775 * Tau);
    L0 += 115 * Math.cos(0.645 + 0.98 * Tau);
    L0 += 103 * Math.cos(0.636 + 4694.003 * Tau);
    L0 += 102 * Math.cos(0.976 + 15720.839 * Tau);
    L0 += 102 * Math.cos(4.267 + 7.114 * Tau);
    L0 += 99 * Math.cos(6.21 + 2146.17 * Tau);
    L0 += 98 * Math.cos(0.68 + 155.42 * Tau);
    L0 += 86 * Math.cos(5.98 + 161000.69 * Tau);
    L0 += 85 * Math.cos(1.3 + 6275.96 * Tau);
    L0 += 85 * Math.cos(3.67 + 71430.7 * Tau);
    L0 += 80 * Math.cos(1.81 + 17260.15 * Tau);
    L0 += 79 * Math.cos(3.04 + 12036.46 * Tau);
    L0 += 75 * Math.cos(1.76 + 5088.63 * Tau);
    L0 += 74 * Math.cos(3.5 + 3154.69 * Tau);
    L0 += 74 * Math.cos(4.68 + 801.82 * Tau);
    L0 += 70 * Math.cos(0.83 + 9437.76 * Tau);
    L0 += 62 * Math.cos(3.98 + 8827.39 * Tau);
    L0 += 61 * Math.cos(1.82 + 7084.9 * Tau);
    L0 += 57 * Math.cos(2.78 + 6286.6 * Tau);
    L0 += 56 * Math.cos(4.39 + 14143.5 * Tau);
    L0 += 56 * Math.cos(3.47 + 6279.55 * Tau);
    L0 += 52 * Math.cos(0.19 + 12139.55 * Tau);
    L0 += 52 * Math.cos(1.33 + 1748.02 * Tau);
    L0 += 51 * Math.cos(0.28 + 5856.48 * Tau);
    L0 += 49 * Math.cos(0.49 + 1194.45 * Tau);
    L0 += 41 * Math.cos(5.37 + 8429.24 * Tau);
    L0 += 41 * Math.cos(2.4 + 19651.05 * Tau);
    L0 += 39 * Math.cos(6.17 + 10447.39 * Tau);
    L0 += 37 * Math.cos(6.04 + 10213.29 * Tau);
    L0 += 37 * Math.cos(2.57 + 1059.38 * Tau);
    L0 += 36 * Math.cos(1.71 + 2352.87 * Tau);
    L0 += 36 * Math.cos(1.78 + 6812.77 * Tau);
    L0 += 33 * Math.cos(0.59 + 17789.85 * Tau);
    L0 += 30 * Math.cos(0.44 + 83996.85 * Tau);
    L0 += 30 * Math.cos(2.74 + 1349.87 * Tau);
    L0 += 25 * Math.cos(3.16 + 4690.48 * Tau);
    //'**
    let L1 = 0;
    L1 += 628331966747 * Math.cos(0 + 0 * Tau);
    L1 += 206059 * Math.cos(2.678235 + 6283.07585 * Tau);
    L1 += 4303 * Math.cos(2.6351 + 12566.1517 * Tau);
    L1 += 425 * Math.cos(1.59 + 3.523 * Tau);
    L1 += 119 * Math.cos(5.796 + 26.298 * Tau);
    L1 += 109 * Math.cos(2.966 + 1577.344 * Tau);
    L1 += 93 * Math.cos(2.59 + 18849.23 * Tau);
    L1 += 72 * Math.cos(1.14 + 529.69 * Tau);
    L1 += 68 * Math.cos(1.87 + 398.15 * Tau);
    L1 += 67 * Math.cos(4.41 + 5507.55 * Tau);
    L1 += 59 * Math.cos(2.89 + 5223.69 * Tau);
    L1 += 56 * Math.cos(2.17 + 155.42 * Tau);
    L1 += 45 * Math.cos(0.4 + 796.3 * Tau);
    L1 += 36 * Math.cos(0.47 + 775.52 * Tau);
    L1 += 29 * Math.cos(2.65 + 7.11 * Tau);
    L1 += 21 * Math.cos(5.34 + 0.98 * Tau);
    L1 += 19 * Math.cos(1.85 + 5486.78 * Tau);
    L1 += 19 * Math.cos(4.97 + 213.3 * Tau);
    L1 += 17 * Math.cos(2.99 + 6275.96 * Tau);
    L1 += 16 * Math.cos(0.03 + 2544.31 * Tau);
    L1 += 16 * Math.cos(1.43 + 2146.17 * Tau);
    L1 += 15 * Math.cos(1.21 + 10977.08 * Tau);
    L1 += 12 * Math.cos(2.83 + 1748.02 * Tau);
    L1 += 12 * Math.cos(3.26 + 5088.63 * Tau);
    L1 += 12 * Math.cos(5.27 + 1194.45 * Tau);
    L1 += 12 * Math.cos(2.08 + 4694 * Tau);
    L1 += 11 * Math.cos(0.77 + 553.57 * Tau);
    L1 += 10 * Math.cos(1.3 + 6286.6 * Tau);
    L1 += 10 * Math.cos(4.24 + 1349.87 * Tau);
    L1 += 9 * Math.cos(2.7 + 242.73 * Tau);
    L1 += 9 * Math.cos(5.64 + 951.72 * Tau);
    L1 += 8 * Math.cos(5.3 + 2352.87 * Tau);
    L1 += 6 * Math.cos(2.65 + 9437.76 * Tau);
    L1 += 6 * Math.cos(4.67 + 4690.48 * Tau);
    //'**
    let L2 = 0;
    L2 += 52919 * Math.cos(0 + 0 * Tau);
    L2 += 8720 * Math.cos(1.0721 + 6283.0758 * Tau);
    L2 += 309 * Math.cos(0.867 + 12566.152 * Tau);
    L2 += 27 * Math.cos(0.05 + 3.52 * Tau);
    L2 += 16 * Math.cos(5.19 + 26.3 * Tau);
    L2 += 16 * Math.cos(3.68 + 155.42 * Tau);
    L2 += 10 * Math.cos(0.76 + 18849.23 * Tau);
    L2 += 9 * Math.cos(2.06 + 77713.77 * Tau);
    L2 += 7 * Math.cos(0.83 + 775.52 * Tau);
    L2 += 5 * Math.cos(4.66 + 1577.34 * Tau);
    L2 += 4 * Math.cos(1.03 + 7.11 * Tau);
    L2 += 4 * Math.cos(3.44 + 5573.14 * Tau);
    L2 += 3 * Math.cos(5.14 + 796.3 * Tau);
    L2 += 3 * Math.cos(6.05 + 5507.55 * Tau);
    L2 += 3 * Math.cos(1.19 + 242.73 * Tau);
    L2 += 3 * Math.cos(6.12 + 529.69 * Tau);
    L2 += 3 * Math.cos(0.31 + 398.15 * Tau);
    L2 += 3 * Math.cos(2.28 + 553.57 * Tau);
    L2 += 2 * Math.cos(4.38 + 5223.69 * Tau);
    L2 += 2 * Math.cos(3.75 + 0.98 * Tau);
    //'**
    let L3 = 0;
    L3 += 289 * Math.cos(5.844 + 6283.076 * Tau);
    L3 += 35 * Math.cos(0 + 0 * Tau);
    L3 += 17 * Math.cos(5.49 + 12566.15 * Tau);
    L3 += 3 * Math.cos(5.2 + 155.42 * Tau);
    L3 += 1 * Math.cos(4.72 + 3.52 * Tau);
    L3 += 1 * Math.cos(5.3 + 18849.23 * Tau);
    L3 += 1 * Math.cos(5.97 + 242.73 * Tau);
    //'**
    L4 = 0;
    L4 += 114 * Math.cos(3.142 + 0 * Tau);
    L4 += 8 * Math.cos(4.13 + 6283.08 * Tau);
    L4 += 1 * Math.cos(3.84 + 12566.15 * Tau);
   // '**
    let L5 = 0;

    L5 += 1 * Math.cos(3.14 + 0 * Tau);
    let l = (L0 + L1 * Tau + L2 * Math.pow(Tau, 2) + L3 * Math.pow(Tau, 3) + L4 * Math.pow(Tau, 4) + L5 * Math.pow(Tau, 5)) / 100000000;
  l = (180 / Math.PI) * l;
  l = ModFDiv(l, 360);
  return l;
}
//
function EarthHeliocentricLatitude(JD) {
  const Tau = (JD - 2451545) / 365250;
  let B0 = 0;
  B0 += 280 * Math.cos(3.199 + 84334.662 * Tau);
  B0 += 102 * Math.cos(5.422 + 5507.553 * Tau);
  B0 += 80 * Math.cos(3.88 + 5223.69 * Tau);
  B0 += 44 * Math.cos(3.7 + 2352.87 * Tau);
  B0 += 32 * Math.cos(4 + 1577.34 * Tau);

  let B1 = 0;
  B1 += 9 * Math.cos(3.9 + 5507.55 * Tau);
  B1 += 6 * Math.cos(1.73 + 5223.69 * Tau);

  let b = (B0 + B1 * Tau) / 100000000;
  b = b * (180 / Math.PI);

  return b;
}
//
function EarthRadiusVector(JD) {
  let Tau = (JD - 2451545) / 365250;
  let R0 = 0;
  R0 += 100013989 * Math.cos(0 + 0 * Tau);
  R0 += 1670700 * Math.cos(3.0984635 + 6283.07585 * Tau);
  R0 += 13956 * Math.cos(3.05525 + 12566.1517 * Tau);
  R0 += 3084 * Math.cos(5.1985 + 77713.7715 * Tau);
  R0 += 1628 * Math.cos(1.1739 + 5753.3849 * Tau);
  R0 += 1576 * Math.cos(2.8469 + 7860.4194 * Tau);
  R0 += 925 * Math.cos(5.453 + 11506.77 * Tau);
  R0 += 542 * Math.cos(4.564 + 3930.21 * Tau);
  R0 += 472 * Math.cos(3.661 + 5884.927 * Tau);
  R0 += 346 * Math.cos(0.964 + 5507.553 * Tau);
  R0 += 329 * Math.cos(5.9 + 5223.694 * Tau);
  R0 += 307 * Math.cos(0.299 + 5573.143 * Tau);
  R0 += 243 * Math.cos(4.273 + 11790.629 * Tau);
  R0 += 212 * Math.cos(5.847 + 1577.344 * Tau);
  R0 += 186 * Math.cos(5.022 + 10977.079 * Tau);
  R0 += 175 * Math.cos(3.012 + 18849.228 * Tau);
  R0 += 110 * Math.cos(5.055 + 5486.778 * Tau);
  R0 += 98 * Math.cos(0.89 + 6069.78 * Tau);
  R0 += 86 * Math.cos(5.69 + 15720.84 * Tau);
  R0 += 86 * Math.cos(1.27 + 161000.69 * Tau);
  R0 += 65 * Math.cos(0.27 + 17260.15 * Tau);
  R0 += 63 * Math.cos(0.92 + 529.69 * Tau);
  R0 += 57 * Math.cos(2.01 + 83996.85 * Tau);
  R0 += 56 * Math.cos(5.24 + 71430.7 * Tau);
  R0 += 49 * Math.cos(3.25 + 2544.31 * Tau);
  R0 += 47 * Math.cos(2.58 + 775.52 * Tau);
  R0 += 45 * Math.cos(5.54 + 9437.76 * Tau);
  R0 += 43 * Math.cos(6.01 + 6275.96 * Tau);
  R0 += 39 * Math.cos(5.36 + 4694 * Tau);
  R0 += 38 * Math.cos(2.39 + 8827.39 * Tau);
  R0 += 37 * Math.cos(0.83 + 19651.05 * Tau);
    R0 += 37 * Math.cos(4.9 + 12139.55 * Tau);
    R0 += 36 * Math.cos(1.67 + 12036.46 * Tau);
    R0 += 35 * Math.cos(1.84 + 2942.46 * Tau);
    R0 += 33 * Math.cos(0.24 + 7084.9 * Tau);
    R0 += 32 * Math.cos(0.18 + 5088.63 * Tau);
    R0 += 32 * Math.cos(1.78 + 398.15 * Tau);
    R0 += 28 * Math.cos(1.21 + 6286.6 * Tau);
    R0 += 28 * Math.cos(1.9 + 6279.55 * Tau);
    R0 += 26 * Math.cos(4.59 + 10447.39 * Tau);
   // '**
    let R1 = 0;
    R1 += 103019 * Math.cos(1.10749 + 6283.07585 * Tau);
    R1 += 1721 * Math.cos(1.0644 + 12566.1517 * Tau);
    R1 += 702 * Math.cos(3.142 + 0 * Tau);
    R1 += 32 * Math.cos(1.02 + 18849.23 * Tau);
    R1 += 31 * Math.cos(2.84 + 5507.55 * Tau);
    R1 += 25 * Math.cos(1.32 + 5223.69 * Tau);
    R1 += 18 * Math.cos(1.42 + 1577.34 * Tau);
    R1 += 10 * Math.cos(5.91 + 10977.08 * Tau);
    R1 += 9 * Math.cos(1.42 + 6275.96 * Tau);
    R1 += 9 * Math.cos(0.27 + 5486.78 * Tau);
    //'**
    let R2 = 0;
    R2 += 4359 * Math.cos(5.7846 + 6283.0758 * Tau);
    R2 += 124 * Math.cos(5.579 + 12566.152 * Tau);
    R2 += 12 * Math.cos(3.14 + 0 * Tau);
    R2 += 9 * Math.cos(3.63 + 77713.77 * Tau);
    R2 += 6 * Math.cos(1.87 + 5573.14 * Tau);
    R2 += 3 * Math.cos(5.47 + 18849.23 * Tau);
   // '**

  let R3 = 145 * Math.cos(4.273 + 6283.076 * Tau); + 7 * Math.cos(3.92 + 12566.15 * Tau);
  let R4 = 4 * Math.cos(2.56 + 6283.08 * Tau);
  let R = (R0 + R1 * Tau + R2 * Math.pow(Tau, 2) + R3 * Math.pow(Tau, 3) + R4 * Math.pow(Tau, 4)) / 100000000;
  return R;
}
//
function SunGeocentricLongitude(JD, OptResult = "") {
let l;
let b;
let Theta;
let Beta;
let T;
let LambdaPrime;
let DeltaTheta;
let ThetaFK5;
let DeltaPsi;
let Abberration;
let Lambda;
let Result;

l = EarthHeliocentricLongitude(JD);
b = EarthHeliocentricLatitude(JD);
Theta = l + 180;
Theta = Theta % 360;
Beta = -b;

T = (JD - 2451545) / 36525;
LambdaPrime = Theta - 1.397 * T - 0.00031 * Math.pow(T, 2);
DeltaTheta = (-0.09033 + 0.03916 * (Math.cos(LambdaPrime * (Math.PI / 180)) + Math.sin(LambdaPrime * (Math.PI / 180))) * Math.tan(Beta * (Math.PI / 180))) / 3600;
ThetaFK5 = Theta + DeltaTheta;

DeltaPsi = NutationInLongitude(JD);
Abberration = (-20.4898 / EarthRadiusVector(JD)) / 3600;
Lambda = ThetaFK5 + DeltaPsi + Abberration;
Lambda = Lambda % 360;

switch (OptResult.toUpperCase().replace(/ /g, "")) {
case "GEOMETRICVSOP87":
case "TRUEVSOP87":
Result = Theta;
break;
case "GEOMETRICFK5SYSTEM":
case "TRUEFK5SYSTEM":
Result = ThetaFK5;
break;
case "APPARENT":
Result = Lambda;
break;
default:
Result = Lambda;
}
return Result;
}
//
function SunGeocentricLatitude(JD, OptResult = "") {
  let l;
  let b;
  let Theta;
  let Beta;
  let T;
  let Lambda;
  let DeltaBeta;
  let BetaFK5;
  let Result;

  l = EarthHeliocentricLongitude(JD);
  b = EarthHeliocentricLatitude(JD);
  Theta = l + 180;
  Theta = ModFDiv(Theta , 360) ;
  Beta = -b;
  T = (JD - 2451545) / 36525;
  Lambda = Theta - 1.397 * T - 0.00031 * Math.pow(T, 2);
  DeltaBeta = (0.03916 * (Math.cos(degToRad(Lambda)) - Math.sin(degToRad(Lambda )))) / 3600;
  BetaFK5 = Beta + DeltaBeta;
  switch (OptResult.toUpperCase().replace(/ /g, "")) {
    case "GEOMETRICVSOP87":
    case "TRUEVSOP87":
      Result = Beta;
      break;
    case "GEOMETRICFK5SYSTEM":
    case "TRUEFK5SYSTEM":
      Result = BetaFK5;
      break;
    case "APPARENT":
      Result = BetaFK5;
      break;
    default:
      Result = BetaFK5;
  }

  return BetaFK5;
}

//
function SunGeocentricDistance(JD, OptResult = "") {
let R;
let Result;
R = EarthRadiusVector(JD);
switch (OptResult.toUpperCase().replace(/ /g, '')) {
case "AU":
Result = R;
break;
case "KM":
Result = R * 149597870.7;
break;
case "ER":
Result = R * 149597870.7 / 6371;
break;
default:
Result = R;
}
return Result;
}
//

function SunApparentRightAscension(JD) {
  let Lambda;
  let Beta;
  let Epsilon;
  let Alpha;
  
  Lambda = SunGeocentricLongitude(JD, "Apparent");
  Beta = SunGeocentricLatitude(JD, "Apparent");
  Epsilon = ObliquityOfEcliptic(JD);
  Alpha = radToDeg(Math.atan2(Math.sin(degToRad(Lambda)) * Math.cos(degToRad(Epsilon)) - Math.tan(degToRad(Beta)) * Math.sin(degToRad(Epsilon)), Math.cos(degToRad(Lambda))));
  Alpha = ModFDiv(Alpha , 360);
  
  return Alpha;
}

//
function SunApparentDeclination(JD) {
  let Lambda = SunGeocentricLongitude(JD, "Apparent");
  let Beta = SunGeocentricLatitude(JD, "Apparent");
  let Epsilon = ObliquityOfEcliptic(JD);
  let Delta = radToDeg(Math.asin(Math.sin(degToRad(Beta)) * Math.cos(degToRad(Epsilon)) + Math.cos(degToRad(Beta)) * Math.sin(degToRad(Epsilon)) * Math.sin(degToRad(Lambda))));
  return Delta;
}
//
function SunEquatorialHorizontalParallax(JD) {
// Deklarasi Variabel dan Tipe Variabel
let R = 0;
let Pi = 0;

// Proses Perhitungan
R = SunGeocentricDistance(JD, "AU");
Pi = (Math.asin(Math.sin(degToRad(8.794 / 3600)) / R) * 180) / Math.PI;

// Hasil Perhitungan
return Pi;
}
//
function SunAngularSemiDiameter(JD) {
  let R = SunGeocentricDistance(JD, "AU");
  let s0 = 15 + 59.63 / 60;
  let s = s0 / R;
  return s / 60;
}
//
function EquationOfTime(JD) {
  let Tau = (JD - 2451545) / 365250;
  let Alpha = SunApparentRightAscension(JD);
  let DeltaPsi = NutationInLongitude(JD);
  let Epsilon = ObliquityOfEcliptic(JD);
  let L0 = 280.4664567 + 360007.6982779 * Tau + 0.03032028 * Tau * Tau + Tau * Tau * Tau / 49931 - Tau * Tau * Tau * Tau / 15300 - Tau * Tau * Tau * Tau * Tau / 2000000;
  L0 = ModFDiv(L0 , 360) ;
  let E = L0 - 0.0057183 - Alpha + DeltaPsi * Math.cos(Epsilon * Math.PI / 180);
  if (Math.abs(E) * 4 < 20) {
    E = E / 15;
  } else if (Math.abs(E) * 4 >= 20 && E > 0) {
    E = E / 15 - 24;
  } else if (Math.abs(E) * 4 >= 20 && E < 0) {
    E = E / 15 + 24;
  } else {
    E = E / 15;
  }
  return E;
}

function Absol(x){
return Math.abs(x);
}

// data bulan

function MoonGeocentricLongitude(JD, OptResult = "") {
  // Declare variables and their types
  let T = (JD - 2451545) / 36525;
  let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T ** 2 + T ** 3 / 538841 - T ** 4 / 65194000;
  let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T ** 2 + T ** 3 / 545868 - T ** 4 / 113065000;
  let M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T ** 2 + T ** 3 / 24490000;
  let M_ = 134.9633964 + 477198.8675055 * T + 0.0087414 * T ** 2 + T ** 3 / 69699 - T ** 4 / 14712000;
  let F = 93.272095 + 483202.0175233 * T - 0.0036539 * T ** 2 - T ** 3 / 3526000 + T ** 4 / 863310000;
  let A1 = 119.75 + 131.849 * T;
  let A2 = 53.09 + 479264.29 * T;
  let A3 = 313.45 + 481266.484 * T;
  let E = 1 - 0.002516 * T - 0.0000074 * T ** 2;
  L = degToRad(ModFDiv(L, 360));
  D = degToRad(ModFDiv(D, 360));
  M = degToRad(ModFDiv(M, 360));
  M_ = degToRad(ModFDiv(M_, 360));
  F = degToRad(ModFDiv(F, 360));
  A1 = degToRad(ModFDiv(A1, 360));
  A2 = degToRad(ModFDiv(A2, 360));
  A3 = degToRad(ModFDiv(A3, 360));
    let lM = 0;
    lM += 6288774 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 1 * M_ + 0 * F);
    lM += 1274027 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -1 * M_ + 0 * F);
    lM += 658314 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 0 * M_ + 0 * F);
    lM += 213618 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 2 * M_ + 0 * F);
    lM += -185116 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + 0 * M_ + 0 * F);
    lM += -114332 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 0 * M_ + 2 * F);
    lM += 58793 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -2 * M_ + 0 * F);
    lM += 57066 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + -1 * M_ + 0 * F);
    lM += 53322 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 1 * M_ + 0 * F);
    lM += 45758 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + 0 * M_ + 0 * F);
    lM += -40923 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + -1 * M_ + 0 * F);
    lM += -34720 * (E ** Math.abs(0)) * Math.sin(1 * D + 0 * M + 0 * M_ + 0 * F);
    lM += -30383 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + 1 * M_ + 0 * F);
    lM += 15327 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 0 * M_ + -2 * F);
    lM += -12528 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 1 * M_ + 2 * F);
    lM += 10980 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 1 * M_ + -2 * F);
    lM += 10675 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + -1 * M_ + 0 * F);
    lM += 10034 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 3 * M_ + 0 * F);
    lM += 8548 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + -2 * M_ + 0 * F);
    lM += -7888 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + -1 * M_ + 0 * F);
    lM += -6766 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + 0 * M_ + 0 * F);
    lM += -5163 * (E ** Math.abs(0)) * Math.sin(1 * D + 0 * M + -1 * M_ + 0 * F);
    lM += 4987 * (E ** Math.abs(1)) * Math.sin(1 * D + 1 * M + 0 * M_ + 0 * F);
    lM += 4036 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + 1 * M_ + 0 * F);
    lM += 3994 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 2 * M_ + 0 * F);
    lM += 3861 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + 0 * M_ + 0 * F);
    lM += 3665 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -3 * M_ + 0 * F);
    lM += -2689 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + -2 * M_ + 0 * F);
    lM += -2602 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -1 * M_ + 2 * F);
    lM += 2390 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + -2 * M_ + 0 * F);
    lM += -2348 * (E ** Math.abs(0)) * Math.sin(1 * D + 0 * M + 1 * M_ + 0 * F);
    lM += 2236 * (E ** Math.abs(-2)) * Math.sin(2 * D + -2 * M + 0 * M_ + 0 * F);
    lM += -2120 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + 2 * M_ + 0 * F);
    lM += -2069 * (E ** Math.abs(2)) * Math.sin(0 * D + 2 * M + 0 * M_ + 0 * F);
    lM += 2048 * (E ** Math.abs(-2)) * Math.sin(2 * D + -2 * M + -1 * M_ + 0 * F);
    lM += -1773 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 1 * M_ + -2 * F);
    lM += -1595 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 0 * M_ + 2 * F);
    lM += 1215 * (E ** Math.abs(-1)) * Math.sin(4 * D + -1 * M + -1 * M_ + 0 * F);
    lM += -1110 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 2 * M_ + 2 * F);
    lM += -892 * (E ** Math.abs(0)) * Math.sin(3 * D + 0 * M + -1 * M_ + 0 * F);
    lM += -810 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + 1 * M_ + 0 * F);
    lM += 759 * (E ** Math.abs(-1)) * Math.sin(4 * D + -1 * M + -2 * M_ + 0 * F);
    lM += -713 * (E ** Math.abs(2)) * Math.sin(0 * D + 2 * M + -1 * M_ + 0 * F);
    lM += -700 * (E ** Math.abs(2)) * Math.sin(2 * D + 2 * M + -1 * M_ + 0 * F);
    lM += 691 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + -2 * M_ + 0 * F);
    lM += 596 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + 0 * M_ + -2 * F);
    lM += 549 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + 1 * M_ + 0 * F);
    lM += 537 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 4 * M_ + 0 * F);
    lM += 520 * (E ** Math.abs(-1)) * Math.sin(4 * D + -1 * M + 0 * M_ + 0 * F);
    lM += -487 * (E ** Math.abs(0)) * Math.sin(1 * D + 0 * M + -2 * M_ + 0 * F);
    lM += -399 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + 0 * M_ + -2 * F);
    lM += -381 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 2 * M_ + -2 * F);
    lM += 351 * (E ** Math.abs(1)) * Math.sin(1 * D + 1 * M + 1 * M_ + 0 * F);
    lM += -340 * (E ** Math.abs(0)) * Math.sin(3 * D + 0 * M + -2 * M_ + 0 * F);
    lM += 330 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + -3 * M_ + 0 * F);
    lM += 327 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + 2 * M_ + 0 * F);
    lM += -323 * (E ** Math.abs(2)) * Math.sin(0 * D + 2 * M + 1 * M_ + 0 * F);
    lM += 299 * (E ** Math.abs(1)) * Math.sin(1 * D + 1 * M + -1 * M_ + 0 * F);
    lM += 294 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 3 * M_ + 0 * F);
    lM += 0 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -1 * M_ + -2 * F);
    lM += 3958 * Math.sin(A1) + 1962 * Math.sin(L - F) + 318 * Math.sin(A2);
  let lM_True = radToDeg(L) + lM / 1000000;
  lM_True = ModFDiv(lM_True, 360);
  let lM_Appa = lM_True + NutationInLongitude(JD);
  lM_Appa = ModFDiv(lM_Appa, 360);
  let result;
  switch (OptResult.toUpperCase().replace(/ /g, "")) {
    case "":
    case "APPARENT":
      result = lM_Appa;
      break;
    case "GEOMETRIC":
      result = lM_True;
      break;
    default:
      result = lM_Appa;
  }
  return result;

}
//
function MoonGeocentricLatitude(JD, OptResult = "") {
    let T = (JD - 2451545) / 36525;
    let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000;
    let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000;
    let M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000;
    let M_ = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699 - T * T * T * T / 14712000;
    let F = 93.272095 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000;
    let A1 = 119.75 + 131.849 * T;
    let A2 = 53.09 + 479264.29 * T;
    let A3 = 313.45 + 481266.484 * T;
    let E = 1 - 0.002516 * T - 0.0000074 * T * T;
    L = degToRad(ModFDiv( L , 360));
    D = degToRad(ModFDiv(D , 360));
    M = degToRad(ModFDiv(M , 360));
    M_ = degToRad(ModFDiv(M_ , 360));
    F = degToRad(ModFDiv(F , 360));
    A1 = degToRad(ModFDiv(A1 , 360));
    A2 = degToRad(ModFDiv(A2 , 360));
    A3 = degToRad(ModFDiv(A3 , 360));
    let bM = 0;
    bM += 5128122 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 0 * M_ + 1 * F);
    bM += 280602 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 1 * M_ + 1 * F);
    bM += 277693 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 1 * M_ + -1 * F);
    bM += 173237 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 0 * M_ + -1 * F);
    bM += 55413 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -1 * M_ + 1 * F);
    bM += 46271 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -1 * M_ + -1 * F);
    bM += 32573 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 0 * M_ + 1 * F);
    bM += 17198 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 2 * M_ + 1 * F);
    bM += 9266 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 1 * M_ + -1 * F);
    bM += 8822 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 2 * M_ + -1 * F);
    bM += 8216 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + 0 * M_ + -1 * F);
    bM += 4324 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -2 * M_ + -1 * F);
    bM += 4200 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 1 * M_ + 1 * F);
    bM += -3359 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + 0 * M_ + -1 * F);
    bM += 2463 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + -1 * M_ + 1 * F);
    bM += 2211 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + 0 * M_ + 1 * F);
    bM += 2065 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + -1 * M_ + -1 * F);
    bM += -1870 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + -1 * M_ + -1 * F);
    bM += 1828 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + -1 * M_ + -1 * F);
    bM += -1794 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + 0 * M_ + 1 * F);
    bM += -1749 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 0 * M_ + 3 * F);
    bM += -1565 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + -1 * M_ + 1 * F);
    bM += -1491 * (E ** Math.abs(0)) * Math.sin(1 * D + 0 * M + 0 * M_ + 1 * F);
    bM += -1475 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + 1 * M_ + 1 * F);
    bM += -1410 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + 1 * M_ + -1 * F);
    bM += -1344 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + 0 * M_ + -1 * F);
    bM += -1335 * (E ** Math.abs(0)) * Math.sin(1 * D + 0 * M + 0 * M_ + -1 * F);
    bM += 1107 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 3 * M_ + 1 * F);
    bM += 1021 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + 0 * M_ + -1 * F);
    bM += 833 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + -1 * M_ + 1 * F);
    bM += 777 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 1 * M_ + -3 * F);
    bM += 671 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + -2 * M_ + 1 * F);
    bM += 607 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 0 * M_ + -3 * F);
    bM += 596 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 2 * M_ + -1 * F);
    bM += 491 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + 1 * M_ + -1 * F);
    bM += -451 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -2 * M_ + 1 * F);
    bM += 439 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 3 * M_ + -1 * F);
    bM += 422 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + 2 * M_ + 1 * F);
    bM += 421 * (E ** Math.abs(0)) * Math.sin(2 * D + 0 * M + -3 * M_ + -1 * F);
    bM += -366 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + -1 * M_ + 1 * F);
    bM += -351 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + 0 * M_ + 1 * F);
    bM += 331 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + 0 * M_ + 1 * F);
    bM += 315 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + 1 * M_ + 1 * F);
    bM += 302 * (E ** Math.abs(-2)) * Math.sin(2 * D + -2 * M + 0 * M_ + -1 * F);
    bM += -283 * (E ** Math.abs(0)) * Math.sin(0 * D + 0 * M + 1 * M_ + 3 * F);
    bM += -229 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + 1 * M_ + -1 * F);
    bM += 223 * (E ** Math.abs(1)) * Math.sin(1 * D + 1 * M + 0 * M_ + -1 * F);
    bM += 223 * (E ** Math.abs(1)) * Math.sin(1 * D + 1 * M + 0 * M_ + 1 * F);
    bM += -220 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + -2 * M_ + -1 * F);
    bM += -220 * (E ** Math.abs(1)) * Math.sin(2 * D + 1 * M + -1 * M_ + -1 * F);
    bM += -185 * (E ** Math.abs(0)) * Math.sin(1 * D + 0 * M + 1 * M_ + 1 * F);
    bM += 181 * (E ** Math.abs(-1)) * Math.sin(2 * D + -1 * M + -2 * M_ + -1 * F);
    bM += -177 * (E ** Math.abs(1)) * Math.sin(0 * D + 1 * M + 2 * M_ + 1 * F);
    bM += 176 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + -2 * M_ + -1 * F);
    bM += 166 * (E ** Math.abs(-1)) * Math.sin(4 * D + -1 * M + -1 * M_ + -1 * F);
    bM += -164 * (E ** Math.abs(0)) * Math.sin(1 * D + 0 * M + 1 * M_ + -1 * F);
    bM += 132 * (E ** Math.abs(0)) * Math.sin(4 * D + 0 * M + 1 * M_ + -1 * F);
    bM += -119 * (E ** Math.abs(0)) * Math.sin(1 * D + 0 * M + -1 * M_ + -1 * F);
    bM += 115 * (E ** Math.abs(-1)) * Math.sin(4 * D + -1 * M + 0 * M_ + -1 * F);
    bM += 107 * (E ** Math.abs(-2)) * Math.sin(2 * D + -2 * M + 0 * M_ + 1 * F);
    bM += (-2235 * Math.sin(L) + 382 * Math.sin(A3) + 175 * Math.sin(A1 - F) + 175 * Math.sin(A1 + F) + 127 * Math.sin(L - M_) - 115 * Math.sin(L + M_));
    bM =bM / 1000000;
    let Result;
    switch (OptResult.toUpperCase().replace(/\s/g, "")) {
        case "":
        case "APPARENT":
            Result = bM;
            break;
        case "GEOMETRIC":
            Result = bM;
            break;
        default:
            Result = bM;
    }
    return Result;
}
//
function MoonGeocentricDistance(JD, OptResult = "") {
// Declare Variables and Variable Types
let T = (JD - 2451545) / 36525;
let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T ** 2 + T ** 3 / 538841 - T ** 4 / 65194000;
let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T ** 2 + T ** 3 / 545868 - T ** 4 / 113065000;
let M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T ** 2 + T ** 3 / 24490000;
let M_ = 134.9633964 + 477198.8675055 * T + 0.0087414 * T ** 2 + T ** 3 / 69699 - T ** 4 / 14712000;
let F = 93.272095 + 483202.0175233 * T - 0.0036539 * T ** 2 - T ** 3 / 3526000 + T ** 4 / 863310000;
let A1 = 119.75 + 131.849 * T;
let A2 = 53.09 + 479264.29 * T;
let A3 = 313.45 + 481266.484 * T;
let E = 1 - 0.002516 * T - 0.0000074 * T ** 2;
L = degToRad(ModFDiv(L, 360));
D = degToRad(ModFDiv(D, 360));
M = degToRad(ModFDiv(M, 360));
M_ = degToRad(ModFDiv(M_, 360));
F = degToRad(ModFDiv(F, 360));
A1 = degToRad(ModFDiv(A1, 360));
A2 = degToRad(ModFDiv(A2, 360));
A3 = degToRad(ModFDiv(A3, 360));
let rM = 0;
rM += -20905355 * (E ** Math.abs(0)) * Math.cos(0 * D + 0 * M + 1 * M_ + 0 * F);
rM += -3699111 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + -1 * M_ + 0 * F);
    rM += -2955968 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + 0 * M_ + 0 * F)
    rM += -569925 * (E ** Math.abs(0)) * Math.cos(0 * D + 0 * M + 2 * M_ + 0 * F)
    rM += 48888 * (E ** Math.abs(1)) * Math.cos(0 * D + 1 * M + 0 * M_ + 0 * F)
    rM += -3149 * (E ** Math.abs(0)) * Math.cos(0 * D + 0 * M + 0 * M_ + 2 * F)
    rM += 246158 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + -2 * M_ + 0 * F)
    rM += -152138 * (E ** Math.abs(-1)) * Math.cos(2 * D + -1 * M + -1 * M_ + 0 * F)
    rM += -170733 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + 1 * M_ + 0 * F)
    rM += -204586 * (E ** Math.abs(-1)) * Math.cos(2 * D + -1 * M + 0 * M_ + 0 * F)
    rM += -129620 * (E ** Math.abs(1)) * Math.cos(0 * D + 1 * M + -1 * M_ + 0 * F)
    rM += 108743 * (E ** Math.abs(0)) * Math.cos(1 * D + 0 * M + 0 * M_ + 0 * F)
    rM += 104755 * (E ** Math.abs(1)) * Math.cos(0 * D + 1 * M + 1 * M_ + 0 * F)
    rM += 10321 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + 0 * M_ + -2 * F)
    rM += 0 * (E ** Math.abs(0)) * Math.cos(0 * D + 0 * M + 1 * M_ + 2 * F)
    rM += 79661 * (E ** Math.abs(0)) * Math.cos(0 * D + 0 * M + 1 * M_ + -2 * F)
    rM += -34782 * (E ** Math.abs(0)) * Math.cos(4 * D + 0 * M + -1 * M_ + 0 * F)
    rM += -23210 * (E ** Math.abs(0)) * Math.cos(0 * D + 0 * M + 3 * M_ + 0 * F)
    rM += -21636 * (E ** Math.abs(0)) * Math.cos(4 * D + 0 * M + -2 * M_ + 0 * F)
    rM += 24208 * (E ** Math.abs(1)) * Math.cos(2 * D + 1 * M + -1 * M_ + 0 * F)
    rM += 30824 * (E ** Math.abs(1)) * Math.cos(2 * D + 1 * M + 0 * M_ + 0 * F)
    rM += -8379 * (E ** Math.abs(0)) * Math.cos(1 * D + 0 * M + -1 * M_ + 0 * F)
    rM += -16675 * (E ** Math.abs(1)) * Math.cos(1 * D + 1 * M + 0 * M_ + 0 * F)
    rM += -12831 * (E ** Math.abs(-1)) * Math.cos(2 * D + -1 * M + 1 * M_ + 0 * F)
    rM += -10445 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + 2 * M_ + 0 * F)
    rM += -11650 * (E ** Math.abs(0)) * Math.cos(4 * D + 0 * M + 0 * M_ + 0 * F)
    rM += 14403 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + -3 * M_ + 0 * F)
    rM += -7003 * (E ** Math.abs(1)) * Math.cos(0 * D + 1 * M + -2 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + -1 * M_ + 2 * F)
    rM += 10056 * (E ** Math.abs(-1)) * Math.cos(2 * D + -1 * M + -2 * M_ + 0 * F)
    rM += 6322 * (E ** Math.abs(0)) * Math.cos(1 * D + 0 * M + 1 * M_ + 0 * F)
    rM += -9884 * (E ** Math.abs(-2)) * Math.cos(2 * D + -2 * M + 0 * M_ + 0 * F)
    rM += 5751 * (E ** Math.abs(1)) * Math.cos(0 * D + 1 * M + 2 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(2)) * Math.cos(0 * D + 2 * M + 0 * M_ + 0 * F)
    rM += -4950 * (E ** Math.abs(-2)) * Math.cos(2 * D + -2 * M + -1 * M_ + 0 * F)
    rM += 4130 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + 1 * M_ + -2 * F)
    rM += 0 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + 0 * M_ + 2 * F)
    rM += -3958 * (E ** Math.abs(-1)) * Math.cos(4 * D + -1 * M + -1 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(0)) * Math.cos(0 * D + 0 * M + 2 * M_ + 2 * F)
    rM += 3258 * (E ** Math.abs(0)) * Math.cos(3 * D + 0 * M + -1 * M_ + 0 * F)
    rM += 2616 * (E ** Math.abs(1)) * Math.cos(2 * D + 1 * M + 1 * M_ + 0 * F)
    rM += -1897 * (E ** Math.abs(-1)) * Math.cos(4 * D + -1 * M + -2 * M_ + 0 * F)
    rM += -2117 * (E ** Math.abs(2)) * Math.cos(0 * D + 2 * M + -1 * M_ + 0 * F)
    rM += 2354 * (E ** Math.abs(2)) * Math.cos(2 * D + 2 * M + -1 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(1)) * Math.cos(2 * D + 1 * M + -2 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(-1)) * Math.cos(2 * D + -1 * M + 0 * M_ + -2 * F)
    rM += -1423 * (E ** Math.abs(0)) * Math.cos(4 * D + 0 * M + 1 * M_ + 0 * F)
    rM += -1117 * (E ** Math.abs(0)) * Math.cos(0 * D + 0 * M + 4 * M_ + 0 * F)
    rM += -1571 * (E ** Math.abs(-1)) * Math.cos(4 * D + -1 * M + 0 * M_ + 0 * F)
    rM += -1739 * (E ** Math.abs(0)) * Math.cos(1 * D + 0 * M + -2 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(1)) * Math.cos(2 * D + 1 * M + 0 * M_ + -2 * F)
    rM += -4421 * (E ** Math.abs(0)) * Math.cos(0 * D + 0 * M + 2 * M_ + -2 * F)
    rM += 0 * (E ** Math.abs(1)) * Math.cos(1 * D + 1 * M + 1 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(0)) * Math.cos(3 * D + 0 * M + -2 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(0)) * Math.cos(4 * D + 0 * M + -3 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(-1)) * Math.cos(2 * D + -1 * M + 2 * M_ + 0 * F)
    rM += 1165 * (E ** Math.abs(2)) * Math.cos(0 * D + 2 * M + 1 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(1)) * Math.cos(1 * D + 1 * M + -1 * M_ + 0 * F)
    rM += 0 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + 3 * M_ + 0 * F)
rM += 8752 * (E ** Math.abs(0)) * Math.cos(2 * D + 0 * M + -1 * M_ + -2 * F);
rM = 385000.56 + rM / 1000;
let result;
switch (OptResult.toUpperCase().replace(/ /g, "")) {
case "AU":
result = rM / 149597870.7;
break;
case "KM":
result = rM;
break;
case "ER":
result = rM / 6371;
break;
default:
result = rM;
}
// Result of Calculation
return result;
}
//

function MoonApparentRightAscension(jd) {
  // Declare variables and their data types
  let lambda;
  let beta;
  let epsilon;
  let alpha;

  // Perform calculations
  lambda = MoonGeocentricLongitude(jd, "Apparent");
  beta = MoonGeocentricLatitude(jd, "Apparent");
  epsilon = ObliquityOfEcliptic(jd);
  alpha = radToDeg(Math.atan2(Math.sin(degToRad(lambda)) * Math.cos(degToRad(epsilon)) - Math.tan(degToRad(beta)) * Math.sin(degToRad(epsilon)), Math.cos(degToRad(lambda))));
  alpha = ModFDiv(alpha , 360) ;

  // Return result
  return alpha;
}
//
function MoonApparentDeclination(JD) {
let Lambda, Beta, Epsilon, Delta;
Lambda = degToRad(MoonGeocentricLongitude(JD, "Apparent"));
Beta = degToRad(MoonGeocentricLatitude(JD, "Apparent"));
Epsilon = degToRad(ObliquityOfEcliptic(JD));
Delta = (Math.asin(Math.sin(Beta) * Math.cos(Epsilon) + Math.cos(Beta) * Math.sin(Epsilon) * Math.sin(Lambda))) * 180 / Math.PI;
return Delta;
}
//
function MoonEquatorialHorizontalParallax(JD) {
  // Deklarasi Variabel dan Tipe Variabel
  let R;
  let Pi;

  // Proses Perhitungan
  R = MoonGeocentricDistance(JD, "KM");
  Pi = Math.asin(6378.14 / R) * (180 / Math.PI);

  // Hasil Perhitungan
  return Pi;
}
//
function MoonAngularSemiDiameter(JD) {
  // Declare variables and their types
  let R = 0;
  let Pi = 0;
  let K = 0.271481;
  let s = 0;

  // Calculations
  R = MoonGeocentricDistance(JD, "KM");
  Pi = MoonEquatorialHorizontalParallax(JD);
  s = Math.asin(K * Math.sin(Pi * Math.PI / 180)) * 180 / Math.PI;
  s = (358473400 / R) / 3600;

  // Result
  return s;
}
//
function MoonSunGeocentricElongation(JD) {
  // Variables declaration and type
  let DeltaSun;
  let AlphaSun;
  let DeltaMoon;
  let AlphaMoon;
  let Psi;

  // Calculation process
  DeltaSun = SunApparentDeclination(JD);
  AlphaSun = SunApparentRightAscension(JD);
  DeltaMoon = MoonApparentDeclination(JD);
  AlphaMoon = MoonApparentRightAscension(JD);
  Psi = Math.acos(Math.sin(DeltaSun * Math.PI/180) * Math.sin(DeltaMoon * Math.PI/180) + Math.cos(DeltaSun * Math.PI/180) * Math.cos(DeltaMoon * Math.PI/180) * Math.cos((AlphaSun - AlphaMoon) * Math.PI/180)) * 180/Math.PI;

  // Result of calculation
  return Psi;
}
//
function MoonDiskIlluminatedFraction(JD) {
  // Deklarasi Variabel dan Tipe Variabel
  let RSun;
  let RMoon;
  let Psi;
  let i;
  let K;

  // Proses Perhitungan
  RSun = SunGeocentricDistance(JD, "KM");
  RMoon = MoonGeocentricDistance(JD, "KM");
  Psi = MoonSunGeocentricElongation(JD);
  i = Math.atan2(RSun * Math.sin(Psi * Math.PI / 180), RMoon - RSun * Math.cos(Psi * Math.PI / 180)) * 180 / Math.PI;
  K = (1 + Math.cos(i * Math.PI / 180)) / 2;

  // Hasil Perhitungan
  return K;
}
//
function MoonBrightLimbAngle(JD) {
  let DeltaSun = SunApparentDeclination(JD);
  let AlphaSun = SunApparentRightAscension(JD);
  let DeltaMoon = MoonApparentDeclination(JD);
  let AlphaMoon = MoonApparentRightAscension(JD);
  let y_Num = Math.cos(DeltaSun * Math.PI / 180) * Math.sin((AlphaSun - AlphaMoon) * Math.PI / 180);
  let x_Num = Math.sin(DeltaSun * Math.PI / 180) * Math.cos(DeltaMoon * Math.PI / 180) - Math.cos(DeltaSun * Math.PI / 180) * Math.sin(DeltaMoon * Math.PI / 180) * Math.cos((AlphaSun - AlphaMoon) * Math.PI / 180);
  let Chi = Math.atan2(y_Num, x_Num) * 180 / Math.PI;
  Chi = ModFDiv(Chi , 360);

  return Chi;
}




//



    function MoonPhases(K, Phase) {
  // From a code by Michael Friedrich
  // found at http://members.aon.at/excelapps/excelapps.htm#kalender
  
  let T, JDE, E, M, MS, F, Omega;
  let A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14;
  let PT, W, PK;
  let y;

  //Y = Year(ThisDate) + CDbl(ThisDate - DateSerial(Year(ThisDate), 1, 1)) / 365.25
  //k = Int((Y - 2000) * 12.3685)
 
  K = K + Phase * 0.25;

  T = K / 1236.85;
  JDE = 2451550.09765 + 29.530588853 * K + 0.0001337 * Math.pow(T, 2) - 0.00000015 * Math.pow(T, 3) + 0.00000000073 * Math.pow(T, 4);
  E = 1 - 0.002516 * T - 0.0000074 * Math.pow(T, 2);
  M = 2.5534 + 29.10535669 * K - 0.0000218 * Math.pow(T, 2) - 0.00000011 * Math.pow(T, 3);
  MS = 201.5643 + 385.81693528 * K + 0.0107438 * Math.pow(T, 2) + 0.00001239 * Math.pow(T, 3) - 0.000000058 * Math.pow(T, 4);
  F = 160.7108 + 390.67050274 * K - 0.0016341 * Math.pow(T, 2) - 0.00000227 * Math.pow(T, 3) + 0.000000011 * Math.pow(T, 4);
  Omega = 124.7746 - 1.5637558 * K + 0.0020691 * Math.pow(T, 2) + 0.00000215 * Math.pow(T, 3);
  
  M = degToRad(ModFDiv(M, 360));
  MS = degToRad(ModFDiv(MS, 360));
  F = degToRad(ModFDiv(F, 360));
  Omega = degToRad(ModFDiv(Omega, 360));

  //Argumente der Planeten

  A1 = degToRad(ModFDiv(299.77 + 0.107408 * K - 0.009173 * Math.pow(T, 2), 360));
  A2 = degToRad(ModFDiv(251.88 + 0.016321 * K, 360));
  A3 = degToRad(ModFDiv(251.83 + 26.651886 * K, 360));
  A4 = degToRad(ModFDiv(349.42 + 36.412478 * K, 360));
  A5 = degToRad(ModFDiv(84.66 + 18.206239 * K, 360));
  A6 = degToRad(ModFDiv(141.74 + 53.303771 * K, 360));
  A7 = degToRad(ModFDiv(207.14 + 2.453732 * K, 360));
  A8 = degToRad(ModFDiv(154.84 + 7.30686 * K, 360));
  A9 = degToRad(ModFDiv(34.52 + 27.261239 * K, 360));
  A10 = degToRad(ModFDiv(207.19 + 0.121824 * K, 360));
  A11 = degToRad(ModFDiv(291.34 + 1.844379 * K, 360));
  A12 = degToRad(ModFDiv(161.72 + 24.198154 * K, 360));
  A13 = degToRad(ModFDiv(239.56 + 25.513099 * K, 360));
  A14 = degToRad(ModFDiv(331.55 + 3.592518 * K, 360));


if (Phase === 0) {
PT = -0.4072 * Math.sin(MS) + 0.17241 * E * Math.sin(M) + 0.01608 * Math.sin(2 * MS)
+ 0.01039 * Math.sin(2 * F) + 0.00739 * E * Math.sin(MS - M) - 0.00514 * E * Math.sin(MS + M)
+ 0.00208 * Math.pow(E, 2) * Math.sin(2 * M) - 0.00111 * Math.sin(MS - 2 * F) - 0.00057 * Math.sin(MS + 2 * F)
+ 0.00056 * E * Math.sin(2 * MS + M) - 0.00042 * Math.sin(3 * MS) + 0.00042 * E * Math.sin(M + 2 * F)
+ 0.00038 * E * Math.sin(M - 2 * F) - 0.00024 * E * Math.sin(2 * MS - M)
- 0.00017 * Math.sin(Omega) - 0.00007 * Math.sin(MS + 2 * M) + 0.00004 * Math.sin(2 * MS - 2 * F)
+ 0.00004 * Math.sin(3 * M) + 0.00003 * Math.sin(MS + M - 2 * F) + 0.00003 * Math.sin(2 * MS + 2 * F)
- 0.00003 * Math.sin(MS + M + 2 * F) + 0.00003 * Math.sin(MS - M + 2 * F) - 0.00002 * Math.sin(MS - M - 2 * F)
- 0.00002 * Math.sin(3 * MS + M) + 0.00002 * Math.sin(4 * MS);
W = 0;
}



if (Phase === 2) {
  PT = -0.40614 * Math.sin(MS) + 0.17302 * E * Math.sin(M) + 0.01614 * Math.sin(2 * MS) +
    0.01043 * Math.sin(2 * F) + 0.00734 * E * Math.sin(MS - M) - 0.00515 * E * Math.sin(MS + M) +
    0.00209 * E ** 2 * Math.sin(2 * M) - 0.00111 * Math.sin(MS - 2 * F) - 0.00057 * Math.sin(MS + 2 * F) +
    0.00056 * E * Math.sin(2 * MS + M) - 0.00042 * Math.sin(3 * MS) + 0.00042 * E * Math.sin(M + 2 * F) +
    0.00038 * E * Math.sin(M - 2 * F) - 0.00024 * E * Math.sin(2 * MS - M) -
    0.00017 * Math.sin(Omega) - 0.00007 * Math.sin(MS + 2 * M) + 0.00004 * Math.sin(2 * MS - 2 * F) +
    0.00004 * Math.sin(3 * M) + 0.00003 * Math.sin(MS + M - 2 * F) + 0.00003 * Math.sin(2 * MS + 2 * F) -
    0.00003 * Math.sin(MS + M + 2 * F) + 0.00003 * Math.sin(MS - M + 2 * F) - 0.00002 * Math.sin(MS - M - 2 * F) -
    0.00002 * Math.sin(3 * MS + M) + 0.00002 * Math.sin(4 * MS);
    W = 0;
}



// Periodic terms for first and last phases
if (Phase === 1 || Phase === 3) {
  PT = -0.62801 * Math.sin(MS) + 0.17172 * E * Math.sin(M) - 0.01183 * E * Math.sin(MS + M)
    + 0.00862 * Math.sin(2 * MS) + 0.00804 * Math.sin(2 * F) + 0.00454 * E * Math.sin(MS - M)
    + 0.00204 * Math.pow(E, 2) * Math.sin(2 * M) - 0.0018 * Math.sin(MS - 2 * F) - 0.0007 * Math.sin(MS + 2 * F)
    - 0.0004 * Math.sin(3 * MS) - 0.00034 * E * Math.sin(2 * MS - M) + 0.00032 * E * Math.sin(M + 2 * F)
    + 0.00032 * E * Math.sin(M - 2 * F) - 0.00028 * Math.pow(E, 2) * Math.sin(MS + 2 * M) + 0.00027 * E * Math.sin(2 * MS + M)
    - 0.00017 * Math.sin(Omega) - 0.00005 * Math.sin(MS - M - 2 * F) + 0.00004 * Math.sin(2 * MS + 2 * F)
    - 0.00004 * Math.sin(MS + M + 2 * F) + 0.00004 * Math.sin(MS - 2 * M) + 0.00003 * Math.sin(MS + M - 2 * F)
    + 0.00003 * Math.sin(3 * M) + 0.00002 * Math.sin(2 * MS - 2 * F) + 0.00002 * Math.sin(MS - M + 2 * F)
    - 0.00002 * Math.sin(3 * MS + M);
  W = 0.00306 - 0.00038 * E * Math.cos(M) + 0.00026 * Math.cos(MS)
    - 0.00002 * Math.cos(MS - M) + 0.00002 * Math.cos(MS + M) + 0.00002 * Math.cos(2 * F);
  if (Phase === 3) {
    W = -W;
  }
}

PK = 0.000325 * Math.sin(A1) + 0.000165 * Math.sin(A2) + 0.000164 * Math.sin(A3)
  + 0.000126 * Math.sin(A4) + 0.00011 * Math.sin(A5) + 0.000062 * Math.sin(A6)
  + 0.00006 * Math.sin(A7) + 0.000056 * Math.sin(A8) + 0.000047 * Math.sin(A9)
  + 0.000042 * Math.sin(A10) + 0.00004 * Math.sin(A11) + 0.000037 * Math.sin(A12)
  + 0.000035 * Math.sin(A13) + 0.000023 * Math.sin(A14);
  
return JDE + PK + PT + W;

}

//untuk ijtimak

function SameLongitudeTracking(JDE) {
  let moonLong;
  let sunLong;
  let Intervals = new Array(9);
  let JDEProsess;
  let selisih;
  let i;
  let J;
  let K;
  let l = 0;
  
  Intervals[0] = 1 / 24;
  Intervals[1] = 1 / 24 / 60;
  Intervals[2] = 1 / 24 / 60 / 60;
  Intervals[3] = 1 / 24 / 60 / 60 / 10;
  Intervals[4] = 1 / 24 / 60 / 60 / 100;
  Intervals[5] = 1 / 24 / 60 / 60 / 1000;
  Intervals[6] = 1 / 24 / 60 / 60 / 10000;
  Intervals[7] = 1 / 24 / 60 / 60 / 100000;
  Intervals[8] = 1 / 24 / 60 / 60 / 1000000;

  moonLong = MoonGeocentricLongitude(JDE);
  sunLong = SunGeocentricLongitude(JDE);
  while (l < 9) {
    while (moonLong < sunLong) {
      JDE = JDE + Intervals[l];
      moonLong = MoonGeocentricLongitude(JDE);
      sunLong = SunGeocentricLongitude(JDE);
    }
    
    JDE = JDE - 2 * Intervals[l];
    l = l + 1;
   
    JDE = JDE + Intervals[l];
    moonLong = MoonGeocentricLongitude(JDE);
    sunLong = SunGeocentricLongitude(JDE);

    selisih = Math.abs(moonLong - sunLong);
   
    if (selisih <= 0.0000001) {
      break;
    }
  }
  return JDE;
}

function BulanTahunHijri_K(BulanHijri, TahunHijri) {

  var Lunasi_N = (TahunHijri + 29.530589 * (BulanHijri - 1) / 354.367068 - 1410) * 12 - 128; 
  return Lunasi_N;
}


function LunasiKeN(BulanHijri, TahunHijri) {
  var bulanKeN = (BulanHijri - 1) + (TahunHijri - 1) * 12 + 1; // Menghitung bulan ke-n dari tahun pertama dalam kalender Hijriyah
  var lunasiKeN = 1948439.5 + (bulanKeN - 1) * 29.530588853; // Menghitung lunasi ke-n dari bulan ke-n
  var lunasi1410 = 1948439.5; // Lunasi tanggal 1 Muharram 1410 H
  var jumlahLunasi = Math.floor(lunasiKeN - lunasi1410 + 0.5); // Menghitung selisih lunasi antara bulan dan tahun yang diberikan dengan tanggal 1 Muharram 1410 H dan membulatkan ke bawah
  return jumlahLunasi; // Mengembalikan nilai jumlah lunasi
}

// JDE Ghurub syamsi
function JDEGhurubusSyamsi(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt) {
  let Tahun;
  let Bulan;
  let tanggal;
  let JD;
  let PW;
  let Delt;
  let DM;
  let PM;
  let SDM;
  let Ref;
  let Dip;
  let HM;
  let TGhurub;
  let JamGhurub;
  let ZN;
  let Kor1;
  let Kor2;
  let i;
  
  Delt = Deltat(JDE);
  ZN = LocalGeoLong / 15;
  JD = JDE + ZN / 24 - Delt / 86400;
  tanggal = JDKM(JD, 0, "tglm");
  Bulan = JDKM(JD, 0, "blnm");
  Tahun = JDKM(JD, 0, "thnm");
  JD = KMJD(tanggal, Bulan, Tahun);
  
  for (i = 0; i <= 7; i++) {
    Delt = Deltat(JD);
    JDE = JD + Delt / 86400;
    PW = EquationOfTime(JD);
    DM = SunApparentDeclination(JDE);
    SDM = SunAngularSemiDiameter(JDE);
    PM = SunEquatorialHorizontalParallax(JDE);
    Ref = 0 + 34 / 60 + 30 / 3600;
    Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60;
    HM = 0 - SDM - Ref - Dip + PM;
    TGhurub = radToDeg(Math.acos(-Math.tan(degToRad(LocalGeoLat)) * Math.tan(degToRad(DM)) + Math.sin(degToRad(HM)) / Math.cos(degToRad(LocalGeoLat)) / Math.cos(degToRad(DM))));
    JamGhurub = TGhurub / 15;
    Kor1 = 12 + JamGhurub - PW;
    JD = KMJD(tanggal, Bulan, Tahun, Kor1, ZN);
  }
  
  Delt = Deltat(JD);
  return JD + Delt / 86400;
}

function JDEGhurubusSyamsiRev(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt) {
  let Tahun;
  let Bulan;
  let tanggal;
  let JD;
  let PW;
  let Delt;
  let DM;
  let PM;
  let SDM;
  let Ref;
  let Dip;
  let HM;
  let TGhurub;
  let JamGhurub;
  let ZN;
  let Kor1;
  let Kor2;
  let i;

  Delt = Deltat(JDE);
  ZN = LocalGeoLong / 15;
  JD = JDE  - Delt / 86400;
  tanggal = JDKM(JD, 0, "tglm");
  Bulan = JDKM(JD, 0, "blnm");
  Tahun = JDKM(JD, 0, "thnm");

  JD = KMJD(tanggal, Bulan, Tahun) - ZN;

  for (i = 0; i <= 7; i++) {
    Delt = Deltat(JD);
    JDE = JD + Delt / 86400;
    PW = EquationOfTime(JD);
    DM = SunApparentDeclination(JDE);
    SDM = SunAngularSemiDiameter(JDE);
    PM = SunEquatorialHorizontalParallax(JDE);
    Ref = 0 + 34 / 60 + 30 / 3600;
    Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60;
    HM = 0 - SDM - Ref - Dip + PM;
    TGhurub = radToDeg(Math.acos(-Math.tan(degToRad(LocalGeoLat)) * Math.tan(degToRad(DM)) + Math.sin(degToRad(HM)) / Math.cos(degToRad(LocalGeoLat)) / Math.cos(degToRad(DM))));
    JamGhurub = TGhurub / 15;
    Kor1 = 12 + JamGhurub - PW;
    JD = KMJD(tanggal, Bulan, Tahun, Kor1, ZN);
  }

  Delt = Deltat(JD);
  return JD + Delt / 86400;
}

// JDE thuluk
function JDEThulu_uusSyamsi(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt) {
let Tahun;
let Bulan;
let tanggal;
let JD;
let PW;
let Delt;
let DM;
let SDM;
let PM;
let Ref;
let Dip;
let HM;
let TThulu_u;
let JamThulu_u;
let ZN;
let Kor1;
let Kor2;
let i;

Delt = Deltat(JDE);
ZN = LocalGeoLong / 15;
JD = JDE + ZN / 24 - Delt / 86400;
tanggal = JDKM(JD, 0, "tglm");
Bulan = JDKM(JD, 0, "blnm");
Tahun = JDKM(JD, 0, "thnm");

JD = KMJD(tanggal, Bulan, Tahun);

for (i = 0; i <= 7; i++) {
Delt = Deltat(JD);
JDE = JD + Delt / 86400;
PW = EquationOfTime(JD);
DM = SunApparentDeclination(JDE);
PM = SunEquatorialHorizontalParallax(JDE);
SDM = SunAngularSemiDiameter(JDE);
Ref = 0 + 34 / 60 + 30 / 3600;
Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60;
HM = 0 - SDM - Ref - Dip + PM;
TThulu_u = radToDeg(Acs(-Math.tan(degToRad(LocalGeoLat)) * Math.tan(degToRad(DM)) + Math.sin(degToRad(HM)) / Math.cos(degToRad(LocalGeoLat)) / Math.cos(degToRad(DM))));
JamThulu_u = TThulu_u / 15;
Kor1 = 12 - JamThulu_u - PW;
JD = KMJD(tanggal, Bulan, Tahun, Kor1, ZN);
}
Delt = Deltat(JD);
return JD + Delt / 86400;
}


// ghurub qomar
function JDEGhurubulQomar(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt) {

    let TggBulan, Altbulan, SDB, PB, Ref, Dip;
    let Intervals = new Array(8);
    let l = 0;

    Intervals[0] = 1 / 24;
    Intervals[1] = 1 / 24 / 60;
    Intervals[2] = 1 / 24 / 60 / 60;
    Intervals[3] = 1 / 24 / 60 / 60 / 10;
    Intervals[4] = 1 / 24 / 60 / 60 / 100;
    Intervals[5] = 1 / 24 / 60 / 60 / 1000;
    Intervals[6] = 1 / 24 / 60 / 60 / 10000;
    Intervals[7] = 1 / 24 / 60 / 60 / 100000;

    SDB = MoonAngularSemiDiameter(JDE);
    PB = MoonEquatorialHorizontalParallax(JDE);
    Ref = 0 + 34 / 60 + 30 / 3600;
    Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60;
    TggBulan = -(34 / 60) + 0.7275 * PB - 0.0353 * Math.sqrt(LocalGeoAlt);

    Altbulan = tinggibulan(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt, "ATAS");
    if (Altbulan > TggBulan) {
          while (l < 7) {
                  if (Altbulan > TggBulan) {
                    JDE = JDE + Intervals[l];
                    SDB = MoonAngularSemiDiameter(JDE);
                    PB = MoonEquatorialHorizontalParallax(JDE);
                    Ref = 0 + 34 / 60 + 30 / 3600;
                    Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60;
                    TggBulan = -(34 / 60) + 0.7275 * PB - 0.0353 * Math.sqrt(LocalGeoAlt);

                    Altbulan = tinggibulan(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt, "ATAS");
                  
                  } else {
                  
                  JDE = JDE - 2 * Intervals[l];
                  l = l + 1;
                
                    JDE = JDE + Intervals[l];
                    SDB = MoonAngularSemiDiameter(JDE);
                    PB = MoonEquatorialHorizontalParallax(JDE);
                    Ref = 0 + 34 / 60 + 30 / 3600;
                    Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60;
                    TggBulan = -(34 / 60) + 0.7275 * PB - 0.0353 * Math.sqrt(LocalGeoAlt);

                    Altbulan = tinggibulan(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt, "ATAS");
                    }
                    selisih = Math.abs(Altbulan - TggBulan);
                  
                    if (selisih <= 0.0000001) {
                      break;
                    }
          }
    } else {
          while (l < 7) {
                if (Altbulan < TggBulan) {
                  JDE = JDE - Intervals[l];
                  SDB = MoonAngularSemiDiameter(JDE);
                  PB = MoonEquatorialHorizontalParallax(JDE);
                  Ref = 0 + 34 / 60 + 30 / 3600;
                  Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60;
                  TggBulan = -(34 / 60) + 0.7275 * PB - 0.0353 * Math.sqrt(LocalGeoAlt);

                  Altbulan = tinggibulan(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt, "ATAS");
                
                } else {
                
                JDE = JDE + 2 * Intervals[l];
                l = l + 1;
              
                  JDE = JDE + Intervals[l];
                  SDB = MoonAngularSemiDiameter(JDE);
                  PB = MoonEquatorialHorizontalParallax(JDE);
                  Ref = 0 + 34 / 60 + 30 / 3600;
                  Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60;
                  TggBulan = -(34 / 60) + 0.7275 * PB - 0.0353 * Math.sqrt(LocalGeoAlt);

                  Altbulan = tinggibulan(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt, "ATAS");
                  }
                selisih = Math.abs(Altbulan - TggBulan);
      
              if (selisih <= 0.0000001) {
                break;
              }
          }
    }

  return JDE;
}


// thuluk qomar

function JDEThulu_ulQomar(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt) {

  let tanggal, Bulan, Tahun, Delt, JDTanggal, JDAcuan, JDEAcuan, Zone;
  let JDEPokok, JDEH = [];

  Zone = Math.floor(LocalGeoLong / 15);
  Delt = Deltat(JDE);
  JDTanggal = JDE - Delt / 86400;
  tanggal = JDKM(JDTanggal, Zone, "TGLM");
  Bulan = JDKM(JDTanggal, Zone, "BLNM");
  Tahun = JDKM(JDTanggal, Zone, "THNM");
  JDAcuan = KMJD(tanggal, Bulan, Tahun, 0, Zone);
  Delt = Deltat(JDAcuan);
  JDEAcuan = JDAcuan + Delt / 86400;

  let JDEThulu_ulQomar = -1;

  for (let i = 0; i <= 2; i++) {
    JDEH[i] = JDEThulu_ulQomarPross(JDEAcuan + (i - 1), LocalGeoLat, LocalGeoLong, LocalGeoAlt);
    if (JDEH[i] >= JDEAcuan && JDEH[i] < (JDEAcuan + 1)) {
      JDEThulu_ulQomar = JDEH[i];
      break;
    }
    JDEPokok = JDE;
  }

  return JDEThulu_ulQomar;
}





//waktu awal sholat
//Sholat Dhuhur
function dhuhur(JDE,geolong,tz) {
  let pw = EquationOfTime(JDE);
  let dh = 12 - pw + ((15 * tz) - geolong) / 15;
  let iht = 1 / 30;
  return dh + iht;
}
//Sholat Ashar
function ashar(JDE, geolat, geolong, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let ist = Math.abs(sundec - geolat);
let hashr = radToDeg( Math.atan (1 / ( Math.tan(degToRad(ist)) + 1 )));
let swashr = radToDeg( Math.acos( Math.sin(degToRad(hashr)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let ashr1 = swashr / 15
let ashr2 = 12 - pw + ashr1 + kwd + iht;
return ashr2;

}
// Sholat Maghrib
function maghrib(JDE, geolat, geolong, geoalt, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let a = 1.76 * Math.sqrt(geoalt) / 60;
let sdm = SunAngularSemiDiameter(JDE);
let ref = 34 / 60;
let hm = -(a + sdm + ref);
let swamagh = radToDeg( Math.acos( Math.sin(degToRad(hm)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let mgb1 = swamagh / 15;
let mgb2 = 12 - pw + mgb1 + kwd + iht;
return mgb2;

}

// Sholat isya
function isya(JDE, geolat, geolong, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let hisy = -18;
let swisy = radToDeg( Math.acos( Math.sin(degToRad(hisy)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let isy1 = swisy / 15;
let isy2 = 12 - pw + isy1 + kwd + iht;
return isy2;
}

// Sholat shubuh
function shubuh(JDE, geolat, geolong, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let hsbh = -20;
let swsbh = radToDeg( Math.acos( Math.sin(degToRad(hsbh)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let sbh1 = swsbh / 15;
let sbh2 = 12 - pw - sbh1 + kwd + iht;
return sbh2;
}

// waktu terbit
function terbit(JDE, geolat, geolong, geoalt, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let a = 1.76 * Math.sqrt(geoalt) / 60;
let sdm = SunAngularSemiDiameter(JDE);
let ref = 34 / 60;
let hm = -(a + sdm + ref);
let swamagh = radToDeg( Math.acos( Math.sin(degToRad(hm)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let trbt1 = swamagh / 15;
let trbt2 = 12 - pw - trbt1 + kwd + iht;
return trbt2;
}

// Sholat dluha
function dluha(JDE, geolat, geolong, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let hdha = 4.5;
let swdha = radToDeg( Math.acos( Math.sin(degToRad(hdha)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let dha1 = swdha / 15;
let dha2 = 12 - pw - dha1 + kwd + iht;
return dha2;
}
//



//
function tinggibulan(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt, Hasil="HAQIQI") {
var Delt, JD, PW, UT, SunGeolong, SunGeoLat, SudutWaktuMatahari, MoonGeoLong, MoonGeoLat, SudutWaktuBulan, PB, SDB, refA, Ref, Dip, AsensiorektaMatahari, AsensiorektaBulan, SelisihAsensiorekta, tinggibulanHaqiqi, tinggibulan;

Delt = Deltat(JDE);
JD = JDE - Delt / 86400;
PW = EquationOfTime(JD);
UT = JDKM(JD, 0, "jamdes");
SunGeolong = 180 - 15 * (UT + PW);
SunGeoLat = SunApparentDeclination(JDE);
MoonGeoLat = MoonApparentDeclination(JDE);
SudutWaktuMatahari = LocalGeoLong - SunGeolong;
AsensiorektaBulan = MoonApparentRightAscension(JDE);
AsensiorektaMatahari = SunApparentRightAscension(JDE);
SelisihAsensiorekta = AsensiorektaBulan - AsensiorektaMatahari;
SudutWaktuBulan = SudutWaktuMatahari + AsensiorektaMatahari - AsensiorektaBulan;
Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60;
PB = MoonEquatorialHorizontalParallax(JDE);
SDB = MoonAngularSemiDiameter(JDE);
tinggibulanHaqiqi = radToDeg(Math.asin(Math.sin(degToRad(LocalGeoLat)) * Math.sin(degToRad(MoonGeoLat)) + Math.cos(degToRad(LocalGeoLat)) * Math.cos(degToRad(MoonGeoLat)) * Math.cos(degToRad(SudutWaktuBulan))));
tinggibulan = tinggibulanHaqiqi - (PB * Math.cos(degToRad(tinggibulanHaqiqi)));

switch (Hasil.replace(/\s/g, "").toUpperCase()) {
case "ATAS":
tinggibulan += SDB;
break;
case "BAWAH":
tinggibulan -= SDB;
break;
case "HAQIQI":
return tinggibulanHaqiqi;
case "TOPOCENTRIS":
break;
default:
// tetap titik pusat
break;
}

if (tinggibulan > Dip) tinggibulan += Dip;
refA = tinggibulan + (7.31 / (tinggibulan + 4.4));
Ref = 0.0167 / Math.tan(degToRad(refA));
if (tinggibulan > 0.575774813512485) tinggibulan += Ref;
if (tinggibulan > 90) tinggibulan = 180 - tinggibulan;
if (tinggibulan < -90) tinggibulan = -(180 - tinggibulan);

return tinggibulan;
}

// tinggi mth
function tinggimatahari(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt, Hasil) {
let Delt, JD, PW, UT, SunGeolong, SunGeoLat, SudutWaktuMatahari, PM, SDM, refA, Ref, Dip;
Delt = Deltat(JDE); 
JD = JDE - Delt / 86400; 
PW = EquationOfTime(JD); 
UT = JDKM(JD, 0, "jamdes"); 
SunGeolong = 180 - 15 * (UT + PW); 
SunGeoLat = SunApparentDeclination(JDE); SudutWaktuMatahari = LocalGeoLong - SunGeolong;
Dip = 1.76 * Math.sqrt(LocalGeoAlt) / 60; 
PM = SunEquatorialHorizontalParallax(JDE); 
SDM = SunAngularSemiDiameter(JDE); 
let tinggimatahari = radToDeg(Math.asin(Math.sin(degToRad(LocalGeoLat)) * Math.sin(degToRad(SunGeoLat)) + Math.cos(degToRad(LocalGeoLat)) * Math.cos(degToRad(SunGeoLat)) * Math.cos(degToRad(SudutWaktuMatahari)))); 
tinggimatahari = tinggimatahari - PM;
switch (Hasil.trim().toUpperCase()) { 
  case "ATAS": 
  tinggimatahari = tinggimatahari + SDM; 
  break; 
  case "BAWAH": 
  tinggimatahari = tinggimatahari - SDM;
  break; 
  default: // tetap titik pusat break; 
  }
if (tinggimatahari > Dip) { 
  tinggimatahari = tinggimatahari + Dip; 
  } 
  refA = tinggimatahari + (7.31 / (tinggimatahari + 4.4)); 
  Ref = 0.0167 / Math.tan(degToRad(refA)); 
  if (tinggimatahari > 0.575774813512485) { 
    tinggimatahari = tinggimatahari + Ref; 
    } 
    if (tinggimatahari > 90) { 
      tinggimatahari = 180 - tinggimatahari; 
      } 
      if (tinggimatahari < -90) { 
        tinggimatahari = -(180 - tinggimatahari); 
        }
return tinggimatahari;
}

//
function AzimuthBulan(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt) {
let Delt, JD, PW, UT, SunGeolong, MoonGeoLong, MoonGeoLat, AsensiorektaMatahari, AsensiorektaBulan, SelisihAsensiorekta;

AsensiorektaBulan = MoonApparentRightAscension(JDE);
AsensiorektaMatahari = SunApparentRightAscension(JDE);
SelisihAsensiorekta = AsensiorektaBulan - AsensiorektaMatahari;

Delt = Deltat(JDE);
JD = JDE - Delt / 86400;
PW = EquationOfTime(JD);
UT = JDKM(JD, 0, "jamdes");
SunGeolong = 180 - 15 * (UT + PW);
MoonGeoLong = ModFDiv(SunGeolong + SelisihAsensiorekta,360);
MoonGeoLat = MoonApparentDeclination(JDE);

return azimuthWithCosine(MoonGeoLat, MoonGeoLong, LocalGeoLat, LocalGeoLong);
}

//
function AzimuthMatahari(JDE, LocalGeoLat, LocalGeoLong, LocalGeoAlt) {
let Delt;
let JD;
let PW;
let UT;
let SunGeolong;
let SunGeoLat;

Delt = Deltat(JDE);
JD = JDE - Delt / 86400;
PW = EquationOfTime(JD);
UT = JDKM(JD, 0, "jamdes");
SunGeolong = 180 - 15 * (UT + PW);
SunGeoLat = SunApparentDeclination(JDE);

return azimuthWithCosine(SunGeoLat, SunGeolong, LocalGeoLat, LocalGeoLong);
}


//tracking elong max
function JDEMAXElongTracking(JDE) {
//Kegunaan : untuk menghitung JDE elongasi bulan dan matahari Geosentris terbesar
//Penggunaan : memasukkan JDEdalam bentuk desimal
//Oleh : Muhammad Wasil
//modifikasi : 28 Mei 2021

let JDEAwal = JDE;
let JDEProsess = [];
let Elong = [];
let Intervals = [1/24, 1/24/60, 1/24/60/60, 1/24/60/60/10, 1/24/60/60/100, 1/24/60/60/1000, 1/24/60/60/10000, 1/24/60/60/100000];
let ELONGMAX;
let Hasil;
let I = 0;
let J, k, l;

while (I < 7) {
for (J = 0; J <= 3; J++) {
if (J === 0) {
JDEProsess[J] = JDE;
} else {
JDEProsess[J] = JDE + Intervals[I] * J;
}
Elong[J] = MoonSunGeocentricElongation(JDEProsess[J]);
}


ELONGMAX = Elong[0];
for (k = 0; k <= 3; k++) {
  if (Elong[k] > ELONGMAX) ELONGMAX = Elong[k];
}

for (l = 0; l <= 3; l++) {
  if (Elong[l] === ELONGMAX) {
    if (l === 0 || l === 3) {
      JDE = JDEProsess[l] + Intervals[I] * (l - 1);
    } else {
      JDEMAXElongTrackings = JDEProsess[l];
      JDE = JDEProsess[l] - Intervals[I + 1];
      I++;
    }
  }
}
}
return JDEMAXElongTrackings;
}

// Untuk Gerhana Bulan
function LunarEclipse(JDE, Hasil) {
//Kegunaan   :untuk menghitung gerhana bulan secara global dalam geometri
//Penggunaan : memasukkan JDEdalam bentuk desimal
//Oleh       : Muhammad Wasil
//modifikasi : 6 April 2023

//jejari Bulan
var rB;
//jejari Matahari
var rM;
//elongasi
var Elong;
//jarak Bulan
var JB;
//jarak Matahari
var JM;
//jarak kerucut panumbra
var Oa;
//sudut puncak panumbra
var a;
//jarak simpul p1
var Op1;
//sudut p1
var p1;
//jarak p1 ke Bulan
var Bp1;
//sudut p1Bp2
var p1Bp2;
//jarak Bulan ke p2
var Bp2;

//jarak kerucut umbra
var Ob;
//sudut puncak umbra
var b;
//jarak simpul u1
var Ou1;
//sudut u1
var u1;
//jarak u1 ke Bulan
var Bu1;
//sudut u1Bu2
var u1Bu2;
//jarak Bulan ke u2
var Bu2;
//jenis gerhana
var JG;
//jejari bumi
var rE;
//paralaks matahari
var pM;
//paralaks bulan
var pB;

var dm;

dm = SunApparentDeclination(JDE)
rB = 0.2731
rM = 109.2
pM = SunEquatorialHorizontalParallax(JDE)
pB = MoonEquatorialHorizontalParallax(JDE)

//rE = 1.02 * (pM + pB)
rE = 1 + 87 / 6378.137 - 0.003353 * (Math.sin(degToRad(pM + pB))) ** 2 * (Math.cos(degToRad(dm))) ** 2

Elong = MoonSunGeocentricElongation(JDE)
JB = MoonGeocentricDistance(JDE, "ER")
JM = SunGeocentricDistance(JDE, "ER")
Oa = JM * rE / (rM + rE)
a = radToDeg(Math.asin((109.2 + rE) / JM))
p1 = 180 - (Elong + a)
Op1 = Oa * Math.sin(degToRad(a)) / Math.sin(degToRad(p1))
Bp1 = JB - Op1
p1Bp2 = 90 - p1
Bp2 = Math.cos(degToRad(p1Bp2)) * Bp1

Ob = JM * rE / (rM - rE)
b = radToDeg(Math.asin((109.2 - rE) / JM))
u1 = 180 - (Elong - b)
Ou1 = Ob * Math.sin(degToRad(b)) / Math.sin(degToRad(u1))
Bu1 = JB - Ou1
u1Bu2 = 90 - u1
Bu2 = Math.sin(degToRad(u1)) * Bu1

//jenis-jenis gerhana
if (Bp2 > rB) JG = 0;
if (Bp2 < rB) JG = 1;
if (Bp2 < -rB) JG = 2;
if (Bu2 < rB) JG = 3;
if (Bu2 < -rB) JG = 4;

//Magnitudo
var PMag;
var UMag;
PMag = (Bp2 - rB) / (-2 * rB)
UMag = (Bu2 - rB) / (-2 * rB)

switch (Hasil.replace(/\s+/g, "").toUpperCase()) {
case "JDE":
return JDE;
case "BP2":
return Bp2;
case "BU2":
return Bu2;
case "JG":
return JG;
case "PMG":
return PMag;
case "UMG":
return UMag;
default:
return "Invalid input for Hasil parameter.";
}
}



//tracking kontak gerhana bulan
function JDEMoonContactsTracking(JDE, Perihal) {
// Kegunaan :untuk menghitung JDE kontak-kontak penting gerhana bulan secara global
// Penggunaan : memasukkan JDE elongasi terkecil geosentris dalam bentuk desimal
// Oleh : Muhammad Wasil
// modifikasi : 29 Mei 2021

var JDEAwal = JDE;
var JDEProsess = new Array(4);
var PJGOP = new Array(4);
var Intervals = new Array(8);
var Hasil = "";
var I = 0;
var J = 0;
var rB = 0.2731;
var F = 0;
var Result;

Intervals[0] = 1 / 24;
Intervals[1] = 1 / 24 / 60;
Intervals[2] = 1 / 24 / 60 / 60;
Intervals[3] = 1 / 24 / 60 / 60 / 10;
Intervals[4] = 1 / 24 / 60 / 60 / 100;
Intervals[5] = 1 / 24 / 60 / 60 / 1000;
Intervals[6] = 1 / 24 / 60 / 60 / 10000;
Intervals[7] = 1 / 24 / 60 / 60 / 100000;

switch (Perihal.replace(/\s/g, "").toUpperCase()) {
case "P1":
Hasil = "BP2";
F = rB;
gotoSEBELUM();
break;
case "U1":
Hasil = "BU2";
F = rB;
gotoSEBELUM();
break;
case "U2":
Hasil = "BU2";
F = -rB;
gotoSEBELUM();
break;
case "P2":
Hasil = "BP2";
F = -rB;
gotoSEBELUM();
break;
case "P3":
Hasil = "BP2";
F = -rB;
gotoSESUDAH();
break;
case "U3":
Hasil = "BU2";
F = -rB;
gotoSESUDAH();
break;
case "U4":
Hasil = "BU2";
F = rB;
gotoSESUDAH();
break;
case "P4":
Hasil = "BP2";
F = rB;
gotoSESUDAH();
break;
}

function gotoSEBELUM() {
while (I < 7) {
    JDEProsess[0] = JDE;
    JDEProsess[1] = JDE - Intervals[I];
    JDEProsess[2] = JDE - Intervals[I] * 2;
    JDEProsess[3] = JDE - Intervals[I] * 3;

    PJGOP[0] = LunarEclipse(JDEProsess[0],Hasil) - F;
    PJGOP[1] = LunarEclipse(JDEProsess[1],Hasil) - F;
    PJGOP[2] = LunarEclipse(JDEProsess[2],Hasil) - F;
    PJGOP[3] = LunarEclipse(JDEProsess[3],Hasil) - F;

    if (PJGOP[3] < 0) {
        JDE = JDEProsess[1];
    }
    if (PJGOP[0] > 0) {
        Result = 0;
        return;
    }

    for (let J = 0; J <= 3; J++) {
        if (PJGOP[J] > 0) {
            JDE = JDEProsess[J - 1] + Intervals[I + 1];
            Result = JDE;
            I = I + 1;
            if (JDE > JDEAwal) {
                JDE = JDEAwal;
            }
            break;
        }
    }
}

}

function gotoSESUDAH() {
while (I < 7) {
  JDEProsess[0] = JDE;
  JDEProsess[1] = JDE + Intervals[I];
  JDEProsess[2] = JDE + Intervals[I] * 2;
  JDEProsess[3] = JDE + Intervals[I] * 3;
  
  PJGOP[0] = LunarEclipse(JDEProsess[0],Hasil) - F;
  PJGOP[1] = LunarEclipse(JDEProsess[1],Hasil) - F;
  PJGOP[2] = LunarEclipse(JDEProsess[2],Hasil) - F;
  PJGOP[3] = LunarEclipse(JDEProsess[3],Hasil) - F;

  if (PJGOP[3] < 0) {
    JDE = JDEProsess[1];
  }
  if (PJGOP[0] > 0) {
    Result = 0;
    return;
  }
  
  for (let J = 0; J < 4; J++) {
    if (PJGOP[J] > 0) {
      JDE = JDEProsess[J - 1] - Intervals[I + 1];
      Result = JDE;
      I = I + 1;
      if (JDE < JDEAwal) {
        JDE = JDEAwal;
      }
      break;
    }
  }
}

}
return Result;
}


//tracking elong MIN
function JDEMINElongTracking(JDE) {
//Kegunaan : untuk menghitung JDE elongasi bulan dan matahari Geosentris terbesar
//Penggunaan : memasukkan JDEdalam bentuk desimal
//Oleh : Muhammad Wasil
//modifikasi : 28 Mei 2021

let JDEAwal = JDE;
let JDEProsess = [];
let Elong = [];
let Intervals = [1/24, 1/24/60, 1/24/60/60, 1/24/60/60/10, 1/24/60/60/100, 1/24/60/60/1000, 1/24/60/60/10000, 1/24/60/60/100000];
let ELONGMIN;
let Hasil;
let I = 0;
let J, k, l;

while (I < 7) {
for (J = 0; J <= 3; J++) {
if (J === 0) {
JDEProsess[J] = JDE;
} else {
JDEProsess[J] = JDE + Intervals[I] * J;
}
Elong[J] = MoonSunGeocentricElongation(JDEProsess[J]);
}


ELONGMIN = Elong[0];
for (k = 0; k <= 3; k++) {
  if (Elong[k] < ELONGMIN) ELONGMIN = Elong[k];
}

for (l = 0; l <= 3; l++) {
  if (Elong[l] === ELONGMIN) {
    if (l === 0 || l === 3) {
      JDE = JDEProsess[l] + Intervals[I] * (l - 1);
    } else {
      JDEMINElongTrackings = JDEProsess[l];
      JDE = JDEProsess[l] - Intervals[I + 1];
      I++;
    }
  }
}
}
return JDEMINElongTrackings;
}

function LocalSolarEclipse(JDE, LocalGeoLat, LocalGeoLong, Hasil) {
  // Kegunaan: untuk menghitung gerhana matahari secara lokal dalam geometri
  // Penggunaan: memasukkan JDE dalam bentuk desimal
  // Oleh: Muhammad Wasil
  // modifikasi: September 2016

  let Elongasi, JarakBumiMatahari, JarakBumiBulan, SudutBOA, SudutMOA, A_RektaM, A_RektaB,
    SelisihMoonGeoLong_SunGeoLong, SunGeoLat, SunGeolong, MoonGeoLat, MoonGeoLong, JD, Delt, UT, PW, PanjangM_B,
    Jari2Matahari, Jari2Bulan, SudutPuncakKerucutPanumbra, PanjangPuncakKerucutPanumbra_Bulan, PanjangBulan_BidangDasar,
    PanjangPuncakKerucutPanumbra_BidangDasar, Jari2Panumbra, SudutPuncakKerucutUmbra, PanjangPuncakKerucutUmbra_Bulan,
    PanjangPuncakKerucutUmbra_BidangDasar, Jari2Umbra;

  //===========
  let SelisihSunGeoLong_LocalGeoLong, SelisihMoonGeoLong_LocalGeoLong, JarakLocal_SunGeo, JarakLocal_MoonGeo,
    JarakMatahariTopo, JarakBulanTopo, ElongasiTopo, SudutBLA, SudutMLA, PanjangL_A, PanjangL_P1, PanjangL_U1,
    Keterangan;

  Elongasi = MoonSunGeocentricElongation(JDE);
  JarakBumiMatahari = SunGeocentricDistance(JDE, 'er');
  JarakBumiBulan = MoonGeocentricDistance(JDE, 'er');
 SudutBOA = radToDeg(Math.atan((JarakBumiMatahari * Math.cos(degToRad(Elongasi)) - JarakBumiBulan) / JarakBumiMatahari / Math.sin(degToRad(Elongasi))));
  SudutMOA = SudutBOA + Elongasi;
  PanjangM_B = Math.sqrt(JarakBumiMatahari * JarakBumiMatahari + JarakBumiBulan * JarakBumiBulan - 2 * JarakBumiMatahari * JarakBumiBulan * Math.cos(degToRad(Elongasi)));

  Delt = Deltat(JDE);
  JD = JDE - Delt / 86400;
  UT = JDKM(JD, 0, 'jamdes');
  PW = EquationOfTime(JD);
  A_RektaB = MoonApparentRightAscension(JDE);
  A_RektaM = SunApparentRightAscension(JDE);
  SelisihMoonGeoLong_SunGeoLong = A_RektaB - A_RektaM;
  SunGeoLat = SunApparentDeclination(JDE);
  SunGeolong = -15 * (UT + PW) + 180;
  MoonGeoLat = MoonApparentDeclination(JDE);
  MoonGeoLong = -15 * (ModFDiv(UT - SelisihMoonGeoLong_SunGeoLong / 15 + PW , 24)) + 180;

 Jari2Matahari = 109.2;
 Jari2Bulan = 0.2731;

 SelisihSunGeoLong_LocalGeoLong = SunGeolong - LocalGeoLong;
 SelisihMoonGeoLong_LocalGeoLong = MoonGeoLong - LocalGeoLong;

 JarakLocal_SunGeo = radToDeg(Math.acos(Math.sin(degToRad(SunGeoLat)) * Math.sin(degToRad(LocalGeoLat)) + Math.cos(degToRad(SunGeoLat)) * Math.cos(degToRad(LocalGeoLat)) * Math.cos(degToRad(SelisihSunGeoLong_LocalGeoLong))));
 JarakLocal_MoonGeo = radToDeg(Math.acos(Math.sin(degToRad(MoonGeoLat)) * Math.sin(degToRad(LocalGeoLat)) + Math.cos(degToRad(MoonGeoLat)) * Math.cos(degToRad(LocalGeoLat)) * Math.cos(degToRad(SelisihMoonGeoLong_LocalGeoLong))));

 JarakMatahariTopo = Math.sqrt(JarakBumiMatahari * JarakBumiMatahari + 1 - 2 * JarakBumiMatahari * Math.cos(degToRad(JarakLocal_SunGeo)));
 JarakBulanTopo = Math.sqrt(JarakBumiBulan * JarakBumiBulan + 1 - 2 * JarakBumiBulan * Math.cos(degToRad(JarakLocal_MoonGeo)));

 ElongasiTopo = radToDeg(Math.acos((JarakMatahariTopo ** 2 + JarakBulanTopo ** 2 - PanjangM_B ** 2) / 2 / JarakMatahariTopo / JarakBulanTopo));

 SudutBLA = radToDeg(Math.atan((JarakMatahariTopo * Math.cos(degToRad(ElongasiTopo)) - JarakBulanTopo) / JarakMatahariTopo / Math.sin(degToRad(ElongasiTopo))));
 SudutMLA = SudutBLA + ElongasiTopo;
 PanjangL_A = Math.cos(degToRad(SudutBLA)) * JarakBulanTopo;

//Calculate the values for the panumbra
 SudutPuncakKerucutPanumbra = radToDeg(Math.asin((Jari2Matahari + Jari2Bulan) / PanjangM_B));
 PanjangPuncakKerucutPanumbra_Bulan = Jari2Bulan * PanjangM_B / (Jari2Matahari + Jari2Bulan);
 PanjangBulan_BidangDasar = Math.sin(degToRad(SudutBLA)) * JarakBulanTopo;
 PanjangPuncakKerucutPanumbra_BidangDasar = PanjangPuncakKerucutPanumbra_Bulan + PanjangBulan_BidangDasar;
 Jari2Panumbra = Math.tan(degToRad(SudutPuncakKerucutPanumbra)) * PanjangPuncakKerucutPanumbra_BidangDasar;
 PanjangL_P1 = PanjangL_A - Jari2Panumbra;


// Calculate the values for the umbra
 SudutPuncakKerucutUmbra = radToDeg(Math.asin((Jari2Matahari - Jari2Bulan) / PanjangM_B));
 PanjangPuncakKerucutUmbra_Bulan = Jari2Bulan * PanjangM_B / (Jari2Matahari - Jari2Bulan);
 PanjangBulan_BidangDasar = Math.sin(degToRad(SudutBLA)) * JarakBulanTopo;
 PanjangPuncakKerucutUmbra_BidangDasar = -PanjangPuncakKerucutUmbra_Bulan + PanjangBulan_BidangDasar;
 Jari2Umbra = Math.tan(degToRad(SudutPuncakKerucutUmbra)) * Math.abs(PanjangPuncakKerucutUmbra_BidangDasar);
 PanjangL_U1 = PanjangL_A - Jari2Umbra;




if (PanjangL_P1 > 0) {
  Keterangan = 0;
}
if (PanjangL_P1 < 0) {
  Keterangan = 1;
}
if (PanjangL_U1 < 0) {
  Keterangan = 2;
}
if (PanjangPuncakKerucutUmbra_BidangDasar > 0) {
  Keterangan = 3;
}


let magnitudo =  PanjangL_P1 / (Jari2Umbra - Jari2Panumbra) ;

switch (Hasil.replace(/\s+/g, '').toUpperCase()) {
  case 'ELT':
    LocalSolarEclipses = ElongasiTopo;
    break;
  case 'PAR':
    LocalSolarEclipses = PanjangL_P1;
    break;
  case 'TOT':
    LocalSolarEclipses = PanjangL_U1;
    break;
  case 'KET':
    LocalSolarEclipses = Keterangan;
    break;
    case 'MAG':
    LocalSolarEclipses = magnitudo;
    break;
}
return LocalSolarEclipses;
}

//tracking elong MIN
function JDETopoMinElongTracking(JDE, lats, longs) {
//Kegunaan : untuk menghitung JDE elongasi bulan dan matahari Geosentris terbesar
//Penggunaan : memasukkan JDEdalam bentuk desimal
//Oleh : Muhammad Wasil
//modifikasi : 28 Mei 2021

let JDEProsess = [];
let Elong = [];
let Intervals = [1/24, 1/24/60, 1/24/60/60, 1/24/60/60/10, 1/24/60/60/100, 1/24/60/60/1000, 1/24/60/60/10000, 1/24/60/60/100000];
let ELONGMIN;
let Result;
let I = 0;
let J, k, l;

while (I < 7) {
for (J = 0; J <= 3; J++) {
if (J === 0) {
JDEProsess[J] = JDE;
} else {
JDEProsess[J] = JDE + Intervals[I] * J;
}
Elong[J] = LocalSolarEclipse(JDEProsess[J], lats, longs, "elt");
}


ELONGMIN = Elong[0];
for (k = 0; k <= 3; k++) {
  if (Elong[k] < ELONGMIN) ELONGMIN = Elong[k];
}

for (l = 0; l <= 3; l++) {
  if (Elong[l] === ELONGMIN) {
    if (l === 0 || l === 3) {
      JDE = JDEProsess[l] + Intervals[I] * (l - 1);
    } else {
      Result = JDEProsess[l];
      JDE = JDEProsess[l] - Intervals[I + 1];
      I++;
    }
  }
}
}
return Result;
}

function JDELocalContacts(JDE, LocalGeoLat, LocalGeoLong, Perihal) {
    //Kegunaan   :untuk menghitung JDE kontak-kontak penting gerhana matahari secara lokal meliputi, mulai hingga akhir
    //Penggunaan : memasukkan JDE elongasi terkecil toposentris serta koordinat lokasi dalam bentuk desimal
    //Oleh       : Muhammad Wasil
    //modifikasi : September 2016
		
  	var Hasil;
    var JDEAwal = JDE;
    var JDEProsess = [];
    var PJGOP = [];
    var Intervals = [1 / 24, 1 / 24 / 60, 1 / 24 / 60 / 60, 1 / 24 / 60 / 60 / 10, 1 / 24 / 60 / 60 / 100, 1 / 24 / 60 / 60 / 1000, 1 / 24 / 60 / 60 / 10000, 1 / 24 / 60 / 60 / 100000];
    var Hal;
    var I = 0;
    var J;

    switch (Perihal.trim().toUpperCase()) {
        case "P1":
            Hal = "PAR";
            SEBELUM();
            break;
        case "U1":
            Hal = "TOT";
            SEBELUM();
            break;
        case "U2":
            Hal = "TOT";
            SESUDAH();
            break;
        case "P2":
            Hal = "PAR";
            SESUDAH();
            break;
        default:
            return -1;
    }

    function SEBELUM() {
        while (I < 7) {
            JDEProsess[0] = JDE;
            JDEProsess[1] = JDE - Intervals[I];
            JDEProsess[2] = JDE - Intervals[I] * 2;
            JDEProsess[3] = JDE - Intervals[I] * 3;

            PJGOP[0] = LocalSolarEclipse(JDEProsess[0], LocalGeoLat, LocalGeoLong, Hal);
            PJGOP[1] = LocalSolarEclipse(JDEProsess[1], LocalGeoLat, LocalGeoLong, Hal);
            PJGOP[2] = LocalSolarEclipse(JDEProsess[2], LocalGeoLat, LocalGeoLong, Hal);
            PJGOP[3] = LocalSolarEclipse(JDEProsess[3], LocalGeoLat, LocalGeoLong, Hal);

            if (PJGOP[3] < 0) {
                JDE = JDEProsess[1];
            }
            if (PJGOP[0] > 0) {
                return -1;
            }

            for (J = 0; J < 4; J++) {
                if (PJGOP[J] > 0) {
                    JDE = JDEProsess[J - 1] + Intervals[I + 1];
                    Hasil = JDE;
                    I = I + 1;
                    if (JDE > JDEAwal) {
                        JDE = JDEAwal;
                    }
                    break;
                }
            }
        }
    }

    function SESUDAH() {
while (I < 7) {
JDEProsess[0] = JDE;
JDEProsess[1] = JDE + Intervals[I];
JDEProsess[2] = JDE + Intervals[I] * 2;
JDEProsess[3] = JDE + Intervals[I] * 3;


        PJGOP[0] = LocalSolarEclipse(JDEProsess[0], LocalGeoLat, LocalGeoLong, Hal);
        PJGOP[1] = LocalSolarEclipse(JDEProsess[1], LocalGeoLat, LocalGeoLong, Hal);
        PJGOP[2] = LocalSolarEclipse(JDEProsess[2], LocalGeoLat, LocalGeoLong, Hal);
        PJGOP[3] = LocalSolarEclipse(JDEProsess[3], LocalGeoLat, LocalGeoLong, Hal);

        if (PJGOP[3] < 0) {
            JDE = JDEProsess[1];
        }
        if (PJGOP[0] > 0) {
           return  -1;
          
        }

        for (J = 0; J < 4; J++) {
            if (PJGOP[J] > 0) {
                JDE = JDEProsess[J - 1] - Intervals[I + 1];
                Hasil = JDE;
                I = I + 1;
                if (JDE < JDEAwal) {
                    JDE = JDEAwal;
                }
                break;
            }
        }
    }
}
return Hasil;
}

//gerhana matahari global

function SolarEclipse(JDE, Perihal, Hasil) {
// Kegunaan :untuk menghitung gerhana matahari secara global dalam geometri
// Penggunaan : memasukkan JDEdalam bentuk desimal
// Oleh : Muhammad Wasil
// modifikasi : September 2016


let pi = 3.14159265359;

let Elongasi = MoonSunGeocentricElongation(JDE);
let JarakBumiMatahari = SunGeocentricDistance(JDE, "er");
let JarakBumiBulan = MoonGeocentricDistance(JDE, "er");
let SudutBOA = Deg(Atn((JarakBumiMatahari * Cos(Rad(Elongasi)) - JarakBumiBulan) / JarakBumiMatahari / Sin(Rad(Elongasi))));
let SudutMOA = SudutBOA + Elongasi;
let PanjangO_A = Cos(Rad(SudutBOA)) * JarakBumiBulan;
let PanjangM_B = Sqr(JarakBumiMatahari * JarakBumiMatahari + JarakBumiBulan * JarakBumiBulan - 2 * JarakBumiMatahari * JarakBumiBulan * Cos(Rad(Elongasi)));

let Delt = DELTAT(JDE);
let JD = JDE - Delt / 86400;
let UT = JDKM(JD, 0, "jamdes");
let PW = EquationOfTime(JD);
let A_RektaB = MoonApparentRightAscension(JDE);
let A_RektaM = SunApparentRightAscension(JDE);
let SelisihMoonGeoLong_SunGeoLong = A_RektaB - A_RektaM;
let SunGeoLat = SunApparentDeclination(JDE);
let SunGeolong = -15 * (UT + PW) + 180;
let MoonGeoLat = MoonApparentDeclination(JDE);
let MoonGeoLong = -15 * (ModFDiv(UT - SelisihMoonGeoLong_SunGeoLong / 15 + PW , 24)) + 180;
let AzimuthBulan = AzimuthWithCosine(MoonGeoLat, MoonGeoLong, SunGeoLat, SunGeolong);

let Jari2Matahari = 109.2;
let Jari2Bulan = 0.2731;

let SudutPuncakKerucutPanumbra = Deg(Asn((Jari2Matahari + Jari2Bulan) / PanjangM_B));
let PanjangPuncakKerucutPanumbra_Bulan = Jari2Bulan * PanjangM_B / (Jari2Matahari + Jari2Bulan);
PanjangBulan_BidangDasar = Sin(Rad(SudutBOA)) * JarakBumiBulan;
let PanjangPuncakKerucutPanumbra_BidangDasar = PanjangPuncakKerucutPanumbra_Bulan + PanjangBulan_BidangDasar;
let Jari2Panumbra = Tan(Rad(SudutPuncakKerucutPanumbra)) * PanjangPuncakKerucutPanumbra_BidangDasar;
let panjangO_P1 = PanjangO_A - Jari2Panumbra;
let PanjangO_P2 = PanjangO_A + Jari2Panumbra;

//=========
let SudutPuncakKerucutUmbra = Deg(Asn((Jari2Matahari - Jari2Bulan) / PanjangM_B));
let PanjangPuncakKerucutUmbra_Bulan = Jari2Bulan * PanjangM_B / (Jari2Matahari - Jari2Bulan);
PanjangBulan_BidangDasar = Sin(Rad(SudutBOA)) * JarakBumiBulan;
let PanjangPuncakKerucutUmbra_BidangDasar = -PanjangPuncakKerucutUmbra_Bulan + PanjangBulan_BidangDasar;
let Jari2Umbra = Tan(Rad(SudutPuncakKerucutUmbra)) * Abs(PanjangPuncakKerucutUmbra_BidangDasar);
let PanjangO_U1 = PanjangO_A - Jari2Umbra;
let PanjangO_U2 = PanjangO_A + Jari2Umbra;

let SelisihMOA_GROA = SudutMOA;
let GRGeoLat = Deg(Asn(Sin(Rad(SunGeoLat)) * Cos(Rad(SelisihMOA_GROA)) + Cos(Rad(SunGeoLat)) * Sin(Rad(SelisihMOA_GROA)) * Cos(Rad(AzimuthBulan))));
let SelisihGRGeoLong_SunGeoLong = Deg(Acs(-Tan(Rad(SunGeoLat)) * Tan(Rad(GRGeoLat)) + Cos(Rad(SelisihMOA_GROA)) / Cos(Rad(SunGeoLat)) / Cos(Rad(GRGeoLat))));
SelisihGRGeoLong_SunGeoLong = SelisihGRGeoLong_SunGeoLong * Sgn(SelisihMoonGeoLong_SunGeoLong);
let GRGeoLong = ModFDiv(SunGeolong + 180 + SelisihGRGeoLong_SunGeoLong, 360) - 180;

let AzimuthBulan2 = AzimuthWithCosine(MoonGeoLat, MoonGeoLong, GRGeoLat, GRGeoLong);

switch (Perihal.replace(/\s/g, "").toUpperCase()) {
case "P1":
HITP1();
break;
case "U1":
HITU1();
break;
case "S1":
HITS1();
break;
case "U2":
HITU2();
break;
case "P2":
HITP2();
break;
case "TG":
HITTG();
break;
case "P3":
HITP2();
break;
case "U3":
HITU2();
break;
case "S2":
HITS1();
break;
case "U4":
HITU1();
break;
case "P4":
HITP1();
break;
case "GR":
HITGR();
break;
case "KET":
HITKET();
break;
case "MAG":
HITMAG();
break;
case "PKN":
HITPKN();
break;
case "PKR":
HITPKR();
break;
case "UKN":
HITUKN();
break;
case "UKR":
HITUKR();
break;
case "TGH":
HITTGH();
break;
case "BTU":
HITBTU();
break;
case "ARH":
HITARH();
break;
}

function HITARH() {
  if (MoonGeoLat < SunGeoLat) {
    SolarEclipse = -1;
  } else {
    SolarEclipse = 1;
  }
  return;
}

function HITMAG() {
  if (PanjangO_A < 1) {
    TinggiGR = Math.sin(Rad(SudutSOA));
    PanjangPuncakKerucutPanumbra_GR = PanjangPuncakKerucutPanumbra_BidangDasar - TinggiGR;
    Jari2PanumbraGR = Math.tan(Rad(SudutPuncakKerucutPanumbra)) * PanjangPuncakKerucutPanumbra_GR;
    PanjangPuncakKerucutUmbra_GR = PanjangPuncakKerucutUmbra_BidangDasar + TinggiGR * Math.sign(PanjangPuncakKerucutPanumbra_BidangDasar);
    Jari2UmbraGR = Math.tan(Rad(SudutPuncakKerucutUmbra)) * Math.abs(PanjangPuncakKerucutUmbra_GR);
    Magnitudo = Jari2PanumbraGR / (Jari2PanumbraGR - Jari2UmbraGR);
  } else {
    Magnitudo = (Jari2Panumbra - (PanjangO_A - 1)) / (Jari2Panumbra - Jari2Umbra);
  }
  SolarEclipse = Magnitudo;
  return;
}

function HITGR(Hasil) {
  if (PanjangO_A < 1) {
    HITS1();
  }
  
  switch (Hasil.replace(/\s/g, '').toUpperCase()) {
    case "JDE":
      SolarEclipse = JDE;
      break;
    case "PJG":
      SolarEclipse = PanjangO_GR;
      break;
    case "LAT":
      SolarEclipse = GRGeoLat;
      break;
    case "LONG":
      SolarEclipse = GRGeoLong;
      break;
  }
  
  return SolarEclipse;
}


}
