import React, { useEffect, useState } from "react"
import type { DraftExpense, Value} from "../types"
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

export default function ExpenseForm() {

  const [expense, setExpense]= useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category:'',
    date: new Date()
  })

  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const {dispatch, state, remainingBudget} = useBudget()

  useEffect(() => {
    if(state.editingId) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }
  }, [state.editingId])

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date:value
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target
    const isAmountField = ['amount'].includes(name)
    console.log(isAmountField)
    setExpense({
      ...expense,
      [name] : isAmountField ? +value : value
    })
  }
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Validar
    if(Object.values(expense).includes('')){
      setError('Todos los campos son obligatorios')
      console.log('error...')
      return
    }
    // validar no pasarse de presupuesto
    if((expense.amount - previousAmount) > remainingBudget){
      setError('Se sale del presupuesto')
      console.log('error...')
      return
    }
    // Agregar nuevo gasto ó actualizar
    if(state.editingId){
      dispatch({type: 'update-expense', payload:{expense: {id:state.editingId, ...expense}} })
    } else {
      dispatch({type: 'add-expense', payload:{expense} })
    }
    
    // Reiniciar el State
    setExpense({
      amount: 0,
      expenseName: '',
      category:'',
      date: new Date()
    })
    setPreviousAmount(0)

  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
          className="uppercase text-center text-2xl font-black border-b-4 border-slate-500 py-2">
          {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
        </legend>
        {error && <ErrorMessage> {error} </ErrorMessage>}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="expenseName"
            className="text-xl"
          >Nombre Gasto:</label>
           <input
            type="text"
            id="expenseName"
            placeholder="Añade el nombre del gasto"
            className="bg-slate-200 p-2"
            name="expenseName"
            onChange={handleChange}
            defaultValue={expense.expenseName}>
          </input>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="amount"
            className="text-xl"
          >Cantidad:</label>
          <input
            type="number"
            id="amount"
            placeholder="Añade la cantidad del gasto: ej. 500"
            className="bg-slate-200 p-2"
            name="amount"
            onChange={handleChange}
            defaultValue={expense.amount === 0 ? '': expense.amount}>
          </input>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-xl"
          >Categoria:</label>
          <select 
              id="category"  
              value="Añade la cantidad del gasto: ej. 500"
              className="bg-slate-200 p-2" 
              name="category"
              onChange={handleChange}
              defaultValue={expense.category}
          > 
            <option value="">-- Seleccione --</option>
            {categories.map(category => (
              <option
                key={category.id} 
                value={category.id}>
              {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="amount"
            className="text-xl"
          >Fecha Gasto:</label>
          <DatePicker
            className="bg-slate-400 p-2 border-2"
            onChange={handleChangeDate}
            value={expense.date}
            
          />
        </div>
        <input 
          type="submit"
          className="bg-indigo-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
          value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}>
          
        </input>

    </form>
  )
}
