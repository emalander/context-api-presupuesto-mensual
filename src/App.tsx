
import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {

  const {state} = useBudget()
  console.log(state.budget)
  const isValidBUdget = useMemo(()=> state.budget > 0, [state.budget])

  useEffect(()=> {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="bg-gradient-to-t from-sky-800 via-sky-500 to-sky-700 flex justify-center items-center py-8 max-h-64 shadow-lg"> 
        <h1 className="text-center uppercase text-4xl font-manrope font-bold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-stone-50 to-zinc-200">
          Presupuesto Mensual
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBUdget ? <BudgetTracker/>: <BudgetForm/>}
      </div>
      {isValidBUdget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory/>
          <ExpenseList/>
          <ExpenseModal/>
        </main>
      )}
    </>
  )
}

export default App
