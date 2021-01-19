import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #F5F8FA;
    -webkit-font-smoothing: antialiased;
  }

  body, -moz-user-input, button {
    font-family: 'Heebo', serif;
    font-size: 16px;
  }

  span,p{
    font-family: 'Heebo', serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    color: #123952
  }

  h1{
    font-family: 'Barlow', 'Heebo', serif;
    font-size: 36px;
  }

  button{
    cursor: pointer;
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
