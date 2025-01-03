import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

  const {state, totalExpenses, remainingBudget, dispatch} = useBudget()
  const percent= +((totalExpenses/state.budget) * 100).toFixed(2)

  console.log(percent)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percent}
          styles={buildStyles({
            pathColor: percent === 100 ? '#DC2626':'#22C55E',
            trailColor:'#BAE6FD',
            textSize:9,
            textColor:percent === 100 ? '#DC2626':'#075985'
          })}
          text={`${percent}% Gastado`}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button 
          type="button"
          className="bg-sky-800 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({type: 'reset-app'})}
        >
          Resetear
        </button>
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
      </div>
    </div>
  )
}
