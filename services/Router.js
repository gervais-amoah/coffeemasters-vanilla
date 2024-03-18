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
        if (path.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          // const paramId = path.substring(path.lastIndexOf("-") + 1)
          const paramId = path.split("/product-")[1];
          console.log(paramId);
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
