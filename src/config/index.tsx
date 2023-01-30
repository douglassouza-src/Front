import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        font-family: 'Roboto', sans-serif;
    }
    body {
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, #b4b4b4 0%, #4b4b4b 100%);
        color: #ffffff;
    }
    h1 {
        margin-bottom: 0.5em;
        font-size: 40px;
        color:#f6f6f6;
    }
`
export { GlobalStyle }