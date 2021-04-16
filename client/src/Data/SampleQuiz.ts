import { QuizData } from "../Types/QuizInterface";

export const SampleQuiz:QuizData = [
  {
      questionText: 'What is the capital of France?',
      type: "single option", 
      answerOptions: [
          { answerText: 'New York', isCorrect: false },
          { answerText: 'London', isCorrect: false },
          { answerText: 'Paris', isCorrect: true },
          { answerText: 'Dublin', isCorrect: false },
      ],
  },
  {
      questionText: 'Who is CEO of Tesla?',
      type: "single option", 
      answerOptions: [
          { answerText: 'Jeff Bezos', isCorrect: false },
          { answerText: 'Elon Musk', isCorrect: true },
          { answerText: 'Bill Gates', isCorrect: false },        ],
  },
  {
      questionText: 'The iPhone was created by which company?',
      type: "single option", 
      answerOptions: [
          { answerText: 'Apple', isCorrect: true },
          { answerText: 'Intel', isCorrect: false },
          { answerText: 'Amazon', isCorrect: false },
          { answerText: 'Microsoft', isCorrect: false },
      ],
  },
  {
      questionText: 'Which of these is a programming language?',
      type: "multiple choice", 
      answerOptions: [
          { answerText: 'Python', isCorrect: true },
          { answerText: 'HTTP', isCorrect: false },
          { answerText: 'REST', isCorrect: false },
          { answerText: 'Java', isCorrect: true },
      ],
  },
  {
      questionText: "What is the powerhouse of the cell?", 
      type:"flashcard", 
      flashcardAnswerText: "Mitochondria"
  }
]