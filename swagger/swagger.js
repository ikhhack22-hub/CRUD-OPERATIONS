const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "People API",
      version: "1.0.0",
      description: "RESTful CRUD API with MongoDB, Express, and Swagger documentation"
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000/",
        description: "Local/Production Server"
      }
    ],
    // 👇 أضف هذا القسم
    components: {
      schemas: {
        Person: {
          type: "object",
          required: ["name", "age"],
          properties: {
            _id: { type: "string", description: "MongoDB ObjectId", example: "674a1b2c3d4e5f67890abcde" },
            name: { type: "string", minLength: 2, example: "Ahmed" },
            age: { type: "integer", minimum: 0, maximum: 120, example: 25 },
            email: { type: "string", format: "email", example: "ahmed@example.com" },
            createdAt: { type: "string", format: "date-time", example: "2024-05-28T10:00:00.000Z" },
            updatedAt: { type: "string", format: "date-time", example: "2024-05-28T12:00:00.000Z" }
          }
        },
        Pagination: {
          type: "object",
          properties: {
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 10 },
            total: { type: "integer", example: 45 },
            pages: { type: "integer", example: 5 }
          }
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                code: { type: "string", example: "VALIDATION_ERROR" },
                message: { type: "string", example: "Name is required" },
                details: { type: "array", items: { type: "string" } }
              }
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token in format: `Bearer <token>`"
        }
      }
    }
    // 👆 نهاية الإضافة
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);