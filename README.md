## 📘 Editable Search List – Technical Assignment

### 📋 Overview

This is a React application built for the Ring Twice technical assignment. It allows users to filter, view, create, and review service providers. The project demonstrates a focus on component design, state management, UX, and integration with both backend and local storage.

---

### 🚀 Features

* ✅ **Search & Filter:** Filter users by service type and sort by rating or number of reviews
* ✅ **Editable List:** Create users and leave reviews; editable user details available
* ✅ **Persistence via localStorage:** Filters and user list state are cached locally
* ✅ **Clean UX/UI:** Chakra UI components with responsiveness and accessibility
* ✅ **React Query:** Handles data fetching and caching efficiently
* ✅ **Redux:** Manages the selected user state across pages
* ✅ **TypeScript:** Strict typing throughout the codebase

---

### 🧠 Tech Stack

* **Frontend:** React (Vite) + TypeScript
* **UI:** Chakra UI, chakra-react-select
* **State:** Redux Toolkit, React Query
* **Backend:** Fastify + Prisma + PostgreSQL
* **Data Caching:** localStorage
* **API Requests:** Axios

---

### 🧪 Getting Started

#### Backend

```bash
cd backend
npm install
docker compose up --build
npx prisma generate
npx prisma db push
npm run seeds
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

> Ensure PostgreSQL is running locally or with Docker (see docker-compose.yml).

---

### 🤖 AI Tooling Used

| Tool            | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| ChatGPT         | Prompted for architecture, debugging, and code refactors      |
| GitHub Copilot  | Generated hooks, type-safe form logic, and utility components |
| Cursor (VSCode) | Assisted with navigation and React patterns                   |

#### Examples:

* Generated backend route structures
* Suggested Prisma schema for relational user-service setup
* Helped resolve type errors with Zod/React Hook Form
* Provided `initialData` + localStorage caching logic

---

### ⚙️ Technical Notes

* **localStorage:** Used to persist filters and user list (cached on initial load)
* **Editable list:** Users can be reviewed (rating/comment), and optionally edited
* **API Sync:** After mutation, React Query updates the cache and syncs changes

---

### 🧠 Trade-offs

* Used Chakra UI for speed and consistency over full design customization
* Fastify chosen for control and fast backend iteration (vs Express)
* Manually handled localStorage rather than full offline-first implementation

---

### 🖥️ Optional Live Demo

Since the project includes a backend connected to a SQL database, using Vercel was not feasible — as the platform is primarily focused on frontend and serverless applications. Therefore, I chose to host the application on [Railway](http://railway.com/), which provides full support for backend services and relational databases, offering a better fit for the project’s stack.

Frontend: https://ring-frontend-production.up.railway.app/
Backend: https://ring-production-76d6.up.railway.app/

---

### 📂 Structure

```bash
.
├── backend
│   └── src/server.ts
├── frontend
│   ├── src/components
│   ├── src/pages
│   ├── src/api
│   └── src/types
└── README.md
```

---

### ✅ Final Notes

During the interview, I’ll demonstrate:

* How the architecture supports extensibility
* My reasoning for UI and data decisions
* How I used AI tools with caution and validation
* Potential directions for improving editability and offline features
