import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Card, CardContent, CardHeader } from "@/components/ui/card";
  import { Badge } from './ui/badge';
  import { QuestionType } from "@/types/quiz"

  interface QuizResumeProps {
    resume: QuestionType[];
  }
  
  const QuizResume: React.FC<QuizResumeProps> = ({ resume }) => {
  return (
    <Accordion
    className="w-full lg:w-[unset]"
    type="single"
    collapsible
  >
    <AccordionItem className="lg:w-[500px] max-w-full mb-5" value="item-1">
      <AccordionTrigger>Resume</AccordionTrigger>
      <AccordionContent>
        {resume.map((item, index) => (
          <Card key={index} className="mb-5 font-semibold">
            <CardHeader>
              <h3 className='font-semibold'>{item.question}</h3>
            </CardHeader>
            <CardContent>
              <p>
                Your answer: <span>{item.answer}</span>
              </p>
              <p>
                Correct answer: <span>{item.correct_answer}</span>
              </p>
              <Badge className='bg-bg mt-5'>
                {item.isCorrect === true ? "Correct" : item.isCorrect === false ? "Incorrect" : "Not answered"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  )
}

export default QuizResume