import { useState, useEffect } from "react";
import {  QuizResultType, QuestionType } from "@/types/quiz";
import { decodeHtmlEntities, storage } from "@/lib/utils";
import { useToast } from "./use-toast";
import { useAuth } from "@/context/AuthContext";

export const useQuiz = () => {
  const [questions, setQuestios] = useState<QuestionType[]>([]);
  const [confirmationPrompt, setConfirmationPrompt] = useState<boolean>(true);
  const [resume, setResume] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isfinish, setIsFinish] = useState<boolean>(true);
  const [unFinishQuiz, setUnFinishQuiz] = useState<false | number>(false);
  const initialResult = {
    correct: 0,
    incorrect: 0,
    totalAnswered: 0,
    totalQuestions: 0,
  };
  const [result, setResult] = useState<QuizResultType>(initialResult);
  const { logout } = useAuth();
  const { toast } = useToast();

  const fetchQuiz = async () => {
    await fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        const decodedData = data.results.map((question: QuestionType) => {
          return {
            ...question,
            question: decodeHtmlEntities(question.question),
            correct_answer: decodeHtmlEntities(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map(
              (answer: string) => decodeHtmlEntities(answer)
            ),
            answer: "",
          };
        });
        setResume(decodedData);
        setQuestios(decodedData);
        setResult((prev) => ({
          ...prev,
          totalQuestions: decodedData.length,
        }));
        storage.setItem("quiz", decodedData);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "An error occurred while fetching the quiz",
          variant: "default",
        });
        setIsFinish(true);
      });
  };

  useEffect(() => {
    const unFinish = storage.getItem("unFinish");
    const unFinishQuizQuestions = storage.getItem("quiz");
    const history = storage.getItem("history");
    if (unFinish) {
      const { currentIndex, currentResume, currentResult, currentTime } =
        unFinish;
      setQuestios(unFinishQuizQuestions);
      setCurrentQuestionIndex(currentIndex);
      setResume(currentResume);
      setResult(currentResult);
      setUnFinishQuiz(currentTime);
    }
    if (history) {
      const { result, resume } = history;
      setResult(result);
      setResume(resume);
      setConfirmationPrompt(false);
    }
  }, []);

  useEffect(() => {
    if(result.totalQuestions !== 0){
      const historyPayload = {
        result,
        resume,
      };
      storage.setItem("history", historyPayload);
    }
  }, [result, resume]);

  const handleStart = () => {
    setIsStarted(true);
    setIsFinish(false);
    if (!unFinishQuiz) {
      setResume([]);
      setQuestios([]);
      fetchQuiz();
      setResult(initialResult);
    }
    if (confirmationPrompt) {
      setConfirmationPrompt(false);
    }
  };

  const handleFinish = () => {
    setIsStarted(false);
    setIsFinish(true);
    setCurrentQuestionIndex(0);
    setQuestios([]);
    setUnFinishQuiz(false);
    storage.removeItem("quiz");
    storage.removeItem("unFinish");
  };

  const handleAnswer = (answer: string) => {
    const current = questions[currentQuestionIndex];
    const isCorrect = current.correct_answer === answer;
    setResume((prev) => [
      ...prev.slice(0, currentQuestionIndex),
      {
        ...current,
        answer,
        isCorrect,
      },
      ...prev.slice(currentQuestionIndex + 1),
    ]);
    setResult((prev) => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
      totalAnswered: prev.totalAnswered + 1,
    }));

    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleOnChangeTime = (currentTime: number) => {
    const payload = {
      currentIndex: currentQuestionIndex,
      currentResume: resume,
      currentResult: result,
      currentTime,
    };
    storage.setItem("unFinish", payload);
    return;
  };

  const handleLogout = () => {
    logout();
    storage.removeItem("history");
  };

  return {
    confirmationPrompt,
    questions,
    isStarted,
    isfinish,
    result,
    currentQuestionIndex,
    unFinishQuiz,
    resume,
    handleAnswer,
    handleStart,
    handleFinish,
    handleOnChangeTime,
    handleLogout,
  };
};
