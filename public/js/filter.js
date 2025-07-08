const { fromEvent } = rxjs;
const { debounceTime, map, distinctUntilChanged } = rxjs.operators;

const input = document.getElementById('search');
const rows = document.querySelectorAll('#infoTable tbody tr');

function filterRows(value) {
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(value) ? '' : 'none';
  });
}

fromEvent(input, 'input').pipe(
  map(e => e.target.value.toLowerCase()),
  debounceTime(300),
  distinctUntilChanged()
).subscribe(filterRows);