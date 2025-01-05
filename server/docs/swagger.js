require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const EXPRESS_HOST = process.env.EXPRESS_HOST || 'localhost';
const EXPRESS_PORT = process.env.EXPRESS_PORT || 5001;

const doc = {
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API 명세서 입니다.',
    },
    host: `${EXPRESS_HOST}:${EXPRESS_PORT}`,
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);