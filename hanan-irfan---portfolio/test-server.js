import http from 'http';

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data.includes('<title>'));
    console.log(data.substring(0, 200));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
