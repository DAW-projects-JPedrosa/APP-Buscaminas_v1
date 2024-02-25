const app = require('../app');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const options = {
    customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.css',
        ]
}

/* Middlewares */
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, options))