import React, { useState } from "react";
import axios from "axios";

const quizQuestions = [
  {
    question: "What is included in an Income Statement?",
    options: [
      "Assets, Liabilities, Equity",
      "Revenue, Expenses, Net Income",
      "Cash Flow, Debt, Net Worth",
    ],
    correctAnswer: "Revenue, Expenses, Net Income",
    explanation:
      "An Income Statement summarizes a company's financial performance by showing revenue, expenses, and net income over a specific period.",
  },
  {
    question: "Which of the following is considered revenue?",
    options: ["Salaries Paid", "Money from Sales", "Loan Payments"],
    correctAnswer: "Money from Sales",
    explanation:
      "Revenue is the total money earned from selling goods or services before deducting expenses.",
  },
  {
    question: "What does 'Net Income' represent?",
    options: [
      "Total earnings after expenses",
      "Company's total revenue",
      "Amount of money owed to suppliers",
    ],
    correctAnswer: "Total earnings after expenses",
    explanation:
      "Net Income (or profit) is the amount left after subtracting all expenses (including operating costs, taxes, and interest) from revenue.",
  },
  {
    question: "How is Gross Profit calculated?",
    options: [
      "Revenue - Cost of Goods Sold",
      "Revenue - Operating Expenses",
      "Revenue - Taxes",
    ],
    correctAnswer: "Revenue - Cost of Goods Sold",
    explanation:
      "Gross Profit is calculated as Revenue - Cost of Goods Sold (COGS), representing the profit made before deducting operating expenses.",
  },
  {
    question:
      "A company has $500,000 in revenue and $300,000 in operating expenses. What is its Operating Income?",
    options: ["$200,000", "$800,000", "$300,000"],
    correctAnswer: "$200,000",
    explanation:
      "Operating Income = Revenue - Operating Expenses. $500,000 - $300,000 = $200,000.",
  },
  {
    question:
      "If a company has $100,000 in gross profit and $50,000 in operating expenses, what is its Operating Income?",
    options: ["$50,000", "$150,000", "$100,000"],
    correctAnswer: "$50,000",
    explanation:
      "Operating Income = Gross Profit - Operating Expenses. $100,000 - $50,000 = $50,000.",
  },
  {
    question:
      "A company has $400,000 in revenue, $150,000 in cost of goods sold, and $100,000 in operating expenses. What is its Gross Profit?",
    options: ["$250,000", "$400,000", "$100,000"],
    correctAnswer: "$250,000",
    explanation:
      "Gross Profit = Revenue - Cost of Goods Sold. $400,000 - $150,000 = $250,000.",
  },
  {
    question:
      "A company has a net income of $120,000 and paid $30,000 in taxes. What was its income before taxes?",
    options: ["$150,000", "$90,000", "$120,000"],
    correctAnswer: "$150,000",
    explanation:
      "Income Before Taxes = Net Income + Taxes Paid. $120,000 + $30,000 = $150,000.",
  },
  {
    question:
      "If a company earns $250,000 in revenue, pays $75,000 in expenses, and $50,000 in taxes, what is its Net Income?",
    options: ["$125,000", "$200,000", "$175,000"],
    correctAnswer: "$125,000",
    explanation:
      "Net Income = Revenue - Expenses - Taxes. $250,000 - $75,000 - $50,000 = $125,000.",
  },
];

const IncomeStatementQuiz = ({ userId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    setFeedback(""); // Clear feedback when selecting a new answer
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

      // Send points to backend
      try {
        await axios.post(
          `http://localhost:4781/api/user/${userId}/reward/points`,
          { points: 10 }
        );
      } catch (error) {
        console.error("Error updating score:", error);
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
        setFeedback("❌ Incorrect. Read the explanation below!");
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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md text-center">
      <h2 className="text-2xl font-bold text-blue-600">
        Income Statement Quiz
      </h2>
      <p className="text-gray-700 mt-2">
        <strong>
          Question {currentQuestion + 1} of {quizQuestions.length}:
        </strong>
      </p>
      <h3 className="text-xl font-semibold mt-4 text-gray-900">
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
                    : "bg-gray-100 text-gray-700 border-gray-300"
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
        <p className="mt-4 text-lg text-gray-900">
          {quizQuestions[currentQuestion].explanation}
        </p>
      )}

      {!showExplanation ? (
        <button
          className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={submitAnswer}
          disabled={!selectedAnswer}
        >
          Submit Answer
        </button>
      ) : (
        <button
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all"
          onClick={nextQuestion}
        >
          Next Question
        </button>
      )}

      <p
        className={`mt-4 text-lg font-semibold ${
          feedback.includes("✅") ? "text-green-600" : "text-red-600"
        }`}
      >
        {feedback}
      </p>

      <p className="mt-6 text-lg font-bold text-gray-800">Score: {score}</p>
    </div>
  );
};

export default IncomeStatementQuiz;
