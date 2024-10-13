import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useQuiz } from "@/hooks/useQuiz";
import Timer from "@/components/Timer";
import QuestionCard from "@/components/QuestionCard";
import QuizResume from "@/components/QuizResume";

const Quiz: React.FC = () => {
  const {
    confirmationPrompt,
    currentQuestionIndex,
    isfinish,
    questions,
    result,
    unFinishQuiz,
    resume,
    handleStart,
    handleAnswer,
    handleFinish,
    handleOnChangeTime,
    handleLogout
  } = useQuiz();


  if (!isfinish) {
    return (
      <div className="min-h-screen flex justify-center pt-28">
        {questions.length === 0 ? (
          <h3 className="text-xl font-bold">Loading...</h3>
        ) : (
          <div className="max-w-[550px] w-full space-y-10 text-center">
            <h1 className="text-4xl font-black">Quiz...</h1>
            <Timer 
              time={!unFinishQuiz ? 100000 : unFinishQuiz} 
              onTimeUp={handleFinish} 
              onChange={handleOnChangeTime}
            />
            <QuestionCard
              question={questions}
              currentQuestionIndex={currentQuestionIndex}
              onSelect={(answer) => handleAnswer(answer)}
            />
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="relative flex justify-center pt-32">
      <Button onClick={() => handleLogout()} className="absolute top-2 right-2">
        Logout
      </Button>
      {(confirmationPrompt || unFinishQuiz) ? (
        <div className="flex flex-col items-center gap-5">
          <h1 className="font-bold text-center text-2xl md:text-4xl">
            {!unFinishQuiz ? 'you sure you want to start the quiz?' : 'You have an unfinished quiz, do you want to continue?'}
          </h1>
          <div className="space-x-3">
            {unFinishQuiz && <Button onClick={() => handleFinish()}>No</Button>}
            <Button onClick={() => handleStart()}>{unFinishQuiz ? 'Yes' : 'Start'}</Button>
          </div>
        </div>
      ) : (
        <div className="max-w-[500px] flex flex-col mb-10">
          <h1 className="font-bold text-center text-2xl md:text-4xl mb-5">
            Quiz...
          </h1>
          <div className="grid grid-cols-3 gap-5 mb-8">
            {Object.entries(result).map(([key, value]) => {
              if(key === 'totalQuestions') return null;
              return (
              <Card key={key} className="text-center font-bold">
                <CardHeader className="text-center">
                  {key === 'totalAnswered' ? 'Answered' : key }
                </CardHeader>
                <CardContent>
                  <h1 className="text-2xl md:first:text-4xl">
                    {key !== 'totalAnswered' ? value : `${value}/${result.totalQuestions}`}
                  </h1>
                </CardContent>
              </Card>
            )})}
          </div>
          <QuizResume resume={resume} />
          <Button className="max-w-min" onClick={() => handleStart()}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
