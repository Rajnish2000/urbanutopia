# 🏙️ UrbanUtopia API

UrbanUtopia API is a RESTful service for an online marketplace that connects property owners with people seeking short-term accommodations. Built with Node.js and Express, it supports user authentication, property listings, reviews, and more.

---

## 🚀 Live Demo & Documentation

- **Live API URL:** [https://urbanutopia-q4lw.onrender.com/](https://urbanutopia-q4lw.onrender.com/)
- **Swagger Docs:** [https://urbanutopia-q4lw.onrender.com/api-docs](https://urbanutopia-q4lw.onrender.com/api-docs)

---

## 📦 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/Rajnish2000/urbanutopia.git
cd urbanutopia
npm install --force
```

Create a `.env` file and set required environment variables (see `.env.example` if available).

Start the server:

```bash
npm run start
```

To build the project (if using webpack):

```bash
npm run build
# or

```

---

## 🛠️ Technologies Used

- Node.js, Express
- MongoDB & Mongoose
- Joi (validation)
- Passport.js (authentication)
- Mapbox (geocoding)
- Multer (file uploads)
- Swagger (API docs)

---

## 📚 API Endpoints

### Health Check

- `GET /` — Check API status

### Auth

- `POST /api/v1/user/create` — Register new user
- `POST /api/v1/user/login` — Login user
- `GET /api/v1/user/{id}` — Get user by ID
- `PUT /api/v1/user/{id}` — Update user by ID
- `DELETE /api/v1/user/{id}` — Delete user by ID
- `GET /api/v1/user/logout` — Logout user

### Listing

- `GET /listings/all` — Get all listings
- `POST /listings/create` — Create new listing
- `GET /listings/{id}/view` — Get listing by ID
- `PATCH /listings/{id}/edit` — Edit listing by ID
- `DELETE /listings/{id}/delete` — Delete listing by ID
- `GET /listings/reset_db` — Reset/init listings database

### Review

- `POST /listings/{id}/review/create` — Create review for a listing
- `GET /listings/{id}/review/all` — Get all reviews for a listing
- `PATCH /listings/{id}/review/{rid}/update` — Update review by review ID
- `DELETE /listings/{id}/review/{rid}/delete` — Delete review by review ID

---

## 🔑 Example Usage

**Register User:**

```http
POST /api/v1/user/create
Content-Type: application/json
{
  "username": "john",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Create Listing:**

```http
POST /listings/create
Content-Type: application/json
Authorization: Bearer <token>
{
  "title": "Cozy Apartment",
  "description": "A nice place to stay",
  "price": 100,
  "location": "New York"
}
```

**Add Review:**

```http
POST /listings/{id}/review/create
Content-Type: application/json
Authorization: Bearer <token>
{
  "rating": 5,
  "comment": "Great experience!"
}
```

---

## 📝 Contribution & Support

- Fork the repo and submit PRs for improvements.
- For issues or questions, open an issue on GitHub.

---

## 📖 More

- Joi validation: [joi.dev](https://joi.dev/)
- Mapbox: [mapbox.com](https://www.mapbox.com/)
- Swagger UI: [swagger.io](https://swagger.io/tools/swagger-ui/)

---

Enjoy building with UrbanUtopia API!
