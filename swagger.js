const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Career',
    description: 'API documentation',
  },
  host: process.env.HOST,
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON generated.');
});
