# Instruções para Push no GitHub

O código está pronto para ser enviado! Como o push requer autenticação, siga um dos métodos abaixo:

## Método 1: Usando Personal Access Token (Recomendado)

1. **Criar um Personal Access Token:**
   - Acesse: https://github.com/settings/tokens
   - Clique em "Generate new token" → "Generate new token (classic)"
   - Nome: "votacao-push" (ou qualquer nome)
   - Marque: `repo` (acesso completo aos repositórios)
   - Clique em "Generate token"
   - **COPIE O TOKEN** (só aparece uma vez!)

2. **Fazer o push:**
   ```bash
   cd /Users/alehffeinstein/sitevotation
   git push https://WalkerAlehff:SEU_TOKEN_AQUI@github.com/WalkerAlehff/votacao.git main
   ```
   (Substitua SEU_TOKEN_AQUI pelo token copiado)

## Método 2: Usando SSH (Configuração única)

1. **Gerar chave SSH (se não tiver):**
   ```bash
   ssh-keygen -t ed25519 -C "seu-email@example.com"
   ```

2. **Adicionar chave ao GitHub:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   - Copie a saída
   - Vá para: https://github.com/settings/keys
   - "New SSH key" → Cole a chave → "Add SSH key"

3. **Mudar remote para SSH e fazer push:**
   ```bash
   cd /Users/alehffeinstein/sitevotation
   git remote set-url origin git@github.com:WalkerAlehff/votacao.git
   git push -u origin main
   ```

## Método 3: Push Manual Simples

Execute este comando e forneça suas credenciais quando solicitado:
```bash
cd /Users/alehffeinstein/sitevotation
git push -u origin main
```

**Nota:** O GitHub não aceita mais senha, você precisa usar um Personal Access Token no lugar da senha.

---

## Após o Push Bem-Sucedido

1. **Ver o código:** https://github.com/WalkerAlehff/votacao

2. **Ativar GitHub Pages:**
   - Acesse: https://github.com/WalkerAlehff/votacao/settings/pages
   - Source: "Deploy from a branch"
   - Branch: "main" / "/ (root)"
   - Save
   - Site disponível em: https://WalkerAlehff.github.io/votacao

