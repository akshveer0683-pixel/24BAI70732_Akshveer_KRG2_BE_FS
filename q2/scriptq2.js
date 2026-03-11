function addItem() {
  const input = document.getElementById('item-input');
  const value = input.value.trim();

  if (!value) {
    alert('Please type something first.');
    return;
  }

  const empty = document.getElementById('empty-note');
  if (empty) empty.remove();

  const li = document.createElement('li');
  li.textContent = value;
  document.getElementById('item-list').appendChild(li);

  input.value = '';
  input.focus();
}

function removeLastItem() {
  const list  = document.getElementById('item-list');
  const items = list.querySelectorAll('li:not(#empty-note)');

  if (items.length === 0) {
    alert('The list is already empty.');
    return;
  }

  items[items.length - 1].remove();

  if (list.querySelectorAll('li').length === 0) {
    const empty = document.createElement('li');
    empty.id = 'empty-note';
    empty.textContent = 'No items yet.';
    list.appendChild(empty);
  }
}
