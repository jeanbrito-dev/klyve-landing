# Klyve — Site institucional

Sistema financeiro visual para o seu negócio.

---

## Estrutura do projeto

```
klyve-site/
├── index.html          → Página principal
├── css/
│   └── style.css       → Todos os estilos (design system completo)
├── js/
│   └── script.js       → Interações, scroll-reveal, animações, links WhatsApp
└── assets/
    └── images/
        ├── logo.png            → Substitua com logo oficial (opcional)
        ├── dashboard-mockup.png → Substitua com print real do sistema (opcional)
        └── favicon.png         → Substitua com favicon oficial (opcional)
```

---

## Como usar

1. **Abrir localmente**: Abra `index.html` diretamente no navegador — funciona sem servidor.
2. **Publicar**: Faça upload dos arquivos para qualquer hospedagem (Hostinger, Vercel, Netlify, GitHub Pages etc.).
3. **WhatsApp**: O número está configurado no `script.js` na variável `phone`. Para alterar:
   ```js
   const phone = '5512982942731'; // DDD + número, sem espaços ou traços
   ```
4. **Instagram**: Está no `index.html` no link do canal Instagram — atualize se necessário:
   ```html
   href="https://instagram.com/klyve.oficial"
   ```

---

## Customizações rápidas

### Trocar cores principais
Em `css/style.css`, edite as variáveis no `:root`:
```css
--blue:  #1A56DB;   /* Azul principal */
--green: #16A34A;   /* Verde financeiro */
```

### Adicionar logo real
Substitua o favicon SVG inline no `<head>` do `index.html`, ou adicione uma `<img>` na `.nav-logo`.

### Alterar textos
Todos os textos estão diretamente no `index.html`, bem organizados por seção.

---

## Seções do site

| Seção | Descrição |
|---|---|
| **Hero** | Título forte + dashboard visual animado |
| **Features** | 6 funcionalidades em grid de cards |
| **Como funciona** | 3 passos + painel visual detalhado |
| **Resultado real** | Seção escura com métricas de impacto |
| **Contato** | WhatsApp (principal) + Instagram (secundário) |
| **Footer** | Links + assinatura |

---

## Tecnologias

- HTML5 semântico
- CSS3 puro (variáveis, grid, flexbox, animações)
- JavaScript vanilla (sem dependências)
- Google Fonts: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) + [Fraunces](https://fonts.google.com/specimen/Fraunces)

---

© 2025 Klyve