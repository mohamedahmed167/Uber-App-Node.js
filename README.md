# 🚗 RYVO — Ride Hailing Backend API

RYVO is a **ride-hailing backend API** built with **Node.js, Express.js, TypeScript, and MongoDB**.

The project provides the core backend functionality of a ride-hailing application, including user authentication, ride management, driver availability, location search, currency conversion, API validation, error handling, and interactive API documentation.

The project was developed to practice building a real-world backend application using a structured and maintainable architecture.

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Protected API routes
- Password hashing using bcrypt
- Authentication middleware
- Secure handling of authenticated users

### 🚕 Ride Management

- Create rides
- Retrieve ride information
- Manage ride status
- Cancel rides
- Assign drivers to rides
- Manage driver availability
- Passenger and driver ride workflows

### 📍 Location Search

RYVO integrates with the **OpenStreetMap Nominatim API** to provide location search functionality.

The API can search for locations and return:

- Location name
- Latitude
- Longitude
- Location type

Example:

```http
GET /api/locations/search?query=Maadi
```

Example response:

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "name": "Maadi, Cairo, Egypt",
      "latitude": 29.9602,
      "longitude": 31.2569,
      "type": "suburb"
    }
  ]
}
```

### 💱 Currency Conversion

RYVO supports currency conversion for ride prices using the **Frankfurter API**.

Example:

```http
GET /api/currency/convert?amount=100&from=SAR&to=EGP
```

Example response:

```json
{
  "success": true,
  "data": {
    "amount": 100,
    "from": "SAR",
    "to": "EGP",
    "rate": 13.66,
    "convertedAmount": 1366
  }
}
```

The backend retrieves the exchange rate and calculates the converted amount based on:

```text
convertedAmount = amount × exchangeRate
```

### 🛡️ Validation & Error Handling

- Request validation
- Authentication validation
- Proper HTTP status codes
- Structured API responses
- Error handling for external API requests
- Meaningful error messages

### 📚 API Documentation

The project uses **Swagger / OpenAPI** to provide interactive API documentation.

Swagger allows developers to:

- Explore API endpoints
- View request parameters
- Test APIs directly
- Test protected endpoints using Bearer tokens
- Inspect API responses

---

## 🛠️ Tech Stack

| Technology                  | Purpose                       |
| --------------------------- | ----------------------------- |
| **Node.js**                 | Backend runtime               |
| **Express.js**              | REST API framework            |
| **TypeScript**              | Type-safe backend development |
| **MongoDB**                 | Database                      |
| **Mongoose**                | MongoDB ODM                   |
| **JWT**                     | Authentication                |
| **bcrypt**                  | Password hashing              |
| **Axios**                   | HTTP requests                 |
| **Swagger / OpenAPI**       | API documentation             |
| **OpenStreetMap Nominatim** | Location search               |
| **Frankfurter API**         | Currency exchange rates       |
| **Postman**                 | API testing                   |
| **Git & GitHub**            | Version control               |

---

## 🏗️ Project Architecture

The application follows a structured backend architecture where each layer has a specific responsibility.

```text
Client
   │
   ▼
Express.js API
   │
   ├── Router
   │
   ├── Controllers
   │
   ├── Services
   │
   ├── Middlewares
   │
   └── Models
          │
          ▼
       MongoDB

External APIs
   │
   ├── OpenStreetMap Nominatim
   │
   └── Frankfurter API
```

This separation helps keep the application organized, maintainable, and easier to extend.

---

## 📁 Project Structure

```text
src/
│
├── Controllers/
│   ├── uber.controller.ts
│   ├── ride.controller.ts
│   ├── location.controller.ts
│   └── currency.controller.ts
│
├── Router/
│   ├── uber.route.ts
│   ├── ride.route.ts
│   ├── location.route.ts
│   └── currency.route.ts
│
├── Services/
│   └── currency.service.ts
│
├── Middlewares/
│   └── auth.middleware.ts
│
├── Models/
│   └── ...
│
├── swagger.ts
└── index.ts
```

---

## 🔑 Authentication Flow

RYVO uses **JWT (JSON Web Token)** for authentication.

The authentication flow works as follows:

```text
User
 │
 ▼
Register / Login
 │
 ▼
Server validates credentials
 │
 ▼
JWT Token
 │
 ▼
Client sends token
 │
 ▼
Authentication Middleware
 │
 ▼
Protected Route
```

Protected requests use:

```http
Authorization: Bearer YOUR_TOKEN
```

The authentication middleware verifies the token before allowing access to protected endpoints.

---

## 🚕 Ride Flow

A simplified ride lifecycle:

```text
Passenger
    │
    ▼
Request Ride
    │
    ▼
Find / Assign Driver
    │
    ▼
Driver Accepts
    │
    ▼
Ride In Progress
    │
    ▼
Ride Completed
```

The backend manages the ride state and validates the operations that can be performed during the ride lifecycle.

---

## 📍 Location API

### Search Location

```http
GET /api/locations/search?query=Maadi
```

The backend sends the search query to OpenStreetMap Nominatim using Axios, processes the returned data, and exposes a simplified response to the client.

---

## 💱 Currency API

### Convert Currency

```http
GET /api/currency/convert?amount=100&from=SAR&to=EGP
```

The currency service retrieves the exchange rate from Frankfurter and performs the conversion inside the backend.

---

## 📚 Swagger Documentation

After running the application, Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

Swagger provides an interactive interface for exploring and testing the REST API.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ryvo-backend.git
```

### 2. Navigate to the project

```bash
cd ryvo-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

Make sure the `.env` file is included in `.gitignore`.

### 5. Run the application

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

---

## 🧪 API Testing

The API was designed to be tested using:

- **Swagger UI**
- **Postman**

Swagger can be used for quickly testing documented endpoints, while Postman can be used to organize and test API requests.

Protected endpoints require a valid JWT token using Bearer Authentication.

---

## 🔒 Security

The application follows basic backend security practices including:

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Environment variables for sensitive configuration
- Authentication middleware
- Input validation

Sensitive information such as database credentials and JWT secrets should never be committed to the repository.

---

## 🎯 Project Goals

The main goals of RYVO were to gain practical experience with:

- RESTful API development
- Node.js backend development
- TypeScript
- MongoDB and Mongoose
- Authentication and authorization
- JWT
- Middleware architecture
- Service-based architecture
- Third-party API integration
- Location services
- Currency conversion
- Error handling
- API documentation
- API testing

---

## 🚀 Future Improvements

Possible future improvements include:

- React frontend application
- Complete frontend/backend integration
- Online payment integration
- Dynamic ride pricing
- Distance-based fare calculation
- Advanced driver matching
- Automated testing
- Dockerization
- Cloud deployment
- Production logging and monitoring

---

## 👨‍💻 Author

**Mohamed Ahmed Ragab**

Computer Science Graduate
Backend / MERN Stack Developer

---

## ⭐ Project Overview

RYVO is a practical backend project that demonstrates how to build a **real-world ride-hailing API** using Node.js and TypeScript.

It combines authentication, database management, ride workflows, external API integration, validation, error handling, and Swagger documentation into a single backend application.
