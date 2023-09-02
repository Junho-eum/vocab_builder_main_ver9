import { useState } from "react";
import "./App.css";
import React from "react";
import TextRevealProfile from "./TextRevealProfile";

// Fisher-Yates Shuffle
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function App() {
  const vocabList = [
    {
      word: "침체기,부진",
      synonym: "doldrums",
      hint: "The economy is in the ____",
    },
    {
      word: "소리가 거슬리는",
      synonym: "racuous",
      hint: "The ____ sound of the alarm clock woke me up.",
    },
    {
      word: "퉁명스럽게 거부하다",
      synonym: "rebuff",
      hint: "The company ____ed my offer.",
    },
    {
      word: "개혁에 반대하는",
      synonym: "reactionary",
      hint: "The ____s are trying to stop the reform.",
    },
    {
      word: "권위에 저항하는",
      synonym: "recalcitrant",
      hint: "The ____ student was sent to the principal's office.",
    },
    {
      word: "주장을 철회하다",
      synonym: "recant",
      hint: "The politician ____ed his statement.",
    },
    {
      word: "고쳐만들다",
      synonym: "recast",
      hint: "The director ____ the movie.",
    },
    {
      word: "경기침체기",
      synonym: "recession",
      hint: "The economy is in a ____.",
    },
    {
      word: "상습적 범행",
      synonym: "recidivism",
      hint: "The ____ rate of the criminal is high.",
    },
    {
      word: "상호간의",
      synonym: "reciprocal",
      hint: "The two countries have a ____ relationship.",
    },
    {
      word: "요약하다",
      synonym: "recapitulate",
      hint: "The teacher ____ed the lesson.",
    },
    {
      word: "추정하다",
      synonym: "reckon",
      hint: "I ____ that it will take about 2 hours to get there.",
    },
    {
      word: "교화,갱생",
      synonym: "reclamation",
      hint: "The ____ of the desert is a difficult task.",
    },
    {
      word: "고쳐만들다,변경하다",
      synonym: "recast",
      hint: "The director ____ the movie.",
    },
    {
      word: "은둔자",
      synonym: "recluse",
      hint: "The ____ lived in the mountains.",
    },
    {
      word: "물러나다",
      synonym: "recoil",
      hint: "The soldier ____ed at the sight of the enemy.",
    },
    {
      word: "난해한",
      synonym: "recondite",
      hint: "The book is ____ and difficult to understand.",
    },
    {
      word: "정찰활동",
      synonym: "reconnaissance",
      hint: "The army sent a plane for ____.",
    },
    {
      word: "정찰활동을 하다",
      synonym: "reconnoiter",
      hint: "The army ____ed the enemy's position.",
    },
    {
      word: "의지,의뢰",
      synonym: "recourse",
      hint: "The only ____ is to ask for help.",
    },
    {
      word: "안좋은 상황이 재발하는",
      synonym: "recrudescent",
      hint: "The ____ disease is spreading again.",
    },
    {
      word: "회복하다,재기하다",
      synonym: "recuperate",
      hint: "The patient is ____ing from the surgery.",
    },
    {
      word: "향기로운,떠오르게 하는",
      synonym: "redolent",
      hint: "The perfume is ____ of roses.",
    },
    {
      word: "적이 두렵고 존경스러운,가공할만한",
      synonym: "redoubtable",
      hint: "The ____ enemy was defeated.",
    },
    {
      word: "지나치게 단순한",
      synonym: "reductive",
      hint: "The ____ explanation is not enough.",
    },
    {
      word: "고집불통의",
      synonym: "refractory",
      hint: "The ____ child was sent to the principal's office.",
    },
    {
      word: "밝게 빛나는",
      synonym: "refulgent",
      hint: "The ____ sun was shining brightly.",
    },
    {
      word: "식단",
      synonym: "regimen",
      hint: "The doctor put the patient on a strict ____.",
    },
    {
      word: "토하다",
      synonym: "regurgitate",
      hint: "The bird ____ed the food for its babies.",
    },
    {
      word: "억제하다",
      synonym: "rein",
      hint: "The government is trying to ____ the spread of the virus.",
    },
    {
      word: "재탕하다",
      synonym: "rehash",
      hint: "The teacher ____ed the lesson.",
    },
    {
      word: "사회로 복귀시키다",
      synonym: "rehabilitate",
      hint: "The program helps ____ criminals.",
    },
    {
      word: "다시 젊게하다",
      synonym: "rejuvenate",
      hint: "The spa ____ed me.",
    },
    {
      word: "누그러지다",
      synonym: "relent",
      hint: "The teacher ____ed and gave us a break.",
    },
    {
      word: "유물",
      synonym: "relic",
      hint: "The ____s of the ancient civilization are on display.",
    },
    {
      word: "구조를 바꾸다",
      synonym: "remold",
      hint: "The company ____ed its management.",
    },
    {
      word: "태연한",
      synonym: "remiss",
      hint: "The ____ student did not do his homework.",
    },
    {
      word: "포기하다,양보하다",
      synonym: "relinquish",
      hint: "The government ____ed its power.",
    },
    {
      word: "재미,흥미",
      synonym: "relish",
      hint: "The child ____ed the game.",
    },
    {
      word: "태연한,성의없는",
      synonym: "remiss",
      hint: "The ____ student did not do his homework.",
    },
    {
      word: "항의하다",
      synonym: "remonstrate",
      hint: "The students ____ed against the new rule.",
    },
    {
      word: "가혹한,무자비한",
      synonym: "remorseless",
      hint: "The ____ dictator killed many people.",
    },
    {
      word: "보답하다",
      synonym: "remunerate",
      hint: "The company ____ed the employees for their hard work.",
    },
    {
      word: "보수가 있는,유리한",
      synonym: "remunerative",
      hint: "The job is ____.",
    },
    {
      word: "약속을 이행하지 못하다",
      synonym: "renege",
      hint: "The company ____ed on its promise.",
    },
    {
      word: "취소하다,철회하다",
      synonym: "repeal",
      hint: "The government ____ed the law.",
    },
    {
      word: "다시 채우다,보충하여 회복시키다",
      synonym: "replenish",
      hint: "The store ____ed its stock.",
    },
    {
      word: "휴식",
      synonym: "repose",
      hint: "The patient is ____ing.",
    },
    {
      word: "책망하다,비난하다",
      synonym: "reprehend",
      hint: "The teacher ____ed the student for cheating.",
    },
    {
      word: "억압하다",
      synonym: "repress",
      hint: "The government ____ed the rebellion.",
    },
    {
      word: "부도덕한 사람",
      synonym: "reprobate",
      hint: "The ____ was sent to prison.",
    },
    {
      word: "혐오감,증오",
      synonym: "repugnance",
      hint: "The ____ of the crime was strong.",
    },
    {
      word: "불쾌감을 주는,역겨운",
      synonym: "repugnant",
      hint: "The smell is ____.",
    },
    {
      word: "필수적인,필요한",
      synonym: "requisite",
      hint: "The ____ skills are reading and writing.",
    },
    {
      word: "보답하다,보복하다",
      synonym: "requite",
      hint: "The company ____ed the employees for their hard work.",
    },
    {
      word: "제한하다",
      synonym: "reserver",
      hint: "The government ____ed the number of visitors.",
    },
    {
      word: "내성적인",
      synonym: "reserved",
      hint: "The ____ student did not talk much.",
    },
  ];
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [wronglyAnswered, setWronglyAnswered] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [onStreak, setOnStreak] = useState(false);
  const shuffledVocabList = shuffle([...vocabList]);
  const [scoreList, setScoreList] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [shuffledWrongAnswers, setShuffledWrongAnswers] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState(
    vocabList.map((_, idx) => idx)
  );

  React.useEffect(() => {
    const savedScores = localStorage.getItem("scoreList");
    if (savedScores) {
      const sortedScores = JSON.parse(savedScores).sort(
        (a, b) => b.score - a.score
      );
      setScoreList(sortedScores);
    }
  }, []);


  const checkAnswer = () => {
    const isCorrect = inputValue === vocabList[index].synonym;
    const pointValue = 1; // Points for a correct answer

    if (isCorrect) {
      setStreak((prevStreak) => prevStreak + 1);
      setShowCorrectAnswer(false);
      setRemainingQuestions((prev) => prev.filter((i) => i !== index));
      // Check if user has a streak of 3 or more
      if (streak >= 2) {
        setOnStreak(true);
        setScore((prevScore) => prevScore + 3 * pointValue);
      } else {
        setScore((prevScore) => prevScore + pointValue);
      }

      setCorrectCount((prevCount) => prevCount + 1);

      // If answered correctly, remove from wronglyAnswered and shuffledWrongAnswers
      if (wronglyAnswered.includes(index)) {
        setWronglyAnswered((prev) => prev.filter((idx) => idx !== index));
        setShuffledWrongAnswers((prev) => prev.filter((idx) => idx !== index));
      }

      // Immediately proceed to the next question if the answer is correct
      moveToNextQuestion();
    } else {
      setStreak(0); // Reset the streak
      setOnStreak(false);
      setShowCorrectAnswer(true);
      if (!wronglyAnswered.includes(index)) {
        setWronglyAnswered((prev) => [...prev, index]);
      }
      setWrongCount((prevCount) => prevCount + 1);

      // Wait for 3 seconds before moving to the next question after a wrong answer
      setTimeout(() => {
        setShowCorrectAnswer(false);
        moveToNextQuestion();
      }, 3000);
    }
  };

  const moveToNextQuestion = () => {
    let newIndex;

    if (wronglyAnswered.includes(index) && shuffledWrongAnswers.length > 0) {
      const currPosition = shuffledWrongAnswers.indexOf(index);
      newIndex = shuffledWrongAnswers[currPosition + 1];
    } else if (remainingQuestions.length > 0) {
      // This ensures a random question is picked from the remaining questions
      newIndex =
        remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    } else {
      newIndex = undefined; // All questions have been answered
    }

    // If there's no new question (i.e., all questions have been answered correctly),
    // handle accordingly. For now, we're just resetting to the first question,
    // but you might want a more refined approach.
    if (newIndex === undefined) {
      newIndex = 0; // Or some logic to end the quiz.
    }

    setIndex(newIndex);
    setInputValue("");
  };

  const clearScores = () => {
    localStorage.removeItem("scoreList");
    setScoreList([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkAnswer();
    }
  };

  const totalWords = vocabList.length;
  const correctWidth = (correctCount / totalWords) * 100;
  const wrongWidth = (wrongCount / totalWords) * 100;

  const handleFinish = () => {
    const shouldRecord = window.confirm("Do you want to record your score?");
    if (shouldRecord) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}-${currentDate.getHours()}:${currentDate.getMinutes()}${currentDate.getHours() >= 12 ? "pm" : "am"}`;
      const newScore = { score, timestamp: formattedDate };

      const newScoreList = [...scoreList, newScore];
      setScoreList(newScoreList);
      localStorage.setItem("scoreList", JSON.stringify(newScoreList));
    }
  };

  return (
    <>
      <TextRevealProfile />

      <div className="vocab-section">
        {remainingQuestions.length === 1 && (
          <h2 style={{ textAlign: "center" }}>Last Question</h2>
        )}
        <h3>거만어-23</h3>
        <p>Meaning: {vocabList[index].word}</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter the synonym"
          />
          <button onClick={checkAnswer}>Check</button>
          <button onClick={() => setShowHint(!showHint)}>Hint</button>
          <button
            onClick={handleFinish}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            Finish
          </button>

          <button
            onClick={clearScores}
            style={{ position: "absolute", top: "10px", right: "120px" }}
          >
            Clear Scores
          </button>

          <div style={{ position: "absolute", top: "40px", right: "10px" }}>
            {scoreList.map((s, index) => (
              <div key={index}>
                Score: {s.score}{" "}
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "0.9em",
                    color: "grey",
                  }}
                >
                  {s.timestamp}
                </span>
              </div>
            ))}
          </div>
        </form>

        <div className={`score ${onStreak ? "glow" : ""}`}>Score: {score}</div>

        {/* Show the correct answer when the answer is wrong */}
        <div className={`correct-answer ${showCorrectAnswer ? "fade-in" : ""}`}>
          Correct Answer: {vocabList[index].synonym}
        </div>

        <div className={`hint ${showHint ? "show" : ""}`}>
          {vocabList[index].hint}
        </div>
      </div>
      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress correct"
            style={{ width: `${correctWidth}%` }}
          ></div>
        </div>
        <div className="progress-bar">
          <div
            className="progress wrong"
            style={{ width: `${wrongWidth}%` }}
          ></div>
        </div>
      </div>
    </>
  );
              };

export default App;
