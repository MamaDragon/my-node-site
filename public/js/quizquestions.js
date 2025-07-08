
  let quizData = [];

  fetch('/api/quiz')
    .then(res => res.json())
    .then(data => {
      quizData = data;
      renderQuiz(data);
    })
    .catch(err => {
      console.error('Error loading quiz:', err);
    });

  function renderQuiz(data) {
    const container = document.getElementById('quiz');
    container.innerHTML = ''; // clear in case of re-render

    data.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('mb-4');

      const question = document.createElement('h5');
      question.textContent = `${index + 1}. ${q.question}`;
      questionDiv.appendChild(question);

      q.choices.forEach(choice => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('form-check');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question-${index}`;
        input.value = choice;
        input.classList.add('form-check-input');
        input.id = `q${index}-${choice}`;

        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', input.id);
        label.textContent = choice;

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        questionDiv.appendChild(wrapper);
      });

      container.appendChild(questionDiv);
    });

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit Quiz';
    submitBtn.classList.add('btn', 'btn-primary');
    submitBtn.onclick = evaluateQuiz;
    container.appendChild(submitBtn);

    // Result area
    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    resultDiv.classList.add('mt-3');
    container.appendChild(resultDiv);
  }

  function evaluateQuiz() {
    let score = 0;

    quizData.forEach((q, index) => {
      const selected = document.querySelector(`input[name="question-${index}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h4>Your score: ${score} out of ${quizData.length}</h4>`;
  }

