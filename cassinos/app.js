const http = require("http");
const fs = require("fs");
const path = require("path");
const routes = require("./routes");
const logout = require("./logout");

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url);

  // 🟢 Roteamento de arquivos estáticos
  if (req.method === "GET" && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript"
    }[ext] || "text/plain";

    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);

  // 🟢 Rota de logout
  } else if (req.url === "/logout") {
    logout(req, res);

  // 🟢 Rotas de login/cadastro
  } else if (req.url === "/login" || req.url === "/register") {
    routes(req, res);

  // 🔴 Qualquer outra rota
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Página não encontrada");
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/public/inicio.html");
});
