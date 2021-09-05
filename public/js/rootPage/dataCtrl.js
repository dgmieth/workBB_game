class DataCtrl {
    constructor(){
        this.funcis = []
        this.results= []
        this.indicadores = []
        this.totalPoints = 600
        this.currentPeriod = ''
        this.selectedPeriod = ''
        this.availablePeriods = []
        this.spreadsheet = null
        this.uploadedQuiz = null
        this.jornadaTrabalho = null
    }
    //populating instance
    addFuncis(dataArray){
        this.funcis = []
        dataArray.forEach(funci => {
            var funciNew = funci
            funciNew.searchField = `${funci.matricula.toLowerCase().trim()} ${funci.nome.toLowerCase().trim()} ${funci.nome_area_trabalho.toLowerCase().trim()} ${funci.nome_equipe.toLowerCase().trim()} ${funci.indicadorEquipe.toLowerCase().trim()} ${funci.id_indicadorEquipe}` 
            this.funcis.push(funciNew)
        })
    }
    addUploadQuiz(dataArray,uiCtrl,appCtrl,e){
        var tempArray = []
        if(dataArray==null){
            return this.uploadedQuiz = dataArray
        }
        dataArray.forEach(register => {
            var invalidate = 0
            for(const key in register){
                if(key==='matricula'){
                    invalidate += 1
                }
                if(key==='nroProva'){
                    invalidate += 1
                }
                if(key==='periodo'){
                    invalidate += 1
                }
                if(key==='qtdePerguntas'){
                    invalidate += 1
                }
                if(key==='qtdeAcertos'){
                    invalidate += 1
                }
                if(key==='abonoFerias'){
                    invalidate += 1
                }
            }
            if(invalidate === 6){
               tempArray.push(register)
            }
        })
        if(tempArray.length === 0 || dataArray==null){
            if(dataArray.length>0){
                uiCtrl.showAlertAcessoParticipante('error',`Escolha a planilha correta`)
            }
            appCtrl.changeAppState((appCtrl.returnAppStateList())._UPQUIZ,dataCtrl)
            uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
            appCtrl.loadInputExcelEventListener(e,dataCtrl,uiCtrl)
            return 
        } else {
            this.uploadedQuiz = tempArray
            uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
        }
    }
    addJornadaTrabalho(dataArray,uiCtrl,appCtrl,e){
        var tempArray = []
        if(dataArray==null){
            return this.jornadaTrabalho = dataArray
        }
        function matriculaLength(matricula){
            const chave = `${matricula}`
            const x = chave.length
            const y = 7-x
            if(y>0){
                var complemento = ''
                for (let index = 0; index < y; index++) {
                    complemento = complemento + '0'
                }
                return `F${complemento}${matricula}`
            }
            return `F${matricula}`
        }
        dataArray.forEach(r => {
            var invalidate = 0
            if(r['MATRICULA']){ invalidate += 1 }
            if(r['COMPETENCIA']){ invalidate += 1 }
            if(r['DIA ÚTIL']){invalidate += 1 }
            if(r['DT_JORNADA']){invalidate += 1 }
            if(r['SITUACAO']){invalidate += 1 }
            if(r['NOME_SITUACAO']){invalidate += 1 }
            if(invalidate===6){
                tempArray.push({
                    matricula: matriculaLength(r.MATRICULA),
                    periodo: r.COMPETENCIA,
                    diaUtil: r['DIA ÚTIL'],
                    data: r.DT_JORNADA,
                    situacao: r.SITUACAO,
                    nomeSituacao: r.NOME_SITUACAO
                })
            }
        })
        if(tempArray.length === 0 || dataArray==null){
            if(dataArray.length>0){
                uiCtrl.showAlertAcessoParticipante('error',`Escolha a planilha correta`)
            }
            console.log((appCtrl.returnAppStateList())._ACESSOGS)
            appCtrl.changeAppState((appCtrl.returnAppStateList())._ACESSOGS,dataCtrl)
            uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
            appCtrl.loadInputExcelEventListener(e,dataCtrl,uiCtrl)
            return 
        } else {
            this.jornadaTrabalho = tempArray
            uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
        }
    }
    addResults(dataArray){
        this.results = []
        this.results = dataArray
    }
    addCurrentPeriod(period){
        if(period.length > 0){
            this.currentPeriod = period[0].periodo
        }
    }
    addSelectedPeriod(period){
        this.selectedPeriod = period
    }
    addAvailablePeriods(periodoArray){
        periodoArray.forEach(r => {
            this.availablePeriods.push(r.periodo)
        })
    }
    addIndicadores(dataArray){
        this.indicadores = []
        this.indicadores = dataArray
    }
    //update acesso funci
    updateAcessoByChave(indexOfChave,_0_1,appCtrl,uiCtrl){
        appCtrl.updateAcesso(this.funcis[indexOfChave].matricula, this.funcis[indexOfChave].acesso===1 ? 0 : 1,uiCtrl,this)
    }
    updateAcessoFunci(matricula,_0_1){
        this.funcis.find(funci => {
            if(funci.matricula===matricula){
                funci.acesso = _0_1
            }
        })
    }
    //update participantes
    updateParticipantesByChave(indexOfChave,_0_1,appCtrl,uiCtrl){
        appCtrl.updateParticipante(this.funcis[indexOfChave].matricula, this.funcis[indexOfChave].participante === 1 ? 0 : 1, uiCtrl, this)
    }
    updateParticipanteFunci(matricula,_0_1){
        this.funcis.find(funci => {
            if(funci.matricula===matricula){
                funci.participante = _0_1
                this.results.find(result => {
                    if(result.matricula===funci.matricula){
                        result.resultado_mostrar = _0_1
                    }
                })
            }
        })
    }
    //generate spreadsheet
    generateSpreadsheet(uiCtrl,appCtrl){
        var wb = XLSX.utils.book_new()
        uiCtrl.downloadingProgressBar('10')
        wb.props = {
            Title: `resulados_${this.selectedPeriod}`,
            Subject: `Resultados Período ${this.selectedPeriod}`
        }
        wb.SheetNames.push(this.selectedPeriod)
        var tData = this.returnData('mostrarResults')
        uiCtrl.downloadingProgressBar('20')
        var ws_data = []
        const dateApuracao = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
        tData.forEach(funci => {
            ws_data.push({
                data_apuracao: {t:'s',v:dateApuracao,z:'@'},
                id_indicadores: { t:'n', v:165, z:'0'},
                prefixo_funcionario: {t:'n',v:4935,z:'0'},
                chave: {t:'s',v:funci.matricula,z:'@'},
                uor_equipe: {t:'n',v:funci.cod_uor_grupo,z:'0'},
                aamm: {t:'s',v:funci.period,z:'@'},
                valor_orcado: {t:'n',v:600,z:'0'},
                valor_realizado: {t:'n',v:funci.total,z:'0'},
                valor_percentual_atingido: {t:'s',v:funci.media,z:'0.00'}
            })
        })
        uiCtrl.downloadingProgressBar('75')
        var ws = XLSX.utils.json_to_sheet(ws_data)
        wb.Sheets[this.selectedPeriod] = ws
        var wbFile = XLSX.write(wb, {bookType: `xlsx`, type: `binary`})
        var buf = new ArrayBuffer(wbFile.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i=0; i<wbFile.length; i++) {
            view[i] = wbFile.charCodeAt(i) & 0xFF; //convert to octet
        }
        this.spreadsheet = new Blob([buf],{type:"application/octet-stream"})
        uiCtrl.downloadingProgressBar('100')
        uiCtrl.downloadingProgressBar('downloadBtn',this,appCtrl)
    }
    //return data
    returnData(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho){
        if(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho==='funcis'){
            return this.funcis
        }
        if(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho==='results'){
            return this.results
        }
        if(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho==='currentPeriod'){
            return this.currentPeriod
        }
        if(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho==='selectedPeriod'){
            return this.selectedPeriod
        }
        if(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho==='spreadsheet'){
            return this.spreadsheet
        }
        if(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho==='uploadedQuiz'){
            return this.uploadedQuiz
        }
        if(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho==='indicadores'){
            return this.indicadores
        }
        if(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho==='jornadaTrabalho'){
            return this.jornadaTrabalho
        }
        if(funcis_results_mostrarResults_selectedPeriod_currentPeriod_spreadsheet_uploadedQuiz_inidcadores_jornadaTrabalho==='mostrarResults'){
            var tempArray = []
            this.funcis.forEach(funci => {
                if(funci.participante===1){
                    var results = this.results.filter(result => {
                        if(result.matricula === funci.matricula){
                            return result
                        }
                    })
                    var aryOne = []
                    var capacitacao = 0
                    var quiz = 0
                    var gsIntra = 0
                    var equipe = 0
                    var total = 0
                    results.filter(result => {
                        if(result.periodo===parseInt(this.selectedPeriod)){
                            aryOne.push(result)
                        }
                    })
                    aryOne.forEach(desafio => {
                        total += desafio.pontuacao
                        //acesso gsIntra
                        if(desafio.id_a_desafios===1){
                            gsIntra += desafio.pontuacao
                        }
                        //capacitacao
                        if(desafio.id_a_desafios===2){
                            capacitacao += desafio.pontuacao
                        }
                        //quiz
                        if(desafio.id_a_desafios===3){
                            quiz += desafio.pontuacao
                        }
                        //equipe
                        if(desafio.id_a_desafios===4){
                            equipe += desafio.pontuacao
                        }
                    })
                    var tempObj = { 
                        nome: funci.nome,
                        matricula: funci.matricula,
                        cod_uor_grupo: funci.cod_uor_grupo,
                        searchField: funci.searchField,
                        period: parseInt(this.selectedPeriod),
                        gsIntra,
                        capacitacao,
                        quiz,
                        equipe,
                        media: parseFloat((total/this.totalPoints)*100).toFixed(2),
                        total
                    }
                    tempArray.push(tempObj)
                }
            })
            return tempArray
        }
    }
    //zerar planilha
    setSpreadsheetToNull(){
        this.spreadsheet = null
    }
}