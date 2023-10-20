const urlParams = new URLSearchParams(window.location.search);

fetch("/project/" + urlParams.get("projectUuid"), {
  headers: { Authentication: document.cookie.replace("authorization=", "") },
})
  .then((res) => res.json())
  .then((json) => {
    console.log(json);

    document.getElementById("mobile-mockup").src =
      "http://localhost:81/view/" + json.uuid;

    document.getElementById("header-project-name").innerHTML =
      json.displayName || "";
  });
