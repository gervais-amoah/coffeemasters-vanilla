const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        Router.go(a.getAttribute("href"));
      });
    });

    //  Event handler for the url change
    window.addEventListener("popstate", (evt) => {
      Router.go(evt.state.path, false);
    });

    //  Check the initial url
    Router.go(location.pathname);
  },
  go: (path, addToHistory = true) => {
    console.log(`go to ${path}`);

    if (addToHistory) history.pushState({ path }, "", path);

    let pageElement = null;

    switch (path) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (path.startWith("/product-")) {
          pageElement = document.createElement("h1");
          // const paramId = path.substring(path.lastIndexOf("-") + 1)
          const paramId = path.split("/product-")[0];
          pageElement.dataset.id = paramId;
        }
    }
    if (pageElement) {
      const main = document.querySelector("main");
      main.innerHTML = "";
      main.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
