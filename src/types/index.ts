
export type Expense = {
  id: string
  expenseName: string
  category: string
  amount:number
  date: Value
}

export type DraftExpense = Omit<Expense, 'id'>

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
  id: string
  name: string
  icon: string
}