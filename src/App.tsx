
import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
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
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_2px)] bg-[size:16px_16px]">
        <header className="bg-slate-500"> 
          <h1 className="text-center uppercase text-4xl font-manrope font-bold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-stone-50 to-zinc-200 py-3">
            Presupuesto Mensual
          </h1>
        </header>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-20 p-10">
          {isValidBUdget ? <BudgetTracker/>: <BudgetForm/>}
        </div>
        {isValidBUdget && (
          <main className="max-w-3xl mx-auto py-10">
            <FilterByCategory/>
            <ExpenseList/>
          </main>
        )}
      </div>
    </>
  )
}

export default App
