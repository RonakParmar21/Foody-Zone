import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { createGlobalStyle } from 'styled-components'

const GloblaStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #5D5A5A;
    color: white;
    min-height: 100vh;
    font-family: "Inter", sans-serif;
  }
`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GloblaStyle />
    <App />
  </StrictMode>,
)
