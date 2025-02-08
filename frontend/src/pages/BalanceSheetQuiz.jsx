import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const quizQuestions = [
  {
    question: "What is included in a Balance Sheet?",
    options: [
      "Assets, Liabilities, Equity",
      "Revenue, Expenses, Profit",
      "Cash Flow, Debt, Net Worth",
    ],
    correctAnswer: "Assets, Liabilities, Equity",
    explanation:
      "A balance sheet consists of three main components: Assets (what the company owns), Liabilities (what the company owes), and Shareholders' Equity (the residual interest in the assets after liabilities are deducted).",
  },
  {
    question: "Which of these is an asset?",
    options: ["Accounts Payable", "Inventory", "Long-term Debt"],
    correctAnswer: "Inventory",
    explanation:
      "Assets are resources owned by a company that provide economic value. Inventory (stock of goods for sale) is considered an asset because it holds future economic benefit.",
  },
];

const BalanceSheetQuiz = () => {
  const { user, addPoints } = useContext(UserContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    setFeedback("");
  };

  const submitAnswer = async () => {
    if (!selectedAnswer) return;

    const isCorrect =
      selectedAnswer === quizQuestions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 10);
      setFeedback("✅ Correct! You earned 10 points!");
      setShowExplanation(false);
      setRetryCount(0);

      if (user) {
        addPoints(user._id, 10); // Add points to user
      }

      setTimeout(() => {
        if (currentQuestion + 1 < quizQuestions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setFeedback("");
        } else {
          setFeedback(`🎉 Quiz Complete! Final Score: ${score + 10}`);
        }
      }, 1500);
    } else {
      if (retryCount === 0) {
        setFeedback("❌ Try again! Select a different answer.");
        setRetryCount(1);
        setSelectedAnswer(null);
      } else {
        setFeedback("❌ Incorrect. Read the above explanation!");
        setShowExplanation(true);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setFeedback("");
      setRetryCount(0);
      setShowExplanation(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white shadow-md rounded-md text-center">
      <h2 className="text-2xl font-bold text-blue-400">Balance Sheet Quiz</h2>
      <p className="mt-2">
        <strong>
          Question {currentQuestion + 1} of {quizQuestions.length}:
        </strong>
      </p>
      <h3 className="text-xl font-semibold mt-4">
        {quizQuestions[currentQuestion].question}
      </h3>

      {!showExplanation ? (
        <div className="flex flex-col space-y-4 mt-4">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-md border text-lg font-medium transition-all
                ${
                  selectedAnswer === option
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-gray-700 text-gray-300 border-gray-500"
                }
                hover:bg-blue-400 hover:text-white
              `}
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-lg">
          {quizQuestions[currentQuestion].explanation}
        </p>
      )}

      {!showExplanation ? (
        <button
          className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={submitAnswer}
          disabled={!selectedAnswer}
        >
          Submit Answer
        </button>
      ) : currentQuestion + 1 < quizQuestions.length ? (
        <button
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all"
          onClick={nextQuestion}
        >
          Next Question
        </button>
      ) : (
        <p className="mt-6 text-lg font-bold text-green-400">
          🎉 End of Quiz! Final Score: {score}
        </p>
      )}

      {feedback && (
        <p
          className={`mt-4 text-lg font-semibold ${
            feedback.includes("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          {feedback}
        </p>
      )}

      <p className="mt-6 text-lg font-bold">Score: {score}</p>
    </div>
  );
};

export default BalanceSheetQuiz;
