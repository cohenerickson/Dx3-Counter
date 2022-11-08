import express from "express";
import expressWs, { Application } from "express-ws";
import { v4 as uuidv4 } from "uuid";
import { WebSocket } from "ws";
import { addCount, getCount } from "./db";

const app: Application = express() as unknown as Application;
expressWs(app);

const connections: Map<string, WebSocket> = new Map();

app.use(express.static("public"));

app.post("/count", (req, res) => {
  console.log("new count");
  addCount();
  res.send("OK");

  connections.forEach((ws) => {
    try {
      ws.send(getCount().toString());
    } catch {}
  });
});

app.ws("/ws", (ws, req) => {
  const id = uuidv4();
  connections.set(id, ws);

  ws.on("close", () => {
    connections.delete(id);
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started on port", process.env.PORT || 8080);
});
