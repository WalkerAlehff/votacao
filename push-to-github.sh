#!/bin/bash

echo "🚀 Enviando para o GitHub..."
echo ""

# Tentar fazer push
if git push -u origin main 2>&1; then
    echo ""
    echo "✅ Sucesso! Seu site foi enviado para o GitHub!"
    echo "🌐 Acesse: https://github.com/WalkerAlehff/votacao"
    echo ""
    echo "📄 Para ativar o GitHub Pages:"
    echo "1. Vá para: https://github.com/WalkerAlehff/votacao/settings/pages"
    echo "2. Em 'Source', selecione 'Deploy from a branch'"
    echo "3. Escolha 'main' e '/ (root)'"
    echo "4. Clique em 'Save'"
    echo "5. Seu site estará disponível em: https://WalkerAlehff.github.io/votacao"
else
    echo ""
    echo "❌ Erro ao fazer push. Possíveis causas:"
    echo ""
    echo "1. O repositório ainda não foi criado no GitHub"
    echo "   → Crie em: https://github.com/new"
    echo ""
    echo "2. Você precisa se autenticar"
    echo "   → O GitHub vai pedir seu usuário e senha/token"
    echo ""
    echo "3. O repositório já existe com conteúdo"
    echo "   → Delete o repositório e crie novamente vazio"
fi
