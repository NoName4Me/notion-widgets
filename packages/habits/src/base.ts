import { renderError } from "./render";

/**
 * URL中可配置参数
 *
 * @param shape: circle | {n}px
 * @param project: 项目名
 * @param year: 年份
 * @param type: check | number
 * @param scale: 时间尺度: day | week | month
 * @param levels: 数字划分，等于 colors 个数 - 1，如 a,b,c 表示分4个等级，a>N, b>N≥a, c>N≥b, N≥c
 * @param colors: 颜色划分，red,#ff3900,
 */
const search = new URL(location.href).searchParams;

type Store = {
  type: string;
  databaseId: string;
  colors: string[];
  levels: number[];
  project: string;
  year: number | string;
  overview: string[];
  dataType: string;
  unit: string;
  container: HTMLDivElement;
};

export const store: Store = {
  type: search.get("type") || "heatmap",
  levels: search.get("levels")
    ? search
      .get("levels")!
      .split(",")
      .map((l) => parseFloat(l))
    : [],
  project: search.get("project") || "",
  databaseId: search.get("db-id") || "",
  year: search.get("year") || new Date().getFullYear(),
  colors: search.get("colors")?.split(",") || [],
  container: document.querySelector(".habits")!,
  dataType: search.get("data-type") || "check",
  unit: search.get("unit") || "",
  overview: search.get("overview") ? search.get("overview")!.split(",") : [],
};

export const prepare = () => {
  if (!store.databaseId) {
    renderError();
    return;
  }

  setRootCssVars({
    shape: search.get("shape") || "4px",
    colorActive: search.get("color-active") || search.get("color") || "",
    colorDefault: search.get("color-default") || "#f1f1ef",
    colors: store.colors,
    theme: (search.get("theme") || "green") as Theme,
  });
};

export const THEME_COLOR_MAX_LEVEL = 3;

const cssVarKey = (prop: string) => `--habit-${prop}`;

export enum Theme {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Purple = "purple",
  Black = "black",
}

const themeColorMap = {
  [Theme.Red]: ["#FFC0CB", "#FF647F", "#FF0833", "#AC001E"],
  [Theme.Blue]: ["#89CFF0", "#38AEE6", "#167CAC", "#0B415A"],
  [Theme.Green]: ["#77DD77", "#32C732", "#1F7D1F", "#0D340D"],
  [Theme.Purple]: ["#E0B0FF", "#BC54FF", "#9600F7", "#5F009C"],
  [Theme.Black]: ["#C0C2C9", "#8F929F", "#616471", "#36383F"],
};

type CssVarConfig = {
  shape: "circle" | string;
  colorDefault: string;
  colorActive: string;
  colors: string[];
  theme: Theme;
};

function setRootCssVars({
  shape,
  colorActive,
  colorDefault,
  colors,
  theme,
}: CssVarConfig) {
  const docEl = document.documentElement;

  if (shape === "circle") {
    shape = "50%";
  }
  docEl.style.setProperty(cssVarKey("item-border-radius"), shape);

  docEl.style.setProperty(cssVarKey("color-check"), colorActive);
  docEl.style.setProperty(cssVarKey("color-uncheck"), colorDefault);

  colors.forEach((c, idx) => {
    docEl.style.setProperty(cssVarKey(`color-${idx}`), `#${c}`);
  });

  themeColorMap[theme]?.forEach((t, idx) => {
    docEl.style.setProperty(cssVarKey(`theme-color-${idx}`), t);
  });
}
