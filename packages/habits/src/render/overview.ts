import { store } from "@/base"
import { createDiv } from "./common"
import { queryEl } from '@/utils'
import { ChartType } from "."
export const renderOverview = ({ total, average }: { total: number, average: number | string }) => {
  const { overview, unit, type } = store
  const parent = queryEl('.habits-footer')!;
  if (overview.includes('total')) {
    const totalEl = createDiv('habits-total')
    totalEl.innerHTML = `<strong>Toal: </strong>${total} ${unit}`
    parent.appendChild(totalEl)
  }

  if (overview.includes('total')) {
    const averageEl = createDiv('habits-average')
    averageEl.innerHTML = `<strong>Average: </strong>${average} ${unit}/${type === ChartType.Bar ? '月' : '天' }`
    parent.appendChild(averageEl)
  }
}
