# Gincanablox

Site de uso interno para a gincana no Roblox (Time Disco x Time Lango).
Sem login: quem tiver o link vê e edita os dados, e as mudanças aparecem para os outros em poucos segundos.

## Arquivos
- `index.html` — o site inteiro (HTML, CSS e JS puros)
- `api/state.js` — função do Vercel que salva e lê os dados no banco
- `package.json` — só identifica o projeto (não há dependências nem build)

## Como publicar
1. **GitHub:** crie um repositório e envie estes arquivos mantendo a pasta `api/`.
2. **Vercel:** em *Add New → Project*, importe o repositório. Framework: *Other*. Não precisa de build. Clique em *Deploy*.
3. **Banco de dados:** no projeto do Vercel, abra *Storage*, crie um banco **Upstash Redis** (pelo Marketplace) e conecte ao projeto. Isso cria as variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN` sozinho.
4. Faça um novo *Redeploy* para as variáveis valerem. Pronto: é só mandar o link.

Se o banco não estiver configurado, o site ainda abre e funciona só no navegador de cada pessoa (aviso "só neste navegador" no topo).

## Atenção
Qualquer pessoa com o link pode editar e apagar tudo. Não divulgue o link fora do grupo.
