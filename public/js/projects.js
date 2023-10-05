fetch("/project/list", {
  headers: { Authentication: document.cookie.replace("authorization=", "") },
})
  .then((res) => res.json())
  .then((json) => {
    const applications_list = document.getElementById("applications-list");

    json.map((app) => {
      console.log(app);
      const element = document.createElement("article");
      const element_div = document.createElement("div");
      const element_div_h4 = document.createElement("h4");
      const element_label = document.createElement("label");
      const element_lore = document.createElement("lore");

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
      applications_list.appendChild(element);
    });
  });

fetch("/user/profil", {
  headers: { Authentication: document.cookie.replace("authorization=", "") },
})
  .then((res) => res.json())
  .then((json) => {
    const header_displayName = json.anonymous
      ? "No Authentificated"
      : json.email;
    document.getElementById("header-user-email").innerHTML =
      "⇣ " + header_displayName;
    document.getElementById("header-fluxUsage").innerHTML =
      "Flux usage: " + json.fluxUsage;
  });

function formatRelativeDate(inputDate) {
  const currentDate = new Date();
  const timeDifference = currentDate - new Date(inputDate);

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months >= 1) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days >= 1) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours >= 1) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes >= 1) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
}
