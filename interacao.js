//window.document.getElementById('avancar').value = `\u{27A1}`;
//window.document.getElementById('avancar').style.fontWeight = `900`;
//window.document.getElementById('avancar').style.color = `rgb(250, 0, 0)`;

//window.document.getElementById('voltar').value = `\u{2B05}`;



var total_dias = 0;
var primeiro_dia_semana = 0;
var mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
var data_atu = new Date(); //data atual, não alterado
var data_nav = new Date(); //data de navegação, atualizar as telas
data_nav.setDate(1);

var calendario = window.document.getElementById('calendario');
var cabecalho = window.document.querySelector('table#calendario caption#cabecalho h1');
var corpo = window.document.querySelector('table tbody#corpo');

var pesquisa = window.document.querySelector('section div#pesquisa');

function atualizar(){
    corpo.innerHTML = '';
    let dia = 1;
    let tot_linhas;
    let total_de_dias = t_dias();

    //Cabeçalho
    cabecalho.innerText = `${mes[data_nav.getMonth()]} de ${data_nav.getFullYear()}`;

    //Corpo
    //Define quantidade de linhas
    if(data_nav.getDay() == 0 && total_de_dias == 28) tot_linhas = 4;
    else if((data_nav.getDay() >= 5 && total_de_dias == 31) || (data_nav.getDay() == 6 && total_de_dias == 30)) tot_linhas = 6;
    else tot_linhas = 5;
    
    //preenche o corpo
    for(let l_contador = 1; l_contador <= tot_linhas; l_contador++){
        let linha = window.document.createElement('tr');
        for(let c_contador = 0; c_contador < 7; c_contador++){
            let coluna = window.document.createElement('td');

            if((l_contador == 1 && c_contador >= data_nav.getDay()) || (l_contador > 1 && dia <= total_de_dias))
            {
                coluna.innerText = `${dia}`;
                dia++;
            }  
            linha.appendChild(coluna);
        }
        corpo.appendChild(linha);
    }    
}

function a_mes(){
    window.document.getElementById('avancar').blur();
    if(data_nav.getMonth() < 11) data_nav.setMonth(data_nav.getMonth() + 1);
    else {
        data_nav.setMonth(0);
        data_nav.setFullYear(data_nav.getFullYear() + 1);
    }
    atualizar();
}

function v_mes(){
    window.document.getElementById('voltar').blur();
    if(data_nav.getMonth() > 0) data_nav.setMonth(data_nav.getMonth() - 1);
    else{
        data_nav.setMonth(11);
        data_nav.setFullYear(data_nav.getFullYear() - 1);
    }
    atualizar();
}

function p_mes(){
    data_nav.setMonth(Number.parseInt(window.document.getElementById('mes').value - 1));
    data_nav.setFullYear(Number.parseInt(window.document.getElementById('ano').value))
    
    pesquisa.style = 'display: none;';
    calendario.style = 'opacity: 1;';

    atualizar();
    
    console.log(`o mês é ${data_nav.getMonth()} e o ano é ${data_nav.getFullYear()}`);
    
    enable_botoes_calendario(true);
}

// Métodos auxiliares

function t_dias(){
    if((data_nav.getMonth() % 2 == 0 && data_nav.getMonth() < 7) || (data_nav.getMonth() % 2 == 1 && data_nav.getMonth() >= 7)) return 31;
    else if(data_nav.getMonth() != 1) return 30;
    else{
        if(data_nav.getFullYear() % 4 == 0) return 29;
        else return 28;
    }
} 

function habilitar_pesquisa(){
    window.document.getElementById('ano').value = Number.parseInt(data_nav.getFullYear());
    window.document.getElementById('mes').value = Number.parseInt(data_nav.getMonth() + 1);
    pesquisa.style = 'display: block; z-index: 10;';
    calendario.style = 'opacity: .5';
    //calendario.hidden = true; 
    enable_botoes_calendario(false);
}

function enable_botoes_calendario(desabilitar){
    if(desabilitar){
        window.document.querySelector('section caption#cabecalho #voltar').disabled = false;
        window.document.querySelector('section caption#cabecalho #avancar').disabled = false;
    }else{
        window.document.querySelector('section caption#cabecalho #voltar').disabled = true; 
        window.document.querySelector('section caption#cabecalho #avancar').disabled = true;
    }
}

console.log(`Data atual: ${data_atu.getDate()}/${data_atu.getMonth()}/${data_atu.getFullYear()}`);
console.log(`Dia semana é ${data_atu.getDay()}`);

console.log(``);
console.log(`Data de navegação: ${data_nav.getDate()}/${data_nav.getMonth()}/${data_nav.getFullYear()}`)
console.log(`Dia semana é ${data_nav.getDay()}`);

