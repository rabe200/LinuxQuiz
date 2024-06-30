import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

root {
}
// quiz related
.quiz-container {
  position: relative;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
}

#restartButton {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.timer {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.selected {
  background-color: #d1e7dd;
}

.selected.correct,
.correct {
  background-color: #d4edda;
}

.selected.wrong {
  background-color: #f8d7da;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dialog button {
  margin: 5px;
}

.answer-list {
  list-style-type: none;
  padding: 0;
}

.answer-list li {
  margin: 10px 0;
}

.feedback {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  position: relative;
}

.feedback.correct {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.feedback.wrong {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.full-width-button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50; /* Green */
  color: white;
  border: none;
// quiz related finish
  body {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    height: 667px;
    width: 375px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: pixelOperator;
    

  @media only screen and (min-width: 414px) {
    width: 414px;
    height: 896px;
  }

  @media only screen and (min-width: 585px) {
    width: 585px;
   min-height: 900px;
    
  }

  @media only screen and (min-width: 834px) {
    width: 834px;
    min-height: 1000px;
  }

  @media only screen and (min-width: 1194px) {
    width: 1194px;
    height: 1024px;
 
  }

  @media only screen and (min-width: 1400px) {
    width: 1400px;
    height: 834px;
  }

  }
`;
