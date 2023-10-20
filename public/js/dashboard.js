const urlParams = new URLSearchParams(window.location.search);

fetch("/project/" + urlParams.get("projectUuid"), {
  headers: { Authentication: document.cookie.replace("authorization=", "") },
})
  .then((res) => res.json())
  .then((json) => {
    console.log(json);

    document.getElementById("header-project-name").innerHTML =
      json.displayName || "";
  });
