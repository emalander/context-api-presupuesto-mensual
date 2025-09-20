
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
        <header className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800"> 
          <h1 className="text-center uppercase text-4xl tracking-widest font-manrope font-bold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-stone-50 to-zinc-300 py-3">
            Presupuesto Mensual
          </h1>
        </header>
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-slate-100 via-sky-100 to-slate-100 shadow-lg rounded-lg mt-10 p-5">
          {isValidBUdget ? <BudgetTracker/>: <BudgetForm/>}
        </div>
        {isValidBUdget && (
          <main className="max-w-3xl mx-auto py-10 ">
            <FilterByCategory/>
            <ExpenseList/>
          </main>
        )}
      </div>
    </>
  )
}

export default App
