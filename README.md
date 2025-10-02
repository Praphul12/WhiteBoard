# 🧠 CollaBoard

An interactive, **full-stack collaborative whiteboard** built with **React**, **Node.js**, **Express**, **MongoDB**, and **Canvas API**.  
Draw, annotate, save, and collaborate in real time — all in the browser.

[![Live Demo](https://img.shields.io/badge/Try%20it%20Live-Vercel-brightgreen)](https://white-board-rosy.vercel.app/)  
[![Frontend Repo](https://img.shields.io/badge/Frontend-GitHub-blue)](https://github.com/Praphul12/WhiteBoard)  
[![Backend Repo](https://img.shields.io/badge/Backend-GitHub-orange)](https://github.com/Praphul12/CollaBoard-backend)

---

## 🎥 Demo

![Drawing & Collaboration](Demo/collab-demo.gif)  
*Real-time multi-user collaboration: drawing, annotating, and updating boards simultaneously.*

---

## 🖼 Screenshot

![Full App UI](Demo/full-app.png)

---

## ✨ Features

- 🖊 **Freehand Drawing** — Pen and brush tools for smooth sketching  
- 📏 **Shape Tools** — Rectangle, circle, and arrow with Rough.js  
- 🔤 **Text Annotations** — Add text anywhere on the canvas  
- 🎨 **Custom Styling** — Full color palette and stroke size control  
- 🧹 **Eraser Tool** — Remove specific parts of the drawing  
- ↩️ **Undo & Redo** — Keyboard shortcuts and buttons  
- 💾 **Export** — Save your board as a high-quality PNG  
- 👥 **User Authentication** — Sign up/login with email and password (JWT)  
- 🌐 **Persistent Storage** — Boards saved in **MongoDB**  
- 🔄 **Real-Time Collaboration** — Multiple users can edit the same board at once  

---

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| **React** | Frontend framework |
| **HTML5 Canvas API** | Drawing logic |
| **Rough.js** | Hand-drawn style for shapes |
| **Tailwind CSS** | Styling |
| **Node.js + Express** | Backend API |
| **MongoDB** | Database for storing users and boards |
| **Socket.io** | Real-time collaboration |
| **JWT** | Authentication & session management |
| **Vercel / Render / Heroku** | Deployment |

---

## ⚙️ How It Works

1. **Frontend (React + Canvas API)**  
   - Users interact with the canvas using drawing tools, shapes, text, and colors.  
   - Actions are sent to the backend for persistence and collaboration.  

2. **Backend (Node.js + Express)**  
   - Handles **authentication** and **authorization** using JWT.  
   - **Saves and retrieves boards** from MongoDB.  
   - Broadcasts drawing updates to all connected users via **Socket.io**.  

3. **Database (MongoDB)**  
   - Stores user accounts, board data, and metadata for real-time collaboration.  

4. **Real-Time Collaboration**  
   - Socket.io ensures all participants see changes instantly.  
   - Supports multiple users editing the same board concurrently.  

---

## 🛣 Roadmap

- [x] User authentication (JWT)  
- [x] Save/load boards from database  
- [x] Real-time multi-user collaboration  
- [ ] Chat integration alongside drawing  
- [ ] AI-assisted sketch generation or recognition  

---

## 📦 Run Locally

### Backend
```bash
git clone https://github.com/Praphul12/CollaBoard-backend.git
cd CollaBoard-backend
npm install
npm run dev
