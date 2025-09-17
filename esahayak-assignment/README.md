# 🏡 Buyer Management App

A simple **Next.js 15 + Prisma + TypeScript** app to manage buyers.  
Features include creating, viewing, editing, and listing buyers with validations.

---

## 🚀 Features
- Create a new buyer  
- View all buyers in a styled table  
- Edit buyer details  
- Automatic form validation (Zod)  
- Navigation between pages (Buyers List ↔ Create Buyer ↔ Edit Buyer)  

---

## 📦 Tech Stack
- **Next.js 15** (App Router)  
- **React 18**  
- **TypeScript**  
- **Prisma** (ORM)  
- **SQLite** (default DB, can switch to PostgreSQL/MySQL)  
- **Tailwind CSS** for styling  
- **Zod** for validation  

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create a `.env` file:
```env
DATABASE_URL="file:./dev.db"
```

### 4. Run Prisma migrations
```bash
npx prisma migrate dev --name init
```

### 5. Start the dev server
```bash
npm run dev
```

App will be running at 👉 [http://localhost:3000](http://localhost:3000)

---

## 🖼️ Pages
- `/buyers` → Buyers list  
- `/buyers/new` → Create new buyer  
- `/buyers/[id]` → Edit buyer  

---

## ✅ How It Works
1. Start at `/buyers` to see the buyer list.  
2. Use **"Create New Buyer"** button to add buyers.  
3. Click **"Edit Buyer"** to update an existing buyer.  
4. After submitting, you’ll be redirected back to the buyers list.  

---

## 📜 License
MIT License  

## just run npm install before running npm server to install node modules

