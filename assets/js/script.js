
//Assign and call for global variables

var container = document.querySelector('.col-8');
var titlePrompt = document.querySelector('.title');
var prompts = document.querySelector('.prompts'); //questions formulated
var btnStart = document.querySelector('.btn-success');
var resultsDisplayed = document.querySelector('.results');
var btnNext = document.querySelector('.btn-next');
var btnSelect = document.querySelector('.answer-buttons');

//Assign an Index variable in 0 to start iterate each Quiz Question
var index = 0;

//we set up variables for the correct and incorrect
var correctChoice = document.querySelector('.correct');
var incorrectChoice = document.querySelector('.incorrect');

//Empty Numeric values for wins and losses in order to increment these values.
var wins = 0;
var looses = 0;
var wordBlank = '_';

//Timer Variables are being set up in a Global Scope for being called in the rest of functions.
var timer;
var timerCount;

//Array of each prompt and questions are going to be displayed on the screen
var questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            {text: 'Strings.', correctChoice: false},
            {text: 'Booleans.', correctChoice: false},
            {text: 'Alerts.', correctChoice: true},
            {text: 'Numbers.', correctChoice: false},
        ]
    },

    {
        question: 'The condition in an IF/ELSE statement is enclosed within ' + wordBlank,
        answers: [
            {text: 'Quotes.', correctChoice: false},
            {text: 'Curly Brackets.', correctChoice: true},
            {text: 'Parenthesis.', correctChoice: false},
            {text: 'Square Brackets.', correctChoice: false},
        ]

    },
    {
        question: 'Arrays in JavaScript can be used to store ' + wordBlank,
        answers: [
            {text: 'Numbers and Strings.', correctChoice: false},
            {text: 'Other Arrays.', correctChoice: false},
            {text: 'Booleans.', correctChoice: false},
            {text: 'All of the Above.', correctChoice: true},
        ]

    },
    {
        question: 'String values must be enclosed within ' + wordBlank + ' when being assigned to variables.',
        answers: [
            {text: 'Commas.', correctChoice: false},
            {text: 'Curly Brackets.', correctChoice: false},
            {text: 'Quotes.', correctChoice: true},
            {text: 'Parenthesis.', correctChoice: false},
        ]

    },
    {
        question: 'A very useful tool used during developing and debugging for printing content to be debugger is: ',
        answers: [
            {text: 'JavaScript.', correctChoice: false},
            {text: 'Terminal/bash.', correctChoice: false},
            {text: 'For Loops.', correctChoice: false},
            {text: 'Console.log().', correctChoice: false},
        ]

    },
]


//Init function
function init(){
    getWins();
    getLosses();
}

//Start Game function will be displayed - it has to contain the SetInterval of 10secs

var startGame = ()=>{
    index = 0;
    wins = 0;
    looses = 0;
    btnNext.innerHTML = 'Next';
    setTimer();
    showQuestion();
}

//ShowQuestion function will display each question in the screen once they're being answered.
function showQuestion(){
    resetState();
    var currentQuestion = questions[index];
    var questionNumber = index + 1;
    prompts.innerHTML = questionNumber + '. ' + currentQuestion.question;

    //Answer will be displayed
    currentQuestion.answers.forEach(answer =>{
        var buttonSelect = document.createElement('button');
        buttonSelect.innerHTML = answer.text;
        buttonSelect.classList.add('btn-select');
        btnSelect.appendChild(buttonSelect);
        if(answer.correctChoice){
            buttonSelect.dataset.correctChoice = answer.correctChoice;
        }
        buttonSelect.addEventListener('click', answerSelected)
        })
    
    btnStart.style.display = 'none';
}

//This function will define that the previous buttons will NOT be displayed on the screen once being selected.
function resetState(){
    btnNext.style.display = 'none';
    while(btnSelect.firstChild){
        btnSelect.removeChild(btnSelect.firstChild);
    }
}

//Once the user selects each option, the ClassList will assign a color for either correct or incorrect.
function answerSelected(e){
    var btnSelected = e.target;
    var correctChecked = btnSelected.dataset.correctChoice === 'true';
    if(correctChecked){
        btnSelected.classList.add('correctColor');
        winDisplayed()
    }else{
        btnSelected.classList.add('incorrectColor');
        loseDisplayed()
    }

    //Once selected, the user won't be able to select another answered
    Array.from(btnSelect.children).forEach(buttonSelect =>{
        if(buttonSelect.dataset.correctChoice === 'true'){
            buttonSelect.classList.add('correctColor')
        }
        buttonSelect.disabled = true;
    });

    localStorage.setItem("answers", JSON.stringify(btnSelected));
}

function handleNextButton(){
    index++
    if(index < questions.length){
        showQuestion();
    }else{
        init();
    }
}

btnNext.addEventListener('click', ()=>{
    if(index < questions.length){
        handleNextButton()
    }else{
        startGame()
    }
})

function getWins(){
    localStorage
}

function getLosses(){

}

btnStart.addEventListener('click', startGame);

function winDisplayed(){
    resultsDisplayed.textContent = "CORRECT!";
    wins++;
    btnStart.disabled = false;
    btnNext.style.display = 'block';
    // setWins();
}

function loseDisplayed(){
    resultsDisplayed.textContent = "WRONG ANSWER!";
    looses++;
    btnStart.disabled = false;
    btnNext.style.display = 'block';
    // setLosses();
}

function setwins(){

}

function setLosses(){


}

//SetInterval timer to generate the remaining seconds
function setTimer(){
    timer = setInterval(function(){
        timerCount--;
        timerElement.textContent = timerCount;
        if(timerCount >= 0){
            if(isWin && timerCount > 0){
                clearInterval(timer);
                winDisplayed();
            }
        }

        if(timerCount === 0){
            clearInterval(timer);
            loseDisplayed();
        }
    }, 1000);
}

//Iterator to increment the value of wins and looses


//Event Listener for each button.


//Local Storage function to save the results scored.
