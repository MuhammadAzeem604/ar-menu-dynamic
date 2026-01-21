
const http = require('http');

const options = {
  method: 'HEAD',
  host: '127.0.0.1',
  port: 8082,
  path: '/assets/models/Fast_Food_Set.usdz',
};

const req = http.request(options, (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', JSON.stringify(res.headers, null, 2));
});

req.on('error', (e) => {
  console.error('problem with request:', e.message);
});

req.end();
