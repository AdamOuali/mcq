"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Papa from "papaparse"; // Utilisez Papaparse pour analyser le CSV
import { useState } from "react";

const FileUpload = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        complete: (result) => {
          const parsedQuestions = result.data.map((row, index) => ({
            id: index,
            question: row[0],
            options: row.slice(1, row.length - 1),
            correctOption: row[row.length - 1],
          }));
          setQuestions(parsedQuestions);
          setScore(null);
          setUserAnswers({});
        },
        header: false,
      });
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctOption) {
        correctAnswers += 1;
      }
    });
    setScore({
      total: correctAnswers,
      percentage: (correctAnswers / questions.length) * 100,
    });
  };

  const getOptionClass = (question, option) => {
    if (!score || !userAnswers[question.id]) return "";

    const isCorrect = option === question.correctOption;
    const userAnswer = userAnswers[question.id];

    if (userAnswer === option) {
      return isCorrect ? "text-green-600" : "text-red-600";
    }

    return isCorrect ? "text-green-600" : "";
  };

  return (
    <div className="file-upload">
      <div className="drop-zone border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500">
        <p className="text-gray-500">
          Drag and drop a CSV file here, or click to select a file.
        </p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="text-blue-500 cursor-pointer underline"
        >
          Choose a file
        </label>
      </div>

      {questions.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-4 mt-4">
            {questions.map((question) => (
              <Card
                key={question.id}
                className="border border-gray-300 rounded-lg"
              >
                <CardHeader>
                  <CardTitle>{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    onValueChange={(value) =>
                      handleAnswerChange(question.id, value)
                    }
                    value={userAnswers[question.id] || ""}
                  >
                    {question.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 ${getOptionClass(
                          question,
                          option
                        )}`}
                      >
                        <RadioGroupItem
                          value={option}
                          id={`q${question.id}_o${index}`}
                          disabled={!!score} // Désactive les boutons radio après soumission
                        />
                        <Label
                          htmlFor={`q${question.id}_o${index}`}
                          className={getOptionClass(question, option)}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button type="submit" className="mt-4">
            Submit Answers
          </Button>
        </form>
      )}

      {score !== null && (
        <div className="mt-4">
          <p className="text-lg font-bold">Results:</p>
          <p>
            Correct answers: {score.total} / {questions.length}
          </p>
          <p>Percentage: {score.percentage.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
