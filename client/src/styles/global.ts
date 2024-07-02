import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        box-sizing: border-box;
    }

    *{
        margin: 0;
        padding: 0; 
    }

    ul[role='list'], ol[role='list']{
        list-style: none; 
    }

    html:focus-within{
        scroll-behavior: smooth;
    }
    
    a{
        text-decoration: none !important;
    }

    a:not([class]){
        text-decoration-skip-ink: auto;
    }

    img, picture, svg, video, canvas{
        max-width: 100%; 
        height: auto;
        vertical-align: middle; 
        font-style: italic;
        background-repeat: no-repeat;
        background-size: cover;
    }

    input, button, textarea, select{
        font: inherit; 
    }
    
    @media (prefers-reduced-motion: reduce){
        html:focus-within {
            scroll-behavior: auto;
        }
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
            transition: none;
        }
    }

    body, html {
        font-family: 'Roboto';
        height: 100%;
        scroll-behavior: smooth;
        background-color: ${(props) => props.theme.background}
    }
    
    .wrapper {
        display: flex;
        align-items: center;
        min-height: 100vh;
    }

    .container{
        margin: 0;
        padding: 0 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 18px;
      text-align: left;
    }

    th, td {
      padding: 12px 15px;
      border: 1px solid #ddd;
    }

    th {
      background-color: #f4f4f4;
      color: #333;
    }

    tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tbody tr:hover {
      background-color: #f1f1f1;
    }

    .h-2 {
        height: 0.5rem;
    }
`;
