import { createGlobalStyle } from "styled-components";

const savedBackgroundColor1 = localStorage.getItem("backgroundcolor1")
  ? localStorage.getItem("backgroundcolor1")
  : "#FEFFDB";
const savedBackgroundColor2 = localStorage.getItem("backgroundcolor2")
  ? localStorage.getItem("backgroundcolor2")
  : "#FFC60B";

const GlobalStyle = createGlobalStyle`
html {
    background-image: repeating-linear-gradient(45deg, ${savedBackgroundColor1}, ${savedBackgroundColor1} 2rem, ${savedBackgroundColor2} 0, ${savedBackgroundColor2} 4rem);
    background-size: 200vw 200vh;
    @keyframes pattern {
        from {
            background-position: 0rem -2.85rem;
        }
        to {
            background-position: -2.85rem 0rem;
        }
    }
    animation: pattern 2s linear infinite;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    user-select: none;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
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
}`;

export default GlobalStyle;
