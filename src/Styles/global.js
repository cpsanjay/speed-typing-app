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
    overflow-y: scroll;
}

body::-webkit-scrollbar {
    display: none;
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
    color: ${({ theme }) => theme.title};
}

.word {
    margin: 5px;

}

.char {
    padding: 0.030rem;
}

.hidden-input {
    opacity: 0;
}

.correct {
    color: ${({ theme }) => theme.typeBox};
    // color: red;
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
    color:  ${({ theme }) => theme.title};
}

.time-modes, .word-modes {
    display: flex;
    gap: 10px;
}

.counter {
    cursor: none;
    color: ${({ theme }) => theme.stats}
}

.time, .no-of-words {
    transition: color 0.15s linear;
}

.time:hover, .no-of-words:hover {
    color:  ${({ theme }) => theme.stats};
    cursor: pointer;
}

.mode:hover {
    color: ${({ theme }) => theme.stats};
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
    color:  ${({ theme }) => theme.title};
}

.subtitles {
    font-size: 30px;
    font-weight: 600;
    color:  ${({ theme }) => theme.stats};
}

.stats-left {
    width: 30%;
    padding:  30px;

}

.stats-right {
    width: 70%;
}

.header {
     display: flex;
    width: 1000px;
    margin-right: auto;
    margin-left: auto;
    justify-content: space-between;
    align-items: center;
    height: 60px;

}

.footer {
    display: flex;
    flex-direction: column;
    width: 1000px;
    margin-right: auto;
    margin-left: auto;
    // justify-content: space-between;
    align-items: center;
    height: 60px;

}

.actual-footer {
    display: flex;
    justify-content: space-between;
    width: 1000px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo-span {
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 30px;

}

.hints {
    kbd {
        background-color: ${({ theme }) => theme.title};
        color: ${({ theme }) => theme.background};
        padding: 2.5px 5px;
        border-radius: 5px;
    }
}

.result-graph, .table {
    width: 1000px;
    margin: auto;
}

.user-profile {
    width: 1000px;
    margin: auto;
    display: flex;
    min-height: 15rem;
    background-color: ${({ theme }) => theme.typeBox};
    border-radius: 20px;
}

.user {
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 1rem;
    border-right: 2px solid;
}

.picture {
    width: 50%;
}

.info {
    width: 50%;
    margin-top: 1rem;
    // font-size: 1.5rem;
    text-align: right;
}

.total-items {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}

.center-screen {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.instructions {
    color: ${({ theme }) => theme.title};
}

.reset-button {
    transform: scale(2);
    margin-top: 3rem;
    cursor: pointer;
}


.compare-page {
    margin: auto;
    width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.compare-name {
    font-size: 24px;
}

`;
