# E-Tamu

Aplikasi mobile **E-Tamu** adalah sistem manajemen kunjungan tamu untuk DPRD. Aplikasi ini dibangun menggunakan [**React Native**](https://reactnative.dev) dan terhubung dengan backend **Laravel API**.

## 📱 Fitur Utama

- **Autentikasi** - Login, Register, Logout dengan token-based authentication
- **Pengajuan Kunjungan** - Membuat pengajuan kunjungan baru dengan upload dokumen
- **Status Pengajuan** - Melihat status pengajuan (pending, disetujui, ditolak)
- **Riwayat Kunjungan** - Melihat riwayat pengajuan dengan filter bulan & tahun
- **Profile** - Melihat dan mengedit profil pengguna
- **Notifikasi** - Menerima notifikasi terkait pengajuan
- **Panduan** - Panduan penggunaan aplikasi

## 🛠️ Tech Stack

- **React Native** 0.77.0
- **React Navigation** - Navigasi antar halaman
- **Axios** - HTTP client untuk API calls
- **AsyncStorage** - Penyimpanan lokal untuk token & data user
- **React Native Vector Icons** - Icon library
- **React Native Date Picker** - Pemilihan tanggal & waktu
- **React Native Document Picker** - Upload dokumen (PDF, JPG, PNG)
- **React Native Element Dropdown** - Dropdown untuk kategori & sub-kategori

## 📋 Prerequisites

- Node.js >= 18
- React Native CLI
- Android Studio (untuk Android)
- Xcode (untuk iOS - macOS only)
- Backend Laravel API yang berjalan

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```sh
git clone <repository-url>
cd E-Tamu
npm install
```

### 2. Konfigurasi API

Ubah base URL API di `src/api/client.js`:

```javascript
// Untuk Android Emulator
const API_BASE_URL = 'http://10.0.2.2:8000/api';

// Untuk perangkat fisik, gunakan IP komputer Anda
// const API_BASE_URL = 'http://192.168.x.x:8000/api';
```

### 3. Jalankan Metro Bundler

```sh
npm start
```

### 4. Build & Run Aplikasi

#### Android

```sh
npm run android
```

#### iOS (macOS only)

```sh
# Install CocoaPods dependencies
bundle install
bundle exec pod install

# Run aplikasi
npm run ios
```

## 📁 Struktur Proyek

```
E-Tamu/
├── src/
│   ├── api/
│   │   └── client.js          # Axios instance & API configuration
│   ├── auth/
│   │   └── AuthContext.js     # Authentication context & state management
│   ├── pengajuan/
│   │   └── PengajuanContext.js # Pengajuan state management
│   └── screen/
│       ├── HomeScreen.js       # Halaman utama dengan list kunjungan
│       ├── LoginScreen.js      # Halaman login
│       ├── RegisterScreen.js   # Halaman registrasi
│       ├── ProfileScreen.js    # Halaman profil pengguna
│       ├── PengajuanScreen.js  # Halaman pengajuan kunjungan
│       ├── StsPengajuanScreen.js # Status pengajuan
│       ├── RiwayatScreen.js    # Riwayat pengajuan
│       └── ...
├── assets/
│   ├── fonts/                  # Custom fonts
│   ├── icon/                   # Icon assets
│   └── image/                  # Image assets
├── android/                    # Android native code
├── ios/                        # iOS native code
└── __tests__/                  # Unit tests
```

## 🔌 API Endpoints

Aplikasi ini terhubung dengan Laravel API dengan endpoint berikut:

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/login` | POST | Login pengguna |
| `/register` | POST | Registrasi pengguna baru |
| `/logout` | POST | Logout pengguna |
| `/profile` | GET | Mendapatkan data profil |
| `/profile` | PATCH | Update profil pengguna |
| `/categories` | GET | Daftar kategori |
| `/categories/{id}/sub-categories` | GET | Daftar sub-kategori |
| `/pengajuan` | GET | Daftar pengajuan |
| `/pengajuan` | POST | Membuat pengajuan baru |
| `/pengajuan/{nomor}` | GET | Detail pengajuan |
| `/pengajuan/years` | GET | Daftar tahun tersedia |

## 🧪 Testing

```sh
npm test
```

## 📝 Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm start` | Menjalankan Metro bundler |
| `npm run android` | Build & run di Android |
| `npm run ios` | Build & run di iOS |
| `npm run lint` | Menjalankan ESLint |
| `npm test` | Menjalankan Jest tests |

## 🐛 Troubleshooting

### Gradle Build Error (Windows)

Jika mengalami error Gradle pada Windows, coba:

```sh
cd android
gradlew.bat clean
cd ..
npm run android
```

### Metro Bundler Cache

Jika ada masalah dengan cache:

```sh
npm start -- --reset-cache
```

## 📄 License

Private Project - DPRD

---

Dibuat dengan ❤️ menggunakan React Native
