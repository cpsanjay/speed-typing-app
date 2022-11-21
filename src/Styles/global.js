import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
    box-sizing: border-box
}

body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.title};
    padding: 0;
    margin: 0;
    transition: all 0.25s linear;
    font-family: 'Roboto Mono', monospace;
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
    height: 130px;
}

.words {
    font-size: 24px;
    flex-wrap: wrap;
    display: flex;
    align-content: center;
    width: 100%;
    color: ${({ theme }) => theme.typeBox};
}

.word {
    margin: 5px;

}

.char {
    padding: 0.035rem;
}

.hidden-input {
    opacity: 0;
}

.correct {
    color: ${({ theme }) => theme.title};
}

.incorrect {
    color: red;
}

.current {
    border-left: 1px solid;
    animation: blinking 1s infinite;
    animation-timing-function: ease;
    @keyframes blinking {
        0% {border-left-color: ${({ theme }) => theme.title};}
        25% {border-left-color: ${({ theme }) => theme.background};}
        50% {border-left-color: ${({ theme }) => theme.title};}
        75% {border-left-color: ${({ theme }) => theme.background};}
        1000% {border-left-color: ${({ theme }) => theme.title};}
    }
}

.right {
    border-right: 1px solid;
    animation: blinkingRight 1s infinite;
    animation-timing-function: ease;
    @keyframes blinkingRight {
        0% {border-right-color:  ${({ theme }) => theme.title};}
        25% {border-right-color: ${({ theme }) => theme.background};}
        50% {border-right-color:  ${({ theme }) => theme.title};}
        75% {border-right-color: ${({ theme }) => theme.background};}
        1000% {border-right-color:  ${({ theme }) => theme.title};}
    }
}

.upper-menu {
    display: flex;
    margin: 0 auto;
    max-width: 1000px;
    justify-content: space-between;
    font-size: 20px;
    color:  ${({ theme }) => theme.typeBox};
}

.time-modes {
    display: flex;
    gap: 10px;
}

.counter {
    cursor: none;
}

.time {
    transition: color 0.15s linear;
}

.time:hover {
    color:  ${({ theme }) => theme.title};
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
    color:  ${({ theme }) => theme.typeBox};
}

.subtitles {
    font-size: 30px;
    color:  ${({ theme }) => theme.title};
}

.stats-left {
    width: 30%;
    padding:  30px;

}

.stats-right {
    width: 70%;
}

.footer, .header {
    display: flex;
    width: 1000px;
    margin-right: auto;
    margin-left: auto;
    justify-content: space-between;
    height: 60px;
    align-items: center;
}

.logo {
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 30px;
}



`;
