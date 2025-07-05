const { clearCookie } = require("./cookies");

function logout(req, res) {
  if (req.url === "/logout") {
    clearCookie(res, "user_id");
    res.writeHead(302, { Location: "/public/inicio.html" });
    res.end();
  }
}

module.exports = logout;
