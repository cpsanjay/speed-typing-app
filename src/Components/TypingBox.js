import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useTestMode } from "../Context/TestModes";
import UpperMenu from "./UpperMenu";
import randomWords from "random-words";
import Stats from "./Stats";
import { auth } from "../firebaseConfig";

const TypingBox = () => {
  const [currentWordSpan, setCurrentWordSpan] = useState(0);
  const [currentLetterSpan, setCurrentLetterSpan] = useState(0);
  const [countDown, setCountDown] = useState(15);
  const [testStart, setTestStart] = useState(false);
  const [testOver, setTestOver] = useState(false);
  const [intervalId, setIntevalId] = useState(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [wordsArray, setWordsArray] = useState(() => {
    return randomWords(100);
  });

  const words = useMemo(() => {
    return wordsArray;
  }, [wordsArray]);

  const wordSpanRef = useMemo(() => {
    return Array(words.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [words]);

  const resetWordSpanClassName = () => {
    wordSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "char";
      });
    });
    wordSpanRef[0].current.childNodes[0].className = "char current";
  };

  const { testTime } = useTestMode();

  useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }, []);
  const inputRef = useRef(null);

  useEffect(() => {
    resetTest();
  }, [testTime]);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntevalId(intervalId);

    function timer() {
      setCountDown((prevCountDown) => {
        console.log(prevCountDown);
        setCorrectChars((correctChars) => {
          console.log(correctChars);
          setGraphData((data) => {
            return [
              ...data,
              [
                testTime - prevCountDown,
                Math.round(
                  correctChars / 5 / ((testTime - prevCountDown + 1) / 60)
                ),
              ],
            ];
          });
          return correctChars;
        });

        if (prevCountDown === 1) {
          clearInterval(intervalId);
          setCountDown(0);
          setTestOver(true);
        } else {
          return prevCountDown - 1;
        }
      });
    }
  };

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currentWordSpan) * 100);
  };

  const resetTest = () => {
    setCurrentLetterSpan(0);
    setCurrentWordSpan(0);
    setTestOver(false);
    setTestStart(false);
    clearInterval(intervalId);
    setCountDown(testTime);
    focusInput();
    let random = randomWords(100);
    setWordsArray(random);

    resetWordSpanClassName();
  };

  const handleKeyPress = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }
    let allChildrenNodes = wordSpanRef[currentWordSpan].current.childNodes;

    // logic for space
    if (e.keyCode === 32) {
      const correctChar =
        wordSpanRef[currentWordSpan].current.querySelectorAll(".correct");
      const incorrectChar =
        wordSpanRef[currentWordSpan].current.querySelectorAll(".incorrect");
      setMissedChars(
        missedChars +
          (allChildrenNodes.length -
            (incorrectChar.length + correctChar.length))
      );
      if (correctChar.length === allChildrenNodes.length) {
        setCorrectWords(correctWords + 1);
      }
      if (allChildrenNodes.length <= currentLetterSpan) {
        allChildrenNodes[currentLetterSpan - 1].classList.remove("right");
      } else {
        allChildrenNodes[currentLetterSpan].classList.remove("current");
      }
      // add cursor to the next word

      wordSpanRef[currentWordSpan + 1].current.childNodes[0].className =
        "char current";
      setCurrentWordSpan(currentWordSpan + 1);
      setCurrentLetterSpan(0);

      return;
    }

    // logic for backspace
    if (e.keyCode === 8) {
      if (currentLetterSpan !== 0) {
        if (currentLetterSpan === allChildrenNodes.length) {
          if (
            allChildrenNodes[currentLetterSpan - 1].className.includes("extra")
          ) {
            allChildrenNodes[currentLetterSpan - 1].remove();
            allChildrenNodes[currentLetterSpan - 2].classList += " right";
          } else {
            allChildrenNodes[currentLetterSpan - 1].className = "char current";
          }
          setCurrentLetterSpan(currentLetterSpan - 1);
          return;
        }
        allChildrenNodes[currentLetterSpan].className = "char";
        allChildrenNodes[currentLetterSpan - 1].className = "char current";
        setCurrentLetterSpan(currentLetterSpan - 1);
      }
      return;
    }

    if (currentLetterSpan === allChildrenNodes.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "char incorrect right extra";
      allChildrenNodes[currentLetterSpan - 1].classList.remove("right");

      wordSpanRef[currentWordSpan].current.append(newSpan);
      setCurrentLetterSpan(currentLetterSpan + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    // logic for correct and incorrect
    if (allChildrenNodes[currentLetterSpan].innerText === e.key) {
      allChildrenNodes[currentLetterSpan].className = "char correct";
      setCorrectChars(correctChars + 1);
    } else {
      allChildrenNodes[currentLetterSpan].className = "char incorrect";
      setIncorrectChars(incorrectChars + 1);
    }

    if (currentLetterSpan + 1 === allChildrenNodes.length) {
      allChildrenNodes[currentLetterSpan].className += " right";
    } else {
      allChildrenNodes[currentLetterSpan + 1].className = "char current";
    }
    setCurrentLetterSpan(currentLetterSpan + 1);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <UpperMenu countDown={countDown} />

      {testOver ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAccuracy()}
          graphData={graphData}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
        />
      ) : (
        <div className="type-box">
          <div className="words">
            {words.map((word, idx) => (
              <span className="word" ref={wordSpanRef[idx]} key={idx}>
                {word.split("").map((e, idx) => (
                  <span className="char" key={idx}>
                    {e}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}

      <input
        type="text"
        className="hidden-input"
        onKeyDown={(e) => handleKeyPress(e)}
        ref={inputRef}
      />
    </div>
  );
};

export default TypingBox;
