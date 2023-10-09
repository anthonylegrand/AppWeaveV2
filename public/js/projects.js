const applications_list = document.getElementById("applications-list");
function fetchProjects() {
  for (const child of applications_list.querySelectorAll("a")) {
    if (!child.querySelector("article#create-new")) child.remove();
  }

  fetch("/project/list", {
    headers: { Authentication: document.cookie.replace("authorization=", "") },
  })
    .then((res) => res.json())
    .then((json) => {
      json.map((app) => {
        const a = document.createElement("a");
        const element = document.createElement("article");
        const element_div = document.createElement("div");
        const element_div_h4 = document.createElement("h4");
        const element_label = document.createElement("label");
        const element_lore = document.createElement("lore");

        a.href = "/dashboard?projectUuid=" + app.uuid;
        a.setAttribute("projectUuid", app.uuid);
        element_div_h4.innerHTML = app.displayName
          .split(" ")
          .map((_) => _[0].toUpperCase())
          .join("");
        element_label.innerHTML = app.displayName;
        element_lore.innerHTML = formatRelativeDate(app.updatedAt);

        element_div.appendChild(element_div_h4);
        element.appendChild(element_div);
        element.appendChild(element_label);
        element.appendChild(element_lore);
        a.appendChild(element);
        applications_list.appendChild(a);

        addElementsHoverArticle(element_div);
      });
    });
}

fetchProjects();

// Filter project's by name with input #applications_filter
document
  .getElementById("applications_filter")
  .addEventListener("input", (e) => {
    Array.from(applications_list.children).map((el) => {
      if (
        !(el.querySelector("label")?.innerHTML?.toLowerCase() || "").includes(
          e.target.value.toLowerCase()
        )
      )
        el.style.display = "none";
      else el.style.display = "initial";
    });
  });

const create_new = document.getElementById("create-new");
const create_new_input = create_new.querySelector("input");
const create_new_button = create_new.querySelector("button");

// Hide "New Project" input
document.addEventListener("click", (e) => {
  if (e.target !== create_new.querySelector(e.target.tagName)) {
    create_new.classList = "";
    create_new_input.value = "";
  }
});
// Show "New Project" input
create_new.addEventListener("click", (e) => {
  if (["INPUT", "BUTTON"].includes(e.target.tagName)) return;
  create_new.classList = "edited";
  create_new.querySelector("input").focus();
});
// Put char in input
create_new_input.addEventListener("input", () => {
  if (create_new_input.value) create_new_button.classList = "show";
  else create_new_button.classList = "";
});
// Click on btn
create_new_button.addEventListener("click", () => {
  fetch("/project", {
    method: "POST",
    body: JSON.stringify({ displayName: create_new_input.value }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    create_new.classList = "";
    create_new_input.value = "";
    fetchProjects();
  });
});

function addElementsHoverArticle(element) {
  const projectElement = element.parentNode.parentNode;

  element.addEventListener("mouseenter", () => {
    const ul = document.createElement("ul");
    ul.id = "hover-options";

    const remove = document.createElement("li");
    const rename = document.createElement("li");
    remove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="18px" viewBox="0 0 24 24" fill="none"><path d="M18.3282 8.32837L15.8939 5.89405C14.7058 4.706 14.1118 4.11198 13.4268 3.88941C12.8243 3.69364 12.1752 3.69364 11.5727 3.88941C10.8877 4.11198 10.2937 4.706 9.10564 5.89405L7.49975 7.49994M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    rename.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="18px" viewBox="0 0 24 24" fill="none"><path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    ul.appendChild(remove);
    ul.appendChild(rename);

    remove.addEventListener("click", (e) => {
      e.preventDefault();
      createModal("Rename project", "");
      console.log(projectElement.getAttribute("projectUuid"), "remove");
    });
    rename.addEventListener("click", (e) => {
      e.preventDefault();
      createModal("Delete project", "");
      console.log(projectElement.getAttribute("projectUuid"), "rename");
    });

    element.appendChild(ul);
  });

  element.addEventListener("mouseleave", () => {
    const addedElement = document.getElementById("hover-options");
    if (addedElement) element.removeChild(addedElement);
  });
}
