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
      word: "coolness under strain",
      synonym: "aplomb",
      hint: "The ____ of the surgeon calmed the patient",
    },
    {
      word: "intensely emotional",
      synonym: "histrionic",
      hint: "The ____ speech brought tears to the audience",
    },
    {
      word: "quiet",
      synonym: "taciturn",
      hint: "While the CEO was ____ in public, he was a tyrant in private",
    },
    {
      word: "규율에 엄격한/에프엠",
      synonym: "martinet",
      hint: "The ____ teacher was feared by all the students",
    },
    {
     word: "부주의한/고의가 아닌",
      synonym: "inadvertent",
      hint: "The ____ mistake was overlooked by the boss",
    },
    {
      word: "틀린생각을 바로잡다",
      synonym: "disabuse",
      hint: "The teacher tried to ____ the student of the notion that the earth is flat",
    },
    {
      word: "lacking",
      synonym: "wanting",
      hint: "The ____ student was unable to pass the test",
    },
    {
      word: "intimidate",
      synonym: "cow",
      hint: "The bully tried to ____ the smaller child",
    },
    {
      word: "권위적인/위엄있는",
      synonym: "magisterial",
      hint: "The ____ boss was hated by all the employees",
    },
    {
      word: "눈치챔/느낌",
      synonym: "inkling",
      hint: "I had an ____ that I had seen the movie before",
    },
    {
      word: "prone to error",
      synonym: "fallacious",
      hint: "The ____ student was unable to pass the test",
    },
    {
      word: "뻔뻔스러움",
      synonym: "effrontery",
      hint: "The ____ of the child was not tolerated by the teacher",
    },
    {
      word: "shortage",
      synonym: "dearth",
      hint: "There was a ____ of food in the village",
    },
    {
      word: "승인/찬성",
      synonym: "approbation",
      hint: "The ____ of the boss was appreciated by the employee",
    },
    {
      word: "호전적인",
      synonym: "bellicose",
      hint: "The ____ attitude of the child was not tolerated by the teacher",
    },
    {
      word: "광고하다",
      synonym: "tout",
      hint: "At the coference, the speaker ____ the benefits of the new product",
    },
    {
      word: "가난한",
      synonym: "penurious",
      hint: "The ____ student was unable to pay for his lunch",
    },
    {
      word: "심각한 범죄행위",
      synonym: "enormity",
      hint: "The ____ of the crime shocked the community",
    },
    {
      word: "냉정한/침착한",
      synonym: "phlegmatic",
      hint: "The ____ attitude of the surgeon calmed the patient",
    },
    {
      word: "곤혹/당혹",
      synonym: "quandary",
      hint: "The student was in a ____ about which college to attend",
    },
    {
      word: "세련된/점잖은",
      synonym: "urbane",
      hint: "Maugham became the inspiration for the ____ and sophisticated characters in his novels",
    },
    {
      word: "법률/계약을 폐지하다",
      synonym: "rescind",
      hint: "The government ____ the law",
    },
    {
      word: "비통해하는",
      synonym: "pine",
      hint: "The child ____ for his dead grandmother",
    },
    {
      word: "개선하다",
      synonym: "ameliorate",
      hint: "The doctor tried to ____ the patient's condition",
    },
    {
      word: "말투/태도 거침",
      synonym: "asperity",
      hint: "The ____ of the boss was not appreciated by the employees",
    },
    {
      word: "기운찬/위세있는/용기있는",
      synonym: "mettlesome",
      hint: "Seal Team Six is a ____ group of soldiers",
    },
    {
      word: "기소하다",
      synonym: "indict",
      hint: "The prosecutor tried to ____ the suspect",
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
        <h3>Intermed-07/01</h3>
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
