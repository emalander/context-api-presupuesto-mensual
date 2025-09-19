import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const isValid = useMemo(() => {
    return (isNaN(budget) || budget <= 0)
  }, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'add-budget', payload: { budget } })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-2xl text-blue-600 font-bold text-center">
          Ingrese el presupuesto
        </label>
        <div className="flex items-center">
          <h1 className="font-black mr-2">$</h1>
          <input
            id="budget"
            type="number"
            className="w-full bg-white border bordger-gray-200 p-2"
            placeholder="Ingrese el monto en pesos"
            name="budget"
            value={budget === 0 ? '' : budget}
            onChange={handleChange}
          />
          <input
            type="submit"
            value='ok'
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer p-2 w-1/6 text-white font-black uppercase disabled:opacity-40 rounded-tr-md rounded-br-md"
            disabled={isValid}
          />
        </div>
      </div>

    </form>
  )
}
