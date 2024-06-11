const app = require('./app');
const swagger = require('./swagger');

// Swagger setup
swagger(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
