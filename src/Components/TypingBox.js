import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useTestMode } from "../Context/TestModes";
import UpperMenu from "./UpperMenu";
import randomWords from "random-words";
import Stats from "./Stats";
import { auth } from "../firebaseConfig";
import { Dialog, DialogTitle } from "@mui/material";

const TypingBox = () => {
  const { testTime, testMode, testWords } = useTestMode();
  const [currentWordSpan, setCurrentWordSpan] = useState(0);
  const [currentLetterSpan, setCurrentLetterSpan] = useState(0);
  const [countDown, setCountDown] = useState(() => {
    if (testMode === "time") {
      return 180;
    } else {
      return testTime;
    }
  });
  const [testStart, setTestStart] = useState(false);
  const [testOver, setTestOver] = useState(false);
  const [intervalId, setIntevalId] = useState(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [wordsArray, setWordsArray] = useState(() => {
    if (testMode === "words") {
      return randomWords(testWords);
    }
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

  const focusInput = () => {
    inputRef.current.focus();
  };

  const handleDialogEvents = (e) => {
    // keydown logic of dialogue box
    if (e.keyCode === 32) {
      e.preventDefault();
      redo();
      setOpenDialog(false);
      return;
    }
    // logic for tab/enter
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      resetTest();
      setOpenDialog(false);
    }
    e.preventDefault();
    setOpenDialog(false);
    startTimer();
  };

  const redo = () => {
    setCurrentLetterSpan(0);
    setCurrentWordSpan(0);
    setTestOver(false);
    setTestStart(false);
    clearInterval(intervalId);
    setCountDown(testTime);
    focusInput();
    if (testMode === "words") {
      setCountDown(180);
    }
    setGraphData([]);
    setCorrectChars(0);
    setIncorrectChars(0);
    setCorrectWords(0);
    setMissedChars(0);
    setExtraChars(0);
    resetWordSpanClassName();
  };

  const resetWordSpanClassName = () => {
    wordSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "char";
      });
    });
    wordSpanRef[0].current.childNodes[0].className = "char current";
  };

  useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }, []);
  const inputRef = useRef(null);

  useEffect(() => {
    resetTest();
    focusInput();
  }, [testTime, testMode, testWords]);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntevalId(intervalId);

    function timer() {
      setCountDown((prevCountDown) => {
        setCorrectChars((correctChars) => {
          setGraphData((data) => {
            const startTime = testMode === "words" ? 180 : testTime;
            return [
              ...data,
              [
                startTime - prevCountDown,
                Math.round(
                  correctChars / 5 / ((startTime - prevCountDown + 1) / 60)
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
    return Math.round(
      correctChars / 5 / ((graphData[graphData.length - 1][0] + 1) / 60)
    );
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
    if (testMode === "words") {
      let random = randomWords(testWords);
      setWordsArray(random);
      setCountDown(180);
    } else {
      let random = randomWords(100);
      setWordsArray(random);
    }
    setGraphData([]);
    setCorrectChars(0);
    setIncorrectChars(0);
    setCorrectWords(0);
    setMissedChars(0);
    setExtraChars(0);
    resetWordSpanClassName();
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 9) {
      if (testStart) {
        clearInterval(intervalId);
      }
      e.preventDefault();
      setOpenDialog(true);
      return;
    }

    if (!testStart) {
      startTimer();
      setTestStart(true);
    }
    let allChildrenNodes = wordSpanRef[currentWordSpan].current.childNodes;

    // logic for space
    if (e.keyCode === 32) {
      if (currentWordSpan === wordsArray.length - 1) {
        clearInterval(intervalId);
        setTestOver(true);
        return;
      }
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

      if (
        currentWordSpan !== 0 &&
        wordSpanRef[currentWordSpan + 1].current.offsetLeft <
          wordSpanRef[currentWordSpan].current.offsetLeft
      ) {
        wordSpanRef[currentWordSpan].current.scrollIntoView();
      }
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

  return (
    <div>
      {!testOver && (
        <UpperMenu countDown={countDown} currentWordSpan={currentWordSpan} />
      )}

      {testOver ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAccuracy()}
          graphData={graphData}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          resetTest={resetTest}
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

      <Dialog
        PaperProps={{
          style: {
            background: "transparent",
            boxShadow: "none",
          },
        }}
        open={openDialog}
        onKeyDown={handleDialogEvents}
        style={{
          backdropFilter: "blur(2px)",
        }}
      >
        <DialogTitle>
          <div className="instructions">press Space to redo</div>
          <div className="instructions">press Tab/Enter to restart</div>
          <div className="instructions">press any other key to exit</div>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default TypingBox;
