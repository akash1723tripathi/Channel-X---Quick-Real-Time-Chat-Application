# Channel-X 💬

**A Quick Real-Time Chat Application**

Channel-X is a full-stack real-time chat application built with React and Node.js, enabling users to communicate instantly with a clean, responsive UI. Live at [channelx.onrender.com](https://channelx.onrender.com).

<img width="1592" height="770" alt="Screenshot 2026-02-23 020207" src="https://github.com/user-attachments/assets/475b3333-8cae-4aec-ae38-22f72516896e" />

<img width="1590" height="781" alt="Screenshot 2026-02-23 020154" src="https://github.com/user-attachments/assets/be4eb78b-8c99-463e-a10d-3dc838e6a05b" />

---

## ✨ Features

- **Real-Time Messaging** — Instant message delivery powered by Socket.io
- **User Authentication** — Secure signup and login with JWT-based session management and bcrypt password hashing
- **Profile Pictures** — Upload and manage profile avatars via Cloudinary image hosting
- **Online Presence** — See which users are currently online in real time
- **Toast Notifications** — Friendly in-app alerts for actions and errors
- **Responsive UI** — Clean, mobile-friendly interface built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS 4 | Styling |
| Socket.io Client | Real-time communication |
| Axios | HTTP requests |
| React Router DOM | Client-side routing |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| Socket.io | WebSocket server |
| MongoDB + Mongoose | Database |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Cloudinary + Multer | Image upload & storage |
| dotenv | Environment configuration |

---

## 📁 Project Structure

```
Channel-X/
├── frontend/          # React + Vite client
│   ├── src/
│   └── package.json
├── backend/           # Node.js + Express server
│   ├── server.js
│   └── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the repository

```bash
git clone https://github.com/akash1723tripathi/Channel-X---Quick-Real-Time-Chat-Application.git
cd Channel-X---Quick-Real-Time-Chat-Application
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### 3. Set up the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔧 Available Scripts

### Backend

| Script | Description |
|---|---|
| `npm run dev` | Start server with nodemon (hot reload) |
| `npm start` | Start server in production mode |
| `npm run build` | Install dependencies (for deployment) |

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🌐 Deployment

The application is deployed on Render. To deploy your own instance:

1. Push your code to GitHub
2. Create a **Web Service** on [Render](https://render.com) for the backend, pointing to the `backend` directory
3. Create a **Static Site** on Render for the frontend, pointing to the `frontend` directory with build command `npm run build` and publish directory `dist`
4. Set all environment variables in the Render dashboard

---


Made with ❤️ by Akash Tripathi
