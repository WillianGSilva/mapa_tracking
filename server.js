const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

const N8N_BASE = "http://204.216.191.191:5678/webhook";

app.use(express.static("."));

app.get("/api/:endpoint", async (req, res) => {
  try {
    const endpoint = req.params.endpoint;
    const query = new URLSearchParams(req.query).toString();

    const url = `${N8N_BASE}/${endpoint}${query ? `?${query}` : ""}`;

    const response = await fetch(url);
    const data = await response.text();

    res.setHeader("Content-Type", response.headers.get("content-type") || "application/json");
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});