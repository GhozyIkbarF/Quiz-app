import { Fragment } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { QuestionType } from "@/types/quiz";

type QuestionCardProps = {
  question: QuestionType[];
  currentQuestionIndex: number;
  onSelect: (value: string) => void;
};

const QuestionCard = ({
  question,
  currentQuestionIndex,
  onSelect,
}: QuestionCardProps) => {
  const currectQuestion: QuestionType = question[currentQuestionIndex];
  return (
    <Fragment>
      <Card className="relative bg-white text-center text-xl p-5 pt-8 lg:p-10">
        <p className="text-sm font-semibold absolute top-1 right-1">
          {currentQuestionIndex + 1}/{question.length}
        </p>
        {currectQuestion.question}
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
        {currectQuestion.incorrect_answers
          .concat(currectQuestion.correct_answer)
          .sort(() => Math.random() - 0.5)
          .map((answer, index) => (
            <Button
              className="h-full text-wrap"
              key={index}
              onClick={() => onSelect(answer)}
            >
              {answer}
            </Button>
          ))}
      </div>
    </Fragment>
  );
};

export default QuestionCard;
