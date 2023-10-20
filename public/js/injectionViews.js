import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://localhost:81/", {
  auth: {
    token: "123",
  },
});

socket.on("connect", () => {
  socket.on("data", () => {
    /* ... */
  });
});

Array.from(document.querySelectorAll("[data-event]")).map((element) => {
  if (element.dataset.event)
    element.addEventListener("click", (ev) => {
      console.log("click", ev.target.dataset.event);
    });
});

Array.from(document.querySelectorAll("[data-target]")).map((element) => {
  if (!element.dataset.target) return;
  console.log("AskEvent", element.dataset.target);
  const responseData = { User: "BowEnder", coins: 8 };

  Object.keys(responseData).map((dataKey) => {
    element.innerHTML = element.innerHTML.replace(
      "%" + dataKey + "%",
      responseData[dataKey]
    );
  });
});
