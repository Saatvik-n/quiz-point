import { QuizData } from "../Types/QuizInterface";

export const SampleQuiz:QuizData = [
  {
      questionText: 'What is the capital of France?',
      type: "Single Option", 
      answerOptions: [
          { answerText: 'New York', isCorrect: false },
          { answerText: 'London', isCorrect: false },
          { answerText: 'Paris', isCorrect: true },
          { answerText: 'Dublin', isCorrect: false },
      ],
  },
  {
      questionText: 'Who is CEO of Tesla?',
      type: "Single Option", 
      answerOptions: [
          { answerText: 'Jeff Bezos', isCorrect: false },
          { answerText: 'Elon Musk', isCorrect: true },
          { answerText: 'Bill Gates', isCorrect: false },        ],
  },
  {
      questionText: 'The iPhone was created by which company?',
      type: "Single Option", 
      answerOptions: [
          { answerText: 'Apple', isCorrect: true },
          { answerText: 'Intel', isCorrect: false },
          { answerText: 'Amazon', isCorrect: false },
          { answerText: 'Microsoft', isCorrect: false },
      ],
  },
  {
      questionText: 'Which of these is a programming language?',
      type: "Multiple Choice", 
      answerOptions: [
          { answerText: 'Python', isCorrect: true },
          { answerText: 'HTTP', isCorrect: false },
          { answerText: 'REST', isCorrect: false },
          { answerText: 'Java', isCorrect: true },
      ],
  },
  {
      questionText: "What is the powerhouse of the cell?", 
      type:"Flashcard", 
      flashcardAnswerText: "Mitochondria"
  }
]