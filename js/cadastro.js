// document.getElementById('registrationForm').addEventListener('submit', function (event) {
//     event.preventDefault();
//     let user = {
//         name: document.getElementById('name').value,
//         state: document.getElementById('state').value,
//         municipality: document.getElementById('municipality').value,
//         institutionalPhone: document.getElementById('institutionalPhone').value,
//         institutionalEmail: document.getElementById('institutionalEmail').value,
//         position: document.getElementById('position').value,
//         numNutritionists: document.getElementById('numNutritionists').value,
//         numNutritionistsAPS: document.getElementById('numNutritionistsAPS').value,
//     };
//     localStorage.setItem('user', JSON.stringify(user));
//     window.location.href = "game.html";
// });

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let user = {
        name: document.getElementById('name').value,
        state: document.getElementById('state').value,
        municipality: document.getElementById('municipality').value,
        institutionalPhone: document.getElementById('institutionalPhone').value,
        institutionalEmail: document.getElementById('institutionalEmail').value,
        position: document.getElementById('position').value,
        numNutritionists: document.getElementById('numNutritionists').value,
        numNutritionistsAPS: document.getElementById('numNutritionistsAPS').value,
    };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = "jogo.html";
});
