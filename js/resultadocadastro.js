// let users = JSON.parse(localStorage.getItem('users')) || [];
// let userTableBody = document.getElementById('userTableBody');

// users.forEach(user => {
//     let row = document.createElement('tr');
//     Object.values(user).forEach(value => {
//         let cell = document.createElement('td');
//         cell.innerText = value;
//         row.appendChild(cell);
//     });
//     userTableBody.appendChild(row);
// });

// document.getElementById('download').addEventListener('click', function () {
//     let table = document.getElementById('userTable').outerHTML;
//     let uri = 'data:application/vnd.ms-excel,' + encodeURIComponent(table);
//     this.href = uri;
//     this.download = 'Users.xlsx';
// });

let users = JSON.parse(localStorage.getItem('users')) || [];
let userTableBody = document.getElementById('userTableBody');

users.forEach(user => {
    let row = document.createElement('tr');
    Object.values(user).forEach(value => {
        let cell = document.createElement('td');
        cell.innerText = value;
        row.appendChild(cell);
    });
    userTableBody.appendChild(row);
});

// document.getElementById('download').addEventListener('click', function () {
//     let table = document.getElementById('userTable').outerHTML;
//     let uri = 'data:application/vnd.ms-excel,' + encodeURIComponent(table);
//     this.href = uri;
//     this.download = 'Users.xlsx';
// });

document.getElementById('download').addEventListener('click', function () {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let data = users.map(user => Object.values(user));
    data.unshift(['Nome', 'Estado', 'Município', 'Telefone Institucional', 'E-mail Institucional', 'Cargo', 'Nº de Nutricionistas na Saúde', 'Destes, quantos na APS?']); // Adiciona cabeçalhos

    let ws = XLSX.utils.aoa_to_sheet(data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Resultado - Cadastro.xlsx');
});

function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
