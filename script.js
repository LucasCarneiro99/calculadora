class Calculadora {

    constructor() {
        this.ligada = false;
        this.nrVisor = '';
        this.nrOpVisor = ''
        this.ptDecimal = false;
        this.estadoErro = true;
        this.memTemp = '';
        this.memoria = 0;
        this.iniciouSegundo = false;
        this.op = {
            NOP: 0,
            SUM: 1,
            SUB: 2,
            MULT: 3,
            DIV: 4,
            PERC: 5,
        };
        this.opAtual = this.op.NOP;
        //this.nrVisor = String(resultado).slice(0, 10);
    }

    // Retorna valor do visor
    mostraVisor() {
        return this.nrVisor;
    }

    // Retorna a operação do visor
    mostraOpVisor() {
        return this.nrOpVisor;
    }


    // Recebe dígito
    recebeDigito(dig) {
        if (this.estadoErro) return;
        if (dig.length != 1) return;
        if ((dig < '0' || dig > '9') && dig != '.') return;
        if (!this.iniciouSegundo && this.opAtual != this.op.NOP) {
            this.iniciouSegundo = true;
            this.ptDecimal = false;
            this.nrVisor = '0';
        }
        if (this.nrVisor.length == 10) return;
        if (dig == '.') {
            if (this.ptDecimal) return;
            this.ptDecimal = true;
        }
        if (this.nrVisor == '0') {
            this.nrVisor = dig == '.' ? '0.' : dig;
        } else {
            this.nrVisor += dig;
        }
    }

    // Apaga o ultimo digito inserido
    apagarDigito() {
        if (!this.ligada) return;
        if (this.nrVisor.length == 1) {
            this.nrVisor = '0';
            this.ptDecimal = false;
            this.iniciouSegundo = false;
            this.estadoErro = false;
        }
        if (this.nrVisor.length > 1) {
            return this.nrVisor = this.nrVisor.substring(0, this.nrVisor.length - 1)
        }
    }

    // Define a operação atual
    defineOperacao(op) {
        if (this.estadoErro) return;
        switch (op) {
            case '+':
                this.opAtual = this.op.SUM;
                this.nrOpVisor = '+'

                break;
            case '-':
                this.opAtual = this.op.SUB;
                this.nrOpVisor = '-'
                break;
            case '/':
                this.opAtual = this.op.DIV;
                this.nrOpVisor = '/'
                break;
            case '*':
                this.opAtual = this.op.MULT;
                this.nrOpVisor = 'x'
                break;
            case '%':
                this.opAtual = this.op.PERC;
                this.nrOpVisor = '%'
                break;
        }
        this.memTemp = this.nrVisor;
    }

    // Executa operação: tecla igual
    igual() {
        if (this.estadoErro) return;
        if (this.opAtual == this.op.NOP) return;
        let num1 = parseFloat(this.memTemp);
        let num2 = parseFloat(this.nrVisor);
        let resultado = 0;
        switch (this.opAtual) {
            case this.op.SUM:
                resultado = num1 + num2;
                break;
            case this.op.SUB:
                resultado = num1 - num2;
                break;
            case this.op.MULT:
                resultado = num1 * num2;
                break;
            case this.op.DIV:
                if (num2 == 0) {
                    this.estadoErro = true;
                    this.nrVisor = 'ERRO!';
                    return;
                }
                resultado = num1 / num2;
                break;
            case this.op.PERC:
                resultado = (num1 * num2) / 100;
                break
        }
        this.opAtual = this.op.NOP;
        this.ptDecimal = false;
        this.memTemp = '';
        this.iniciouSegundo = false;
        this.nrOpVisor = '';
        this.nrVisor = String(resultado).substring(0, 10);
    }

    // Tecla C - reinicia tudo, exceto memória
    teclaC() {
        if (!this.ligada) {
            return;
        } else {
            this.nrVisor = '0';
            this.nrOpVisor = '';
            this.ptDecimal = false;
            this.iniciouSegundo = false;
            this.opAtual = this.op.NOP;
            this.memTemp = '';
            this.estadoErro = false;
        }

    }

    // tecla M+ : acrescenta à memória o número no visor
    teclaMmais() {
        if (this.estadoErro) return;
        this.memoria += parseFloat(this.nrVisor);
    }

    // tecla M- : subtrai da memória o número no visor
    teclaMmenos() {
        if (this.estadoErro) return;
        this.memoria -= parseFloat(this.nrVisor);
    }

    // tecla RM : recupera o conteúdo da memória -> coloca no visor
    teclaRM() {
        if (this.estadoErro) return;
        this.nrVisor = String(this.memoria);
    }

    // tecla CLM : limpa totalmente o conteúdo da memória -> atribui 0
    teclaCLM() {
        if (this.estadoErro) return;
        this.memoria = 0;
    }

    // tecla 1/x : inverve o valor mostrado na tela
    teclaInverte() {
        let inverte = 0
        if (this.estadoErro) return;
        inverte = 1 / parseFloat(this.nrVisor);
        this.nrVisor = String(inverte).slice(0, 10);
    }

    teclaInverteSinal() {
        if (this.estadoErro) return;
        this.nrVisor = -this.nrVisor;
    }

    // tecla √: mostra a raiz quadrada do numero mostrado no visor.
    teclaRaizQuadrada() {
        let sqrt = 0;
        if (this.estadoErro) return;
        sqrt = Math.sqrt(this.nrVisor);
        this.nrVisor = String(sqrt).slice(0, 10);
    }


    // tecla x^2: mostra o quadrado do numero mostrado no visor.
    teclaAoQuadrado() {
        if (this.estadoErro) return;
        const nrVisor = parseFloat(this.nrVisor);
        const result = nrVisor ** 2;
        const resultString = result.toString();
        const resultLength = resultString.length;
        const resultTruncated = resultString.substring(0, 10);
        const resultFormatted = resultLength > 10 ? `${resultTruncated}...` : resultTruncated;
        this.nrVisor = resultFormatted;
    }

    onOf() {
        if (this.ligada) {
            //implementar logica para desligar
            this.nrVisor = '';
            this.ptDecimal = false;
            this.estadoErro = true;
            this.memTemp = '';
            this.memoria = 0;
            this.iniciouSegundo = false;
            this.op = {
                NOP: 0,
                SUM: 1,
                SUB: 2,
                MULT: 3,
                DIV: 4,
                PERC: 5
            };
            this.opAtual = this.op.NOP;

            this.ligada = false;
        } else {
            this.nrVisor = '0';
            this.ptDecimal = false;
            this.estadoErro = false;
            this.memTemp = '';
            this.memoria = 0;
            this.iniciouSegundo = false;
            this.op = {
                NOP: 0,
                SUM: 1,
                SUB: 2,
                MULT: 3,
                DIV: 4,
                PERC: 5
            };
            this.opAtual = this.op.NOP;
            //implementar logica para ligar
            this.ligada = true;
        }
    }

}
//ELA VAI COMECAR DESLIGADA
let onOf = () => {
    calculadora.onOf();
    mostraVisor();
    console.log("LIGADA ", this.ligada)
}

// ===================================================================
//  REAÇÃO A EVENTOS DO MOUSE
// ===================================================================

// ATUALIZA O VALOR NO VISOR
let mostraVisor = () => {
    console.log("NR VISOR", calculadora.nrVisor);
    document.getElementById('visor-id').innerHTML = calculadora.nrVisor;
}

// Atualiza o Valor da Operação
let mostraOpVisor = () => {
    console.log("Operacao Visor", calculadora.nrOpVisor)
    document.getElementById('op-visor-id').innerHTML = calculadora.nrOpVisor;
}


// RECEBE UM DÍGITO (OU PONTO)
let digito = (dig) => {
    calculadora.recebeDigito(dig);
    mostraVisor();
    mostraOpVisor();
}

let apagarDigito = () => {
    calculadora.apagarDigito();
    mostraVisor();
}

// RECEBE A OPERAÇÃO ATUAL
let defOp = (op) => {
    if (calculadora.opAtual != calculadora.op.NOP) {
        igual();
        mostraVisor();
        mostraOpVisor();
    }
    calculadora.defineOperacao(op);
}

// CALCULA A OPERAÇÃO
let igual = () => {
    calculadora.igual();
    mostraVisor();
    mostraOpVisor();
}

// TECLA C: LIMPA TUDO, EXCETO MEMÓRIA
let teclaC = () => {
    calculadora.teclaC();
    mostraVisor();
    mostraOpVisor();
}

// M+ ACRESCENTA À MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmais = () => {
    calculadora.teclaMmais();
}

// M- SUBTRAI DA MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmenos = () => {
    calculadora.teclaMmenos();
}

// 1/x INVERTE O VALOR ATUAL NO VISOR
let teclaInverte = () => {
    calculadora.teclaInverte();
    mostraVisor();
}

// +/- INVERTE O SINAL ATUAL NO VISOR
let teclaInverteSinal = () => {
    calculadora.teclaInverteSinal();
    mostraVisor();
}

// √ MOSTRA A RAIZ QUADRADA DO NUMERO EM QUESTÃO
let teclaRaizQuadrada = () => {
    calculadora.teclaRaizQuadrada();
    mostraVisor();
}

// x^2 MOSTRA O NUMERO AO QUADRADO EM QUESTÃO
let teclaAoQuadrado = () => {
    calculadora.teclaAoQuadrado();
    mostraVisor();
}

// PÕE NO VISOR O CONTEÚDO DA MEMÓRIA
let teclaRM = () => {
    calculadora.teclaRM();
    mostraVisor();
}

let teclaPorcentagem = () => {
    calculadora.teclaPorcentagem();
    mostraVisor();
    mostraOpVisor();
}



// APAGA TODO O CONTEÚDO DA MEMÓRIA
let teclaCLM = () => {
    calculadora.teclaCLM();
}



// ===================================================================
//  INÍCIO DO PROCESSAMENTO
// ===================================================================

let calculadora = new Calculadora();


