# Gincanablox

Site de uso interno para a gincana no Roblox (Time Disco x Time Lango).

Os dados ficam salvos no navegador de quem usa (localStorage). Para levar os dados de um lugar para outro, use os botões **Exportar** e **Importar** no topo da página: o arquivo `.json` exportado do artefato do Claude também funciona aqui.

## Arquivos
- `index.html` — o site inteiro (HTML, CSS e JS puros, sem dependências nem build)
- `api/state.js` — não é usado por esta versão (era da sincronização ao vivo)
- `package.json` — só identifica o projeto

## Como publicar
1. **GitHub:** mantenha estes arquivos no repositório.
2. **Vercel:** importe o repositório como novo projeto, framework *Other*, sem build, e clique em *Deploy*. Não precisa de banco de dados.

## Exportar e importar
- **Exportar** baixa `gincanablox-AAAA-MM-DD.json` com participantes, jogos, rodadas e próximos jogos.
- **Importar** lê um arquivo desses e **substitui todos os dados atuais** (pede confirmação antes).
