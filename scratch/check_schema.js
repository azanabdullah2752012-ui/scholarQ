const url = 'https://kkcuyoxbrblbocazsjfn.supabase.co/rest/v1/doubts?select=*&limit=1';
const headers = {
  'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrY3V5b3hicmJsYm9jYXpzamZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODM2NzAsImV4cCI6MjA5NDE1OTY3MH0.EDUnpxC_6QQiofjZDk37NExKIHPKdbLhBIzUfJ9Q-iY',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrY3V5b3hicmJsYm9jYXpzamZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODM2NzAsImV4cCI6MjA5NDE1OTY3MH0.EDUnpxC_6QQiofjZDk37NExKIHPKdbLhBIzUfJ9Q-iY'
};

fetch(url, { headers })
  .then(res => res.json())
  .then(data => {
    console.log('DOUBTS SAMPLE:', data);
  })
  .catch(err => console.error(err));
