const bcrypt = require("bcrypt");
const db = require("./db");
const qs = require("querystring");
const { setCookie } = require("./cookies");

function parseBody(req, callback) {
  let body = "";
  req.on("data", chunk => body += chunk.toString());
  req.on("end", () => callback(qs.parse(body)));
}

function routes(req, res) {
  if (req.method === "POST" && req.url === "/register") {
    parseBody(req, async (data) => {
      const { phone, password, cpf, email, birth_date } = data;
      if (!phone || !password || !cpf || !email || !birth_date)
        return res.end("Preencha todos os campos!");

      const hash = await bcrypt.hash(password, 10);

      const query = `
        INSERT INTO users (phone_number, password_hash, cpf, email, birth_date, balance)
        VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(query, [phone, hash, cpf, email, birth_date, 30.00], (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY")
            return res.end("Telefone, CPF ou e-mail já está em uso.");
          return res.end("Erro ao cadastrar.");
        }
        res.end("Cadastro realizado com sucesso!");
      });
    });

  } else if (req.method === "POST" && req.url === "/login") {
    parseBody(req, (data) => {
      const { phone, password } = data;
      if (!phone || !password) return res.end("Preencha todos os campos!");

      db.query("SELECT * FROM users WHERE phone_number = ?", [phone], async (err, results) => {
        if (err || results.length === 0) return res.end("Usuário não encontrado");

        const user = results[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.end("Senha incorreta");

        // Armazenar ID do usuário em cookie
        setCookie(res, "user_id", user.id);
        res.writeHead(302, { Location: "/pages/logado.html" });
        res.end();
      });
    });

  } else {
    res.statusCode = 404;
    res.end("Rota inválida.");
  }
}

module.exports = routes;
