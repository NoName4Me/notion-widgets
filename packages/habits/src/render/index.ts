import { renderHeatmap } from "./charts/heatmap";
import { renderBar } from "./charts/bar";
import { store } from "@/base";
import { renderOverview } from "./overview";

interface DatabaseDataItem {
  id: string;
  Date: [[string]];
  [key: string]: any;
}

export type Database = {
  collection: {
    data: DatabaseDataItem[];
  };
};

export enum ChartType {
  Heatmap = "heatmap",
  Bar = "bar",
}

export const render = (
  db: Database
) => {
  const { type, container } = store
  container.classList.add(`is-${type}`)
  if (type === ChartType.Bar) {

    return renderBar(db);
  }

  return renderHeatmap(db)
};

export { renderError } from "./error";
export { renderOverview }
