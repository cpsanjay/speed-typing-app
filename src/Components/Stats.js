import React from "react";
import Graph from "./Graph";

const Stats = ({
  wpm,
  accuracy,
  graphData,
  correctChars,
  missedChars,
  incorrectChars,
  extraChars,
}) => {
  let timeSet = new Set();

  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  return (
    <div className="stats-box">
      <div className="stats-left">
        <div className="title">WPM</div>
        <div className="subtitles">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitles">{accuracy}</div>

        <div className="title">Characters</div>
        <div className="subtitles">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
      </div>
      <div className="stats-right">
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
};

export default Stats;
