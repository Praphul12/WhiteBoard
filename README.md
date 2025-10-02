# 🎨 CollaBoard

A **full-stack collaborative whiteboard** built with **React**, **Node.js**, **Express**, **MongoDB**, and **Canvas API**.  
Draw, annotate, save, and collaborate in real time — directly in the browser.

[![Live Demo](https://img.shields.io/badge/Try%20it%20Live-Vercel-brightgreen)](https://white-board-rosy.vercel.app/)  
[Frontend Repo](https://github.com/Praphul12/WhiteBoard) | [Backend Repo](https://github.com/Praphul12/CollaBoard-backend)

---

## 🎥 Demo

![Board Demo](Demo/draw-tools.gif)  
*Real-time multi-user collaboration: drawing, annotating, saving, and loading boards.*

---

## 🖼 Screenshot

![Full App UI](Demo/full-app.png)

---

## ✨ Frontend Features

- 🖊 **Freehand Drawing** — Pen and brush tools  
- 📏 **Shape Tools** — Rectangle, circle, arrow with Rough.js  
- 🔤 **Text Annotations** — Add text anywhere on the canvas  
- 🎨 **Custom Styling** — Color palette and stroke size control  
- 🧹 **Eraser Tool** — Remove parts of the drawing  
- ↩️ **Undo & Redo** — Buttons or keyboard shortcuts  
- 💾 **Export** — Save board as a high-quality PNG  

---

## 🔧 Backend Features

- 👥 **User Authentication** — Sign up/login using JWT  
- 🌐 **Persistent Boards** — Save and load boards from MongoDB  
- 🔄 **Real-Time Collaboration** — Multiple users can edit the same board at once via **Socket.io**  
- 🔑 **Secure Access** — Only authorized users can modify their boards  

---

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| **React** | Frontend framework |
| **HTML5 Canvas API** | Drawing logic |
| **Rough.js** | Hand-drawn style for shapes |
| **Tailwind CSS** | Styling |
| **Node.js + Express** | Backend API |
| **MongoDB** | Persistent storage for boards and users |
| **Socket.io** | Real-time collaboration |
| **JWT** | Authentication |
| **Vercel / Render / Heroku** | Deployment |

---

## 🏗 Architecture

```text
Frontend (React + Canvas)
       │
       ▼
Backend (Node.js + Express + Socket.io)
       │
       ▼
MongoDB (Users & Boards)
```
## 🛣 API Endpoints

- **POST** `/register` – Create a new user  
- **POST** `/login` – Log in a user
- **GET** `/profile` – GET JWT and authorize user 
- **GET** `/canvas/` – Get all boards for the authenticated user  
- **POST** `/canvas/create` – Create a new canvas  
- **PUT** `/canvas/update` – Update a canvas by ID  
- **POST** `/canvas/share/:id` – Share a canvas by ID  
- **POST** `/canvas/delete` – Delete the canvas (if owner)  

> Real-time updates are handled by **Socket.io** and are not available via REST endpoints.
