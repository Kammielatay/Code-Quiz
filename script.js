//Grabbing elements from HTML
let highScores = document.getElementById("highScores");
let navLink = document.querySelector(".nav-link")
let container = document.getElementById("main-div");
let playBtn = document.getElementById("play-btn");
let allBtns = document.getElementById("buttons");
allBtns.setAttribute("style", "display: none");
let optionBtns = document.querySelectorAll(".btn");
let questionHeading = document.getElementById("question");
let hidden = document.getElementById("hidden");
let choice0 = document.getElementById("choice0");
let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");
let choice3 = document.getElementById("choice3");
let btn0 = document.getElementById("btn0");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let h3content = document.getElementById("content");


// Setting variables for current value and score
let currentIndex = 0;
let score = 0;
let secondsElasped = 0;
let interval;
let finalTime = 0;
let results = [];
let clicked = 0;


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


// When "Play Now" button is clicked, this code is executed
function startQuiz() {
    playBtn.setAttribute("style", "display: none");
    hidden.setAttribute("style", "display: none");
    allBtns.setAttribute("style", "display: inline");

    highScores.removeEventListener("click", top5)
    
    startTimer();

    getOptions();

    allBtns.addEventListener("click", function () {
        
        currentIndex++;
        
        getOptions();

    })
}


// Displays the current question for index and options for answer 
function getOptions() {
    if (currentIndex < 5) {
        questionHeading.textContent = testQuestions[currentIndex].prompt;

        for (let i = 0; i < choiceArray.length; i++) {
            choiceArray[i].textContent = testQuestions[currentIndex].options[i];
        }
    }
    displayMessage()

}  


// Displays a message that quiz is done, score the user recieved, and input field to submit score
function displayMessage() {

    if (currentIndex === 5) {
        
        allBtns.setAttribute("style", "display: none")
        highScores.setAttribute("style", "display: none")

        if (score >= 3){
            questionHeading.textContent = "Great Job!";
        } else if(score < 3) {
            questionHeading.textContent = "Try Again!";
        }

        // displaying users score
        hidden.setAttribute("style", "display: inline");
        hidden.textContent = "Your final score is " + score + "/" + testQuestions.length
        

        // creating initials textbox
        let newDiv = document.createElement("div");
        let label = document.createElement('label')
        label.textContent = "Enter Initials: "
        let input = document.createElement('input')
        input.setAttribute("id", "initials")
       
        let submit = document.createElement('button')
        submit.classList.add("submit")
        submit.textContent = "Submit"

        //appending initials to html
        container.appendChild(newDiv)
        newDiv.appendChild(label)
        label.append(input)
        newDiv.append(submit)

        //setting click event for submit button to display the top 5 scores
        submit.addEventListener('click', displayTopScores)
    }
}



// storing the highScores too the localStorage
function storedHighScores() {
    localStorage.setItem('initials', JSON.stringify(results))
}



// gathering the highScores from the localStorage
function init() {
    // Get stored names from localStorage
    let storedScores = JSON.parse(localStorage.getItem("initials"));

    if (storedScores !== null) {
        results = storedScores
    }
    renderHighScore();
}



// When submit button is clicked, the display of top scores will appear
function displayTopScores() {

    init();

    hideElements()

    storedHighScores()
}

// Hiding label and submit button from the container
function hideElements() {

    let hideLabel = document.querySelector('label');
    let hideSubmitBtn = document.querySelector('.submit')

    hideSubmitBtn.setAttribute("style", "display: none")
    hideLabel.setAttribute("style", "display: none");

    questionHeading.textContent = "HighScores"
    
}

// How the Top Scores will be displayed 
function renderHighScore() {

    let nameValue = initials.value + ' - ' + score;

    if (score === 5) {
        results.unshift(nameValue)
    } else if (score < 5) {
        results.push(nameValue)
    } 

    displayingTop5();

}

function displayingTop5(){
    for (var i = 0; i < 5; i++) {
        var top5 = results[i];

        let li = document.createElement('li')
        li.textContent = top5
        li.setAttribute("data-index", i);
       

        container.appendChild(li);
    }

        //creating reset button
        let resetBtn = document.createElement('button');
        resetBtn.classList.add("reset");
        resetBtn.textContent = "Clear Highscores"

        //creating back button
        let backBtn = document.createElement('button');
        backBtn.classList.add('reset');
        backBtn.textContent = "Go Back"


        container.appendChild(resetBtn)
        container.appendChild(backBtn)

    
        // setting an event to clear the local storage
        resetBtn.addEventListener('click', clearTop5)

        backBtn.addEventListener('click', goBack)
}

// clearing the local storage
function clearTop5(){
    localStorage.clear();
    window.location.reload();

}

// sending user back to homepage
function goBack() {
    window.location.reload();
}

// Checking the answer that user clicks to the correct answer of the questions
function checkAnswers() {
    btn0.addEventListener('click', function () {
        if (choice0.textContent === testQuestions[currentIndex].answer) {
            return score++;
            
        } else {
            return secondsElasped += 10;
            
        }
    })

    btn1.addEventListener('click', function () {
        if (choice1.textContent === testQuestions[currentIndex].answer) {
            return score++;
        } else {
            return secondsElasped += 10
        }
    })

    btn2.addEventListener('click', function () {
        if (choice2.textContent === testQuestions[currentIndex].answer) {
          return score++;
        } else {
            return secondsElasped += 10
        }
    })

    btn3.addEventListener('click', function () {
        if (choice3.textContent === testQuestions[currentIndex].answer) {
           return score++;
        } else {
            return secondsElasped += 10
        }
    })

}

checkAnswers()

// setting timer for quiz
function startTimer() {
    clearInterval(interval)

    interval = setInterval(happensEverySecond, 1000)
}

function happensEverySecond() {
    secondsElasped++;

    renderTime()

}


function renderTime() {
    var secondsLeft = 30 - secondsElasped;
    h3content.textContent = "Time Left: " + secondsLeft;

    if (secondsLeft === 0 || questionHeading.textContent === "Try Again!" || questionHeading.textContent === "Great Job!") {
        clearInterval(interval)
        h3content.textContent = "";
    }

    if (secondsElasped === 30 || secondsLeft < 0) {
        clearInterval(interval)
        h3content.textContent = "";
        currentIndex = currentIndex + (testQuestions.length - currentIndex);
        displayMessage()
    }
}


function top5(){
    clicked++;
    playBtn.setAttribute("style", "display: none");
    hidden.setAttribute("style", "display: none");

    questionHeading.textContent = "HighScores"

    let storedScores = JSON.parse(localStorage.getItem("initials"));
    
    if (storedScores !== null) {
      results = storedScores
    }
 
    highScores.textContent = "Homepage"

    if (clicked > 1){
        return;
    }

    highScores.addEventListener("click", function(){
        
        if (highScores.textContent === "Homepage"){
         window.location.reload();
        }
        
    });

   
    displayingTop5();

}

// This event will run the dynamic quiz
playBtn.addEventListener("click", startQuiz)
highScores.addEventListener("click", top5);









