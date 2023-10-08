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
