//Grabbing elements from HTML
let highScores = document.getElementById("highScores");
let container = document.getElementById("main-div");
let playBtn = document.getElementById("play-btn");
let allBtns = document.getElementById("buttons")
let optionBtns = document.querySelectorAll(".btn");
let questionHeading = document.getElementById("question");
let hidden = document.getElementById("hidden");
let choice0 = document.getElementById("choice0");
let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");
let choice3 = document.getElementById("choice3");
allBtns.setAttribute("style", "display: none");

// Setting an array of buttons & Array objects of Quiz Questions
let choiceArray = [choice0, choice1, choice2, choice3]
let testQuestions = [
    {
        prompt: "Which is not a Javascript framework?",
        options: ["NodeJs", "React.Js", "Django", "jQuery"],
        answer: "Django"
  
        },
    {
        prompt: "What character is used to indicated an end tag?",
        options: ["*", "\\", "^", "/"],
        answer: "/"

        },
    {
        prompt: "Javascript is interpreted by _____",
        options: ["Object", "Client", "Server", "None of the above"],
        answer: "Client"
        },
    {
        prompt: "Which of the following is not a valid Javascript variable names?",
        options: ["FirstName", "firstNames", "_first_names", "2FirstNames"],
        answer: "2FirstNames"

        },
    {
        prompt: "Using ____ statements are how you test for specific conditions",
        options: ["If", "Switch", "For", "Select"],
        answer: "If"

        }
    ]

// Setting variables for current value and score
let currentIndex = 0;
let score = 0;

// When "Play Now" button is clicked, this code is executed
function startQuiz() {
    playBtn.setAttribute("style", "display: none");
    hidden.setAttribute("style", "display: none");
    allBtns.setAttribute("style", "display: inline");


    getOptions()



    allBtns.addEventListener("click", function () {
        
        currentIndex++;
        
        getOptions();

    })

}


function getOptions() {
    if (currentIndex < 5) {
        questionHeading.textContent = testQuestions[currentIndex].prompt;

        for (let i = 0; i < choiceArray.length; i++) {
            choiceArray[i].textContent = testQuestions[currentIndex].options[i];
        }
    }

    if (currentIndex === 5) {
        questionHeading.textContent = "All Done";
        allBtns.setAttribute("style", "display: none")
        hidden.setAttribute("style", "display: inline");
        hidden.textContent = "Your score is " + score + "/" + testQuestions.length
    } 

}

function checkAnswers() {

    choice0.addEventListener('click', function () {
        if (choice0.textContent === testQuestions[currentIndex].answer) {
            score++;
        } else{

        }
    })

    choice1.addEventListener('click', function () {
        if (choice1.textContent === testQuestions[currentIndex].answer) {
            score++

        } else{

        }
    })

    choice2.addEventListener('click', function () {
        if (choice2.textContent === testQuestions[currentIndex].answer) {
            score++;

        } else {

        }
    })

    choice3.addEventListener('click', function () {
        if (choice3.textContent === testQuestions[currentIndex].answer) {
            score++;

        } else {
            
        }
    })

}

checkAnswers()




playBtn.addEventListener("click", startQuiz)

   










