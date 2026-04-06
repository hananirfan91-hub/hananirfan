import https from 'https';

https.get('https://agnjjlzuzihuqorpcfan.supabase.co/rest/v1/', (res) => {
  console.log('Status:', res.statusCode);
}).on('error', (err) => {
  console.error('Error:', err.message);
});
