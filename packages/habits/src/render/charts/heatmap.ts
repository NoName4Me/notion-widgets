import { Database, renderOverview } from "..";
import { store, THEME_COLOR_MAX_LEVEL } from "@/base";
import { queryEl, formatDate } from "@/utils";
import { createDiv, renderHeaderMonths } from "../common";

const MS_ONE_DAY = 3600 * 1000 * 24;

const renderBackground = () => {
  const { year, container } = store;

  const mainEl = container.querySelector('.habits-main')!

  mainEl.innerHTML = '<aside class="habits-header__weeks"></aside>'
  renderHeaderMonths()

  // 周
  const headerWeekEl = queryEl(".habits-header__weeks")!;
  ["Mon", "Wed", "Fri"].forEach((w) => {
    const div = createDiv();
    div.innerText = w;
    headerWeekEl.appendChild(div);
  });

  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);
  const offset = (6 + startDate.getDay()) % 7;
  const daysOfYear = (+endDate - +startDate) / MS_ONE_DAY + 1;
  const wrapper = createDiv("habits-days", {
    "data-start-of-week": offset,
  });

  new Array(daysOfYear).fill(0).forEach((_, idx) => {
    wrapper.appendChild(
      createDiv(["day"], {
        "date-day": idx + 1,
        title: formatDate(idx * MS_ONE_DAY + startDate.getTime()),
      })
    );
  });

  mainEl.appendChild(wrapper);
};

export const renderHeatmap = (db: Database) => {
  renderBackground();
  let total = 0
  let counter = 0
  const { container, project, dataType, levels, colors, year } = store;
  db.collection.data.forEach((item) => {
    if (item.Date) {
      const dayEl = container.querySelector(`.day[title="${item.Date[0][0]}"]`);
      if (!dayEl) return;

      if (item[project]) {
        const itemValue = item[project]?.[0][0];
        if (dataType === "check" && itemValue) {
          dayEl.classList.add("is-check");
          counter++
        } else if (dataType === "number" && /\d+/.test(itemValue)) {
          const n = parseFloat(itemValue);
          counter++
          total += n
          let i;
          for (i = levels.length - 1; i >= 0; i--) {
            if (n >= levels[i]) {
              break;
            }
          }

          const maxColorLevel = colors.length
            ? Math.min(colors.length - 1, THEME_COLOR_MAX_LEVEL)
            : THEME_COLOR_MAX_LEVEL;
          dayEl.classList.add("level-" + Math.min(i + 1, maxColorLevel));
          dayEl.setAttribute(
            "title",
            dayEl.getAttribute("title")! + `\n${itemValue}`
          );
        }
      }
      return;
    }
  });

  const isPastYear = Date.now() > new Date(`${+year + 1}/01/01`).getTime()
  const pastDays = (Date.now() - new Date(`${year}/01/01`).getTime()) / MS_ONE_DAY
  renderOverview({
    total: dataType === "check" ? counter : total,
    average: (total / (isPastYear ? 365 : pastDays)).toFixed(1)
  })
};

export const useHeatmapRender = () => { };
