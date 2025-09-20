import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import AmountDisplay from "./AmountDisplay";

import ExpenseModal from "../components/ExpenseModal"
import "react-circular-progressbar/dist/styles.css"
import { useBudget } from '../hooks/useBudget';

export default function BudgetTracker() {

  const { state, totalExpenses, remainingBudget, dispatch } = useBudget()
  const percent = +((totalExpenses / state.budget) * 100).toFixed(2)

  console.log(percent)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-48 h-48">
          <CircularProgressbar
            value={percent}
            styles={buildStyles({
              pathColor: percent === 100 ? '#DC2626' : '#22C55E',
              trailColor: '#BAE6FD',
              textSize: 20,
              textColor: percent === 100 ? '#DC2626' : '#075985'
            })}
            text={`${percent}%`}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-6">
        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />
        <AmountDisplay
          label="Disponible"
          amount={remainingBudget}
        />
        <AmountDisplay
          label="Gastado"
          amount={totalExpenses}
        />
        <ExpenseModal />
      </div>

    </div>
  )
}
