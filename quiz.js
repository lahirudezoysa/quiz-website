const questions = [
  {
    question: "1.What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hyper Text Preprocessor", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
    answer: 0,
  },
  {
    question: "2.What does CSS stand for?",
    options: ["Common Style Sheet", "Colorful Style Sheet", "Computer Style Sheet", "Cascading Style Sheets"],
    answer: 3,
  },
  {
    question: "3.What does PHP stand for?",
    options: ["Hypertext Preprocessor", "Hypertext Programming", "Hypertext Preprogramming", "Hometext Preprocessor"],
    answer: 0,
  },
  {
    question: "4.What does SQL stand for?",
    options: ["Stylish Question Language", "Stylesheet Query Language", "Statement Question Language", "Structured Query Language"],
    answer: 3,
  },
  {
    question: "5.What does XML stand for?",
    options: ["eXtensible Markup Language", "eXecutable Multiple Language", "eXTra Multi-Program Language", "eXamine Multiple Language"],
    answer: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let timer = 20;
let interval;

function startQuiz() {
  const name = document.getElementById("name").value;
  if (name.trim() === "") {
    alert("Please enter your name.");
    return;
  }

  const nav = document.querySelector('.nav-background');
  nav.classList.add('nav-background-logged-in');
  document.getElementById("login").classList.add("d-none");
  document.getElementById("quiz").classList.remove("d-none");
  loadQuestion();
  document.getElementById("timer").style.visibility = "visible";
  document.getElementById("backImage").style.visibility = "visible";
  document.getElementById("usersName").innerHTML = name;
  document.getElementById("questionCounter").style.visibility = "visible";
  document.getElementById("btnNext").classList.remove("d-none");
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    clearInterval(interval);
    alert(`Quiz completed! Your score: ${score}/${questions.length}`);
    location.reload();
    return;
  }

  const questionData = questions[currentQuestion];
  document.getElementById("question-text").innerText = questionData.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  questionData.options.forEach((option, index) => {
    const div = document.createElement("div");
    div.classList.add("form-check");

    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.className = "form-check-input";
    radioBtn.name = "answer";
    radioBtn.id = `option${index}`;
    radioBtn.value = index;

    const label = document.createElement("label");
    label.className = "form-check-label";
    label.setAttribute("for", `option${index}`);
    label.innerText = option;

    div.appendChild(radioBtn);
    div.appendChild(label);
    optionsDiv.appendChild(div);

    radioBtn.onclick = () => selectAnswer(index);
  });

  updateQuestionCounter();
  resetTimer();
}

function selectAnswer(index) {
  const questionData = questions[currentQuestion];
  if (index === questionData.answer) {
    score++;
  }
  
}

function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

function resetTimer() {
  clearInterval(interval);
  timer = 20;
  updateTimerDisplay(timer);
  interval = setInterval(() => {
    timer--;
    updateTimerDisplay(timer);
    if (timer <= 0) {
      clearInterval(interval);
      nextQuestion();
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  document.getElementById("timer").innerText = formattedTime;
}

function updateQuestionCounter() {
  const questionCounter = document.getElementById("questionCounter");
  questionCounter.innerText = `Question ${currentQuestion + 1}/${questions.length}`;
}
