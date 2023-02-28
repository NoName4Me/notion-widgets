import { prepare, store } from "./base";
import { render } from "./render";
import "./style.less";

prepare();

const db = await fetch(
  `https://notion-api.splitbee.io/v1/page/${store.databaseId}`
)
  .then((res) => res.json())
  .then(
    (
      res: Record<
        string,
        {
          collection: any;
        }
      >
    ) => {
      return res[Object.keys(res).find((k) => res[k].collection)!];
    }
  );

render(db);
