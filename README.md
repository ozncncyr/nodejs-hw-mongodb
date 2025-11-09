# NodeJS MongoDB Contacts API

A simple RESTful API for managing contacts, built with Node.js, Express, and MongoDB.

---

## 🚀 Live Branches & API Endpoints

>
> [hw2-mongodb REST API ● Live](https://contacts-app-9tvm.onrender.com/)


---

## Features
- List all contacts
- Search contacts by ID
- Store data with MongoDB
- JSON formatted error responses
- CORS and HTTP logging support

---

## Installation

```bash
# Clone the repository
git clone https://github.com/ozncncyr/nodejs-hw-mongodb.git
cd nodejs-hw-mongodb

# Install dependencies
npm install
```

---

## Usage

```bash
# Start the server
npm start
```

The API runs by default at `http://localhost:3000`.

---

## API Endpoints

### List All Contacts
```
GET /contacts
```
Response:
```json
{
  "status": 200,
  "message": "Contacts fetched successfully! We found X contacts.",
  "data": [ ... ]
}
```

### Search Contact by ID
```
GET /contacts/:contactId
```
Response (if not found):
```json
{
  "status": 404,
  "message": "Contact with id ... not found.",
  "data": null
}
```

---

## Environment Variables
- You can define `PORT` and MongoDB connection details in the `.env` file.

---

## Contributing
You can contribute by opening pull requests and issues.

---

## License
MIT
