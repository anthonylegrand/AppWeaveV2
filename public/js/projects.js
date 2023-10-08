function fetchProjects() {
  const applications_list = document.getElementById("applications-list");

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
      });
    });
}

fetchProjects();

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
