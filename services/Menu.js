import API from "./API.js";

export async function loadData() {
  console.log("fetching data...");
  app.store.menu = await API.fetchMenu();
}
