# WhatsApp Messaging API

A Node.js REST API that sends WhatsApp messages using a WhatsApp Web client.
The API validates requests, authenticates them using a secret API key, and queues message sending to avoid overload.

---

# Features

* Send WhatsApp messages via REST API
* QR code login through browser
* Request validation middleware
* Simple API key authentication
* Message queue using **p-queue**
* Centralized error handling
* Logging support
* Rate limiting

---

# Tech Stack

* Node.js
* Express.js
* socket.io
* whatsapp-web.js
* p-queue
* Winston (logging)

---

# Installation

Clone the repository

git clone https://github.com/your-username/whatsapp-api.git

Navigate into the project

cd whatsapp-web-qr

Install dependencies

npm install

---

# Environment Setup

Create a `.env` file in the root directory.

Example:

PORT=5000
AUTH_API_KEY=supersecret123

See **ENVIRONMENT.md** for detailed explanation.

---

# Running the Server

Start the server:

npm start

or for development:

npm run dev

---

# WhatsApp Login (QR Code)

When the server starts, it generates a QR code that must be scanned to connect WhatsApp.

Steps:

1. Start the server
2. Open your browser and go to:

http://localhost:5000

3. The page will display a **WhatsApp Login QR Code**
4. Open WhatsApp on your phone
5. Go to **Linked Devices → Link a Device**
6. Scan the QR code

After scanning successfully, the WhatsApp client becomes **ready to send messages**.

---

# Authentication

All API requests must include an API key in the request header.

Header:

auth-api-key: YOUR_SECRET_API_KEY

Example:

auth-api-key: supersecret123

If the API key is missing or incorrect, the API returns:

{
"success": false,
"message": "Unauthorized"
}

---

# Send Message API

Endpoint:

POST /api/message

Headers:

Content-Type: application/json
auth-api-key: YOUR_SECRET_API_KEY

Request Body:

{
"number": "8801712345678",
"message": "Hello from API"
}

Example Response:

{
"success": true,
"result": {...}
}

---

# Validation Rules

The API validates:

* number field must exist
* message field must exist
* number must be a string
* message must be a string
* message cannot be empty
* number must be 10–15 digits
* WhatsApp client must be ready

Invalid requests return an error response.

---

# Testing with Postman

1. Start the server
2. Open http://localhost:5000 and scan the QR code
3. Open Postman
4. Create a POST request:

URL:

http://localhost:5000/api/message

Headers:

auth-api-key: supersecret123
Content-Type: application/json

Body:

{
"number": "8801712345678",
"message": "Hello from API"
}

Send request and the message will be delivered via WhatsApp.

---

# Security Features

* API key authentication
* Request validation
* Rate limiting
* Queue-based message sending
* Error handling middleware

---

# Project Structure

src
├── controllers
├── middlewares
├── queues
├── routes
├── services 
├── sockets 
└── utils

---

# License

MIT
