type QuestionType = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answer: string;
    isCorrect: boolean | undefined
};

type QuizResumeType = {
    question: string;
    correctAnswer: string;
};

type QuizResultType = {
    correct: number;
    incorrect: number;
    totalAnswered: number;
    totalQuestions: number;
};

export  { QuestionType, QuizResumeType, QuizResultType };