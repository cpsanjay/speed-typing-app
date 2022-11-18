import React from "react";
import Graph from "./Graph";

const Stats = ({ wpm, accuracy }) => {
  return (
    <div className="stats-box">
      <div className="stats-left">
        <div className="title">WPM</div>
        <div className="subtitles">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitles">{accuracy}</div>

        <div className="title">Characters</div>
        <div className="subtitles">30/3/3/2</div>
      </div>
      <div className="stats-right">
        <Graph />
      </div>
    </div>
  );
};

export default Stats;
