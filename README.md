# Shahzaib's MERN Stack Portfolio

A modern, immersive, full-stack Next.js portfolio built with Tailwind CSS, Framer Motion, Express.js, and MongoDB.

## 🚀 Features
- **Dynamic Projects:** An integrated secret admin panel to upload images, edit, and delete portfolio projects in real-time.
- **Email Integration:** A fully functional `Nodemailer` contact form that sends emails directly to your Gmail.
- **Glassmorphism UI:** Premium modern design featuring floating Navbars, glowing background rings, and animated scrolling.
- **Fully Responsive & SEO Optimized**

---

## 💻 Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS v4, Framer Motion, React Icons
- **Backend:** Node.js, Express.js, Multer (Image Uploads), Nodemailer (Emails), Mongoose
- **Database:** MongoDB

---

## 🛠️ How to Run Locally

### 1. Start the Backend Server
Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install
npm run dev
```
*(The backend will start and run on `http://localhost:5000`)*

**Backend Environment Variables:**
Make sure you have a `.env` file inside your `/backend` folder with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
EMAIL_USER=malikshahzaib688343@gmail.com
EMAIL_PASS=your_google_app_password
ADMIN_CODE=shahzaib123
```

### 2. Start the Frontend Server
Open a separate second terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
*(The frontend will compile and launch on `http://localhost:3000`)*

---

## 👑 How to Use the Secret Admin Panel

The portfolio comes with an exclusive, hidden UI that allows you to cleanly manage the Projects section using native React without ever touching the code.

1. Open your browser and go to your home page. Simply append `?admin=true` to the URL. (Example: `http://localhost:3000/?admin=true`)
2. Scroll down to the **Projects showcase**.
3. You will now permanently see floating **Add**, **Edit (pencil)**, and **Delete (trash)** buttons on the glass project cards!
4. Clicking these buttons will open a sleek dark-themed pop-up modal where you can fill out project descriptions, paste your live/GitHub URLs, and upload thumbnail images securely straight from your file explorer into the server.
5. When submitting any edits or additions, it will ask for an Admin Security Code. Input: `shahzaib123` to authenticate.

---

## 📧 How the Contact Form Works
When visitors submit a message through the Contact Form at the bottom of the landing page, the data is pushed straight to your backend Express server.
The server will synchronously:
1. Store a backup of the message in your MongoDB database.
2. Leverage Nodemailer to instantly dispatch an email forwarding exactly what the client submitted directly into your personal `malikshahzaib688343@gmail.com` inbox so you never miss a lead!
