require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const app = express();

// API 서빙
app.use(cors());
app.use('/api', express.json());
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// API 문서 서빙
const swaggerFilePath = path.resolve(__dirname, './docs/swagger-output.json');
if (fs.existsSync(swaggerFilePath)) {
  const swaggerFile = require('./docs/swagger-output.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

// 리액트 앱 정적파일 서빙
const buildPath = path.join(__dirname, '../client/build');
const deployingPagePath = path.join(__dirname, '../client/deploying.html');

if (fs.existsSync(buildPath) && fs.readdirSync(buildPath).length > 0) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else { // 빌드가 없으면 임시 페이지 제공
  app.get('*', (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.sendFile(deployingPagePath);
  });
}

const EXPRESS_HOST = process.env.EXPRESS_HOST || 'localhost';
const EXPRESS_PORT = process.env.EXPRESS_PORT || 5001;

app.set('port', EXPRESS_PORT);

app.listen(app.get('port'), () => {
    console.log(`Server listening on http://${EXPRESS_HOST}:${app.get('port')}`);
});
