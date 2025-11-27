const submitButton = document.getElementById('submit');
const resultContainer = document.querySelector('.result');
const resultQ1 = document.getElementById('result-q1').querySelector('span');
const resultQ2 = document.getElementById('result-q2').querySelector('span');

submitButton.addEventListener('click', function (e) {
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    const q2Answer = document.querySelector('input[name="q2"]:checked');

    if (q1Answer && q2Answer) {
        resultQ1.textContent = q1Answer.value;
        resultQ2.textContent = q2Answer.value;

        resultContainer.style.display = 'block';
    } else {
        alert('Ответы даны не на все вопросы')
    }
});