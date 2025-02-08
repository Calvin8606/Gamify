import React, { useState } from "react";
import axios from "axios";

const quizQuestions = [
    {
      question: "What is included in a Balance Sheet?",
      options: [
        "Assets, Liabilities, Equity",
        "Revenue, Expenses, Profit",
        "Cash Flow, Debt, Net Worth"
      ],
      correctAnswer: "Assets, Liabilities, Equity",
      explanation: "A balance sheet consists of three main components: Assets (what the company owns), Liabilities (what the company owes), and Shareholders' Equity (the residual interest in the assets after liabilities are deducted)."
    },
    {
      question: "Which of these is an asset?",
      options: [
        "Accounts Payable",
        "Inventory",
        "Long-term Debt"
      ],
      correctAnswer: "Inventory",
      explanation: "Assets are resources owned by a company that provide economic value. Inventory (stock of goods for sale) is considered an asset because it holds future economic benefit. Accounts payable and long-term debt are liabilities, as they represent amounts owed by the company."
    },
    {
      question: "What does 'Liabilities' represent?",
      options: [
        "Company's Profits",
        "Company's Debts",
        "Company's Revenue"
      ],
      correctAnswer: "Company's Debts",
      explanation: "Liabilities are the financial obligations of a company, meaning the amounts it owes to others, such as loans, accounts payable, and accrued expenses. Profits and revenue relate to the income statement, not the balance sheet."
    },
    {
      question: "How is Shareholders' Equity calculated?",
      options: [
        "Assets - Liabilities",
        "Revenue - Expenses",
        "Cash + Inventory"
      ],
      correctAnswer: "Assets - Liabilities",
      explanation: "Shareholders' Equity represents the owners' residual interest in the company's assets after deducting liabilities. It is calculated as: Equity = Assets - Liabilities."
    },
    // 📌 Calculation-Based Questions Below
    {
      question: "A company has $100,000 in assets and $40,000 in liabilities. What is its Shareholders' Equity?",
      options: [
        "$140,000",
        "$60,000",
        "$40,000"
      ],
      correctAnswer: "$60,000",
      explanation: "The formula for Shareholders' Equity is Assets - Liabilities. So, $100,000 - $40,000 = $60,000."
    },
    {
      question: "If a company has $200,000 in total assets and $80,000 in total liabilities, what is its equity?",
      options: [
        "$120,000",
        "$280,000",
        "$80,000"
      ],
      correctAnswer: "$120,000",
      explanation: "Equity is calculated as Assets - Liabilities. So, $200,000 - $80,000 = $120,000."
    },
    {
      question: "A company has $75,000 in retained earnings and $50,000 in common stock. What is its total equity?",
      options: [
        "$125,000",
        "$75,000",
        "$50,000"
      ],
      correctAnswer: "$125,000",
      explanation: "Total Equity = Retained Earnings + Common Stock. So, $75,000 + $50,000 = $125,000."
    },
    {
      question: "If a company has $500,000 in assets and $320,000 in liabilities, what is its total equity?",
      options: [
        "$180,000",
        "$820,000",
        "$320,000"
      ],
      correctAnswer: "$180,000",
      explanation: "Total Equity is found using Assets - Liabilities. So, $500,000 - $320,000 = $180,000."
    },
    {
      question: "A company starts with $50,000 in equity. Over the year, it earns $20,000 in profits and distributes $5,000 in dividends. What is its new equity?",
      options: [
        "$65,000",
        "$75,000",
        "$55,000"
      ],
      correctAnswer: "$65,000",
      explanation: "New Equity = Starting Equity + Net Profit - Dividends. So, $50,000 + $20,000 - $5,000 = $65,000."
    }
  ];


  const BalanceSheetQuiz = ({ userId }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [retryCount, setRetryCount] = useState(0); // Track retries
    const [showExplanation, setShowExplanation] = useState(false); // Show explanation on 2nd incorrect attempt
  
    const handleAnswerSelection = (answer) => {
      setSelectedAnswer(answer);
      setFeedback(""); // Clear previous feedback when user selects a new answer
    };
  
    const submitAnswer = async () => {
      if (!selectedAnswer) return;
  
      const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
  
      if (isCorrect) {
        setScore(score + 10);
        setFeedback("✅ Correct! You earned 10 points!");
        setShowExplanation(false);
        setRetryCount(0);
  
        // Send points to backend
        try {
          await axios.post(`http://localhost:4781/api/user/${userId}/reward/points`, { points: 10 });
        } catch (error) {
          console.error("Error updating score:", error);
        }
  
        // Move to next question after delay
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
          setSelectedAnswer(null); // Allow them to select a new answer
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
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md text-center">
        <h2 className="text-2xl font-bold text-blue-600">Balance Sheet Quiz</h2>
        <p className="text-gray-700 mt-2">
          <strong>Question {currentQuestion + 1} of {quizQuestions.length}:</strong>
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
                  ${selectedAnswer === option ? "bg-blue-500 text-white border-blue-600" : "bg-gray-100 text-gray-700 border-gray-300"}
                  hover:bg-blue-400 hover:text-white
                `}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-lg text-gray-900">{quizQuestions[currentQuestion].explanation}</p>
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
          currentQuestion + 1 < quizQuestions.length ? (
            <button 
              className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          ) : (
            <p className="mt-6 text-lg font-bold text-green-600">🎉 End of Quiz! Final Score: {score}</p>
          )
        )}
  
        {feedback && (
          <p className={`mt-4 text-lg font-semibold ${
            feedback.includes("✅") ? "text-green-600" : "text-red-600"
          }`}>
            {feedback}
          </p>
        )}
  
        <p className="mt-6 text-lg font-bold text-gray-800">Score: {score}</p>
      </div>
    );
  };

export default BalanceSheetQuiz;