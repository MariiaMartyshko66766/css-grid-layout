const formularz = document.getElementById('formularzReg');
const listaUi = document.getElementById('listaUzytkownikow');
const przyciskReset = document.getElementById('wyczyscBaze');

function wyswietlUzytkownikow() {
    listaUi.innerHTML = '';
    
    const uzytkownicy = JSON.parse(localStorage.getItem('bazaUzytkownikow')) || [];

    uzytkownicy.forEach(osoba => {
        const li = document.createElement('li');
        li.textContent = osoba.login;
        listaUi.appendChild(li);
    });
}

formularz.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const login = document.getElementById('nazwa').value;
    const haslo = document.getElementById('haslo').value;

    const uzytkownicy = JSON.parse(localStorage.getItem('bazaUzytkownikow')) || [];

    uzytkownicy.push({ login: login, haslo: haslo });

    localStorage.setItem('bazaUzytkownikow', JSON.stringify(uzytkownicy));

    formularz.reset();
    wyswietlUzytkownikow();
    alert('Zarejestrowano pomyślnie!');
});

przyciskReset.addEventListener('click', () => {
    if(confirm('Czy na pewno chcesz usunąć wszystkich użytkowników?')) {
        localStorage.removeItem('bazaUzytkownikow');
        wyswietlUzytkownikow();
    }
});

wyswietlUzytkownikow();
