window.onload = function () {
  // INITIALIZE THE VARIABLES
  //  COUNT THE ANSWERS CORRECT/INCORRECT/UNANSWERED FOR SCOREBOARD
  var correctAnswers = 0
  var incorrectAnswers = 0
  var unansweredQuestions = 0
  // TIMER
  var timeRemaining = 5
  var intervalID
  var answered = false
  // For comparison
  var currentQ = 0
  var correct
  // array of options
  var triviaGame = [
    {
      question: 'Who does Andy choose to take to college in Toy Story 3?',
      answer: ['Woody', 'Buzz Lightyear', 'Dash', 'Jessie'],
      correct: '0',
      photo: ('assets/images/woody.jpg')
    },
    {
      question: 'What year did Disney buy Pixar?',
      answer: ['2006', '2005', '2000', '2010'],
      correct: '0',
      photo: ('assets/images/yep.jpg')
    },
    {
      question: 'What is the highest grossing Pixar movie as of March 2019?',
      answer: ['Incredibles 2', 'Finding Nemo', 'Toy Story 2', 'Up' ],
      correct: '0',
      photo: ('assets/images/incred.png')
    },
    {
      question: 'What kind of fish is Dory?',
      answer: ['Clownfish', 'Royal Blue Tang Fish', 'Pufferfish', 'Yellow Tang Fish' ],
      correct: '1',
      photo: ('assets/images/dory.jpeg')
    },
    {
      question: 'The CEO of Monsters, Inc. is?',
      answer: ['James P Sullivan', 'Henry J Waternoose', 'Mike Wazowski', 'Randall Boggs' ],
      correct: '1',
      photo: ('assets/images/Waternoose.jpg')
    }]

  var startButton = document.querySelector('.startButton')
  var name = document.querySelector('.name')
  var restartButton = document.querySelector('.restartButton')
  var final = document.querySelector('.final')
  var questions = document.querySelector('.question')
  var time = document.querySelector('.timeRemaining')
  var answers = document.querySelector('.answers')
  // start the game
  function startGame () {
    // hide buttons/name of game and final scores
    startButton.style.display = 'none'
    name.style.display = 'none'
    restartButton.style.display = 'none'
    final.style.display = 'none'
    // set the score board counters to 0
    correctAnswers = 0
    incorrectAnswers = 0
    unansweredQuestions = 0
    // current index = 0
    currentQ = 0
    // get q and a
    nextQ()
  }

  function nextQ () {
    // initialize the clock to run
    answered = false
    // time
    timeRemaining = 5
    // set interval for timer to 1 second
    intervalID = setInterval(timer, 1000)
    // run the clock
    if (answered === false) {
      timer()
    }

    // store correct at currentQ
    correct = triviaGame[currentQ].correct
    // store question at currentQ
    var question = triviaGame[currentQ].question
    // for loop to display the questions
    questions.innerText = `${question}`
    for (var i = 0; i < 4; i++) {
      // answer at currentQ
      var btn = document.createElement('h5')
      btn.classList.add('allOptions')
      btn.setAttribute('id', i)
      var answer = triviaGame[currentQ].answer[i]
      btn.innerText = `${answer}`
      // store class name and id as position i for each answer option
      answers.appendChild(btn)
    }
    // on click for each answer option
    $('h5').click(function () {
      // store string of answer in id
      var id = $(this).attr('id')
      // compare if strings of id and correct
      if (id === correct) {
        answered = true
        questions.innerText = 'Correct!!!'
        // count the correct answers
        correctAnswers++
        // reset
        resetRound()
      } else {
        answered = true
        time.innerText = 'Incorrect!!'
        questions.innerText = `The correct answer is: ${triviaGame[currentQ].answer[correct]}`
        // count incorrect answers
        incorrectAnswers++
        // reset
        resetRound()
      }
    })
  }
  // timer function
  function timer () {
    // if they're out of time
    if (timeRemaining === 0) {
      // stop clock
      answered = true
      clearInterval(intervalID)
      // correct answer display
      questions.innerText = `The correct answer is:  ${triviaGame[currentQ].answer[correct]}`
      // count the unanswered q
      unansweredQuestions++
      // tell them time is up
      time.innerHTML = '<br>Time\'s Up!!!'
      // reset
      resetRound()
      // stop timer if answered
    } else if (answered === true) {
      clearInterval(intervalID)
      // otherwise decrement the time
    } else {
      timeRemaining--
      time.innerHTML = ' Time Remaining: ' + timeRemaining
    }
  }
  // reset
  function resetRound () {
    // remove the questions
    document.querySelector('.allOptions').parentNode.removeChild(document.querySelector('.allOptions'))
    final.style.display = 'none'
    // show the picture at currentQ
    answers.innerHTML = '<img class=answerImage width="150" height="150" src="' + `${triviaGame[currentQ].photo}` + '">'
    // increment the currentQ
    currentQ++
    // keep going if there are still more questions and set the time out
    if (currentQ < triviaGame.length) {
      setTimeout(function () {
        nextQ()
        document.querySelector('.answerImage').parentNode.removeChild(document.querySelector('.answerImage'))
      }, 5000) // removes answer image from previous round
    } else { // scoreboard screen
      setTimeout(function () {
        questions.style.display = 'none'
        time.style.display = 'none'
        document.querySelector('.answerImage').parentNode.removeChild(document.querySelector('.answerImage'))
        final.style.display = 'block'
        final.innerHTML = `Number correct: ${correctAnswers}` + '<br/>' + `Number Incorrect: ${incorrectAnswers}` + '<br/>' + `Unanswered: ${unansweredQuestions}`
        restartButton.style.display = 'block'
        clearInterval(intervalID)
      }, 5000)
    }
  };
  // start game
  startButton.addEventListener('click', function (event) {
    startGame()
  })
  // reset game
  restartButton.addEventListener('click', function (event) {
    startGame()
    questions.style.display = 'block'
    time.style.display = 'block'
  })
}
