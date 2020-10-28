import {createGlobalStyle} from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  body {
    background: #f9efc1;
    height: 100%;
  }

  .App {
    display: flex;
    flex-flow: column nowrap;
  }

  main {
    height: 87vh;
  }

  a {
    color: #331a04;
    text-decoration: none
  }
  a:visited {
    color: #331a04;
  }
`