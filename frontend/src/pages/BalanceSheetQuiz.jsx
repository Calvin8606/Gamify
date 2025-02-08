import React, { useState } from "react";
import axios from "axios";

const quizQuestions = [
    {
      question: "What is included in a Balance Sheet?",
      options: ["Assets, Liabilities, Equity", "Revenue, Expenses, Profit", "Cash Flow, Debt, Net Worth"],
      correctAnswer: "Assets, Liabilities, Equity",
    },
    {
      question: "Which of these is an asset?",
      options: ["Accounts Payable", "Inventory", "Long-term Debt"],
      correctAnswer: "Inventory",
    },
    {
      question: "What does 'Liabilities' represent?",
      options: ["Company's Profits", "Company's Debts", "Company's Revenue"],
      correctAnswer: "Company's Debts",
    },
    {
      question: "How is Shareholders' Equity calculated?",
      options: ["Assets - Liabilities", "Revenue - Expenses", "Cash + Inventory"],
      correctAnswer: "Assets - Liabilities",
    }
  ];



const BalanceSheetQuiz = ({ userId }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
      };

      const submitAnswer = async () => {
        const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    
        if (isCorrect) {
          setScore(score + 10); // Local score update
          setFeedback("✅ Correct! You earned 10 points!");
          setIsAnsweredCorrectly(true); // Mark question as correctly answered
    
          // Send points update to backend using the correct endpoint
          try {
            await axios.post(`http://localhost:5000/api/user/${userId}/reward/points`, {
              points: 10,
            });
          } catch (error) {
            console.error("Error updating score:", error);
          }
    
          // Move to the next question after 1.5 seconds
          setTimeout(() => {
            if (currentQuestion + 1 < quizQuestions.length) {
              setCurrentQuestion(currentQuestion + 1);
              setSelectedAnswer(null);
              setFeedback("");
              setIsAnsweredCorrectly(false); // Reset for the next question
            } else {
              setFeedback(`🎉 Quiz Complete! Your final score: ${score + 10}`);
            }
          }, 1500);
        } else {
          setFeedback("❌ Incorrect. Try again!");
        }
      };

      return (
        <div className="quiz-container">
          <h2>Balance Sheet Quiz</h2>
          <p><strong>Question {currentQuestion + 1} of {quizQuestions.length}:</strong></p>
          <h3>{quizQuestions[currentQuestion].question}</h3>
          
          <div className="options">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswer === option ? "selected" : ""}`}
                onClick={() => handleAnswerSelection(option)}
                disabled={isAnsweredCorrectly} // Disable options after correct answer
              >
                {option}
              </button>
            ))}
          </div>
    
          <button 
            className="submit-button"
            onClick={submitAnswer}
            disabled={!selectedAnswer || isAnsweredCorrectly} // Disable submit if no selection or already correct
          >
            Submit Answer
          </button>
    
          {feedback && <p className="feedback">{feedback}</p>}
    
          <p className="score">Score: {score}</p>
        </div>
      );
};

export default BalanceSheetQuiz;