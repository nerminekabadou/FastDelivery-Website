# FastDelivery - NestJS Angular Project

## Overview
FastDelivery is a **NestJS-based** project in which users can register, login with authentication, select food from a menu and get deliveries wherever they are.

## Installation

1️⃣ Clone the Repository:
```bash
git clone https://github.com/nerminekabadou/FastDelivery-Website
```

2️⃣ Backend Setup:
```bash
cd backend
npm install
```

3️⃣ Frontend Setup:
```bash
cd frontend
npm install
```

4️⃣ Environment Configuration (in backend):

Create a .env file and configure the necessary environment variables such as database connection and JWT secret.

**Example**

DB_HOST=****

DB_PORT=****

DB_USERNAME=****

DB_PASSWORD=****

DB_DATABASE=****

#JWT

JWT_KEY=****

JWT_EXPIRE=****

5️⃣ Run the Application:
```bash
cd backend
npm run start:dev
```
Application runs on `http://localhost:3000`
```bash
cd frontend
ng serve
```
Application runs on `http://localhost:4200`