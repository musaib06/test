export interface Answers {
  answerId: number;
  questionId: number;
  answerDescription: string;
  isCorrect: boolean;
}
export interface QuestionAnswers {
  id: number;
  question: string;
  options: Answers[];
}
