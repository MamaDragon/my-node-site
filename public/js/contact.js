const { fromEvent } = rxjs;
const { debounceTime, map, tap } = rxjs.operators;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  const responseDiv = document.getElementById('response');

  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const zipInput = document.getElementById('zip');

  if (!form) {
    console.error('Form not found!');
    return;
  }

  fromEvent(form, 'submit').pipe(
    tap(e => {
      e.preventDefault();
      console.log('Form submitted via RxJS');
    }),
    debounceTime(300),
    map(() => {
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();
      const zip = zipInput.value.trim();

      const errors = [];

      if (!/^\d{10}$/.test(phone)) {
        errors.push('Phone must be 10 digits.');
      }

      if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.push('Email is invalid.');
      }

      if (!/^\d{5}$/.test(zip)) {
        errors.push('Zip must be 5 digits.');
      }

      return { phone, email, zip, errors };
    })
  ).subscribe(async ({ phone, email, zip, errors }) => {
    if (errors.length > 0) {
      responseDiv.innerHTML = `<div class="alert alert-danger">${errors.join('<br>')}</div>`;
      return;
    }

    const res = await fetch('/submit-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, email, zip })
    });

    const msg = await res.text();
    responseDiv.innerHTML = `<div class="alert alert-success">${msg}</div>`;
    form.reset();
  });
});
