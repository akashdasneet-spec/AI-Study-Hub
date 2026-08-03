export interface GenerateQuizDto {
  title: string;
  content: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  questionCount?: number;
}
