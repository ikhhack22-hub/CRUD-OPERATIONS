# 👥 People API - CRUD + Swagger

RESTful API built with Node.js, Express, MongoDB.

## 🔗 Live Demo
- 🌐 Base URL: `https://crud-operations-2y40.onrender.com` 
- 📚 Swagger Docs: `/api-docs`
- 📬 Postman: [رابط المجموعة]

## 🚀 Quick Start
1. `git clone <repo>`
2. `npm install`
3. `cp .env.example config.env` 
4. `npm run dev`

## 🔐 Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DB_URI` | MongoDB connection string | `mongodb://...` |

## 📡 Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/people` | List all (pagination/filtering) |
| `POST` | `/people` | Create new person |
| `GET` | `/people/:id` | Get one person |
| `PUT` | `/people/:id` | Update person |
| `DELETE` | `/people/:id` | Delete person |

## 🛡️ Notes
- Input validation via Mongoose schema
- Unified error handling format
- Ready for JWT auth integration (available as add-on)
