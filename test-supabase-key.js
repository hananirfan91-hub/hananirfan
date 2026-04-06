const https = require('https');

const options = {
  hostname: 'agnjjlzuzihuqorpcfan.supabase.co',
  port: 443,
  path: '/rest/v1/',
  method: 'GET',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmpqbHp1emlodXFvcnBjZmFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTE0MTQsImV4cCI6MjA5MDk4NzQxNH0.TwqtX8O1VnwgoG4DE08ydVC4UkQCEq-cW1Lun7i4uAA',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmpqbHp1emlodXFvcnBjZmFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTE0MTQsImV4cCI6MjA5MDk4NzQxNH0.TwqtX8O1VnwgoG4DE08ydVC4UkQCEq-cW1Lun7i4uAA'
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
