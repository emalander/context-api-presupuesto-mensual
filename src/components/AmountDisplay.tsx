import { formatcurrency } from "../helpers"

type AmountDisplayProps = {
  label?: string // opcional
  amount: number
}


export default function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <p className="text-2xl text-sky-900 font-bold tracking-wide">
      {label && `${label}: `}
      <span className="font-black tracking-normal ">{formatcurrency(amount)}</span>
    </p>
  )
}
