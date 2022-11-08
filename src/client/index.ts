window.addEventListener("click", () => {
  fetch("/count", { method: "POST" });
});

function connectWebsocket(): void {
  const ws = new WebSocket(location.origin.replace(/^http/, "ws") + "/ws", ["ws"]);
  alert("ws init");

  ws.onopen = () => {
    alert("ws open");
  };

  ws.onclose = () => {
    // connectWebsocket();
  };

  ws.onmessage = (event) => {
    document.getElementById("count")!.innerText = event.data;
  };

  ws.onerror = (event) => {
    console.error(event);
  };
}

connectWebsocket();
