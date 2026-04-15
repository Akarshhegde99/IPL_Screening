# 🏏 Harvey's Cafe - IPL Match Booking System

Welcome to the **Harvey's Cafe IPL Table Booking System**! This full-stack application allows cricket fans to reserve tables at Harvey's Cafe for upcoming IPL matches. It provides a seamless booking experience, complete with dynamic match listings, secure payments, and QR code digital tickets.

---

## ✨ Features

- **Match Listings:** View upcoming IPL matches with team details and match schedules.
- **Table Booking:** Browse through available tables and select the perfect spot for the game.
- **Secure Payments:** Integrated with Stripe for smooth, safe checkout experiences.
- **Digital Tickets:** Generates a unique QR code upon a successful booking for quick entry at the cafe.
- **User Authentication:** Secure user login and registration powered by JWT.
- **Responsive UI:** A stunning, modern interface built with React and Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** with **Vite** for fast development and optimized builds
- **Tailwind CSS** for a clean, responsive, and modern user interface
- **React Router** for seamless navigation
- **Axios** for handling HTTP requests to the backend
- **Stripe React Elements** for processing secure payments
- **QRCode.react** & **Lucide React** for ticket generation and beautiful icons

### Backend
- **Spring Boot (Java 17)** architecture offering a robust, scalable backend
- **Spring Security** combined with **JWT** for robust authentication and protection
- **Spring Data JPA** for seamless database interactions
- **H2 Database** (for local development) / **MySQL** (for production environments)
- **Stripe Java SDK** for backend payment intent verification and processing
- **ZXing core** for backend QR code generation/management

---

## 🚀 Getting Started

Want to run this locally? Follow these simple steps!

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v18 or higher)
- Java Development Kit (JDK) 17
- Maven (or use the provided Maven wrapper)

### 1. Clone the Workspace
Open your terminal and navigate to your preferred workspace:
```bash
git clone <your-repository-url>
cd IPL_HarveysCafe
```

### 2. Start the Backend API
The Spring Boot backend will run on `http://localhost:8080`.

```bash
cd backend

# For Windows:
./mvnw.cmd spring-boot:run

# For Mac/Linux:
./mvnw spring-boot:run
```
*(Note: Ensure your Stripe Secret Key and any required properties are set in `backend/src/main/resources/application.properties`)*

### 3. Start the Frontend App
The Vite development server will run on `http://localhost:5173`.

```bash
cd ../frontend

# Install all required dependencies
npm install

# Start the development server
npm run dev
```
*(Note: Ensure you have your `.env` variables mapped, particularly your `VITE_REACT_APP_STRIPE_PUBLIC_KEY`)*

---

## 📁 Project Structure

```text
IPL_HarveysCafe/
├── backend/          # Contains all Java/Spring Boot code (Controllers, Services, Security)
├── frontend/         # Contains all React code (Pages, Components, Context, Utils)
└── DEPLOYMENT.md     # Specific deployment configurations and scripts
```

---

## ☕ Enjoy the Match!
Grab a seat, order your favorite food, and enjoy the IPL season at Harvey's Cafe!
