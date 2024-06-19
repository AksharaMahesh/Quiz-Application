let quizData = [
    {
      question: "What is the capital of Japan?",
      options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
      correct: "Tokyo",
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Mars", "Venus", "Jupiter", "Mercury"],
      correct: "Mars",
    },
    {
      question:
        "Which famous scientist developed the theory of general relativity?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Stephen Hawking",
        "Galileo Galilei",
      ],
      correct: "Albert Einstein",
    },
    {
      question: "What is the largest mammal on Earth?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correct: "Blue Whale",
    },
    {
      question: "Which famous artist painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      correct: "Leonardo da Vinci",
    },
    {
      question: "Which playwright wrote the tragedy 'Romeo and Juliet'?",
      options: [
        "William Shakespeare",
        "George Bernard Shaw",
        "Oscar Wilde",
        "Charles Dickens",
      ],
      correct: "William Shakespeare",
    },
    {
      question: "Who is known as the father of modern physics?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Galileo Galilei",
        "Niels Bohr",
      ],
      correct: "Albert Einstein",
    },
    {
      question:
        "Which ancient wonder of the world was a massive statue of the Greek god Zeus?",
      options: [
        "Great Pyramid of Giza",
        "Hanging Gardens of Babylon",
        "Statue of Zeus at Olympia",
        "Colossus of Rhodes",
      ],
      correct: "Statue of Zeus at Olympia",
    },
    {
      question: "Who wrote the novel 'Pride and Prejudice'?",
      options: [
        "Emily Brontë",
        "Charlotte Brontë",
        "Jane Austen",
        "Louisa May Alcott",
      ],
      correct: "Jane Austen",
    },
  ];
const quizContainer=document.querySelector(".quiz-container");
const question=document.querySelector(".quiz-container .question");
const options=document.querySelector(".quiz-container .options");
const nextbt=document.querySelector(".quiz-container .next-button");
const quizResult=document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");


let questionNumber=0;
const max_ques=5;
let score=0;
let timerInterval;

const shuffleArray=(array) =>{
  return array.slice().sort(() =>Math.random()-0.5);
};
quizData=shuffleArray(quizData);

const resetLocalStorage=()=>{
  for( i=0;i<max_ques;i++){
     localStorage.removeItem(`userAnswer_${i}`);
  }
}
resetLocalStorage();

const checkAnswer=(e) =>{
    let userAnswer=e.target.textContent;
    if(userAnswer===quizData[questionNumber].correct){
      score++;
      e.target.classList.add("correct");
    }
    else{
        e.target.classList.add("incorrect");
    }
    localStorage.setItem(`userAnswer_${questionNumber}`,userAnswer);

    let alloption=document.querySelectorAll(".quiz-container .option");
    alloption.forEach((o)=>{
        o.classList.add("disabled");
    })
};
const createQuestion =() => {
     clearInterval(timerInterval);
     let secondsLet=9;
     const timerDisplay=document.querySelector(".timer");
      timerDisplay.classList.remove("timer-danger");
     timerDisplay.textContent =`Time Left: 10 seconds`;
     timerInterval=setInterval(()=>{
             timerDisplay.textContent=`Time Left: ${secondsLet} seconds`;
             secondsLet--;
             if(secondsLet<3){
              timerDisplay.classList.add("timer-danger");
             }
             if(secondsLet<0){
              clearInterval(timerInterval);
              displayNextQuestion();
             }
     },1000);

    options.innerHTML="";

    question.innerHTML=`<span class='question-number'>${questionNumber+1}/${max_ques}</span>${quizData[questionNumber].question}`;
    quizData[questionNumber].options.forEach((o)=>{
       const option=document.createElement("button");
       option.classList.add("option");
       option.innerHTML=o;
       option.addEventListener("click",(e)=>{
        checkAnswer(e);
       });
       options.appendChild(option);

    });
};

const retakeQuiz=() =>{
  questionNumber=0;
  score=0;
  quizData=shuffleArray(quizData);
  resetLocalStorage();
 
  quizResult.style.display="none";
  quizContainer.style.display="block";

  createQuestion(); 
};


const displayQuizResult=()=>{
    quizResult.style.display="flex";
     quizContainer.style.display="none";
     quizResult.innerHTML="";

     const resultHeading=document.createElement("h2");
     resultHeading.innerHTML=`You have Scored ${score} out of ${max_ques}.`;
     quizResult.appendChild(resultHeading);

     for(let i=0;i<max_ques;i++){
      const resultitem=document.createElement("div");
      

      const userAnswer=localStorage.getItem(`userAnswer_${i}`);
      const correctAnswer=quizData[i].correct;
      let answerCorrect= userAnswer === correctAnswer;
      console.log(userAnswer+"-"+correctAnswer+"-"+answerCorrect);
      if(answerCorrect){
        resultitem.classList.add("crct");
      }
      else{
        resultitem.classList.add("incrct");
      }

      resultitem.innerHTML=`<div class="question">Question ${i+1}:${quizData[i].question}</div>
            <div class="user-answer">Your answer:${userAnswer || "Not Answered"}</div>
            <div class="correct-answer">Correct answer:${correctAnswer}</div>`;
           quizResult.appendChild(resultitem);
     }

const retakeBtn = document.createElement("button");
retakeBtn.classList.add("retake");
retakeBtn.innerHTML = "Retake Quiz";
retakeBtn.addEventListener("click", retakeQuiz);
quizResult.appendChild(retakeBtn);
};

const displayNextQuestion=()=>{
    if(questionNumber>=max_ques-1){
        displayQuizResult();
        return;
    }
      questionNumber++;
      createQuestion();
};
nextbt.addEventListener("click",displayNextQuestion);

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});


