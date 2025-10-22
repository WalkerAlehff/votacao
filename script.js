// Estado da votação
let votos = {
    sabarrab: 0,
    espirito: 0
};

// Senha correta
const SENHA_CORRETA = 'movimentoinri';

// Variável para armazenar qual ação está pendente
let acaoPendente = null;

// Carregar votos do localStorage se existirem
function carregarVotos() {
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
        votos = JSON.parse(votosArmazenados);
        atualizarInterface();
    }
}

// Salvar votos no localStorage
function salvarVotos() {
    localStorage.setItem('votos', JSON.stringify(votos));
}

// Função para votar
function votar(candidato) {
    if (candidato === 'sabarrab') {
        votos.sabarrab++;
        // Adicionar animação ao botão
        document.getElementById('sabarrab-btn').classList.add('vote-animation');
        setTimeout(() => {
            document.getElementById('sabarrab-btn').classList.remove('vote-animation');
        }, 300);
    } else if (candidato === 'espirito') {
        votos.espirito++;
        // Adicionar animação ao botão
        document.getElementById('espirito-btn').classList.add('vote-animation');
        setTimeout(() => {
            document.getElementById('espirito-btn').classList.remove('vote-animation');
        }, 300);
    }
    
    salvarVotos();
    atualizarInterface();
}

// Função para atualizar a interface
function atualizarInterface() {
    const totalVotos = votos.sabarrab + votos.espirito;
    
    // Calcular porcentagens
    let porcentagemSabarrab = 0;
    let porcentagemEspirito = 0;
    
    if (totalVotos > 0) {
        porcentagemSabarrab = ((votos.sabarrab / totalVotos) * 100).toFixed(1);
        porcentagemEspirito = ((votos.espirito / totalVotos) * 100).toFixed(1);
    }
    
    // Atualizar elementos da interface
    document.getElementById('sabarrab-percentage').textContent = porcentagemSabarrab + '%';
    document.getElementById('espirito-percentage').textContent = porcentagemEspirito + '%';
    
    document.getElementById('sabarrab-count').textContent = votos.sabarrab + ' voto' + (votos.sabarrab !== 1 ? 's' : '');
    document.getElementById('espirito-count').textContent = votos.espirito + ' voto' + (votos.espirito !== 1 ? 's' : '');
    
    document.getElementById('total-votes').textContent = totalVotos;
    
    // Atualizar barras de progresso
    document.getElementById('sabarrab-bar').style.width = porcentagemSabarrab + '%';
    document.getElementById('espirito-bar').style.width = porcentagemEspirito + '%';
}

// Função para reiniciar votação
function reiniciarVotacao() {
    acaoPendente = 'reiniciar';
    abrirModalSenha();
}

// Função para executar reinicialização após senha correta
function executarReinicializacao() {
    votos = {
        sabarrab: 0,
        espirito: 0
    };
    salvarVotos();
    atualizarInterface();
    
    // Feedback visual
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.textContent = 'Votação Reiniciada!';
    resetBtn.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
        resetBtn.textContent = 'Reiniciar Votação';
        resetBtn.style.backgroundColor = '#dc3545';
    }, 2000);
}

// Função para encerrar votação
function encerrarVotacao() {
    acaoPendente = 'encerrar';
    abrirModalSenha();
}

// Função para executar encerramento após senha correta
function executarEncerramento() {
    console.log('Função executarEncerramento chamada!');
    let totalVotos = votos.sabarrab + votos.espirito;
    console.log('Total de votos atual:', totalVotos);
    
    // Garantir mínimo de 100.000 votos
    const votosMinimos = 100000;
    
    if (totalVotos < votosMinimos) {
        // Gerar uma porcentagem aleatória entre 71% e 85% para Sabarrab
        const porcentagemVitoria = Math.random() * (0.85 - 0.71) + 0.71;
        votos.sabarrab = Math.round(votosMinimos * porcentagemVitoria);
        votos.espirito = votosMinimos - votos.sabarrab;
        totalVotos = votosMinimos;
    } else {
        // Se já tem votos suficientes, ajustar para garantir que Sabarrab ganhe com 70%+
        const porcentagemAtual = votos.sabarrab / totalVotos;
        
        if (porcentagemAtual < 0.71) {
            // Ajustar votos para garantir vitória de Sabarrab
            const porcentagemVitoria = Math.random() * (0.85 - 0.71) + 0.71;
            votos.sabarrab = Math.round(totalVotos * porcentagemVitoria);
            votos.espirito = totalVotos - votos.sabarrab;
        }
    }
    
    // Salvar votos ajustados
    salvarVotos();
    
    // Atualizar a interface principal primeiro
    atualizarInterface();
    
    // Calcular porcentagem final
    const totalFinal = votos.sabarrab + votos.espirito;
    const porcentagemFinal = ((votos.sabarrab / totalFinal) * 100).toFixed(1);
    
    // Atualizar elementos da tela de vitória
    document.getElementById('winner-percentage').textContent = porcentagemFinal + '%';
    document.getElementById('winner-votes').textContent = votos.sabarrab + ' de ' + totalFinal + ' votos';
    
    // Pequeno delay para garantir que tudo foi atualizado
    setTimeout(() => {
        // Mostrar tela de vitória
        document.getElementById('victory-screen').style.display = 'flex';
        
        // Criar confete
        criarConfete();
    }, 100);
}

// Função para criar efeito de confete
function criarConfete() {
    const confettiContainer = document.getElementById('confetti-container');
    const cores = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4', '#00ced1', '#ffd700'];
    
    // Limpar confete anterior
    confettiContainer.innerHTML = '';
    
    // Criar múltiplas peças de confete
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Função para reiniciar da tela de vitória
function reiniciarDaVitoria() {
    acaoPendente = 'reiniciarVitoria';
    abrirModalSenha();
}

// Função para executar reinicialização da vitória após senha correta
function executarReiniciarVitoria() {
    // Esconder tela de vitória
    document.getElementById('victory-screen').style.display = 'none';
    
    // Reiniciar votos
    votos = {
        sabarrab: 0,
        espirito: 0
    };
    salvarVotos();
    atualizarInterface();
}

// Função para abrir modal de senha
function abrirModalSenha() {
    document.getElementById('password-modal').style.display = 'flex';
    document.getElementById('password-input').value = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('password-input').focus();
}

// Função para fechar modal de senha
function fecharModalSenha() {
    document.getElementById('password-modal').style.display = 'none';
    document.getElementById('password-input').value = '';
    document.getElementById('password-error').textContent = '';
    acaoPendente = null;
}

// Função para verificar senha
function verificarSenha() {
    const senhaDigitada = document.getElementById('password-input').value;
    
    console.log('Verificando senha:', senhaDigitada);
    console.log('Ação pendente:', acaoPendente);
    
    if (senhaDigitada === SENHA_CORRETA) {
        console.log('Senha correta! Executando ação:', acaoPendente);
        
        // Guardar a ação antes de fechar o modal
        const acaoParaExecutar = acaoPendente;
        
        fecharModalSenha();
        
        // Executar a ação pendente após fechar o modal
        setTimeout(() => {
            switch(acaoParaExecutar) {
                case 'reiniciar':
                    executarReinicializacao();
                    break;
                case 'encerrar':
                    console.log('Executando encerramento...');
                    executarEncerramento();
                    break;
                case 'reiniciarVitoria':
                    executarReiniciarVitoria();
                    break;
            }
        }, 50);
    } else {
        document.getElementById('password-error').textContent = 'Senha incorreta!';
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').focus();
    }
}

// Carregar votos ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarVotos();
    
    // Adicionar evento de Enter no campo de senha
    document.getElementById('password-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verificarSenha();
        }
    });
    
    // Fechar modal ao clicar fora dele
    document.getElementById('password-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('password-modal')) {
            fecharModalSenha();
        }
    });
});