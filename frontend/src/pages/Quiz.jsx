import React, { useState, useEffect } from "react";
import axios from "axios";

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
      "Assets are resources owned by a company that provide economic value. Inventory (stock of goods for sale) is considered an asset because it holds future economic benefit. Accounts payable and long-term debt are liabilities, as they represent amounts owed by the company.",
  },
  {
    question: "What does 'Liabilities' represent?",
    options: ["Company's Profits", "Company's Debts", "Company's Revenue"],
    correctAnswer: "Company's Debts",
    explanation:
      "Liabilities are the financial obligations of a company, meaning the amounts it owes to others, such as loans, accounts payable, and accrued expenses. Profits and revenue relate to the income statement, not the balance sheet.",
  },
  {
    question: "How is Shareholders' Equity calculated?",
    options: ["Assets - Liabilities", "Revenue - Expenses", "Cash + Inventory"],
    correctAnswer: "Assets - Liabilities",
    explanation:
      "Shareholders' Equity represents the owners' residual interest in the company's assets after deducting liabilities. It is calculated as: Equity = Assets - Liabilities.",
  },
  // 📌 Calculation-Based Questions Below
  {
    question:
      "A company has $100,000 in assets and $40,000 in liabilities. What is its Shareholders' Equity?",
    options: ["$140,000", "$60,000", "$40,000"],
    correctAnswer: "$60,000",
    explanation:
      "The formula for Shareholders' Equity is Assets - Liabilities. So, $100,000 - $40,000 = $60,000.",
  },
  {
    question:
      "If a company has $200,000 in total assets and $80,000 in total liabilities, what is its equity?",
    options: ["$120,000", "$280,000", "$80,000"],
    correctAnswer: "$120,000",
    explanation:
      "Equity is calculated as Assets - Liabilities. So, $200,000 - $80,000 = $120,000.",
  },
  {
    question:
      "A company has $75,000 in retained earnings and $50,000 in common stock. What is its total equity?",
    options: ["$125,000", "$75,000", "$50,000"],
    correctAnswer: "$125,000",
    explanation:
      "Total Equity = Retained Earnings + Common Stock. So, $75,000 + $50,000 = $125,000.",
  },
  {
    question:
      "If a company has $500,000 in assets and $320,000 in liabilities, what is its total equity?",
    options: ["$180,000", "$820,000", "$320,000"],
    correctAnswer: "$180,000",
    explanation:
      "Total Equity is found using Assets - Liabilities. So, $500,000 - $320,000 = $180,000.",
  },
  {
    question:
      "A company starts with $50,000 in equity. Over the year, it earns $20,000 in profits and distributes $5,000 in dividends. What is its new equity?",
    options: ["$65,000", "$75,000", "$55,000"],
    correctAnswer: "$65,000",
    explanation:
      "New Equity = Starting Equity + Net Profit - Dividends. So, $50,000 + $20,000 - $5,000 = $65,000.",
  },
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

const Quiz = ({ userId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [retryCount, setRetryCount] = useState(0); // Track retries
  const [showExplanation, setShowExplanation] = useState(false); // Show explanation on 2nd incorrect attempt
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [badgeAwarded, setBadgeAwarded] = useState(false); // To disable button after claiming

  // Fetch user data on mount to initialize quizCompleted
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4781/api/user/${userId}`
        );
        // Assume the user object has a quizCompleted property
        console.log("User data fetched:", response.data);
        if (response.data.completedQuiz) {
          setQuizCompleted(true);
          console.log("Quiz already completed.");
        }
        if (response.data.badges.includes("Rockstar")) {
          setBadgeAwarded(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    setFeedback(""); // Clear previous feedback when user selects a new answer
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

      // Move to next question after delay or mark quiz complete
      setTimeout(() => {
        if (currentQuestion + 1 < quizQuestions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setFeedback("");
        } else {
          setFeedback(`🎉 Quiz Complete! Final Score: ${score + 10}`);
          setQuizCompleted(true);
        }
      }, 1500);
    } else {
      if (retryCount === 0) {
        setFeedback("❌ Try again! Select a different answer.");
        setRetryCount(1);
        setSelectedAnswer(null); // Allow them to select a new answer
      } else {
        setFeedback("❌ Incorrect. Read the above explanation!");
        setShowExplanation(true);
      }
    }
  };

  // Function to award the "Rockstar" badge when the user clicks the button
  const claimBadge = async () => {
    try {
      await axios.post(
        `http://localhost:4781/api/user/${userId}/reward/badge`,
        { badge: "Rockstar" }
      );
      console.log("🏆 Rockstar badge awarded successfully!");
      setBadgeAwarded(true);
      setFeedback("🏆 Rockstar badge awarded successfully!");
    } catch (error) {
      console.error("❌ Error awarding badge:", error);
      setFeedback("❌ Error awarding badge. Please try again.");
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

  // If quiz is completed, render a final congratulatory view instead of the quiz content.
  if (quizCompleted) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md text-center">
        <h2 className="text-2xl font-bold text-blue-600">
          Good job on your quiz!
        </h2>
        {!badgeAwarded && (
          <button
            className="mt-4 px-6 py-3 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 transition-all"
            onClick={claimBadge}
          >
            Claim Your Badge!
          </button>
        )}
        {feedback && (
          <p
            className={`mt-4 text-lg font-semibold ${
              feedback.includes("✅") || feedback.includes("🏆")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md text-center">
      <h2 className="text-2xl font-bold text-blue-600">Balance Sheet Quiz</h2>
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
      ) : currentQuestion + 1 < quizQuestions.length ? (
        <button
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all"
          onClick={nextQuestion}
        >
          Next Question
        </button>
      ) : (
        // When quiz is completed, show "Claim Your Badge!" button if not already awarded
        <div className="mt-6">
          <p className="text-lg font-bold text-green-600">
            🎉 End of Quiz! Final Score: {score}
          </p>
          {!badgeAwarded && (
            <button
              className="mt-4 px-6 py-3 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 transition-all"
              onClick={claimBadge}
            >
              Claim Your Badge!
            </button>
          )}
        </div>
      )}

      {feedback && (
        <p
          className={`mt-4 text-lg font-semibold ${
            feedback.includes("✅") || feedback.includes("🏆")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {feedback}
        </p>
      )}

      <p className="mt-6 text-lg font-bold text-gray-800">Score: {score}</p>
    </div>
  );
};

export default Quiz;
