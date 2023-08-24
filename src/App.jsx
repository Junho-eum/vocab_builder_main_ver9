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
      word: "뻔뻔스러움",
      synonym: "effrontery",
      hint: "The ____ of the child was not tolerated by the teacher",
    },
    {
      word: "으르다/협박하다",
      synonym: "browbeat",
      hint: "The bully ____ the younger kids into giving him their lunch money",
    },
    {
      word: "아이디어가 풍부한",
      synonym: "fecund",
      hint: "The ____ mind of the scientist was responsible for many inventions",
    },
    {
      word: "계약/조약을 폐지하다",
      synonym: "rescind",
      hint: "The company ____ the contract after the employee was found to be stealing",
    },
    {
      word: "(어떤 것을 차지하기 위해) 다투다",
      synonym: "vie",
      hint: "The two companies ____ for the top spot in the market",
    },
    {
      word: "(우스꽝스럽게) 야한",
      synonym: "ribald",
      hint: "The ____ joke made the children laugh",
    },
    {
      word: "(특히 일을 하러) 이동해 다니는",
      synonym: "peripatetic",
      hint: "The ____ salesman traveled from town to town",
    },
    {
      word: "(~에 화가 나서) 발끈하다",
      synonym: "bristle",
      sentence:
        "As we discussed the issue, he ____ at my suggestion that he had been unfair",
    },
    {
      word: "돈키호테식의/비현실적인",
      synonym: "quixotic",
      hint: "The ____ plan to build a bridge across the ocean was never going to work",
    },
    {
      word: "단조로운/따분한",
      synonym: "humdrum",
      hint: "The ____ routine of the office worker was not exciting",
    },
    {
      word: "완벽하게[완전하게] 하다",
      synonym: "consummate",
      hint: "The ____ gentleman was always polite and well-dressed",
    },
    {
      word: " 뚱한, 시무룩한",
      synonym: "sullen",
      hint: "The ____ child refused to speak to his parents",
    },
    {
      word: "무모한",
      synonym: "foolhardy",
      sentence: "It was ____ to go hiking in the mountains during the storm",
    },
    {
      word: "호통치다, 욕설하다; 혹평하다",
      synonym: "vituperate",
      sentence: "The angry customer ____ the manager for the poor service",
    },
    {
      word: "두 다리를 묶다",
      synonym: "hobble",
      sentence: "Bad weather ____ the rescue efforts",
    },
    {
      word: "(특히 불길한) 예감 ",
      synonym: "presentiment",
      hint: "The ____ of the coming storm made the children nervous",
    },
    {
      word: "꾸밈없는, 소박한",
      synonym: "austere",
      hint: "The ____ room was not very comfortable",
    },
    {
      word: "입찰하다.",
      synonym: "tender",
      sentence: "The company ____ for the contract",
    },
    {
      word: "상실감에 빠진",
      synonym: "bereft",
      hint: "The ____ child was very sad after losing his dog",
    },
    {
      word: " 자기를 내세우지 않는",
      synonym: "self-effacing",
      sentence: "The most admirable people are often the most ____",
    },
    {
      word: "(미술·문학·음악 등을 모르는) 교양 없는 사람",
      synonym: "philistine",
      hint: "The ____ did not appreciate the beauty of the painting",
    },
    {
      word: "(때로 지나칠 정도로) 애지중지하다",
      synonym: "cosseted",
      hint: "The king and quen ____ their only child",
    },
    {
      word: "과다 (=excess)",
      synonym: "surfeit",
      hint: "The ____ of food made the children sick",
    },
    {
      word: "(좋지 못하거나 불법적인 일에) 연루된",
      synonym: "complicit",
      hint: "The ____ politician was forced to resign",
    },
    {
      word: "성급한, 충동적인",
      synonym: "impetuous",
      hint: "The ____ child did not think before acting",
    },
    {
      word: "해로운, 유해한",
      synonym: "deleterious",
      hint: "The ____ effects of smoking are well-known",
    },
    {
      word: "곤혹, 당혹, 곤경",
      synonym: "quandary",
      sentence: "The company was in a ____ after the CEO resigned",
    },
    {
      word: "미숙한, 풋내기인",
      synonym: "callow",
      hint: "The ____ child did not know how to behave in public",
    },
    {
      word: "(…이 좋아/…에 빠져) 정신을 못 차리는",
      synonym: "besotted",
      hint: "The ____ couple could not keep their hands off each other",
    },
    {
      word: "거지, 탁발 수도사",
      synonym: "mendicant",
      hint: "The ____ begged for money on the street",
    },
    {
      word: "재기 넘치는, 아주 재미있는",
      synonym: "scintillating",
      hint: "The ____ conversation made the party enjoyable",
    },
    {
      word: " 감상적인 (=sentimental)",
      synonym: "maudlin",
      hint: "The ____ movie made the audience cry",
    },
    {
      word: "너무 신중한, 엄숙하고 지루한 ",
      synonym: "ponderous",
      hint: "The ____ speech put the audience to sleep",
    },
    {
      word: "(두 국가·단체 사이의) 화해[관계 회복]",
      synonym: "rapprochement",
      hint: "The ____ between the two countries was a welcome change",
    },
    {
      word: "두서없는, 산만한",
      synonym: "discursive",
      hint: "The ____ lecture was hard to follow",
    },
    {
      word: "별로 관계가 없는",
      synonym: "tangential",
      hint: "The professor's ____ comments were not relevant to the topic",
    },
    {
      word: "상대방의 비난에 맞서서 하는) 비난[맞대응]",
      synonym: "recrimination",
      hint: "The ____ between the two politicians was not productive",
    },
    {
      word: "버릇없는, 무례한",
      synonym: "insolent",
      hint: "The ____ child was not well-liked by the other children",
    },
    {
      word: "(먹고 살기에 턱없이 부족한) 아주 적은[얼마 안 되는] 돈",
      synonym: "pittance",
      hint: "The ____ the company paid its employees was not enough to live on",
    },
    {
      word: " 미친 듯이 날뛰어",
      synonym: "amok",
      sentence: "He ran ____ through the streets",
    },
    {
      word: "(은근히) 헐뜯는",
      synonym: "snide",
      hint: "The ____ comments made the child cry",
    },
    {
      word: "말로 표현하기 어려운",
      synonym: "ineffable",
      hint: "The beauty of the sunset was ____",
    },
    {
      word: "저속한, (도덕적으로) 지저분한",
      synonym: "tawdry",
      hint: "The ____ behavior of the politician was not well-received",
    },
    {
      word: "선거구를 자기 당에 유리하게 변경하다",
      synonym: "gerrymander",
      sentence: "The politician ____ the district to ensure his reelection",
    },
    {
      word: "(재산·세력 등을) 과시하는",
      synonym: "ostentatious",
      hint: "The ____ display of wealth was not appreciated by the guests",
    },
    {
      word: "퉁명스럽게",
      synonym: "brusquely",
      hint: "The teacher ____ told the student to sit down",
    },
    {
      word: "날씨가 험한, 거칠고 궂은, 무정한, 냉혹한",
      synonym: "inclement",
      hint: "The ____ weather made the trip unpleasant",
    },
    {
      word: "(흐름을) 막다[저지하다]",
      synonym: "stem",
      sentence: "The police tried to ____ the flow of drugs into the country",
    },
    {
      word: "변칙의, 이례적인",
      synonym: "anomalous",
      hint: "The ____ behavior of the child was not normal",
    },
    {
      word: "부도덕한, 무원칙한 (=unprincipled),",
      synonym: "unscrupulous",
      hint: "The ____ politician was not trusted by the voters",
    },
    {
      word: "온건한 (=bland)",
      synonym: "anodyne",
      hint: "The ____ speech did not offend anyone",
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
        <h3>Intermed-07/02</h3>
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
