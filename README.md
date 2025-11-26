# NodeJS MongoDB Contacts API

A simple RESTful API for managing contacts, built with Node.js, Express, and MongoDB.

---

## 🚀 Live Branches & API Endpoints

>
> - [hw2-mongodb REST API(live))](https://contacts-app-9tvm.onrender.com/)
> - [hw3-crud REST API(live))](https://contacts-app-9tvm.onrender.com/)
> - [hw4-validation REST API(live))](https://contacts-app-9tvm.onrender.com/)


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
  "data": { ... }
}
```
Supports pagination and filtering:
- Pagination: `?page=1&perPage=4`
- Filtering: `?contactType=work&isFavourite=true`
- Sorting: `?sortBy=name&sortOrder=desc`

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

### Create Contact
```
POST /contacts
```
Request body:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "contactType": "personal",
  "isFavourite": false
}
```
Response:
```json
{
  "status": 201,
  "message": "Contact created successfully!",
  "data": { ... }
}
```

### Update Contact (Replace)
```
PUT /contacts/:contactId
```
Request body:
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone": "+0987654321",
  "contactType": "work",
  "isFavourite": true
}
```
Response:
```json
{
  "status": 200,
  "message": "Contact updated successfully!",
  "data": { ... }
}
```

### Update Contact (Partial)
```
PATCH /contacts/:contactId
```
Request body (at least one field required):
```json
{
  "email": "jane.newemail@example.com"
}
```
Response:
```json
{
  "status": 200,
  "message": "Contact updated successfully!",
  "data": { ... }
}
```

### Delete Contact
```
DELETE /contacts/:contactId
```
Response:
```json
{
  "status": 204,
  "message": "Contact deleted successfully.",
  "data": null
}
```

---

## Environment Variables
- You can define `PORT` and MongoDB connection details in the `.env` file.

---

## Code Organization
- `src/` contains all source code
  - `db/models/` for Mongoose models
  - `services/` for business logic and database operations
  - `controllers/` for request/response handling
  - `routers/` for route definitions
  - `middlewares/` for error handling and validation
  - `utils/` for helper functions (pagination, filters, etc.)

---

## Error Handling
- All errors are returned in JSON format with status codes and messages
- Custom error messages for validation and not found cases
- Centralized error middleware for catching and formatting errors

---

## Validations
- Joi validation for all create  and update requests
- Phone number must contain only numbers and may start with +
- Email must be a valid email address
- Contact type must be one of: personal, home, work, other
- At least one field required for PATCH

---

## Pagination & Filters
- Pagination: `page` and `perPage` query params
- Filtering: `contactType` and `isFavourite` query params
- Sorting: `sortBy` and `sortOrder` query params

---

## Contributing
You can contribute by opening pull requests and issues.

---

## License
MIT
