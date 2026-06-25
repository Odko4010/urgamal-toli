# 🌿 Монгол Ургамлын Нэрийн Тайлбар Толь

Монгол орны гуурст дээд ургамлын хураангуйлсан нэрийн жагсаалтын вэб систем.

## Технологи

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **ORM**: Prisma
- **Database**: PostgreSQL (pgAdmin-ээр удирдана)

## Суулгах заавар

### 1. PostgreSQL & pgAdmin тохиргоо

pgAdmin нээж шинэ database үүсгэнэ:
```
Database нэр: urgamal_toli
```

### 2. Төслийг татаж суулгах

```bash
npm install
```

### 3. .env файл тохируулах

`.env` файлд database connection оруулна:
```env
DATABASE_URL="postgresql://postgres:ТАНЫ_НУУЦ_ҮГ@localhost:5432/urgamal_toli?schema=public"
```

### 4. Database schema үүсгэх

```bash
npx prisma db push
```

Эсвэл migration ашиглах:
```bash
npx prisma migrate dev --name init
```

### 5. Өгөгдөл оруулах (Seed)

**Арга 1 — SQL файлаар (хялбар):**

pgAdmin дээр Query Tool нээж `prisma/seed.sql` файлыг нааж ажиллуулна.

**Арга 2 — npm script-ээр:**
```bash
npm install ts-node --save-dev
npx prisma db seed
```

### 6. Вэбсайт ажиллуулах

```bash
npm run dev
```

Хөтчөөр нээх: [http://localhost:3000](http://localhost:3000)

## Хуудсууд

| URL | Тайлбар |
|-----|---------|
| `/` | Нүүр хуудас |
| `/toli` | Тайлбар толь — хайлт, шүүлт |
| `/stats` | Статистик мэдээлэл |

## API Endpoints

| Endpoint | Тайлбар |
|----------|---------|
| `GET /api/urgamal` | Жагсаалт (хайлт, шүүлт, pagination) |
| `GET /api/urgamal?q=хялгана` | Нэрэнд хайх |
| `GET /api/urgamal?nas=олон наст` | Насаар шүүх |
| `GET /api/urgamal?amjdral=өвслөг` | Амьдралын хэлбэрээр |
| `GET /api/urgamal?bueleg=үетэн` | Аж ахуйн бүлгээр |
| `GET /api/urgamal/stats` | Статистик |
| `GET /api/urgamal/[id]` | Нэг ургамлын дэлгэрэнгүй |

## Өгөгдлийн бүтэц

```
Urgamal {
  id              - Дугаар
  mn_code         - Монгол товчлол (жнь: ХЯСТ)
  mn_name         - Монгол нэр (жнь: Стипагийн хялгана)
  lat_code        - Латин товчлол (жнь: STKR)
  latin_name      - Латин нэр (жнь: Stipa Krylovii)
  nas             - Нас (олон наст / нэг наст / хоёр наст)
  amjdral_helber  - Амьдралын хэлбэр (өвслөг / модлог / сөөглөг)
  aj_ahuin_bueleg - Аж ахуйн бүлэг (алаг өвс / үетэн гэх мэт)
}
```

## Эх сурвалж

В.И.Грубовын "Монголын гуурст ургамал таних бичиг" + Н.Өлзийхутагийн "БНМАУ-ын бэлчээр, хадлан дахь тэжээлийн ургамал таних бичиг"

Боловсруулсан: Монголын Бэлчээрийн Менежментийн Холбоо (МБМХ)
