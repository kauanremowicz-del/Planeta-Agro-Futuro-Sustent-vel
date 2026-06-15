// Atributos base da simulação ecológica
let status = {
    producao: 50,
    agua: 60,
    biodiversidade: 50,
    tecnologia: 50
};

let crescimento = 0; 
let droneScans = 0;

const climas = ["Ensolarado ☀️", "Nublado ☁️", "Chuva Leve 🌧️", "Seca Severa 🌵"];
let climaAtual = climas[0];

// ENGINE DE TEMPO REAL: Atualização automatizada do ecossistema a cada 1.5 segundos
setInterval(() => {
    // 1. Metabolismo do Solo: Consumo contínuo de água pelo crescimento das culturas
    if (status.agua > 10) {
        status.agua -= 2; 
        crescimento += 1.5; 
    } else {
        status.producao = Math.max(0, status.producao - 3); // Estresse hídrico reduz produtividade
        crescimento += 0.2; 
    }

    // 2. Vulnerabilidade do Ecossistema: Baixa biodiversidade desencadeia pragas biológicas
    if (status.biodiversidade < 30) {
        status.producao = Math.max(0, status.producao - 2);
        document.getElementById('ia-mensagem').innerText = "⚠️ ALERTA DA IA: Biodiversidade crítica gerou quebra de barreiras naturais! Pragas detectadas.";
    }

    // 3. Flutuações Dinâmicas de Clima (Mutação Ambiental Estocástica)
    if (Math.random() > 0.85) {
        climaAtual = climas[Math.floor(Math.random() * climas.length)];
        if(climaAtual === "Chuva Leve 🌧️") status.agua += 20;
        if(climaAtual === "Seca Severa 🌵") status.agua = Math.max(0, status.agua - 15);
    }

    // 4. Ciclo de Colheita Concluído
    if (crescimento >= 100) {
        crescimento = 0;
        status.producao += 30; // Bônus de rendimento de safra estável
        document.getElementById('ia-mensagem').innerText = "🎉 Ciclo de cultivo concluído! Safra recolhida e solo reiniciado para nova rotação.";
    }

    atualizarPainel();
}, 1500);

// Sincronização dos Atributos com o DOM (Interface Visual)
function atualizarPainel() {
    document.getElementById('val-prod').innerText = status.producao;
    document.getElementById('val-agua').innerText = status.agua;
    document.getElementById('val-biod').innerText = status.biodiversidade;
    document.getElementById('val-tec').innerText = status.tecnologia;
    
    document.getElementById('txt-clima').innerText = climaAtual;
    document.getElementById('barra-crescimento').style.width = `${crescimento}%`;

    // Categorização das Fases Fenológicas da Plantação
    let fase = "Semeado 🔬";
    if (crescimento > 25 && crescimento <= 60) fase = "Vegetativo 🌱";
    if (crescimento > 60 && crescimento <= 90) fase = "Floração 🌸";
    if (crescimento > 90) fase = "Pronto para Colheita 🌾";
    document.getElementById('txt-fase').innerText = fase;

    document.getElementById('val-drone').innerText = droneScans > 0 ? `Ativo (${droneScans})` : "Inativo";

    // Cálculo da Métrica Unificada de Sustentabilidade
    let pontos = status.producao + status.agua + status.biodiversidade + status.tecnologia;
    document.getElementById('txt-pontos').innerText = pontos;

    // Escalonamento de Rankings
    let ranking = "Iniciante";
    if (pontos >= 200 && pontos < 350) ranking = "Produtor Consciente 🌾";
    if (pontos >= 350 && pontos < 500) ranking = "Líder Sustentável 🌳";
    if (pontos >= 540) ranking = "Campeão Mundial 🏆";
    document.getElementById('txt-ranking').innerText = ranking;

    // Validação de Requisitos Mínimos (Metas Globais)
    let m1 = status.producao >= 150;
    let m2 = status.agua >= 120;
    let m3 = status.biodiversidade >= 120;
    let m4 = status.tecnologia >= 150;

    document.getElementById('m1').innerText = m1 ? "✅ Produtividade 150+" : "⬜ Produtividade 150+";
    document.getElementById('m2').innerText = m2 ? "✅ Umidade Solo 120+" : "⬜ Umidade Solo 120+";
    document.getElementById('m3').innerText = m3 ? "✅ Biodiversidade 120+" : "⬜ Biodiversidade 120+";
    document.getElementById('m4').innerText = m4 ? "✅ Tecnologia 150+" : "⬜ Tecnologia 150+";

    // Desbloqueio do Certificado Ambiental
    if (m1 && m2 && m3 && m4) {
        document.getElementById('btn-cert').disabled = false;
    }
}

// Intervenções Manuais de Manejo (Comandos do Operador)
function intervir(tipo) {
    if (tipo === 'rotacao') {
        status.producao += 20;
        status.biodiversidade += 15;
        document.getElementById('ia-mensagem').innerText = "🤖 Rotação de culturas aplicada: Solo enriquecido e biota estruturada.";
    } else if (tipo === 'irrigacao') {
        status.agua += 30;
        status.tecnologia += 5;
        document.getElementById('ia-mensagem').innerText = "🤖 Gotejamento inteligente acionado: Umidade do solo restaurada com precisão.";
    } else if (tipo === 'solar') {
        status.tecnologia += 25;
        status.biodiversidade -= 5;
        document.getElementById('ia-mensagem').innerText = "🤖 Matriz fotovoltaica ativada: Sensores e automações energizados via rede limpa.";
    } else if (tipo === 'preservar') {
        status.biodiversidade += 35;
        status.agua += 10;
        document.getElementById('ia-mensagem').innerText = "🤖 Áreas de Preservação Expandidas: Polinizadores nativos retornando ao talhão.";
    } else if (tipo === 'drone') {
        droneScans++;
        status.tecnologia += 15;
        status.producao += 10;
        document.getElementById('ia-mensagem').innerText = "🤖🛰️ Varredura infravermelha do drone gerou relatórios de estresse biótico e térmico.";
    }
    atualizarPainel();
}

// Chaveamento Dinâmico de Turno (Modo Claro / Modo Escuro)
function alternarTema() {
    const html = document.documentElement;
    const botao = document.getElementById('toggle-tema');
    if (html.getAttribute('data-tema') === 'light') {
        html.removeAttribute('data-tema');
        botao.innerText = "🌙 Modo Noite";
    } else {
        html.setAttribute('data-tema', 'light');
        botao.innerText = "☀️ Modo Dia";
    }
}

// Renderização do Certificado de Sustentabilidade
function gerarCertificado() {
    document.getElementById('certificado').style.display = 'block';
    document.getElementById('certificado').scrollIntoView({ behavior: 'smooth' });
}