import { useState, useEffect } from "react";
import { quizData } from "@/lib/quizData"; // Import quiz data from external module

const QuizComponent = () => {
  const [shuffledQuizData, setShuffledQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.length).fill(null)
  );
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answerOrder, setAnswerOrder] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [feedbackTimeout, setFeedbackTimeout] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Shuffle quiz data on component mount
    const shuffledData = shuffle([...quizData]);
    setShuffledQuizData(shuffledData);
    setAnswerOrder(
      shuffledData.map((question) =>
        shuffle([
          question.description,
          question.dummyAnswer1,
          question.dummyAnswer2,
        ])
      )
    );
  }, []);

  useEffect(() => {
    if (feedback) {
      setTimeLeft(2.5);
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [feedback]);

  // Function to shuffle array (used only once on mount)
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleNextQuestion = () => {
    const answer = userAnswers[currentQuestionIndex];
    const correct = shuffledQuizData[currentQuestionIndex].description;
    setCorrectAnswer(correct);

    if (answer === correct) {
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    const timeout = setTimeout(() => {
      goToNextQuestion();
    }, 2500); // 2.5 seconds delay

    setFeedbackTimeout(timeout);
  };

  const goToNextQuestion = () => {
    if (feedbackTimeout) {
      clearTimeout(feedbackTimeout);
      setFeedbackTimeout(null);
    }
    setFeedback(null);
    setCorrectAnswer(null);
    setTimeLeft(0);
    if (currentQuestionIndex + 1 < shuffledQuizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleAnswerSelection = (event) => {
    const index = currentQuestionIndex;
    const answer = event.target.value;
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[index] = answer;
    setUserAnswers(updatedUserAnswers);
  };

  const handleSubmitQuiz = () => {
    const newCorrectCount = userAnswers.filter(
      (answer, index) => answer === shuffledQuizData[index].description
    ).length;
    setCorrectCount(newCorrectCount);
    setQuizCompleted(true);
  };

  const handleRestartQuiz = () => {
    const shuffledData = shuffle([...quizData]);
    setShuffledQuizData(shuffledData);
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quizData.length).fill(null)); // Reset userAnswers array
    setCorrectCount(0);
    setQuizCompleted(false);
    setAnswerOrder(
      shuffledData.map((question) =>
        shuffle([
          question.description,
          question.dummyAnswer1,
          question.dummyAnswer2,
        ])
      )
    );
    setShowConfirmDialog(false);
  };

  const handleConfirmRestart = () => {
    setShowConfirmDialog(true);
  };

  const handleCancelRestart = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="quiz-container">
      <h1>Linux Commands Quiz</h1>
      {!quizCompleted && (
        <div>
          <button id="restartButton" onClick={handleConfirmRestart}>
            Restart Quiz
          </button>
          <div id="progress">
            {feedback ? (
              <div className="timer">
                {`Next question in ${Math.ceil(timeLeft)}s`}
              </div>
            ) : (
              `Question ${currentQuestionIndex + 1} / ${
                shuffledQuizData.length
              }`
            )}
          </div>
          <div id="quizContent">
            <form id="quizForm">
              {currentQuestionIndex < shuffledQuizData.length && (
                <div className="question">
                  <h2>
                    Command: {shuffledQuizData[currentQuestionIndex].command}
                  </h2>
                  <ul className="answer-list">
                    {answerOrder[currentQuestionIndex].map((answer, index) => (
                      <li key={index}>
                        <label
                          className={
                            userAnswers[currentQuestionIndex] === answer ||
                            correctAnswer === answer
                              ? feedback === "correct"
                                ? "selected correct"
                                : feedback === "wrong"
                                ? userAnswers[currentQuestionIndex] === answer
                                  ? "selected wrong"
                                  : correctAnswer === answer
                                  ? "correct"
                                  : ""
                                : ""
                              : ""
                          }
                        >
                          <input
                            type="radio"
                            name={`question${currentQuestionIndex}`}
                            value={answer}
                            onChange={handleAnswerSelection}
                            checked={
                              userAnswers[currentQuestionIndex] === answer
                            }
                            disabled={feedback !== null} // Disable selection during feedback
                          />
                          {answer}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
            {feedback ? (
              <button
                className="full-width-button"
                id="okayButton"
                onClick={goToNextQuestion}
              >
                Okay
              </button>
            ) : (
              <button
                className="full-width-button"
                id="nextButton"
                onClick={handleNextQuestion}
                disabled={userAnswers[currentQuestionIndex] === null}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
      {quizCompleted && (
        <div className="result">
          <p>
            You got {correctCount} out of {shuffledQuizData.length} correct.
          </p>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      )}
      {showConfirmDialog && (
        <div className="dialog">
          <p>Are you sure you want to restart the quiz?</p>
          <button onClick={handleRestartQuiz}>Yes</button>
          <button onClick={handleCancelRestart}>No</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
