export interface IQuiz {
  _id: string
  competency: string
  level: string
  questionText: string
  options: string[]
  correctOptionIndex: number
  time: number
}
