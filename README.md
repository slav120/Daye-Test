
# Tampon API Documentation

## Overview

The Tampon API is designed to manage the inventory of tampon production materials and facilitate the creation of tampons. The API includes endpoints to:
1. Retrieve the remaining quantities of materials.
2. Create tampons and update the inventory accordingly.

## Project Structure

The project follows a modular structure for maintainability and scalability:

```
tampon-api/
├── node_modules/
├── src/
│   ├── controllers/
│   │   └── tamponController.js
│   ├── routes/
│   │   └── tamponRoutes.js
│   ├── services/
│   │   └── tamponService.js
│   ├── utils/
│   │   └── randomQuantity.js
│   └── app.js
├── .gitignore
├── package.json
└── README.md
```

## Requirements

- Node.js
- Express.js

## Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the server using `npm start` or `npm run dev` for development mode with `nodemon`.

## Endpoints

### Welcome Message

**URL:** `http://localhost:3000/`

**Method:** `GET`

**Description:** Returns a welcome message.

**Response:**
```
Welcome to the Tampon API
```

### Get Quantities

**URL:** `http://localhost:3000/api/quantities`

**Method:** `GET`

**Description:** Retrieves the remaining quantities of each material used in tampon production.

**Response:**
```json
{
  "cotton": 12000,
  "hemp": 6000,
  "string": 3000,
  "wrapper": 8000
}
```

### Make Tampons

**URL:** `http://localhost:3000/api/make-tampons`

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "type": "regular",
  "amount": 5
}
```

**Description:** Creates the specified amount of tampons and updates the inventory accordingly. 

**Valid Types:**
- `regular`
- `super`

**Response:**
```json
{
  "cotton": 11500,
  "hemp": 5750,
  "string": 2850,
  "wrapper": 7800
}
```

**Errors:**
- If `type` or `amount` is missing:
  ```json
  {
    "error": "Please provide both type and amount of tampons."
  }
  ```

- If `type` is invalid:
  ```json
  {
    "error": "Invalid tampon type. Valid types are \"regular\" and \"super\"."
  }
  ```

- If materials are insufficient:
  ```json
  {
    "error": "Not enough materials to make the requested number of tampons."
  }
  ```

## Business Logic

### Tampon Requirements

- **Regular Tampons:**
  - Cotton: 100g per tampon
  - Hemp: 50g per tampon
  - String: 30cm per tampon
  - Wrapper: 40cm per tampon

- **Super Tampons:**
  - Cotton: 200g per tampon
  - Hemp: 10g per tampon
  - String: 30cm per tampon
  - Wrapper: 50cm per tampon

### Inventory Initialization

The initial quantities of materials are randomly generated within specified ranges and multiples:

- Cotton: 5000g to 20000g, multiple of 100
- Hemp: 2500g to 10000g, multiple of 50
- String: 1500cm to 6000cm, multiple of 30
- Wrapper: 2500cm to 10000cm, multiple of 50

### Functions and Utilities

#### `randomQuantity.js`

Generates a random quantity within a specified range and multiple.

```javascript
module.exports = function(min, max, multiple) {
  const range = Math.floor((max - min) / multiple) + 1;
  return (Math.floor(Math.random() * range) * multiple) + min;
};
```

#### `tamponService.js`

Handles the business logic for getting quantities and making tampons.

- `getQuantities()`: Returns the current inventory.
- `isValidType(type)`: Checks if the provided tampon type is valid.
- `makeTampons(type, amount)`: Creates tampons and updates the inventory.

## Sample Requests

### Using `curl`

**Get Quantities:**
```bash
curl -X GET http://localhost:3000/api/quantities
```

**Make Tampons:**
```bash
curl -X POST http://localhost:3000/api/make-tampons -H "Content-Type: application/json" -d '{"type": "regular", "amount": 5}'
```

### Using Postman

1. **Get Quantities:**
   - Set the request type to `GET`.
   - Enter the URL: `http://localhost:3000/api/quantities`.
   - Click `Send`.

2. **Make Tampons:**
   - Set the request type to `POST`.
   - Enter the URL: `http://localhost:3000/api/make-tampons`.
   - Go to the `Headers` tab and add a header:
     - Key: `Content-Type`
     - Value: `application/json`
   - Go to the `Body` tab, select `raw`, and enter the JSON body:
     ```json
     {
       "type": "regular",
       "amount": 5
     }
     ```
   - Click `Send`.

---



