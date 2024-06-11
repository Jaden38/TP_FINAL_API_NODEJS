const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation',
      contact: {
        name: 'Developer',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3000}`,
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Station: {
          type: 'object',
          required: ['name', 'location'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the station',
            },
            name: {
              type: 'string',
              description: 'The name of the station',
            },
            location: {
              type: 'string',
              description: 'The location of the station',
            },
            lines: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'The lines associated with the station',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the station was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the station was last updated',
            },
          },
        },
        Line: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the line',
            },
            name: {
              type: 'string',
              description: 'The name of the line',
            },
            stations: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'The stations associated with the line',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the line was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the line was last updated',
            },
          },
        },
        City: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the city',
            },
            name: {
              type: 'string',
              description: 'The name of the city',
            },
            stations: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'The stations associated with the city',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the city was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the city was last updated',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
