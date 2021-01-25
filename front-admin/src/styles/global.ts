import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html{
    font-size: 62.5%;
  }

  body {
    background: #F5F8FA;
    -webkit-font-smoothing: antialiased;
    font-size: 1.6rem;
  }

  body, -moz-user-input, button {
    font-family: 'Heebo', serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    color: #123952;
    font-family: 'Barlow', 'Heebo', serif;
  }

  h1{
    font-size: 3.6rem;
  }



  button{
    cursor: pointer;
  }

  ul{
    list-style: none;
  }

  .light, .dark {
     display: none;
  }

  @media (prefers-color-scheme: dark) {
    .dark {
      display: block;
    }
  }

  @media (prefers-color-scheme: light) {
    .light {
      display: block;
    }
  }
`;
