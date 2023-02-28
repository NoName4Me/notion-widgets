import { store } from "@/base";
import { queryEl } from "@/utils";

export function createDiv(
  classNames?: string[] | string,
  attrs: Record<string, any> = {}
) {
  const div = document.createElement("div");

  classNames &&
    (Array.isArray(classNames)
      ? div.classList.add(...classNames)
      : div.classList.add(classNames));

  Object.keys(attrs).forEach((key) => {
    div.setAttribute(key, attrs[key]);
  });

  return div;
}

export const renderHeaderMonths = () => {
  const { container } = store
  container.querySelector('.habits-header')!.innerHTML = '<div class="habits-header__months"></div>'
  // 月
  const headerMonthEl = queryEl(".habits-header__months")!;

  new Array(12).fill(0).forEach((_, idx) => {
    const div = createDiv();
    div.innerText = String(idx + 1);
    headerMonthEl.appendChild(div);
  });
}