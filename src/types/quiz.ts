type QuestionType = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

type QuizResumeType = {
    question: string;
    answer: string;
    correctAnswer: string;
    isCorrect: boolean;
};

type QuizResultType = {
    correct: number;
    incorrect: number;
    total: number;
};

export  { QuestionType, QuizResumeType, QuizResultType };