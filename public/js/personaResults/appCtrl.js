class AppCtrl{
    constructor(){
        this.stateList = {
            _INITIAL: 'INITIAL',
            _ACESSOGS: 'ACESSOGS',
            _INDICADOREQUIPE: 'INDICADOREQUIPE',
            _QUIZ: 'QUIZ',
            _CAPACITACAO: 'CAPACITACAO'
        }
        this.appState = null
    }
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//FETCH RESULTS
    fetchAllPersonalResults(dataCtrl,uiCtrl){
        fetch('/services/fetchAllPersonalResults')
            .then(answer => { return answer.json()})
            .then(results => {
                dataCtrl.addPersonaResults(results)
                uiCtrl.setPeriodosUsadosBtnIds(dataCtrl,this)
                this.setAppState(this.stateList._INITIAL)
                uiCtrl.loadFunciInfo(dataCtrl,this)
                this.loadAppStateEventListeners(dataCtrl,uiCtrl)
                this.loadSelectedPeriodEventListeners(dataCtrl,uiCtrl)
                uiCtrl.showHideSpinner('hide')
                uiCtrl.updateInterfaceAccordingToAppState(dataCtrl,this)
            })
            .catch(err => console.log(err))
    }
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//APP STATE
    setAppState(appState){
        this.appState = appState
    }
    getAppState(){
        return this.appState
    }
    returnAppStates(){
        return this.stateList
    }
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================
//EVENT LISTENERS
loadAppStateEventListeners(dataCtrl,uiCtrl){
    const appStateBtns = uiCtrl.returnElements().appState.btns
    const linkBtns = uiCtrl.returnElements().linkBtns
    console.log(appStateBtns)
    for(const btn in appStateBtns){
        document.getElementById(btn).addEventListener('click',(e)=>{
            if(e.target.id===appStateBtns.totalBtn){
                this.setAppState(this.stateList._INITIAL)
            }
            if(e.target.id===appStateBtns.acessosGSBtn){
                this.setAppState(this.stateList._ACESSOGS)
            }
            if(e.target.id===appStateBtns.indicadorEquipeBtn){
                this.setAppState(this.stateList._INDICADOREQUIPE)
            }
            if(e.target.id===appStateBtns.quizBtn){
                this.setAppState(this.stateList._QUIZ)
            }
            if(e.target.id===appStateBtns.capacitacaoBtn){
                this.setAppState(this.stateList._CAPACITACAO)
            }
            uiCtrl.changeActiveButtonAppState(this,e.target)
            uiCtrl.updateInterfaceAccordingToAppState(dataCtrl,this)
        })
    }
    for(const btn in linkBtns){
        document.getElementById(btn).addEventListener('click',(e)=>{
            if(e.target.id===linkBtns.regulamentoGS){
               window.open('https://gs4935.intranet.bb.com.br:3011/ProgramaReconheSERGS.pdf')
            }
            if(e.target.id===linkBtns.reonhesesrDIOPE){
                console.log(123)
                window.open('https://uop.bb.com.br/valorizacao/exiba?cmdo=valorizacao.index')
            }
        })
    }
}
loadSelectedPeriodEventListeners(dataCtrl,uiCtrl){
    const selectedPeriodBtns = uiCtrl.returnElements().periodosUsados.btns
    selectedPeriodBtns.forEach(pId => {
        document.getElementById(pId.periodo).addEventListener('click',(e)=>{
            dataCtrl.addSelectedPeriod(parseInt(e.target.id))
            uiCtrl.changeActiveButtonSelectedPeriod(this,e.target)
            uiCtrl.updateInterfaceAccordingToAppState(dataCtrl,this)
        })

    })
}
}