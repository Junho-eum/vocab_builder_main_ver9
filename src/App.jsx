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
      word: "(두 국가·단체 사이의) 화해[관계 회복]",
      synonym: "rapprochement",
      hint: "The ____ between the two countries was a welcome change",
    },
    {
      word: "온건한 (=bland)",
      synonym: "anodyne",
      hint: "The ____ speech did not offend anyone",
    },
    {
      word: "무기 없이 맨손으로 싸우는 게임 형태.",
      synonym: "melee",
      hint: "I became enraged and joined the ____",
    },
    {
      word: "급성장[급증]하다",
      synonym: "burgeon",
      hint: "The city's population has ____ed in recent years",
    },
    {
      word: "풍자하다",
      synonym: "lampoon",
      hint: "The politician was ____ed on the front page of the newspaper",
    },
    {
      word: "일치하지 않는, 조화하지 않는, 앞뒤가 안 맞는",
      synonym: "incongruous",
      hint: "The ____ music was not appropriate for the event",
    },
    {
      word: "멍청한, 얼빠진",
      synonym: "vacuous",
      hint: "The ____ student did not know the answer",
    },
    {
      word: "잔인한, 사나운",
      synonym: "fell",
      hint: "The ____ dictator killed thousands of people",
    },
    {
      word: "음탕한",
      synonym: "lacivious",
      hint: "He was fired for making ____ comments to his coworkers",
    },
    {
      word: "순화[정화]시키다(purify), <의론 등을> 다듬다",
      synonym: "rarefy",
      hint: "Jacks vulgar language was ____ed after he had children",
    },
    {
      word: "(특히 남성용) 의류의, 재봉[재단]의",
      synonym: "sartorial",
      hint: "The ____ style of the suit was very fashionable",
    },
    {
      word: "궁핍한",
      synonym: "indigent",
      hint: "The ____ family could not afford to buy food",
    },
    {
      word: "변화무쌍한",
      synonym: "protean",
      hint: "The ____ actor could play any role",
    },
    {
      word: "막을 내리다, 클라이맥스에 이르다",
      synonym: "culminate",
      hint: "The concert ____ed with a fireworks show",
    },
    {
      word: "선언[선포]하다 (=declare)",
      synonym: "proclaim",
      hint: "The president ____ed that the war was over",
    },
    {
      word: "몹시 화나게[격분하게] 하다",
      synonym: "incense",
      hint: "The rude comment ____ed the teacher",
    },
    {
      word: "독실한[신성한] 체하는 (=self-righteous)",
      synonym: "sanctimonious",
      hint: "A ____ person pretends to be morally superior to others",
    },
    {
      word: "지배력[영향력]을 행사할 수 있는 위치",
      synonym: "ascendancy",
      hint: "The king had ____ over his subjects",
    },
    {
      word: "귀찮게[짜증나게] 하다 ",
      synonym: "rile",
      hint: "The loud music ____ed the neighbors",
    },
    {
      word: "굽실거리다",
      synonym: "kowtow",
      hint: "The servant ____ed to the king",
    },
    {
      word: "복잡한 시국, 난국",
      synonym: "imbroglio",
      hint: "The ____ was caused by the president's poor leadership",
    },
    {
      word: "용납하지 않다",
      synonym: "brook",
      hint: "The teacher did not ____ cheating",
    },
    {
      word: "(별 생각 없이·힘 안 들이고) 술술 하는, 안이한",
      synonym: "facile",
      hint: "The ____ student did not study for the test",
    },
    {
      word: "(재산·권력 등에 대한) 탐욕",
      synonym: "cupidity",
      hint: "The businessman's ____ led him to commit fraud",
    },
    {
      word: "겉치장, 허식",
      synonym: "veneer",
      hint: "The politician's ____ of honesty was not convincing",
    },
    {
      word: "환등, 주마등처럼 스쳐 지나가는 장면",
      synonym: "phantasmagorical",
      hint: "The ____ scene was very frightening",
    },
    {
      word: "존재하다 (=apply)",
      synonym: "obtain",
      hint: "The rule ____s to all students",
    },
    {
      word: "(비밀을) 알려주다[누설하다]",
      synonym: "divulge",
      hint: "The spy ____ed the secret information",
    },
    {
      word: "(책이나 기록에서 부적당한 부분을) 삭제하다",
      synonym: "expurgate",
      hint: "The book was ____ed because it contained inappropriate content",
    },
    {
      word: "심각한 문제, 병폐 (=ill)",
      synonym: "malady",
      hint: "The ____ of the country was caused by the corrupt government",
    },
    {
      word: "낙관적인, 자신감이 넘치는 (=optimistic)",
      synonym: "sanguine",
      hint: "The ____ student was confident that he would get an A on the test",
    },
    {
      word: " 용기[결단력] 있는 (=brave)",
      synonym: "plucky",
      hint: "The ____ soldier was not afraid of the enemy",
    },
    {
      word: "얼버무리다",
      synonym: "hedge",
      hint: "The politician ____ed when asked about his plans",
    },
    {
      word: "(특히 인과관계에 있거나 다른 관련이 있는 일에) 수반되는",
      synonym: "concomitant",
      hint: "The ____ effect of the medicine was drowsiness",
    },
    {
      word: "(느낌·경험이) 대리의[간접적인]",
      synonym: "vicarious",
      hint: "The student lived ____ly through his favorite character in the book",
    },
    {
      word: "(흔히 과장되게) 고상한, 상류층의[인 체하는]",
      synonym: "genteel",
      hint: "A live orchestra gave the event a ____ atmosphere",
    },
    {
      word: "(어쩔 줄 몰라서) 허둥대다[당황하다]",
      synonym: "flounder",
      hint: "The student ____ed when asked a difficult question",
    },
    {
      word: "어리석음, 우둔",
      synonym: "inanity",
      hint: "The ____ of the student made him fail the test",
    },
    {
      word: "(너무 오래되어) 재미없는, 시들한",
      synonym: "hoary",
      hint: "The ____ joke was not funny",
    },
    {
      word: "숙독[정독]하다",
      synonym: "peruse",
      hint: "The student ____ed the textbook before the test",
    },
    {
      word: "거만한, 오만한 (=arrogant)",
      synonym: "haughty",
      hint: "The ____ student thought he was better than everyone else",
    },
    {
      word: "의문을 제기하다 (=challenge)",
      synonym: "impugn",
      hint: "The lawyer ____ed the witness's testimony",
    },
    {
      word: "(곤경·불쾌한 일의) 일시적인 중단, 한숨 돌리기",
      synonym: "respite",
      hint: "The vacation was a welcome ____ from work",
    },
    {
      word: "애가[비가]의",
      synonym: "elegiac",
      hint: "The ____ poem was about the death of a loved one",
    },
    {
      word: "(경쟁·전쟁 등에서) 완파하다",
      synonym: "vanquish",
      hint: "The army ____ed the enemy",
    },
    {
      word: "절정, 정점 ",
      synonym: "acme",
      hint: "The ____ of the concert was the fireworks show",
    },
    {
      word: "상상력이 없는, 재미없는 (=unimaginative)",
      synonym: "pedestrian",
      hint: "The ____ movie was not interesting",
    },
    {
      word: "아첨꾼, 알랑쇠",
      synonym: "sycophant",
      hint: "The ____ was always trying to please his boss",
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
        <h3>Intermed-08/01</h3>
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
