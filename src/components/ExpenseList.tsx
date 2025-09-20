import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

  const {state} = useBudget()

  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

  return (
    <div className="mt-4 bg-gradient-to-r from-slate-100 via-sky-100 to-zinc-100 shadow-lg rounded-lg p-4">
      {isEmpty ? <p className="text-gray-600 text-3xl font-bold">No hay gastos</p> : (
        <>
          <p className="text-gray-800 text-3xl font-bold rounded-t-xl text-center tracking-wide  py-3 bg-sky-100">Gastos</p>
          {filteredExpenses.map(expense => (
            <ExpenseDetail
              key={expense.id}
              expense={expense}
            />
          ))}
        </>
      )} 
    </div>
  )
}
