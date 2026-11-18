// Função do Vercel: guarda os dados do Gincanablox num Redis (Upstash).
// Sem login: quem tiver o link do site consegue ler e editar.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const C = ["players", "games", "up"];

async function redis(cmds) {
  const r = await fetch(URL_ + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
  });
  if (!r.ok) throw new Error("redis " + r.status);
  return r.json();
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!URL_ || !TOKEN) return res.status(500).json({ error: "banco não configurado" });
  try {
    if (req.method === "GET") {
      const out = await redis(C.map(c => ["HGETALL", "gb:" + c]));
      const data = {};
      C.forEach((c, i) => {
        const a = out[i].result || [], list = [];
        for (let j = 0; j < a.length; j += 2) { try { list.push(JSON.parse(a[j + 1])); } catch (e) {} }
        data[c] = list;
      });
      return res.json(data);
    }
    if (req.method === "POST") {
      const b = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const cmds = [];
      (b.set || []).forEach(([c, d]) => { if (C.includes(c) && d && d.id) cmds.push(["HSET", "gb:" + c, String(d.id), JSON.stringify(d)]); });
      (b.del || []).forEach(([c, id]) => { if (C.includes(c)) cmds.push(["HDEL", "gb:" + c, String(id)]); });
      if (cmds.length) await redis(cmds);
      return res.json({ ok: true });
    }
    res.setHeader("Allow", "GET, POST");
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: "falha no banco" });
  }
};
