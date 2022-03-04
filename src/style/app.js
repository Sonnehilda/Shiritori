import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    background-image: repeating-linear-gradient(45deg, #FEFFDB, #FEFFDB 2rem, #FFC60B 0, #FFC60B 4rem);
    background-size: 200vw 200vh;
    @keyframes pattern {
        from {
            background-position: 0rem -2.85rem;
        }
        to {
            background-position: -2.85rem 0rem;
        }
    }
    animation: pattern 1s linear infinite;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    user-select: none;
    
    ::-webkit-scrollbar {
        display: none;
    }
    
    input:-webkit-autofill::first-line,
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 10000s ease-in-out 0s;
        -webkit-text-fill-color: #aaa !important;
    }
}
img {
    -webkit-user-drag: none;
}
#root {
    min-height: 100vh;
    display: flex;
    align-items: center;
}`;

export default GlobalStyle;
