# Backend Jasa Tukang Bangunan

> **⚠️ Dalam Pengembangan**: Proyek ini masih dalam tahap awal development. Hanya setup dasar (tools, struktur, testing) yang telah selesai. Fitur bisnis seperti booking, payment, dan autentikasi belum diimplementasi.

Backend API untuk aplikasi jasa tukang bangunan yang memungkinkan client memesan jasa konstruksi, perbaikan, dan maintenance. Dibangun dengan Node.js, TypeScript, Express, dan Prisma ORM.

## 🚀 Status Pengembangan

### ✅ Sudah Selesai (Setup & Infrastructure)

- Project structure dan konfigurasi
- TypeScript setup dengan tsx
- ESLint & Prettier untuk code quality
- Jest untuk testing (unit tests untuk utilities)
- Winston logging
- Environment configuration dengan Zod
- **Prisma ORM setup lengkap dengan schema database**
- Express app basic setup
- Git setup dengan .gitignore

### 🔄 Dalam Pengembangan

- Autentikasi & Otorisasi (JWT)
- API routes untuk user, booking, payment
- Database migrations dan seeding
- Integration Midtrans untuk payment
- Middleware (auth, validation, error handling)
- Testing integration untuk API endpoints

### 📋 Direncanakan

- Role-based access control
- File upload handling
- Rate limiting
- API documentation (Swagger)
- Deployment setup

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MySQL dengan Prisma ORM
- **Authentication**: JWT (jsonwebtoken) - _belum diimplementasi_
- **Validation**: Zod
- **Logging**: Winston
- **Testing**: Jest + Supertest
- **Payment**: Midtrans - _belum diintegrasi_
- **Linting**: ESLint + Prettier
- **Process Management**: Nodemon

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MySQL dengan Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Logging**: Winston
- **Testing**: Jest + Supertest
- **Payment**: Midtrans
- **Linting**: ESLint + Prettier
- **Process Management**: Nodemon

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm atau yarn
- MySQL database
- Git

## 🔧 Installation

1. **Clone repository**:

   ```bash
   git clone <repository-url>
   cd backend-worker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Buat file `.env` di root folder:

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="mysql://username:password@localhost:3306/db_name"
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   MAX_FILE_SIZE=5242880
   UPLOAD_DIR=uploads
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Setup database**:

   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate

   # (Optional) Seed database
   npm run prisma:seed
   ```

## 🏃‍♂️ Running the App

### Development

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000` dengan hot reload.

### Production

```bash
npm run build
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- __tests__/utils/apiError.test.ts

# Run with coverage
npm test -- --coverage
```

## 📊 Database Schema

> **✅ Sudah Diimplementasi**: Schema Prisma lengkap dengan semua model, relasi, dan enum. Siap untuk migration.

### Entity Relationship Diagram (ERD)

```
User (many) ---- UserRole (pivot) ---- (many) Role
   |
   | (1-to-1)
   v
Profile

User (client) (1) -----> (many) Booking <----- (1) Service
       |                |
       |                |
       v                v
  Review (many) <-- Booking (1) --> Payment (1)
       ^
       |
  User (client) [as reviewer]
```

### Models (Prisma Schema)

- **✅ User**: Pengguna sistem (client/admin) - menggunakan UUID
- **✅ Profile**: Detail tambahan user - menggunakan UUID
- **✅ Role**: Role sistem (client, admin) - menggunakan UUID
- **✅ UserRole**: Pivot table untuk many-to-many user-role - menggunakan UUID
- **✅ Layanan**: Jenis jasa (konstruksi, perbaikan, maintenance) - menggunakan UUID
- **✅ Pemesanan**: Pemesanan jasa - menggunakan UUID
- **✅ Ulasan**: Ulasan booking - menggunakan UUID
- **✅ Pembayaran**: Data pembayaran (integrasi Midtrans) - menggunakan UUID

Semua model menggunakan **UUID sebagai primary key** dan memiliki `createdAt` serta `updatedAt`. Nama tabel dalam database menggunakan bahasa Indonesia.

Lihat `prisma/schema.prisma` untuk detail schema lengkap.

## 📁 Project Structure

```
backend-worker/
├── src/
│   ├── config/          # Konfigurasi (database, env, app)
│   ├── utils/           # Utilities (jwt, logger, apiResponse, dll.)
│   ├── routes/          # API routes
│   ├── app/             # Middleware dan helpers
│   └── server.ts        # Entry point
├── __tests__/           # Test files
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── .env                 # Environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies dan scripts
├── tsconfig.json        # TypeScript config
├── jest.config.mjs      # Jest config
├── eslint.config.mjs    # ESLint config
└── README.md
```

## 🔐 Environment Variables

| Variable                  | Description                  | Default       |
| ------------------------- | ---------------------------- | ------------- |
| `NODE_ENV`                | Environment mode             | `development` |
| `PORT`                    | Server port                  | `5000`        |
| `DATABASE_URL`            | MySQL connection string      | -             |
| `JWT_SECRET`              | JWT signing secret           | -             |
| `JWT_EXPIRES_IN`          | JWT expiration time          | `7d`          |
| `MAX_FILE_SIZE`           | Max upload file size (bytes) | `5242880`     |
| `UPLOAD_DIR`              | Upload directory             | `uploads`     |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit window (ms)       | `900000`      |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window      | `100`         |

## 🗺️ Roadmap & Next Steps

Karena proyek masih dalam development awal, berikut roadmap implementasi:

1. **✅ Setup Infrastructure**: Project structure, TypeScript, testing, linting.
2. **✅ Database Schema**: Prisma schema lengkap dengan semua model dan relasi.
3. **✅ Database Setup**: Migration berhasil, database siap digunakan dengan data seed awal.
4. **🔄 Authentication**: Implement JWT auth dengan middleware.
5. **📋 User Management**: CRUD untuk User, Profile, dan Role.
6. **📋 Service Management**: CRUD untuk Service categories.
7. **📋 Booking System**: API untuk create/update booking dengan status tracking.
8. **📋 Payment Integration**: Integrasi Midtrans untuk payment processing.
9. **📋 Review System**: API untuk ulasan dan rating.
10. **📋 Testing Expansion**: Tambah integration tests untuk semua API endpoints.
11. **📋 API Documentation**: Swagger/OpenAPI docs.
12. **📋 Deployment**: Setup CI/CD dan production deployment.

## 🧪 Testing

Proyek ini menggunakan Jest untuk testing. Test files ada di folder `__tests__`.

### Test Coverage

- **Unit Tests**: Testing utilities (ApiError, ApiResponse, JWT, Pagination)
- **Integration Tests**: _Belum ada_ - akan ditambahkan setelah API routes diimplementasi

### Menjalankan Test

```bash
# Semua test
npm test

# Dengan coverage
npm test -- --coverage

# Test spesifik
npm test -- __tests__/utils/jwt.test.ts
```

## 📚 Scripts

| Command                   | Description                  |
| ------------------------- | ---------------------------- |
| `npm run dev`             | Jalankan development server  |
| `npm run build`           | Build untuk production       |
| `npm start`               | Jalankan production server   |
| `npm test`                | Jalankan semua test          |
| `npm run lint`            | Lint code dengan ESLint      |
| `npm run format`          | Format code dengan Prettier  |
| `npm run prisma:migrate`  | Jalankan database migrations |
| `npm run prisma:generate` | Generate Prisma client       |
| `npm run prisma:seed`     | Seed database                |

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- Project Link: [GitHub Repository]
- Email: your-email@example.com

---

**⚠️ Catatan Penting**: Proyek ini masih dalam tahap awal development. Hanya setup infrastruktur yang telah selesai. Fitur bisnis seperti autentikasi, booking, dan payment belum diimplementasi. Lihat [Roadmap](#-roadmap--next-steps) untuk progress selanjutnya.

Pastikan database MySQL sudah setup dan environment variables sudah diisi dengan benar sebelum menjalankan aplikasi.</content>
<parameter name="filePath">d:\Projek\midtrans\fullstack-worker\backend-worker\README.md
