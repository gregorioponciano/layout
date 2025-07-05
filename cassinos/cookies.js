function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (rc) {
    rc.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }
  return list;
}

function setCookie(res, name, value) {
  res.setHeader('Set-Cookie', `${name}=${value}; HttpOnly; Path=/`);
}

function clearCookie(res, name) {
  res.setHeader('Set-Cookie', `${name}=; Max-Age=0; Path=/`);
}

module.exports = { parseCookies, setCookie, clearCookie };
