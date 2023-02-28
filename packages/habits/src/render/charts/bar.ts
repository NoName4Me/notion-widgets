import { store } from "@/base";
import { queryEl } from "@/utils";
import { Database, renderOverview } from "..";
import { createDiv, renderHeaderMonths } from "../common";

const renderBackground = () => {
  renderHeaderMonths()
  // switch header and main
  queryEl('.habits-main')!.innerHTML = '<div class="habits-main__months"></div>'
}

export const renderBar = (db: Database) => {
  renderBackground()
  let total = new Array<number>(12).fill(0);
  const { project, dataType, container } = store;
  db.collection.data.forEach((item) => {
    const date = item.Date[0][0]

    if (item[project] && date) {
      const monthIndex = new Date(date).getMonth()
      const itemValue = item[project]?.[0][0];
      if (dataType === "check" && itemValue) {
        total[monthIndex]++
      } else if (dataType === "number" && /\d+/.test(itemValue)) {
        const n = parseFloat(itemValue);
        total[monthIndex] += n
      }
    }
  });
  const max = Math.max(...total)
  const pxPerValue = max ? 100 / max : 0
  total.forEach(n => {
    const monthEl = createDiv(undefined, {
      'data-value': n.toFixed(0)
    })
    Object.assign(monthEl.style, {
      height: `${n * pxPerValue}px`
    })
    container.querySelector('.habits-main__months')!.appendChild(monthEl)
  })

  const totalSum = total.reduce((res, cur) => res + cur, 0)

  renderOverview({
    total: totalSum,
    average: (totalSum / 12).toFixed(1)
  })
};
