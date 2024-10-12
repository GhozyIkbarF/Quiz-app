import { useState, useEffect } from "react";
import { QuizResumeType, QuizResultType, QuestionType } from "@/types/quiz";
import { decodeHtmlEntities, storage } from "@/lib/utils";
import { useToast } from "./use-toast";

export const useQuiz = () => {
  const [questions, setQuestios] = useState<QuestionType[]>([]);
  const [confirmationPrompt, setConfirmationPrompt] = useState<boolean>(true);
  const [resume, setResume] = useState<QuizResumeType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isfinish, setIsFinish] = useState<boolean>(true);
  const [unFinishQuiz, setUnFinishQuiz] = useState<false | number>(false);
  const [result, setResult] = useState<QuizResultType>({
    correct: 0,
    incorrect: 0,
    total: 0,
  });
  const { toast } = useToast();

  const fetchQuiz = async () => {
    await fetch(
      "https://opentdb.com/api.php?amount=10"
    ).
    then((res) => res.json()).
    then((data) => {
      const decodedData = data.results.map((question: QuestionType) => {
        return {
          ...question,
          question: decodeHtmlEntities(question.question),
          correct_answer: decodeHtmlEntities(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map((answer: string) =>
            decodeHtmlEntities(answer)
          ),
        };
      });
      setQuestios(decodedData);
      storage.setItem("quiz", decodedData);
    }).catch((error) => {
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
    if (unFinish) {
      const { currentIndex, currentResume, currentResult, currentTime } = unFinish;
      setQuestios(unFinishQuizQuestions);
      setCurrentQuestionIndex(currentIndex);
      setResume(currentResume);
      setResult(currentResult);
      setUnFinishQuiz(currentTime);
    }
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setIsFinish(false);
    if (!unFinishQuiz) {
      setResume([]);
      setQuestios([]);
      fetchQuiz();
      setResult({
        correct: 0,
        incorrect: 0,
        total: 0,
      });
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
    setResume(prev => [
      ...prev,
      {
        question: current.question,
        answer,
        correctAnswer: current.correct_answer,
        isCorrect,
      },
    ]);
    setResult((prev) => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
      total: prev.total + 1,
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
    return
  }

  return {
    confirmationPrompt,
    questions,
    isStarted,
    isfinish,
    result,
    currentQuestionIndex,
    handleAnswer,
    handleStart,
    handleFinish,
    handleOnChangeTime,
    unFinishQuiz,
    resume,
  };
};
