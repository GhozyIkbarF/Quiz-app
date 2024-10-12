import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Card, CardContent, CardHeader } from "@/components/ui/card";
  import { Badge } from './ui/badge';
  import { QuizResumeType } from "@/types/quiz"

  interface QuizResumeProps {
    resume: QuizResumeType[];
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
                Correct answer: <span>{item.correctAnswer}</span>
              </p>
              <Badge className='bg-bg mt-5'>
                {item.isCorrect ? "Correct" : "Incorrect"}
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