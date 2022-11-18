import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
    box-sizing: border-box
}

body {
    background: black;
    color: white;
    padding: 0;
    margin: 0;
    transition: all 0.25s linear;
}

.canvas {
    display: grid;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    min-height: 100vh;
    gap: 0.5rem;
    padding: 1rem;
    width: 100vw;
    align-items: center;
}
.type-box {
    max-width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    height: 140px;
}

.words {
    font-size: 30px;
    flex-wrap: wrap;
    display: flex;
    align-content: center;
    width: 100%;
}

.word {
    margin: 5px;

}

.hidden-input {
    opacity: 0;
}

.correct {
    color: green;
}

.incorrect {
    color: red;
}

.current {
    border-left: 1px solid;
    animation: blinking 1s infinite;
    animation-timing-function: ease;
    @keyframes blinking {
        0% {border-left-color: #fff;}
        25% {border-left-color: black;}
        50% {border-left-color: #fff;}
        75% {border-left-color: blacK;}
        1000% {border-left-color: #fff;}
    }
}

.right {
    border-right: 1px solid;
    animation: blinkingRight 1s infinite;
    animation-timing-function: ease;
    @keyframes blinkingRight {
        0% {border-right-color: #fff;}
        25% {border-right-color: black;}
        50% {border-right-color: #fff;}
        75% {border-right-color: blacK;}
        1000% {border-right-color: #fff;}
    }
}

.upper-menu {
    display: flex;
    margin: 0 auto;
    max-width: 1000px;
    justify-content: space-between;
    font-size: 20px;
    color: grey;
}

.time-modes {
    display: flex;
    gap: 10px;
}

.counter {
    cursor: none;
}

.time:hover {
    color: yellow;
    cursor: pointer;
}

.stats-box {
    display: flex;
    max-width: 1000px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.title {
    font-size: 20px;
    color: grey;
}

.subtitles {
    font-size: 30px;
    color: yellow;
}

.stats-left {
    width: 30%;
    padding:  30px;

}

.stats-right {
    width: 70%;
}

`;
