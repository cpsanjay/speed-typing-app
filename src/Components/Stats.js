import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAlert } from "../Context/AlertContext";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Stats = ({
  wpm,
  accuracy,
  graphData,
  correctChars,
  missedChars,
  incorrectChars,
  extraChars,
  resetTest,
}) => {
  let timeSet = new Set();

  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const [user] = useAuthState(auth);
  const { setAlert } = useAlert();

  const pushDataToDB = async () => {
    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;

    if (!isNaN(accuracy)) {
      await resultsRef
        .add({
          userId: uid,
          wpm: wpm,
          accuracy: accuracy,
          characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
          timeStamp: new Date(),
        })
        .then((res) =>
          setAlert({
            open: true,
            type: "success",
            message: "results are stored",
          })
        );
    } else {
      setAlert({
        open: true,
        type: "error",
        message: "Invalid test",
      });
    }
  };

  useEffect(() => {
    if (user) {
      pushDataToDB();
    } else {
      setAlert({
        open: true,
        type: "warning",
        message: "Login to save results",
      });
    }
  }, []);

  return (
    <div className="stats-box">
      <div className="stats-left">
        <div className="stats">
          <div className="title">WPM</div>
          <div className="subtitles">{wpm}</div>
          <div className="title">Accuracy</div>
          <div className="subtitles">{accuracy}</div>

          <div className="title">Characters</div>
          <div className="subtitles">
            {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
          </div>
        </div>
        <RestartAltIcon className="reset-button" onClick={resetTest} />
      </div>
      <div className="stats-right">
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
};

export default Stats;
