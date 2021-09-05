class AppCtrl {
    constructor(){
        this.appStateList = {
            _INITIAL: 'INITIAL',
            _ACESSO: 'ACESSO',
            _PARTICIPANTES: 'PARTICIPANTES',
            _RESULTADOS: 'RESULTADOS',
            _GERAR: 'GERAR',
            _UPQUIZ: 'UPQUIZ',
            _INDICADORES: 'INDICADORES',
            _ACESSOGS: 'ACESSOGS'
        }
        this.searchMode = false
        this.downloading = false
        this.appState = this.appStateList._INITIAL
        this.eInInputExcel = null
    }
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //fetchin data
    //funcis
    fetchAllFuncis(dataCtrl, uiCtrl){
        fetch('/services/fetchAllFuncis')
        .then(answer => {
            return answer.json()
        })
        .then(results => {
            dataCtrl.addFuncis(results)
            //results
            fetch('/services/fetchAllResults')
            .then(answer => { return answer.json() })
            .then(results => {
                dataCtrl.addResults(results)
                fetch('/services/fetchCurrentPeriod')
                .then(answer => {return answer.json()})
                .then(periodo => { 
                    dataCtrl.addCurrentPeriod(periodo) 
                    fetch('/services/fetchPeriodsToShow')
                    .then(answer => { return answer.json() })
                    .then(results => {
                        uiCtrl.setPlanilhaIDs(results)
                        dataCtrl.addAvailablePeriods(results)
                        fetch('/services/fetchIndicadores')
                        .then(answer => { return answer.json() })
                        .then(results => {
                            dataCtrl.addIndicadores(results)
                            this.loadEventListeners(dataCtrl,uiCtrl)
                            uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
                            uiCtrl.changeMainDispaly('block')
                        })
                    })
                })
                .catch(er => console.log(err))
            })
            .catch(err => console.log(err) )
        })
        .catch(err => console.log(err))
    }
    fetchResultsOnly(dataCtrl,uiCtrl,response){
        fetch('/services/fetchAllResults')
        .then(answer => { return answer.json() })
        .then(results => {
            dataCtrl.addResults(results)
            uiCtrl.changeMainDispaly('block')
            uiCtrl.showAlertAcessoParticipante('success',`${response.success}`)
            this.changeAppState(this.appStateList._INITIAL,dataCtrl)
            uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
        })
        .catch(err => console.log(err))
    }
    //update acesso 
    updateAcesso(chave,_0_1,uiCtrl,dataCtrl){
        fetch(`/services/acessoByChave/${chave}&${_0_1}`)
        .then(answer => { 
            return answer.json()
        })
        .then(result => { 
            if(result.success){
                uiCtrl.showAlertAcessoParticipante('success',`${chave} atualizado`)
                dataCtrl.updateAcessoFunci(chave,_0_1)
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showAlertAcessoParticipante('error',`Erro -- ${chave}`)
            location.reload()
        })
    }
    //update participantes
    updateParticipante(chave,_0_1,uiCtrl,dataCtrl){
        fetch(`/services/participanteByChave/${chave}&${_0_1}`)
        .then(answer =>{
            return answer.json()
        })
        .then(result => {
            if(result.success){
                uiCtrl.showAlertAcessoParticipante('success',`${chave} atualizado`)
                dataCtrl.updateParticipanteFunci(chave,_0_1)
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showAlertAcessoParticipante('error',`Erro -- ${chave}`)
            location.reload()
        })
    }
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //loading event listeners
    loadEventListeners(dataCtrl,uiCtrl){
        const ids = (uiCtrl.returnIDs()).staticBtnsIDs
        window.addEventListener('keydown',(e)=>{
            if(e.keyCode==13){
                e.preventDefault()
                return false
            }
        })
        //configurar buttons
        for(const id in ids){
            document.getElementById(id).addEventListener('click',(e)=>{
                if(e.target.id===ids.acessoBtn){
                    dataCtrl.addSelectedPeriod()
                    this.changeAppState(this.appStateList._ACESSO,dataCtrl)
                    uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
                    this.loadAcessoEvenListeners(dataCtrl,uiCtrl)
                }
                if(e.target.id===ids.participantesBtn){
                    dataCtrl.addSelectedPeriod()
                    this.changeAppState(this.appStateList._PARTICIPANTES,dataCtrl)
                    uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
                    this.loadParticipantesEvenListener(dataCtrl,uiCtrl)
                }
                if(e.target.id===ids.resultadosBtn){
                    dataCtrl.addSelectedPeriod()
                    this.changeAppState(this.appStateList._RESULTADOS,dataCtrl)
                    dataCtrl.addSelectedPeriod(dataCtrl.returnData(`currentPeriod`))
                    uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
                    this.loadResultadosEventListeners(dataCtrl,uiCtrl)
                }
                if(e.target.id===ids.upQuizBtn){
                    this.changeAppState(this.appStateList._UPQUIZ,dataCtrl)
                    uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
                    this.loadInputExcelEventListener(e,dataCtrl,uiCtrl)
                }
                if(e.target.id===ids.indicadorBtn){
                    this.changeAppState(this.appStateList._INDICADORES,dataCtrl)
                    uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
                    this.loadIndicadoresEventListenters(dataCtrl,uiCtrl)
                }
                if(e.target.id===ids.acessoGSBtn){
                    this.changeAppState(this.appStateList._ACESSOGS,dataCtrl)
                    uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
                    this.loadInputExcelEventListener(e,dataCtrl,uiCtrl)
                }
                uiCtrl.changeBtnActiveClass(e.target, (uiCtrl.returnIDs()).listOfClasses.btnActive)
            })
        }
        (uiCtrl.returnIDs()).dynamicBtnsIDs.forEach(id => {
            document.getElementById(id).addEventListener('click',(e)=>{
                uiCtrl.changeBtnActiveClass(e.target, (uiCtrl.returnIDs()).listOfClasses.btnActive)
                dataCtrl.addSelectedPeriod()
                this.changeAppState(this.appStateList._GERAR,dataCtrl)
                dataCtrl.addSelectedPeriod(e.target.id)
                this.downloading = true
                uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
                dataCtrl.generateSpreadsheet(uiCtrl,this)
            })
        })
    }
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //specific event listeners
    //================================================================================================================================================
    loadAcessoEvenListeners(dataCtrl,uiCtrl){
        this.commonCodeAcessoParticipantesEventListeners(false,dataCtrl,uiCtrl)
        this.searchBoxEventListeners(dataCtrl,uiCtrl)
    }
    loadParticipantesEvenListener(dataCtrl,uiCtrl){
        this.commonCodeAcessoParticipantesEventListeners(false,dataCtrl,uiCtrl)
        this.searchBoxEventListeners(dataCtrl,uiCtrl)
    }
    loadResultadosEventListeners(dataCtrl,uiCtrl){
        const ids = (uiCtrl.returnIDs()).dynamicFilterIds
        ids.forEach(id =>{
            document.getElementById(id).addEventListener('click',(e)=>{
                this.searchMode = false
                uiCtrl.clearSearchBox()
                dataCtrl.addSelectedPeriod((e.target.id).split(`-`)[1])
                uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
                uiCtrl.changeActiveButtonFilter(e.target.id)
            })
        })
        this.searchBoxEventListeners(dataCtrl,uiCtrl)
    }
    loadInputExcelEventListener(eExterno,dataCtrl,uiCtrl){
        this.eInInputExcel = eExterno
        var btnID = ''
        const appState = this.appState
        const upQuiz = this.appStateList._UPQUIZ
        const acessoGS = this.appStateList._ACESSOGS
        if(appState===upQuiz){
            btnID = uiCtrl.returnIDs().inputExcelBtn
        }else if(appState===acessoGS){
            btnID = uiCtrl.returnIDs().acessoGS.btns.upload
        }
        document.getElementById(btnID).addEventListener('change',(e)=>{
            var reader = new FileReader();
            reader.readAsArrayBuffer(e.target.files[0]);
            reader.onload = function(e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, {type: 'array'});
                var sheets = []
                for(const i in workbook.Sheets){
                    sheets.push(i)
                }
                if(appState===upQuiz){
                    dataCtrl.addUploadQuiz(XLSX.utils.sheet_to_json(workbook.Sheets[sheets[0]]),uiCtrl,appCtrl,eExterno)
                }
                if(appState===acessoGS){
                    dataCtrl.addJornadaTrabalho(XLSX.utils.sheet_to_json(workbook.Sheets[sheets[0]]),uiCtrl,appCtrl,eExterno)
                }
                //uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
            }
        })
    }
    loadIndicadoresEventListenters(dataCtrl,uiCtrl){
        const ids = uiCtrl.returnIDs().indicadores.btns
        document.getElementById(ids.submit).addEventListener('click',(e)=>{
            const value = parseFloat(document.getElementById(uiCtrl.returnIDs().indicadores.inputID).value)
            if(isNaN(value)||value===0||value===null){ return }
            uiCtrl.changeMainDispaly('none')
            fetch('/services/uploadIndicadores',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ajuizamentoEstrategico: value})
            })
            .then(answer => { return answer.json() })
            .then(response => {
                dataCtrl.returnData('indicadores').forEach(indicador => {
                    if(indicador.id_a_mapearIndicadores === 12) {
                        i.atingimento_semestre =`${value}`
                        return 
                    }
                })
                this.fetchResultsOnly(dataCtrl,uiCtrl,response)
            })
            .catch(err => {
                console.log(err)
                location.reload()
            })
        })
        document.getElementById(ids.clear).addEventListener('click',(e)=>{
            document.getElementById(uiCtrl.returnIDs().indicadores.inputID).value = ``
        })
    }
    searchBoxEventListeners(dataCtrl,uiCtrl){
        document.getElementById(uiCtrl.returnIDs().searchFieldIDs.searchBox).addEventListener('focus',(e)=>{
            this.searchMode = true
            document.addEventListener('keypress',(e)=>{
               if(e.keyCode===13){ e.preventDefault() }
            })
            e.preventDefault()
        })
        document.getElementById(uiCtrl.returnIDs().searchFieldIDs.searchBox).addEventListener('input', (e)=>{
            uiCtrl.changeUISearchModeON(dataCtrl,this,e.target.value)
            if(this.appState===this.appStateList._ACESSO){
                this.commonCodeAcessoParticipantesEventListeners(true,dataCtrl,uiCtrl,e.target.value)
            }else if(this.appState===this.appStateList._PARTICIPANTES){
                this.commonCodeAcessoParticipantesEventListeners(true,dataCtrl,uiCtrl,e.target.value)
            }
            e.preventDefault()
        })
        document.getElementById(uiCtrl.returnIDs().searchFieldIDs.searchButton).addEventListener('click', (e)=>{
            this.searchMode = false
            document.getElementById(uiCtrl.returnIDs().searchFieldIDs.searchBox).value = ``
            uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
            if(this.appState===this.appStateList._ACESSO){
                this.loadAcessoEvenListeners(dataCtrl,uiCtrl)
            }
            if(this.appState===this.appStateList._PARTICIPANTES){
                this.loadParticipantesEvenListener(dataCtrl,uiCtrl)
            }
            if(this.appState===this.appStateList._RESULTADOS){
                this.loadResultadosEventListeners(dataCtrl,uiCtrl)
            }
            document.removeEventListener('keypress',(e)=>{})
            e.preventDefault()
        })
    }
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //common fucntions
    //================================================================================================================================================
    commonCodeAcessoParticipantesEventListeners(false_trueForSearChMode,dataCtrl,uiCtrl,valueSearchBox){
        function findMatriculaIndex(dataCtrl,e){
            const chaves = dataCtrl.returnData('funcis')
            return chaves.map(funci => { return funci.matricula }).indexOf(e.target.id)
        }
        var chaves = []
        if(!false_trueForSearChMode){
            chaves = dataCtrl.returnData('funcis')
        }else{
            chaves = uiCtrl.searchBoxRegExp(valueSearchBox)
        }
        chaves.forEach(funci => {
            document.getElementById(funci.matricula).addEventListener('click', (e)=>{
                if(this.appState===this.appStateList._ACESSO){
                    dataCtrl.updateAcessoByChave(findMatriculaIndex(dataCtrl,e), e.target.checked ? 1 : 0,this,uiCtrl)
                }
                if(this.appState===this.appStateList._PARTICIPANTES){
                    dataCtrl.updateParticipantesByChave(findMatriculaIndex(dataCtrl,e), e.target.checked ? 1 : 0,this,uiCtrl)
                }
            })
        })
    }
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //event listeners loaded by other controllers
    //================================================================================================================================================
    loadDownloadEvenListener(dataCtrl,uiCtrl){
        document.getElementById(uiCtrl.returnIDs().downloadBtn).addEventListener('click',(e)=>{
            saveAs(dataCtrl.returnData('spreadsheet'),`resultados_${dataCtrl.returnData('selectedPeriod')}.xlsx`);
            dataCtrl.setSpreadsheetToNull()
            e.preventDefault()
        })
    }
    loadUploadedQuizEventListeners(dataCtrl,uiCtrl){
        const ids = uiCtrl.returnIDs().uploadQuizBtns
        document.getElementById(ids.clearUploadedQuiz).addEventListener('click', (e)=>{
            this.changeAppState(this.appStateList._UPQUIZ,dataCtrl)
            uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
            this.loadInputExcelEventListener(this.eInInputExcel,dataCtrl,uiCtrl)
        })
        document.getElementById(ids.submitUploadedQuiz).addEventListener('click',(e)=>{
            uiCtrl.changeMainDispaly('none')
            fetch('/services/uploadQuiz',{
                method: 'POST',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataCtrl.returnData('uploadedQuiz'))
            })
            .then(answer => {
                return answer.json()
            })
            .then(response => {
                this.fetchResultsOnly(dataCtrl,uiCtrl,response)
            })
            .catch(err => {
                console.log(err)
                location.reload()
            })
        })
    }
    loadUploadedJornadaDeTrabalhoEventListeners(dataCtrl,uiCtrl){
        window.addEventListener('unhandledrejection', event => {
            event.preventDefault()
       }, false)
        const ids = uiCtrl.returnIDs().acessoGS.btns
        document.getElementById(ids.clear).addEventListener('click', (e)=>{
            this.changeAppState(this.appStateList._ACESSOGS,dataCtrl)
            uiCtrl.changeUIAccordingToAppState(appCtrl.returnAppState(),dataCtrl,appCtrl)
            this.loadInputExcelEventListener(this.eInInputExcel,dataCtrl,uiCtrl)
        })
        document.getElementById(ids.submit).addEventListener('click',(e)=>{
            uiCtrl.changeMainDispaly('none')
            fetch('/services/uploadJornadaDeTrabalho',{
                method: 'POST',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataCtrl.returnData('jornadaTrabalho'))
            })
            .then(answer => {
                return answer.json()
            })
            .then(response => {
                console.log(response)
                this.fetchResultsOnly(dataCtrl,uiCtrl,response)
            })
            .catch(err =>{
                console.log(err)
                location.reload()
            })
        })
    }
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //================================================================================================================================================
    //change app state
    changeAppState(state,dataCtrl){
        if(state!==this.appStateList._UPQUIZ||state!==this.appStateList._ACESSOGS){
            this.eInInputExcel = null
        }
        this.appState = state
        dataCtrl.addUploadQuiz(null)
        dataCtrl.addJornadaTrabalho(null)
    }
    //return app state list
    returnAppStateList(){
        return this.appStateList
    }
    //return app state
    returnAppState(){
        return this.appState
    }
    returnSearchMode(){
        return this.searchMode
    }
}