import { useMemo } from "react"
import { SwipeableList, SwipeableListItem, LeadingActions, SwipeAction, TrailingActions} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense :Expense
  key:string
}

export default function ExpenseDetail({expense}:ExpenseDetailProps) {

  const {dispatch} =useBudget()

  const categoryInfo = useMemo(()=> categories.filter(cat=> cat.id === expense.category)[0], [expense])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type:'get-expense-by-id', payload:{id:expense.id}})}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => dispatch({type: 'remove-expense', payload:{id: expense.id}})}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem 
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white border-gray-200 shadow-lg p-5 w-full border-b flex gap-5 items-center">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="icono gasto"
              className="w-20"
            />
          </div>
          <div className="border-gray-400 flex-1 space-y-3 space-x-1">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>
          <AmountDisplay
            amount={expense.amount}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}