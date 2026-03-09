# Environment Variables

This project uses environment variables to configure the server and authentication.

Create a `.env` file in the root directory of the project.

Example `.env` file:

PORT=5000
AUTH_API_KEY=supersecret123

---

# Variables

## PORT

Defines the port where the server will run.

Example:

PORT=5000

The API will be available at:

http://localhost:5000

This URL also serves the **QR code page** used to connect WhatsApp.

---

## AUTH_API_KEY

A secret key used to authenticate API requests.

Example:

AUTH_API_KEY=supersecret123

All API requests must include this key in the request header:

auth-api-key: supersecret123

If the key is missing or incorrect, the server will return:

{
"success": false,
"message": "Unauthorized"
}

---

# Security Notes

* Never commit `.env` to the repository.
* Always add `.env` to `.gitignore`.
* Keep your `AUTH_API_KEY` secret.

Example `.gitignore` entry:

.env
