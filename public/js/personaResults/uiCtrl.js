class UICtrl{
    constructor(){
        this.teste = null
        this.spinner = 'spinner'
        this.main = 'main'
        this.col = {
            mainCol: 'mainCol',
            subCol: 'subCol',
        }
        this.linkBtns= {
            regulamentoGS: 'regulamentoGS',
            reonhesesrDIOPE: 'reonhesesrDIOPE'
        }
        this.Highcharts = {
            container: 'container'
        }
        this.capacitacao = {
            capacitaTable: 'capacitaTable',
            horasCapacitaTable: 'horasCapacitaTable'
        }
        this.quiz = {
            quizTable: 'quizTable'
        }
        this.acessoGS = {
            acessoTable: 'acessoTable'
        }
        this.periodosUsados = {
            divWrapper: {
                periodsBtns: 'periodsBtns'
            },
            btns: []
        }
        this.infoFunci = {
            p: {
                infoMatricula,
                infoArea,
                infoEquipe,
                infoIndicador,
            }
        }
        this.appState = {
            btns: {
                totalBtn: 'totalBtn',
                acessosGSBtn: 'acessosGSBtn',
                indicadorEquipeBtn: 'indicadorEquipeBtn',
                quizBtn: 'quizBtn',
                capacitacaoBtn: 'capacitacaoBtn'
            }
        }
    }
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //showHideSpinner
    showHideSpinner(show_hide){
        if(show_hide==='show'){
            document.getElementById(this.spinner).style.display = 'block'
            document.getElementById(this.main).style.display = 'none'
        }else if(show_hide==='hide'){
            document.getElementById(this.spinner).style.display = 'none'
            document.getElementById(this.main).style.display = 'block'
        }
    }
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //setPeriodosUsadosBtnIds
    setPeriodosUsadosBtnIds(dataCtrl,appCtrl){
        this.periodosUsados.btns = dataCtrl.returnResults('periodosUsados')
    }
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //UPDATE INTERFACE ACCORDING TO APP STATE 
    loadFunciInfo(dataCtrl,appCtrl){
        const info = (dataCtrl.returnResults('infoFunci')).length > 0 ? dataCtrl.returnResults('infoFunci')[0] : dataCtrl.returnResults('infoFunci')
        const periodosUsados = dataCtrl.returnResults('periodosUsados')
        this.infoFunci.p.infoMatricula.innerText = ` ${info.matricula}`
        this.infoFunci.p.infoArea.innerText = ` ${info.nome_area_trabalho}`
        this.infoFunci.p.infoEquipe.innerText = ` ${info.nome_equipe}`
        this.infoFunci.p.infoIndicador.innerText = ` ${info.indicadorEquipe}`
        var periodosUsadosBtns = ''
        periodosUsados.forEach(id => {
            periodosUsadosBtns = ` ${periodosUsadosBtns}
            <div class="p-2">
                <button id="${id.periodo}" type="button" class="btn btn-secondary btn-sm ${(dataCtrl.returnResults('periodoAtual')[0].periodo===parseInt(id.periodo)) ? `active` : ``} filter-btn">
                    ${id.periodo}
                </button>
            </div>
            `
        })
        document.getElementById(this.periodosUsados.divWrapper.periodsBtns).innerHTML = `${periodosUsadosBtns}`
    }
    updateInterfaceAccordingToAppState(dataCtrl,appCtrl){  
        const periodoAtual = dataCtrl.returnResults('periodoAtual')[0]
        const selectedPeriod = dataCtrl.returnResults('selectedPeriod')
        const mainCol = this.col.mainCol
        const subCol = this.col.subCol
        const highchartsContainer = this.Highcharts.container
        const pontuacaoMaxima = dataCtrl.returnResults('pontuacaoMaxima')

        function  showHideMainCol(show_hide){
            if(show_hide==='show'){
                document.getElementById(mainCol).style.display = 'block'
                document.getElementById(highchartsContainer).innerHTML = ''
                document.getElementById(subCol).style.display = 'none'
            }else if(show_hide==='hide'){
                document.getElementById(mainCol).style.display = 'none'
                document.getElementById(subCol).style.display = 'block'
            }
        }
        if(appCtrl.returnAppStates()._INITIAL===appCtrl.getAppState()){
            showHideMainCol('show')
            var results = []
            var somaNota = 0
            const totalPontos = dataCtrl.returnResults('totalPontos')
            dataCtrl.returnResults('resultados').forEach(r => {
                if(r.periodo===selectedPeriod){
                    var color = ''
                    switch (r.id_a_desafios) {
                        case 1:
                            color = '#456c96'
                            break;
                        case 2:
                            color = '#afcf4e'
                            break;
                        case 3:
                            color = '#efcc46'
                            break;
                        default:
                            color = '#f091c9'
                            break;
                    }
                    somaNota += r.pontuacao
                    results.push({name: r.desafio,color: color,y: r.pontuacao,pontuacaoMaxima:r.pontuacaoMaxima})
                }
            })
            results.push({name: 'Não cumprido',color: '#c9c9c9', y:totalPontos-somaNota,pontuacaoMaxima:600})
            Highcharts.chart(highchartsContainer, {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                exporting: {
                    enabled: false
                },
                title: {
                    text: `Média:</br> ${parseFloat((somaNota/totalPontos)*100).toFixed(2)}%</br>Total pontos:</br>${somaNota}`,
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 165,
                    style: {
                        fontSize: `2.2rem`,
                        fontWeight: 'bold'
                    }
                },
                tooltip: {
                    enabled: false
                },
               
                plotOptions: {
                    pie: {
                        dataLabels: {
                            alignTo: 'plotEdges',
                            //format: '<strong>{point.name}</strong></br>({point.percentage:.1f}%) ({point.y}pontos)',
                            formatter: function(){
                                var teste = this
                                return `${teste.series.data[teste.colorIndex].name}</br>${teste.series.data[teste.colorIndex].y} de ${teste.series.data[teste.colorIndex].pontuacaoMaxima}`
                            },
                            style: {
                                fontWeight: 'bold',
                                fontSize: `1rem`,
                                color: 'black'
                            }
                        },
                        
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%'],
                        size: '85%'
                    }
                },
                series: [{
                    type: 'pie',
                    name: `ReconheSER GS`,
                    innerSize: '50%',
                    data: results
                }]
            });
        }
        if(appCtrl.returnAppStates()._CAPACITACAO===appCtrl.getAppState()){
            showHideMainCol('hide')
            const capacitaResults = dataCtrl.returnResults('cursosCapacitacao')
            const horasResults = dataCtrl.returnResults('horasCapacitacao')[0]
            var innerTable = ''
            var meses = [0,0,0,0,0,0,0,0,0,0,0,0]
            var mesesInnerTable = ''
            meses.forEach((mes,index) => {
                var horas = 0
                capacitaResults.forEach(curso => {
                    if(parseInt(curso.data_fim.split('T')[0].split('-')[1])===index+1){
                        horas += curso.horas_fip
                    }
                })
                meses[index] = horas
                console.log(index)
            })
            console.log(meses)
            capacitaResults.forEach(r => {
                innerTable = `${innerTable}
                <tr>
                    <td class="text-left">${r.nome_curso}</td>
                    <td class="text-center">${r.horas_fip}</td>
                    <td class="text-cetner">${r.horas_priorizadas}</td>
                    <td class="text-center">${r.data_fim.split('T')[0]}</td>
                </tr>
                `
            })
            document.getElementById(this.col.subCol).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center" style="height:95%!important;padding:5px">
                <div id="${this.capacitacao.horasCapacitaTable}" clas+".container-fluid w-100 my-auto mx-auto text-center" style="height:30%!important">
                    <div class=".container-fluid w-100 h-50"> 
                        <div class="row w-100">
                            <div class="col-1">
                            </div>
                            <div class="col-4">
                                <table  class="table table-sm table-hover table-striped mx-auto">
                                    <thead class="thead-dark">
                                        <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Total horas:</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-center">${horasResults.horas_fip}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-2">
                            </div>
                            <div class="col-4">
                                <table  class="table table-sm table-hover table-striped mx-auto">
                                    <thead class="thead-dark">
                                        <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Total horas priorizadas:</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-center">${horasResults.horas_priorizadas}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-1">
                            </div>
                        </div>
                    </div>
                    <div class=".container-fluid w-100 mx-auto my-auto text-center h-50"> 
                        <table  class="table table-sm table-hover table-striped mx-auto">
                            <thead class="thead-dark">
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Jan</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Fev</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Mar</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Abr</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Mai</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Jun</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Jul</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Ago</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Set</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Out</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nov</th>
                                <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Dez</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center">${meses[0]}</td>
                                    <td class="text-center">${meses[1]}</td>
                                    <td class="text-center">${meses[2]}</td>
                                    <td class="text-center">${meses[3]}</td>
                                    <td class="text-center">${meses[4]}</td>
                                    <td class="text-center">${meses[5]}</td>
                                    <td class="text-center">${meses[6]}</td>
                                    <td class="text-center">${meses[7]}</td>
                                    <td class="text-center">${meses[7]}</td>
                                    <td class="text-center">${meses[9]}</td>
                                    <td class="text-center">${meses[10]}</td>
                                    <td class="text-center">${meses[11]}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="${this.capacitacao.capacitaTable}" class=".container-fluid" style="height:70%;overflow-y:scroll"> 
                    <table class="table table-sm table-hover table-striped mx-auto">
                        <thead class="thead-dark">
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Curso</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Horas</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Horas priorizadas</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Data conclusao</th>
                        </thead>
                        <tbody>
                            ${innerTable}
                        </tbody>
                    </table>
                </div>
            </div>
            `
        }
        if(appCtrl.returnAppStates()._QUIZ===appCtrl.getAppState()){
            showHideMainCol('show')
            var resultsQuiz = []
            dataCtrl.returnResults('quiz').forEach(q => {
                if(q.periodo===selectedPeriod && q.publicada === 1 && q.abonoFerias === 0){
                    resultsQuiz.push(q)
                }
            })
            if(resultsQuiz.length===0){
                document.getElementById(this.Highcharts.container).innerHTML = `
                <div class="card card-body align-middle w-100 my-auto">
                    <div class="alert alert-warning text-center">
                        <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Sem notas para o período</p>
                    </div>
                    <p class="h2" style="color:rgba(0, 0, 0, 0.534)"></p>
                    <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Talvez ainda não tenha sido publicado nenhum quiz esse mês. Fique de olho, eles podem estar escondidos nas notícias do Portal da GS!</p>
                    
                </div>
                `
            }else{
                var innerTable = ''
                resultsQuiz.forEach(quiz => {
                    innerTable = `${innerTable}
                    <tr>
                        <td class="text-center">${quiz.nroProva}</td>
                        <td class="text-center">${quiz.periodo}</td>
                        <td class="text-center">${quiz.qtdePerguntas}</td>
                        <td class="text-center">${parseInt(quiz.qtdeAcertos)}</td>
                        <td class="text-center"><strong>${(parseInt(quiz.qtdeAcertos)/quiz.qtdePerguntas)*100}</strong></td>
                    </tr>
                    `
                })
                document.getElementById(this.Highcharts.container).innerHTML = `
                <div id="${this.quiz.quizTable}" class=".container-fluid h-100 w-100"> 
                    <table class="table table-sm table-hover table-striped mx-auto">
                        <thead class="thead-dark">
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nro da prova</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Periodo</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Qtde de perguntas</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Qtde de acertos</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nota prova</th>
                        </thead>
                        <tbody>
                            ${innerTable}
                        </tbody>
                    </table>
                </div>
                `
            }
        }
        if(appCtrl.returnAppStates()._INDICADOREQUIPE===appCtrl.getAppState()){
            showHideMainCol('show')
            var resultsIndicadores = []
            dataCtrl.returnResults('indicadoresEquipe').forEach(p => {
                if(p.id_a_periodoAno===selectedPeriod&&parseFloat(p.valorIndicador)>0.0){
                    resultsIndicadores.push(p)
                }
            })
            if(resultsIndicadores.length===0){
                document.getElementById(this.Highcharts.container).innerHTML = `
                <div class="card card-body align-middle w-100 my-auto">
                    <div class="alert alert-warning text-center">
                        <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Sem indicador para o período</p>
                    </div>
                    <p class="h2" style="color:rgba(0, 0, 0, 0.534)"></p>
                    <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Talvez ainda não tenha sido publicado nenhum indicador esse mês.</p>
                    
                </div>
                `
            }else{
                const info = (dataCtrl.returnResults('infoFunci')).length > 0 ? dataCtrl.returnResults('infoFunci')[0] : dataCtrl.returnResults('infoFunci')
                document.getElementById(this.Highcharts.container).innerHTML = `
                <div class="card card-body align-middle w-100 my-auto">
                    <div class="alert alert-primary text-center">
                        <p class="h2" style="color:rgba(65, 105, 225, 0.534)"><strong>Indicador </strong>${info.indicadorEquipe}</p>
                    </div>
                    <p class="h2" style="color:rgba(0, 0, 0, 0.534)"></p>
                    <p class="h2" style="color:rgba(65, 105, 225, 0.534)">${dataCtrl.returnResults('infoFunci')[0].id_indicadorEquipe === 11 ? (parseFloat(resultsIndicadores[0].valorIndicador)).toFixed(2) : ((parseFloat(resultsIndicadores[0].valorIndicador)).toFixed(2).toString()+'%')}</p>
                    
                </div>
                `
            }
        }
        if(appCtrl.returnAppStates()._ACESSOGS===appCtrl.getAppState()){
            showHideMainCol('show')
            var resultsAcessosGS = []
            var resultsDiasTrabalhados = []
            var resultsDiasAbonosFerias = []
            dataCtrl.returnResults('acessosIntraGs').forEach(a => {
                if(a.id_a_periodoAno===selectedPeriod){
                    resultsAcessosGS.push(a)
                }
            })
            dataCtrl.returnResults('diasTrabalhados').forEach(d => {
                if(d.id_a_periodoAno===selectedPeriod){
                    resultsDiasTrabalhados.push(d)
                }
            })
            dataCtrl.returnResults('diasAbonoFerias').forEach(d => {
                if(d.id_a_periodoAno===selectedPeriod){
                    resultsDiasAbonosFerias.push(d)
                }
            })
            if(resultsAcessosGS.length===0){
                document.getElementById(this.Highcharts.container).innerHTML = `
                <div class="card card-body align-middle w-100 my-auto">
                    <div class="alert alert-warning text-center">
                        <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Sem indicador para o período</p>
                    </div>
                    <p class="h2" style="color:rgba(0, 0, 0, 0.534)"></p>
                    <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Talvez os indicadores ainda não foram atualizados</p>
                    
                </div>
                `
            }else{
                const info = (dataCtrl.returnResults('infoFunci')).length > 0 ? dataCtrl.returnResults('infoFunci')[0] : dataCtrl.returnResults('infoFunci')
                var innerTable = ''
                const diasTrabalho = resultsDiasTrabalhados.length > 0 ? resultsDiasTrabalhados[0].diasTrabalhados : 0
                const diasNaoTrabalho = resultsDiasAbonosFerias.length > 0 ? resultsDiasAbonosFerias[0].diasSemTrabalho : 0
                const acessoGS = resultsAcessosGS.length > 0 ? resultsAcessosGS[0].somaDiasGSAcessado : 0
                var nota = 0
                if(diasTrabalho>0){
                    switch (true) {
                        case ((acessoGS/diasTrabalho)===1):
                            nota = 100
                            break;
                        case ((acessoGS/diasTrabalho)>=0.8):
                            nota =80
                            break;
                        case ((acessoGS/diasTrabalho)>=0.6):
                            nota =60
                            break;
                        case ((acessoGS/diasTrabalho)>=0.4):
                            nota =40
                            break;
                        case ((acessoGS/diasTrabalho)>=0.2):
                            nota =20
                            break;
                        default:
                            nota =0
                            break;
                    }
                }
                document.getElementById(this.Highcharts.container).innerHTML = `
                <div id="${this.acessoGS.acessoTable}" class=".container-fluid h-100 w-100"> 
                    <table class="table table-sm table-hover table-striped mx-auto">
                        <thead class="thead-dark">
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Dias trabalhados no período</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Dias não trabalhados no período</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Qtde de acessos ao intraGS</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nota</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center">${diasTrabalho}</td>
                                <td class="text-center">${diasNaoTrabalho}</td>
                                <td class="text-center">${acessoGS}</td>
                                <td class="text-center"><strong>${parseInt(nota)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                `
            }
        }
    }
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //changeActiveButton
    changeActiveButtonAppState(appCtrl,eTarget){
        for(const i of document.getElementsByClassName('btnActive')){
           i.classList.remove('btnActive')
        }
        eTarget.classList.add('btnActive')
    }
    changeActiveButtonSelectedPeriod(appCtrl,eTarget){
        for(const i of document.getElementsByClassName('active')){
           i.classList.remove('active')
        }
        eTarget.classList.add('active')
    }
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //===========================================================================================================================================
    //RETURN ELEMENTS
    returnElements(){
        return this
    }
    
}