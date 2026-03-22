let licznik = 0;
let czas = 10;
let graTrwa = false;
let user = "";

const fReg = document.getElementById('formularzReg');
const sLog = document.getElementById('sekcjaLogowania');
const sGry = document.getElementById('sekcjaGry');
const lUzyt = document.getElementById('listaUzytkownikow');

function odswiezRanking() {
    lUzyt.innerHTML = '';
    const dane = JSON.parse(localStorage.getItem('bazaGry')) || {};
    for (let g in dane) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${g}</strong>: ${dane[g]} pkt`;
        lUzyt.appendChild(li);
    }
}

fReg.addEventListener('submit', (e) => {
    e.preventDefault();
    user = document.getElementById('nazwa').value;
    let dane = JSON.parse(localStorage.getItem('bazaGry')) || {};
    if (!dane[user]) dane[user] = 0;
    localStorage.setItem('bazaGry', JSON.stringify(dane));
    document.getElementById('aktualnyGracz').innerText = user;
    sLog.style.display = 'none';
    sGry.style.display = 'block';
    odswiezRanking();
});

document.getElementById('startGry').addEventListener('click', () => {
    licznik = 0;
    czas = 10;
    graTrwa = true;
    document.getElementById('wynik').innerText = 0;
    document.getElementById('timer').innerText = 10;
    document.getElementById('startGry').disabled = true;

    let timer = setInterval(() => {
        czas--;
        document.getElementById('timer').innerText = czas;
        if (czas <= 0) {
            clearInterval(timer);
            graTrwa = false;
            document.getElementById('startGry').disabled = false;
            let dane = JSON.parse(localStorage.getItem('bazaGry'));
            if (licznik > dane[user]) {
                dane[user] = licznik;
                localStorage.setItem('bazaGry', JSON.stringify(dane));
            }
            odswiezRanking();
            alert("Koniec! Wynik: " + licznik);
        }
    }, 1000);
});

document.getElementById('przyciskKlik').addEventListener('click', () => {
    if (graTrwa) {
        licznik++;
        document.getElementById('wynik').innerText = licznik;
    }
});

document.getElementById('wyloguj').addEventListener('click', () => {
    sGry.style.display = 'none';
    sLog.style.display = 'block';
    fReg.reset();
});

document.getElementById('resetBazy').addEventListener('click', () => {
    if(confirm("Usunąć ranking?")) {
        localStorage.removeItem('bazaGry');
        odswiezRanking();
    }
});

odswiezRanking();
