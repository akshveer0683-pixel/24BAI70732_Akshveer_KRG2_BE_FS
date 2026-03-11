async function submitPost() {
  const title = document.getElementById('title').value.trim();
  const body  = document.getElementById('body').value.trim();

  document.getElementById('success-msg').style.display = 'none';
  document.getElementById('error-msg').style.display   = 'none';

  if (!title || !body) {
    document.getElementById('error-msg').style.display = 'block';
    return;
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, userId: 1 })
  });

  const data = await response.json();
  console.log('Response:', data);

  document.getElementById('success-msg').style.display = 'block';
  document.getElementById('title').value = '';
  document.getElementById('body').value  = '';
}
