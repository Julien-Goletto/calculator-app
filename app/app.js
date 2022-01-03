// Modification des thèmes de la calculatrice

//On récupère la valeur du numéro de thème sélectionné
let nbThemeElm = document.getElementById('theme');
let themeIndex = Number(nbThemeElm.value)-1;

//On ajoute deux EventListeners
//Le premier au chargement de la page
window.addEventListener('load', initializeTheme);
//Le second lors d'une intéraction avec le sélecteur de thèmes
nbThemeElm.addEventListener('change', modifyTheme);

let themeCSSVariables = [
    "--main-bg-color", "--display-bg-color", "--keypad-bg-color",
    "--del-reset-key-bg-color", "--del-reset-key-shadow-color", "--equal-key-bg-color",
    "--equal-key-shadow-color", "--keys-bg-color", "--keys-shadow-color",
    "--text-color-header", "--text-color-display", "--text-color-main-keys",
    "--text-color-del-reset-keys", "--text-color-equal-key"
]

let themesColors = [
    ["hsl(222, 26%, 31%)", "hsl(224, 36%, 15%)", "hsl(223, 31%, 20%)",
        "hsl(225, 21%, 49%)", "hsl(224, 28%, 35%)", "hsl(6, 63%, 50%)",
        "hsl(6, 70%, 34%)", "hsl(30, 25%, 89%)", "hsl(28, 16%, 65%)",
        "#ffffff", "#ffffff", "hsl(221, 14%, 31%)", "#ffffff", "#ffffff"],
    ["hsl(0, 0%, 90%)", "hsl(0, 0%, 93%)", "hsl(0, 5%, 81%)",
        "hsl(185, 42%, 37%)", "hsl(185, 58%, 25%)", "hsl(25, 98%, 40%)",
        "hsl(25, 99%, 27%)", "hsl(45, 7%, 89%)", "hsl(35, 11%, 61%)",
        "hsl(60, 10%, 19%)", "hsl(60, 10%, 19%)", "hsl(60, 10%, 19%)", "#ffffff", "#ffffff"],
    ["hsl(268, 75%, 9%)", "hsl(268, 71%, 12%)", "hsl(268, 71%, 12%)",
        "hsl(281, 89%, 26%)", "hsl(285, 91%, 52%)", "hsl(176, 100%, 44%)",
        "hsl(177, 92%, 70%)", "hsl(268, 47%, 21%)", "hsl(290, 70%, 36%)",
        "hsl(52, 100%, 62%)", "hsl(52, 100%, 62%)", "hsl(52, 100%, 62%)", "#ffffff", "hsl(198, 20%, 13%)" 
    ]
];

//Fonction qui modifie les propriétés des différents éléments
const themeSwap = function (themesColors, themeIndex){
    let main = document.querySelector('main');
    for (let i = 0 ; i <themeCSSVariables.length; i++ ){
        main.style.setProperty(themeCSSVariables[i],themesColors[themeIndex][i]);
    }
}

function initializeTheme(){
    themeSwap(themesColors, themeIndex);
}

function modifyTheme(event){
    themeIndex = event.target.value-1;
    themeSwap(themesColors, themeIndex);
}

//on récupère l'élément affiché sur le display
let displayedResult = document.querySelector('.calculator__display');

//Variable de stockage des calculs
let result = 0;
let pressedButtons = [];

//Fonction de reset
const reset = () => {
    result = 0;
    pressedButtons = [];
    displayedResult.textContent = result;
}

//Fonction de saisie
const get = value => pressedButtons.push(value)
//Fonction d'affichage
const display = () => displayedResult.textContent = pressedButtons.join('');
//Fonction de DEL
const deleteLastElmt = () => pressedButtons.pop();
//Fonction de calcul
const calculate = function () {
    let concatOperation = [];
    let numberStocked = '';
    for (elt of pressedButtons){
        if(elt === "+" || elt === "-" || elt === "*" || elt === "/"){
            concatOperation.push(numberStocked, elt);
            numberStocked = '';
        }
        else{
            numberStocked += elt;
        }
    }
    concatOperation.push(numberStocked);
    result = eval(concatOperation.join(' '));
    pressedButtons = [String(result)];
}

const displayResult = () => displayedResult.textContent = pressedButtons;
