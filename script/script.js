//массив для буквы выведенного слова
let arrOfLetters = [];

//массив слов сгенерил ИИ
const arrOfWords = [
    "автор", "базар", "билет", "блок", "бонус", "бутон", "вагон", "весна", "взлет", "вода", 
    "выход", "гвоздь", "глина", "гость", "грань", "груша", "дверь", "дождь", "доска", "дубль", 
    "ежик", "жара", "жизнь", "завод", "замок", "запас", "звон", "зебра", "зима", "знак", 
    "золото", "игрок", "изюм", "кабан", "кадр", "какао", "камень", "капля", "карта", "катер", 
    "кварц", "кисть", "клад", "клей", "книга", "кнопка", "козел", "колос", "комар", "конус", 
    "корень", "короб", "космос", "котел", "краска", "кресло", "кровь", "кубок", "кукла", "купол", 
    "курс", "лампа", "лапша", "левша", "ледник", "леска", "лидер", "лилия", "лист", "лодка", 
    "луна", "лучик", "малыш", "маска", "медик", "мелодия", "мечта", "мир", "молоко", "мост", 
    "мотор", "муха", "мыло", "мяч", "набор", "наука", "небо", "норма", "носок", "обед", 
    "облако", "огонь", "озеро", "окно", "олень", "опора", "орел", "осень", "остров", "отель", 
    "папка", "парус", "пачка", "пена", "песок", "петух", "пила", "пирог", "пламя", "платок", 
    "плот", "плюс", "подарок", "поезд", "полет", "поляна", "помощь", "порог", "поток", "почка", 
    "птица", "путь", "пчела", "работа", "радуга", "ракета", "ракурс", "ребро", "река", "рельс", 
    "роза", "роман", "рукав", "ручка", "рыбак", "рысь", "салат", "сапог", "сахар", "свет", 
    "север", "семья", "сетка", "сила", "сказка", "склад", "слово", "снег", "собака", "сокол", 
    "сон", "сосна", "сплав", "спор", "сталь", "стена", "стол", "стопа", "стул", "сумка", 
    "суп", "сфера", "сцена", "табак", "танец", "ткань", "ток", "топор", "трава", "трос", 
    "туман", "тюль", "угол", "ужин", "улыбка", "уровень", "утка", "факел", "фасад", "фен", 
    "флаг", "фокус", "фонарь", "форма", "фрукт", "хлеб", "холм", "хор", "цвет", "цель", 
    "цепь", "цикл", "чайка", "чаша", "человек", "череп", "чехол", "шар", "шахта", "школа", 
    "шлем", "шнур", "шпиль", "шум", "щенок", "экран", "этаж", "юг", "яблоко", "якорь"
]

//создаем массив попыток, чтобы хранить использованные буквы
let arrOfAttempts = [];

//получаем доступ к полю, где будет показывать использованные буквы
const attempts = document.querySelector('.attempts');

//массив для индексов повторяющихся букв в слове
let arrOfСoincidencesIndex = [];

//массив для спанов слотов для букв
let spansForLetters = [];

//получаем значение поля ввода
let inputValue = '';

let idx = '';

//для счета попыток и вывода опреденной части виселицы
let countForGallows = -1;

const blackout = document.querySelector('.blackout');

const message = document.querySelector('.popUp__message');

let hiddenWord;

let koefficient = 1;

let canvas;

let ctx;

let result;

let ghostInterval;





 
//функция, которая рандомно выбирает слово из массива
function randWord(){
    const index = Math.floor(Math.random()*arrOfWords.length);
    return arrOfWords[index];
}

//функция, которая выводит слоты для букв на экран
function showCards(){
    hiddenWord = randWord();
    const answerField = document.querySelector('.answer');
    for(i=0; i<hiddenWord.length; i++){
        let newSpan = document.createElement('span');
        newSpan.classList.add('letter');
        let newParagraph = document.createElement('p');
        newParagraph.classList.add('attempt');
        newParagraph.appendChild(newSpan);
        answerField.appendChild(newParagraph);
    }
    spansForLetters = document.querySelectorAll('.letter');
    return arrOfLetters = hiddenWord.split('');
}


/* -------------------------CANVAS--------------------------------- */

function windowSize(){
    if(window.innerWidth < 850){
        koefficient = 0.5;
    }
    else{
        koefficient = 1;
    }

 canvas = document.querySelector('canvas');
 ctx = canvas.getContext("2d");
 canvas.width = 400*koefficient;
 canvas.height = 400*koefficient;
 ctx.strokeStyle = "bisque";
 ctx.lineWidth = 2;
}


// Функция для рисования виселицы
function drawGallows(part) {
switch (part){
// Рисуем основание
case "base":
    ctx.beginPath();
    ctx.moveTo(50*koefficient, 350*koefficient);
    ctx.lineTo(350*koefficient, 350*koefficient);
    ctx.stroke();
    break;
// Рисуем столб
case "pillar":
    ctx.beginPath();
    ctx.moveTo(100*koefficient, 350*koefficient);
    ctx.lineTo(100*koefficient, 50*koefficient);
    ctx.stroke();
    break;
// Рисуем перекладину
case "crossbar":
    ctx.beginPath();
    ctx.moveTo(100*koefficient, 50*koefficient);
    ctx.lineTo(250*koefficient, 50*koefficient);
    ctx.stroke();
    break;
// Рисуем веревку
case "rope":
    ctx.beginPath();
    ctx.moveTo(250*koefficient, 50*koefficient);
    ctx.lineTo(250*koefficient, 100*koefficient);
    ctx.stroke();
    break;
case "head":
// Рисуем голову
    ctx.beginPath();
    ctx.arc(250*koefficient, 125*koefficient, 25*koefficient, 0, Math.PI * 2);
    ctx.stroke();
    break;
case "body":
// Рисуем тело
    ctx.beginPath();
    ctx.moveTo(250*koefficient, 150*koefficient);
    ctx.lineTo(250*koefficient, 250*koefficient);
    ctx.stroke();
    break;
case "leftArm":
// Рисуем левую руку
    ctx.beginPath();
    ctx.moveTo(250*koefficient, 175*koefficient);
    ctx.lineTo(200*koefficient, 200*koefficient);
    ctx.stroke();
    break;
case "rightArm":
// Рисуем правую руку
    ctx.beginPath();
    ctx.moveTo(250*koefficient, 175*koefficient);
    ctx.lineTo(300*koefficient, 200*koefficient);
    ctx.stroke();
    break;
case "leftLeg":
// Рисуем левую ногу
    ctx.beginPath();
    ctx.moveTo(250*koefficient, 250*koefficient);
    ctx.lineTo(200*koefficient, 300*koefficient);
    ctx.stroke();
    break;
case "rightLeg":
// Рисуем правую ногу
    ctx.beginPath();
    ctx.moveTo(250*koefficient, 250*koefficient);
    ctx.lineTo(300*koefficient, 300*koefficient);
    ctx.stroke();
}
}


//массив названий частей виселицы для вызова функции
const arrOfDrawParts = ["base", "pillar", "crossbar", "rope","head", "body", "leftArm", "rightArm", "leftLeg", "rightLeg"];
//ставим счестчик -1, чтобы при первой ошибке индекс стал 0 и был выбран 0-ой элемент массива arrOfDrawParts
let count = -1;



/*-------------------------------------------------------------------------------- */


function attempt(){
    const input = document.querySelector('#guess>input');
    inputValue = input.value.toLowerCase();
    //проверяем, чтобы были введены именно буквы
    if(!/[а-я]/g.test(inputValue)){
        blackout.style.visibility = 'visible';
        message.textContent = 'Введите букву русского алфавита!';
        input.value = '';
        return;
    }
    else{
        if(isUsed()){
            input.value = '';
            return;
        }
        else{
            arrOfAttempts.push(inputValue);
            //ищем в массиве букв соответствие с тем, что введено в инпут
            idx = arrOfLetters.indexOf(inputValue);
            if(idx != -1){
                arrOfСoincidIndex();
                showRightAttempt();
                input.value = '';
            }
            //если ничего не найдено, то
            else {
                let letter = document.createElement('span');
                letter.textContent = inputValue + " ";
                attempts.appendChild(letter);
                //вызываем из массива частей виселицы название 
                countForGallows++;
                drawGallows(arrOfDrawParts[countForGallows]);
                input.value = '';
            }
            winOrLoose();
        }   
    }   
}


//функция для проверки повтора буквы-попытки
function isUsed(){
    let used = arrOfAttempts.indexOf(inputValue);
    //ищем в массиве прошлых попыток введенную букву, если находим - выводим сообщение
    if(used != -1){
        blackout.style.visibility = 'visible';
        message.textContent = 'Эта буква уже использовалась!'
        return true;
    } else{
        return false;
    }
}

//функция для поиска совпадений букв в загаданном слове
function arrOfСoincidIndex(){
    arrOfСoincidencesIndex = [];
    while(idx != -1){
        arrOfСoincidencesIndex.push(idx);
        idx = arrOfLetters.indexOf(inputValue, idx+1);
    }
    return arrOfСoincidencesIndex;
}


//функция дл вывода букв на экран
function showRightAttempt(){
    arrOfСoincidencesIndex.forEach((idx)=>{
        spansForLetters[idx].textContent = inputValue;
    });
}


function closeMessage(){
    message.textContent = '';
    blackout.style.visibility = 'hidden';
}


function winOrLoose(){
    if(countForGallows == 9){
        document.querySelector('#guess>input').setAttribute('disabled', 'true');
        document.querySelector('.try').setAttribute('disabled', 'true');
        setTimeout(function(){
            blackout.style.visibility = 'visible';
            message.textContent = `ТЫ ПРОИГРАЛ! Это слово "${hiddenWord.toUpperCase()}"`;
            document.querySelector('.popUp__button').insertAdjacentHTML('beforebegin',
                '<button class="popUp__button-playAgain">Играть еще!</button>'
            );
            document.querySelector('.popUp__button').textContent = 'закрыть';
            document.querySelector('.popUp__button-playAgain').addEventListener('click', newGame);
            document.querySelector('.popUp__button-playAgain').addEventListener('touch', newGame);
        }, 1000);
        result = 'Не угадал';
        clearInterval(ghostInterval);
        save();
    }
    else{
        let rightLetters = 0;
        spansForLetters.forEach((el)=>{
            if(el.textContent != ''){
                rightLetters++;
            }
        });
        if(spansForLetters.length == rightLetters){
            document.querySelector('#guess>input').setAttribute('disabled', 'true');
            document.querySelector('.try').setAttribute('disabled', 'true');
            blackout.style.visibility = 'visible';
            message.textContent = 'ТЫ ВЫИГРАЛ!';
            document.querySelector('.popUp__button').insertAdjacentHTML('beforebegin',
                '<button class="popUp__button-playAgain">Играть еще!</button>'
            );
            document.querySelector('.popUp__button').textContent = 'закрыть';
            document.querySelector('.popUp__button-playAgain').addEventListener('click', newGame); 
            document.querySelector('.popUp__button-playAgain').addEventListener('touch', newGame);
            result = 'Угадал';
            clearInterval(ghostInterval);
            save();
        }
    }
}


function newGame(){
    showPrevResults();
    arrOfСoincidencesIndex = [];
    spansForLetters = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    arrOfAttempts = [];
    countForGallows = -1;
    idx = '';
    document.querySelector('.popUp__button-playAgain').remove();
    attempts.innerHTML = '';
    document.querySelector('.answer').innerHTML = '';
    document.querySelector('#guess>input').removeAttribute('disabled');
    document.querySelector('.try').removeAttribute('disabled');
    result = '';
    ghost();
    showCards();
}







/** --------------------LOCAL STORAGE-------------- */

function save(){
    let index =  [...document.querySelectorAll('.prevGames>p')].length+1;
    //чтобы выводить не более 10 попыток
    if(index>10){
        document.querySelector('.prevGames').childNodes[0].remove();
        localStorage. removeItem(`${index-10}`);
        index++;
    }
    //создаем объект для хранения информации о предыдущей игре
    const gameSetObj = {
        index: index,
        word: hiddenWord,
        gameresult: result,
    };
     //добавляем объект в localStorage
     localStorage.setItem(index.toString(), JSON.stringify(gameSetObj));
     showPrevResults();
}


function showPrevResults(){
    setTimeout(function(){
        let arr = Object.keys(localStorage);
        arr.sort(function(a,b){return a-b});
        if(arr.length >= 11){
            arr.shift();
        }
        document.querySelector('.prevGames').innerHTML = '';
    // выводим все что есть в localStorage
        let count = 1;
        arr.forEach(function(key) {
        let savedGames = JSON.parse(localStorage.getItem(key));
        const item = document.createElement("p");
        item.innerHTML += `${count++}. ${savedGames.gameresult} слово "${savedGames.word}" <br>`;
        document.querySelector('.prevGames').appendChild(item);
        
    });
    }, 3000);
}



function ghost(){
    ghostInterval = setInterval(function(){
        document.querySelector('.ghost').style.left = Math.floor((Math.random()*(90-10+1)+10)) + '%';
        document.querySelector('.ghost').style.visibility = 'visible';
        setTimeout(function(){
            document.querySelector('.ghost').style.visibility = 'hidden';
        }, 5000);
    }, 9000);
}







window.addEventListener("load", windowSize);
window.addEventListener("load", showPrevResults);
window.addEventListener("load", showCards);
document.querySelector('.try').addEventListener('click', attempt);
document.querySelector('.try').addEventListener('touch', attempt);
document.querySelector('.popUp__button').addEventListener('click', closeMessage);
document.querySelector('.popUp__button').addEventListener('touch', closeMessage);
blackout.addEventListener('click', closeMessage);
blackout.addEventListener('touch', closeMessage);
window.addEventListener("load", ghost);
document.addEventListener('keyup', function(event){
    if (event.code == 'Enter'){
        attempt();
    }
})



