#!/bin/bash

echo "📦 Configuração do Repositório GitHub"
echo "===================================="
echo ""
echo "Antes de continuar, você precisa:"
echo "1. Acessar https://github.com/new"
echo "2. Criar um novo repositório chamado 'votacao'"
echo "3. NÃO inicialize com README, .gitignore ou licença"
echo ""
read -p "Já criou o repositório? (s/n): " resposta

if [ "$resposta" != "s" ]; then
    echo "Por favor, crie o repositório primeiro e execute este script novamente."
    exit 1
fi

echo ""
read -p "Digite seu nome de usuário do GitHub: " username

echo ""
echo "Configurando o repositório remoto..."
git remote add origin https://github.com/$username/votacao.git

echo "Fazendo push para o GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Pronto! Seu site foi enviado para o GitHub!"
echo "🌐 Acesse: https://github.com/$username/votacao"
echo ""
echo "Para hospedar o site no GitHub Pages:"
echo "1. Vá para Settings > Pages no seu repositório"
echo "2. Em 'Source', selecione 'Deploy from a branch'"
echo "3. Escolha 'main' e '/ (root)'"
echo "4. Clique em 'Save'"
echo "5. Aguarde alguns minutos e acesse: https://$username.github.io/votacao"
