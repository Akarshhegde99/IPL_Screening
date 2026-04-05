# Deployment Guide for Harvey's Cafe IPL App

## Prerequisites
- Railway Account (for MySQL)
- Render Account (for Spring Boot Backend)
- Vercel Account (for React Frontend)
- Stripe Account (Optional)

---

## 1. Database Deployment (Railway)
1. Go to [Railway](https://railway.app/).
2. Click **New Project** -> **Provision MySQL**.
3. Once deployed, click on the MySQL service, navigate to the **Variables** tab.
4. Note down the `MYSQL_URL`, `MYSQL_USER`, `MYSQL_PASSWORD`.

---

## 2. Backend Deployment (Render)
1. Push your `backend` directory to a GitHub repository.
2. Go to [Render](https://render.com/) and create a **New Web Service**.
3. Connect your repository and select the `backend` folder as the Root Directory.
4. Choose **Java** as the environment (or Docker if you added a Dockerfile).
5. Build Command: `./mvnw clean package -DskipTests`
6. Start Command: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
7. Set the Environment Variables:
   - `spring.datasource.url`: `jdbc:mysql://[RAILWAY_MYSQL_URL]/harveyscafe_ipl`
   - `spring.datasource.username`: `[RAILWAY_USER]`
   - `spring.datasource.password`: `[RAILWAY_PASSWORD]`
   - `app.jwt.secret`: `<generate-a-secure-random-256bit-string>`
   - `stripe.api.key`: `sk_test_...` (or use the fallback default)
8. Deploy the service and note the backend URL (e.g., `https://harveys-backend.onrender.com`).

---

## 3. Frontend Deployment (Vercel)
1. Push your `frontend` directory to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) -> **Add New Project**.
3. Import your repository and select the `frontend` folder as the Root Directory.
4. Add the Environment Variable:
   - `VITE_API_URL`: `https://harveys-backend.onrender.com/api` (URL from step 2).
5. Click **Deploy**.

---

## Post-Deployment Actions
- **Admin Panel URL**: `/admin/login` (Default key: `harveys123`).
- **QR Codes**: Ensure that the QR Code generation uses absolute tracking paths if you integrate exact domain routing logic in the future.
- **Fail Safe**: If Stripe is misconfigured or fails in production, the payment logic falls back to `PENDING`, allowing the user to pay at the counter without losing the table reservation.
