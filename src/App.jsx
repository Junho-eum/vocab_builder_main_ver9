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
      word: "애절한, 슬픈",
      synonym: "doleful",
      hint: "The ____ look on his face made me feel sorry for him.",
    },
    {
      word: "휴면기의, 활동이 없는",
      synonym: "dormant",
      hint: "The volcano has been ____ for years.",
    },
    {
      word: "애지중지하다",
      synonym: "dote",
      hint: "The mother ____ on her child.",
    },
    {
      word: "흠뻑 적시다",
      synonym: "douse",
      hint: "The firemen ____ the fire with water.",
    },
    {
      word: "시무룩한, 우울한",
      synonym: "dour",
      hint: "She had a ____ expression on her face.",
    },
    {
      word: "칙칙한,재미없는",
      synonym: "drab",
      hint: "The ____ lecture put me to sleep.",
    },
    {
      word: "가혹한,아주 엄격한",
      synonym: "draconian",
      hint: "The ____ laws of the country were harsh.",
    },
    {
      word: "온건파의",
      synonym: "dovish",
      hint: "The ____ politician was against war.",
    },
    {
      word: "모음을 늘여서 천천히 말하다",
      synonym: "drawl",
      hint: "The southerner ____ his words.",
    },
    {
      word: "지루한,따분한",
      synonym: "dreary",
      hint: "The ____ weather made me feel depressed.",
    },
    {
      word: "허튼소리의",
      synonym: "drivel",
      hint: "The ____ of the politician made me angry.",
    },
    {
      word: "웃기는,익살스러운",
      synonym: "droll",
      hint: "The ____ comedian made me laugh.",
    },
    {
      word: "단조롭게 말하다",
      synonym: "drone",
      hint: "The teacher ____ on and on.",
    },
    {
      word: "두드려 변형시킬수 있는, 영향을 받기 쉬운",
      synonym: "ductile",
      hint: "The ____ metal was easy to bend.",
    },
    {
      word: "적절한,마땅한",
      synonym: "due",
      hint: "After due consideration, I decided to go.",
    },
    {
      word: "감미로운",
      synonym: "dulcet",
      hint: "The ____ sound of the violin made me feel relaxed.",
    },
    {
      word: "줄어들다",
      synonym: "dwindle",
      hint: "The number of students in the class ____ as the semester went on.",
    },
    {
      word: "~가 없는,결여된",
      synonym: "devoid of",
      hint: "The room was ____ ____ furniture.",
    },
    {
      word: "권리,의무를 양도하다,맡기다",
      synonym: "devolve",
      hint: "The responsibility ____ to me.",
    },
    {
      word: "천이 얇은,비치는",
      synonym: "diaphanous",
      hint: "The ____ curtains let in a lot of light.",
    },
    {
      word: "이분법",
      synonym: "dichotomy",
      hint: "The ____ between good and evil is a common theme in literature.",
    },
    {
      word: "가르치기 위한,교육적인",
      synonym: "didactic",
      hint: "The ____ teacher made the class boring.",
    },
    {
      word: "보수적인",
      synonym: "diehard",
      hint: "The ____ conservative was against change.",
    },
    {
      word: "솜씨 좋은,능숙한",
      synonym: "dexterous",
      hint: "The ____ surgeon saved the patient's life.",
    },
    {
      word: "자신없어 하는,수줍어 하는",
      synonym: "diffident",
      hint: "The ____ child was afraid to speak in front of the class.",
    },
    {
      word: "주제에서 벗어나다",
      synonym: "digress",
      hint: "The speaker ____ from the topic.",
    },
    {
      word: "넓히다, 상세히 말하다",
      synonym: "dilate",
      hint: "The doctor ____ my pupils.",
    },
    {
      word: "행동이 느린,둔한",
      synonym: "dilatory",
      hint: "The ____ student was always late for class.",
    },
    {
      word: "칙칙한,지저분한",
      synonym: "dingy",
      hint: "The ____ room was not very inviting.",
    },
    {
      word: "수완이 있는,능숙한",
      synonym: "diplomatic",
      hint: "The ____ politician was able to avoid war.",
    },
    {
      word: "끔찍한,비참한",
      synonym: "dire",
      hint: "The ____ situation made me feel depressed.",
    },
    {
      word: "잘못된 생각을 바로잡다",
      synonym: "disabuse",
      hint: "The teacher ____ the student's misconception.",
    },
    {
      word: "불만,반감을 품은",
      synonym: "disaffected",
      hint: "The ____ students were unhappy with the teacher.",
    },
    {
      word: "강한반대,비난",
      synonym: "disapprobation",
      hint: "The ____ of the teacher's methods was widespread.",
    },
    {
      word: "거부하다,의절하다",
      synonym: "disavow",
      hint: "The politician ____ his previous statement.",
    },
    {
      word: "문하생,추종자",
      synonym: "disciple",
      hint: "The ____ of the teacher followed him everywhere.",
    },
    {
      word: "징계의",
      synonym: "disciplinary",
      hint: "The ____ action was harsh.",
    },
    {
      word: "혼란시키다",
      synonym: "discombobulate",
      hint: "The new environment ____ me.",
    },
    {
      word: "마음의 평정을 없애다,동요시키다",
      synonym: "discompose",
      hint: "The bad news ____ me.",
    },
    {
      word: "당황스럽게하다, 혼란스럽게하다",
      synonym: "discomfit",
      hint: "The bad news ____ me.",
    },
    {
      word: "현명한,신중한",
      synonym: "discreet",
      hint: "The ____ student did not talk in class.",
    },
    {
      word: "신중함,자유재량",
      synonym: "discretion",
      hint: "The teacher used her ____ in grading the test.",
    },
    {
      word: "주제에서 벗어난 이야기",
      synonym: "discursion",
      hint: "The speaker's ____ made the audience bored.",
    },
    {
      word: "의무 해방하다",
      synonym: "disengage",
      hint: "The soldier ____ from the battle.",
    },
    {
      word: "많은양을 쏟아내다,토해내다",
      synonym: "disgorge",
      hint: "The volcano ____ lava.",
    },
    {
      word: "환상을 깨뜨리다",
      synonym: "disillusion",
      hint: "The bad news ____ me.",
    },
    {
      word: "괴리,차이",
      synonym: "disjunction",
      hint: "The ____ between the two groups was obvious.",
    },
    {
      word: "탈구시키다,혼란에 빠뜨리다",
      synonym: "dislocate",
      hint: "The injury ____ the player.",
    },
    {
      word: "장소에서 몰아내다,직위에서 쫓아내다",
      synonym: "dislodge",
      hint: "The police ____ the protesters.",
    },
    {
      word: "느낌을 떨쳐버리다",
      synonym: "dispel",
      hint: "The teacher ____ the student's fears.",
    },
    {
      word: "쫓아내다,이주하다",
      synonym: "displace",
      hint: "The flood ____ many people.",
    },
    {
      word: "불안,동요",
      synonym: "disquiet",
      hint: "The ____ of the students was obvious.",
    },
    {
      word: "반대하는",
      synonym: "dissident",
      hint: "The ____ group was against the government.",
    },
    {
      word: "소멸시키다,탕진하다",
      synonym: "dissipate",
      hint: "The wind ____ the clouds.",
    },
    {
      word: "증류하다,추출하다",
      synonym: "distill",
      hint: "The chemist ____ the liquid.",
    },
    {
      word: "분리",
      synonym: "divisive",
      hint: "The issue was ____.",
    },
    {
      word: "독단적인",
      synonym: "dogmatic",
      hint: "The ____ teacher did not allow any discussion.",
    },
    {
      word: "독단적인,교리주의의",
      synonym: "doctrinaire",
      hint: "The ____ teacher did not allow any discussion.",
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
        <h3>거만어-4/5</h3>
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
