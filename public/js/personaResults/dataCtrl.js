class DataCtrl{
    constructor(){
        this.resultados = null
        this.acessosIntraGs = null
        this.diasTrabalhados = null
        this.diasAbonoFerias = null
        this.indicadoresEquipe = null
        this.horasCapacitacao = null
        this.cursosCapacitacao = null
        this.quiz = null
        this.periodoAtual = null
        this.periodosUsados = null
        this.infoFunci = null
        this.pontuacaoMaxima = null
        //----------------------
        //APP ExECUTION
        //----------------------
        this.selectedPeriod = null
        this.totalPontos = 600
    }
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //ADDING DATA
    addPersonaResults(array){
        this.resultados = null
        this.acessosIntraGs = null
        this.diasTrabalhados = null
        this.diasAbonoFerias = null
        this.indicadoresEquipe = null
        this.horasCapacitacao = null
        this.cursosCapacitacao = null
        this.quiz = null
        this.periodoAtual = null
        this.periodosUsados = null
        this.infoFunci = null
        this.selectedPeriod = null
        this.pontuacaoMaxima = null
        if(array.length === 0){
            return
        }
        //-------------------------
        this.resultados = array[0]
        this.acessosIntraGs = array[1]
        this.diasTrabalhados = array[2]
        this.diasAbonoFerias = array[3]
        this.indicadoresEquipe = array[4]
        this.horasCapacitacao = array[5]
        this.cursosCapacitacao = array[6]
        this.quiz = array[7]
        this.periodoAtual = array[8]
        this.periodosUsados = array[9] 
        this.infoFunci = array[10]
        this.selectedPeriod = array[8][0].periodo
        this.pontuacaoMaxima = array[11]
    }
    addSelectedPeriod(data){
        this.selectedPeriod = null
        if(data==null){
            return
        }
        this.selectedPeriod = data
    }
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //RETURN RESULTS
    returnResults(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima){
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='resultados'){
            return this.resultados
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='acessosIntraGs'){
            return this.acessosIntraGs
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='diasTrabalhados'){
            return this.diasTrabalhados
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='diasAbonoFerias'){
            return this.diasAbonoFerias
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='indicadoresEquipe'){
            return this.indicadoresEquipe
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='horasCapacitacao'){
            return this.horasCapacitacao
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='cursosCapacitacao'){
            return this.cursosCapacitacao
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='quiz'){
            return this.quiz
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='periodoAtual'){
            return this.periodoAtual
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='periodosUsados'){
            return this.periodosUsados
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='selectedPeriod'){
            return this.selectedPeriod
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='infoFunci'){
            return this.infoFunci
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='totalPontos'){
            return this.totalPontos
        }
        if(resultados_acessosIntraGs_diasTrabalhados_diasAbonoFerias_indicadoresEquipe_horasCapacitacao_cursosCapacitacao_quiz_periodoAtual_periodosUsados_selectedPeriod_infoFunci_totalPonto_pontuacaoMaxima==='pontuacaoMaxima'){
            return this.pontuacaoMaxima
        }
    }
}