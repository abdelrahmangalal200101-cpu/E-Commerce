# 🛍️ Blush — Full E-Commerce Experience (Frontend)

A fully functional, production-style e-commerce web application built to simulate a real-world online store experience from landing page to checkout and payment.

🔗 Live Demo: https://e-commerce-blush-nu-35.vercel.app

---

## 🚀 Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Authentication:** NextAuth.js
- **Payments:** Stripe + Cash on Delivery
- **Deployment:** Vercel

---

## ✨ Features

### 👤 Authentication
- User Registration & Login using NextAuth
- Forget / Reset Password flow
- Secure session handling
- User profile page

### 🛒 Shopping Experience
- Add to Cart
- Wishlist system
- Product Search
- Advanced Filters
- Categories
- Fully responsive UI

### 💳 Checkout & Payments
- Stripe payment integration
- Cash on Delivery option
- Complete checkout flow

### ⚙️ Architecture
- Clean folder structure
- Reusable components
- Global state handled with Context API
- Proper environment variables management for secure auth in production

---

## 🎯 Project Goal

This project was built to replicate a **real-world e-commerce architecture** focusing on:

- Production-level folder structure
- Authentication flow in Next.js apps
- State management without external libraries
- Real payment integration
- Deployment challenges with environment variables and NextAuth

---

## 🧠 Biggest Challenges

> The most challenging part of this project was handling **NextAuth configuration** and **environment variables during Vercel deployment**, especially managing:
>
> - `NEXTAUTH_SECRET`
> - `NEXTAUTH_URL`
>
> Ensuring authentication works correctly in production required deep understanding of how NextAuth behaves across environments.

---

## 🔐 Environment Variables

To run this project locally or deploy it correctly, you must configure the following environment variables.

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
