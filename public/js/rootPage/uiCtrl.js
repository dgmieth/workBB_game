class UICtrl {
    constructor(){
        this.main = 'main'
        this.spinner = 'spinner'
        this.staticBtnsIDs = {
            acessoBtn: 'acessoBtn',
            participantesBtn: 'participantesBtn',
            resultadosBtn: 'resultadosBtn',
            indicadorBtn: 'indicadorBtn',
            acessoGSBtn: `acessoGSBtn`,
            upQuizBtn: 'upQuizBtn'
        }
        this.dynamicBtnsIDs = []
        this.dynamicFilterIds = []
        this.divsIDs = {
            visualizarBtns: 'visualizar-btns',
            header: 'header',
            imageWrapper: 'image-wrapper',
            funciWrapper: 'funci-wrapper',
            innerTableResults: 'inner-table-results',
            spreadsheetWrapper: `spreadsheet-content-wrapper`,
            uploadQuizTable: `table-upload-quiz`
        }
        this.searchFieldIDs = {
            searchBox: 'search-box',
            searchButton: 'search-button',
            dynamicTable: 'dynamic-table'
        }
        this.listOfClasses = {
            btnActive: 'btnActive'
        }
        this.uploadQuizBtns = {
            submitUploadedQuiz: 'submitUploadedQuiz',
            clearUploadedQuiz: 'clearUploadedQuiz'
        }
        this.indicadores ={
            btns: {
                submit: `submitIndicador`,
                clear: `clearIndicador`,
            },
            inputID: 'inputAjuizamentoEstregico'
        }
        this.acessoGS = {
            btns: {
                upload: `uploadJornadaTrabalho`,
                submit: 'submitJornadaTrabalho',
                clear: 'clearJornadaTrabalho'
            }
        }
        this.height = 70
        this.progressBar = `progress-bar-downloading`
        this.downloadBtn = 'download-btn'
        this.inputExcelBtn= 'inputExcelBtn'
        this.mainContent = document.getElementById('main-content')
    }
    /*=======================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =======================================================================================================*/
    //BTN ACTIVE CLASS
    changeBtnActiveClass(btn, className){
        const btnOld = this.iterateOverButtons(className)
        if(btnOld){
            btnOld.classList.remove(className)
        }
        btn.classList.add(className)
    }
    iterateOverButtons(className){
        if(document.getElementsByClassName(className).length > 0){
            for(const btn of document.getElementsByClassName(className)){
                if(btn.classList.contains(className)){
                    return btn
                }
            }
        }
    }
    //CHANGE ACTIVE BUTTON ON IN FILTERS
    changeActiveButtonFilter(targetId){
        this.dynamicFilterIds.forEach(id => {
            const ele = document.getElementById(id)
            if(ele.id===targetId){
                ele.classList.add(`active`)
            }else{
                ele.classList.remove(`active`)
            }
        })
    }
    /*=======================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =======================================================================================================*/
    //DONWLOADING PROGRESS BAR
    downloadingProgressBar(show_hide_changeValue_donwloadBtn,dataCtrl,appCtrl){
        if(show_hide_changeValue_donwloadBtn===`show`){
            return `
            <div class="progress">
            <div id=${this.progressBar}  class="progress-bar" role="progressbar" style="width: 5%;" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100">5%</div>
            </div>
            `
        }else if(show_hide_changeValue_donwloadBtn===`hide`){
            return ``
        }else if(show_hide_changeValue_donwloadBtn==='downloadBtn'){
            document.getElementById(this.divsIDs.spreadsheetWrapper).innerHTML = `
            <div class=".container-fluid mx-auto text-center">
                <p class="h2" style="color:rgba(65, 105, 225, 0.534)">'resultado_${dataCtrl.returnData('selectedPeriod')}.xlsx' disponível para download.</p>
                <div class=".container-fluid w-100" style="height: 50px"></div>
                <button id=${this.downloadBtn} class="btn-primary not-include" type="button">Download</button>
            </div> 
            `
            appCtrl.loadDownloadEvenListener(dataCtrl,this)
        }else{
            const ele = document.getElementById(this.progressBar)
            ele.attributes[4].nodeValue = `${show_hide_changeValue_donwloadBtn}`
            ele.attributes[4].textContent = `${show_hide_changeValue_donwloadBtn}`
            ele.attributes[4].value = `${show_hide_changeValue_donwloadBtn}`
            ele.style.width = `${show_hide_changeValue_donwloadBtn}%`
            ele.textContent = `${show_hide_changeValue_donwloadBtn}%`
        }
    }
    /*=======================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =======================================================================================================*/
    //ALERTS
    showAlertAcessoParticipante(sucess_error,mensagem){
        if(sucess_error==='success'){
            const div = document.createElement('div')
            div.id = 'message'
            div.innerHTML = `
            <div class="container text-center mx-auto my-auto" style="padding: 5px;">
                <div id="inner-message" class="alert alert-primary text-center">
                    <div class="" style="width:11%!important;float:right">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                    </div>
                    <p>${mensagem}</p>
                </div>
            </div>
            `
            document.getElementById(this.divsIDs.header).insertBefore(div,document.getElementById(this.divsIDs.funciWrapper))
        }
        if(sucess_error==='error'){
            const div = document.createElement('div')
            div.id = 'message'
            div.innerHTML = `
            <div class="container text-center mx-auto" style="padding: 5px;">
                <div id="inner-message" class="alert alert-danger text-center">
                <div class="" style="width:11%!important;float:right">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                </div>
                    <p>${mensagem}</p>
                </div>
            </div>
            `
            document.getElementById(this.divsIDs.header).insertBefore(div,document.getElementById(this.divsIDs.funciWrapper))
        }
        setTimeout(() => {
           document.getElementById('message').remove()
        }, 3000);
    }
    /*=======================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =======================================================================================================*/
    //CHANGING UI ACCORDING TO APP STATE
    changeUIAccordingToAppState(appState,dataCtrl,appCtrl){   
        const searchBoxPart = `
        <div class=".container-fluid mx-auto text-center" style="display:flex;margin:5px 5px">
            <form class="form mx-auto w-100" style="display:inline!important">
                <div class="form-inline row text-center mx-auto">
                    <div class="form-group frm-setp col-10 w-100">
                        <input id="${this.searchFieldIDs.searchBox}" class="form-control" type="search" placeholder="Search" aria-label="Search" style="width:90%!important" />
                    </div>
                    <div class="form-group frm-setp col-2 w-100">
                        <button id="${this.searchFieldIDs.searchButton}" class="btn btn-outline-secondary not-include" type="button" style="width:100%!important" style="display:inline">Limpar</button>
                    </div>
                </div>
            </form>
        </div>
        `
        if(appState===(appCtrl.returnAppStateList())._INITIAL){
            this.clearMaintContent()
            this.iterateOverButtons(this.listOfClasses.btnActive) ? this.iterateOverButtons(this.listOfClasses.btnActive).classList.remove(this.listOfClasses.btnActive) : null
            this.mainContent.innerHTML = `
                <div class="card card-body d-table-cell align-middle w-100">
                    <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Escolha uma das opções à esquerda</p>
                </div>
            `
            this.mainContent.style.border= 'rgba(65, 105, 225, 0.534) 14px solid'
        }
        if(appState===(appCtrl.returnAppStateList())._ACESSO){
            this.clearMaintContent()
            const data = dataCtrl.returnData('funcis')
            var innerTable = []
            data.forEach(funci =>{
                innerTable = ` ${innerTable}
                    <tr>
                        <td class="text-center">
                            <input id="${funci.matricula}" type="checkbox" name="participante" ${(funci.acesso===1)? 'checked' : ''}>
                        </td>
                        <td class="text-center">${funci.matricula}</td>
                        <td class="text-left">${funci.nome}</td>
                        <td class="text-center">${funci.nome_area_trabalho}</td>
                        <td class="text-center">${funci.nome_equipe}</td>
                    </tr>
                `
            })
            var table = `
            
                ${searchBoxPart}
                
                <div id="${this.searchFieldIDs.dynamicTable}" class=".container-fluid" style="height:${this.height}vh!important;overflow-y:scroll"> 
                    <table class="table table-sm table-hover table-striped mx-auto">
                    <thead class="thead-dark">
                        <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Acesso</th>
                        <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Matricula</th>
                        <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nome</th>
                        <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Area</th>
                        <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Equipe</th>
                    </thead>
                    <tbody>
                        ${innerTable}
                    </tbody>
                    </table>
                </div>
            
            `
            this.mainContent.innerHTML = table
        }
        if(appState===(appCtrl.returnAppStateList())._PARTICIPANTES){
            this.clearMaintContent()
            const data = dataCtrl.returnData('funcis')
            var innerTable = []
            data.forEach(funci =>{
                innerTable = ` ${innerTable}
                    <tr>
                        <td class="text-center">
                            <input id="${funci.matricula}" type="checkbox" name="participante" ${(funci.participante===1) ? 'checked' : ''}>
                        </td>
                        <td class="text-center">${funci.matricula}</td>
                        <td class="text-left">${funci.nome}</td>
                        <td class="text-center">${funci.nome_area_trabalho}</td>
                        <td class="text-center">${funci.nome_equipe}</td>
                    </tr>
                `
            })
            var table = `
            ${searchBoxPart}
            <div id="${this.searchFieldIDs.dynamicTable}" class=".container-fluid" style="height:${this.height}vh!important;overflow-y:scroll"> 
                <table class="table table-sm table-hover table-striped mx-auto">
                <thead class="thead-dark">
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Participante</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Matricula</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nome</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Area</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Equipe</th>
                </thead>
                <tbody>
                    ${innerTable}
                </tbody>
                </table>
            </div>
            `
            this.mainContent.innerHTML = table
        }
        if(appState===(appCtrl.returnAppStateList())._RESULTADOS){
            const temptdata = (dataCtrl.returnData('mostrarResults'))
            var innerCol = ''
            temptdata.forEach(funci => {
                innerCol = `${innerCol} 
                    <div class="col-6">
                        <div class=".container-fluid" style="margin: 3px;border:rgba(0, 45, 75, 1) 1px solid">
                            <div class="row">
                                <div class="col-3 mx-auto" style="margin-top:5px;margin-left:5px">
                                    <div class="row mx-auto my-auto text-center">
                                        <div class="col-12 text-center">
                                            <img src="https://humanograma.intranet.bb.com.br/avatar/${funci.matricula}" alt="foto de <%= nome %>" style="height: 8vh; border-radius: 50%;">
                                        </div>
                                        <div class="col-12 text-center">
                                            <p style="font-size:2.5rem">${funci.media}</p>
                                        </div>
                                    </div>
                                </div>
                                <style>
                                    .inside-text{
                                        font-size:.9rem;
                                        padding:0;
                                        margin:0
                                    }
                                    .truncate {
                                        font-size:larger;
                                        margin:0;
                                        width: auto;
                                        text-align: justify;
                                        word-break: keep-all;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }
                                </style>
                                <div class="col-9 text-left">
                                    <div class=".container-fluid text-center mx-auto">
                                        <p id="${funci.matricula}" class="truncate"><strong>${funci.nome}</strong></p>
                                    </div>
                                    <p class="inside-text"><strong>Acesso intranetGS: </strong> ${funci.gsIntra}</p>
                                    <p class="inside-text"><strong>Capacitação: </strong> ${funci.capacitacao}</p>
                                    <p class="inside-text"><strong>Quiz: </strong> ${funci.quiz}</p>
                                    <p class="inside-text"><strong>Indicador por equipe: </strong> ${funci.equipe}</p>
                                    <p class="inside-text"><strong>Total pontos: </strong> ${funci.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `   
            })
            if(document.getElementsByClassName(this.divsIDs.innerTableResults).length > 0){
                document.getElementsByClassName(this.divsIDs.innerTableResults)[0].innerHTML = innerCol
            } else {
                this.clearMaintContent()
                var btnGroup = ''
                this.dynamicFilterIds.forEach(id =>{
                    btnGroup = `${btnGroup} 
                    <div class="p-2">
                        <button id="${id}" type="button" class="btn btn-secondary btn-sm ${(dataCtrl.returnData('currentPeriod')===parseInt(id.split(`-`)[1])) ? `active` : ``} filter-btn">
                            ${id.split('-')[1]}
                        </button>
                    </div>
                    `
                })
                this.mainContent.innerHTML = `
                    ${searchBoxPart}
                    <div class="d-flex p-2 justify-content-center" style="padding:0!important">
                        ${btnGroup}
                    </div>
                    <div class=".container-fuild" style="height:85%!important;overflow-y:auto;overflow-x:hidden">
                        <div class="row ${this.divsIDs.innerTableResults}">
                            ${innerCol}
                        </div>
                    </div>
                `
            }
        }
        if(appState===(appCtrl.returnAppStateList())._GERAR){
            this.clearMaintContent()
            this.mainContent.style.border = 'rgba(65, 105, 225, 0.534) 14px solid'
            this.mainContent.innerHTML = `
            <div id="${this.divsIDs.spreadsheetWrapper}" class="card card-body d-table-cell align-middle">
                <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Gerando resultados ${dataCtrl.returnData('selectedPeriod')}!</p>
                <div class=".container-fluid w-100" style="height: 50px"></div>
                ${this.downloadingProgressBar(`show`)}
            </div>
            
            `
        }
        if(appState===(appCtrl.returnAppStateList())._INDICADORES){
            var i = ''
            dataCtrl.returnData('indicadores').forEach(indicador => {
                if(indicador.id_a_mapearIndicadores === 12) {
                    i = indicador
                    return 
                }
            })
            this.clearMaintContent()
            this.mainContent.style.border = 'none'
            this.mainContent.innerHTML = `
            <div id="${this.divsIDs.spreadsheetWrapper}" class="card card-body d-table-cell align-middle">
                    <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Informe o(s) valor(es) para cada indicador:</p>
                    <div class=".container-fluid w-100 mx-auto text-center" style="height: 50px"></div>
                    <form class="">
                        <div id="wrapper" class="container mx-auto text-center" style="margin-bottom:50px!important!">
                            <div class=".container-fluid w-100 mx-auto text-center">
                                <label for="${this.indicadores.inputID}">Ajuiazmento Estratégico:</label>
                                <input type="number" id="${this.indicadores.inputID}" name="${this.indicadores.inputID}" step="0.01" min="0" max="100" style="width:100px!important" required>
                                <label for="${this.indicadores.inputID}">(valor atual <strong>${parseFloat(i.atingimento_semestre)}</strong> no período de <strong>${i.id_a_periodoAno})</strong></label>
                            </div>
                            </br>
                            <div class=".container-fluid w-100 mx-auto text-center">
                                <button id="${this.indicadores.btns.submit}" type="button" class="btn btn-primary not-include">Salvar dados</button>
                                <button id="${this.indicadores.btns.clear}" type="button" class="btn btn-warning not-include">Limpar dados</button>
                            </div>
                        </div>
                    </form>
                </div> 
               
            `
        }
        if(appState===(appCtrl.returnAppStateList())._ACESSOGS){
            this.clearMaintContent()
            this.iterateOverButtons(this.listOfClasses.btnActive) ? this.iterateOverButtons(this.listOfClasses.btnActive).classList.remove(this.listOfClasses.btnActive) : null
            var jornadaTrabalho = dataCtrl.returnData('jornadaTrabalho')
            var innerInfo = ''
            if(jornadaTrabalho==null){
                this.mainContent.innerHTML = `
                <div id="${this.divsIDs.spreadsheetWrapper}" class="card card-body align-middle h-100" style="important;overflow-y:scroll">
                    <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Escolha o arquivo de JORNADA DE TRABALHO a ser carregado!</p>
                    <div class=".container-fluid w-100 mx-auto text-center" style="height: 50px"></div>
                    <div id="wrapper" class="container mx-auto text-center h-100">
                        <input type="file" id="${this.acessoGS.btns.upload}" />
                        <div style="height:10px;"></div>
                        <p>Siga o passo a passo abaixo para a importação da planilha</p>
                        <p>Para baixar a planilha da jornada de trabalho clique <a href="https://bam.bb.com.br/spotfire/wp/analysis?file=/%5BP%C3%BAblica%5D/VIVAP/Dipes/Publico%20Interno/pub_info/JND_TRB&waid=xVOOQX0j0UCzCmJQZxwuR-1813137a1e-UWD&wavid=0" target="_blank"><strong>aqui</strong></a>.
                            Clique na aba <strong>Detalhes</strong>. Clique com o botão direito do mouse sobre qualquer parte da tabela e selecione <strong>Exportar >> Exportar Tabela</strong></p>
                        <div class="row text-center mx-auto my-auto">
                            <div class="col-4" style="border:1px black solid">
                                <p><strong>Passo um</strong> - Abra a planilha e selecione tode a coluna B (DT_JORNADA)<p>
                                <img src="/img/excel1.png" style="height: 150px!important;">
                            </div>
                            <div class="col-2">
                                <p class="h2">>></p>
                            </div>
                            <div class="col-4" style="border:1px black solid">
                                <p><strong>Passo dois</strong> - Busque a aba <strong>Página inicial</strong> no Excel.<p>
                                <img src="/img/excel2.png" style="height: 150px!important;">
                            </div>
                            <div class="col-4" style="border:1px black solid;margin-top:2px">
                                <p><strong>Passo três</strong> - No agrupamento <strong>Número</strong> troque o formato <strong>Data</strong> para <strong>Texto</strong><p>
                                <img src="/img/excel3.png" style="height: 150px!important;">
                            </div>
                            <div class="col-2" style="margin-top:2px">
                                <p class="h2">>></p>
                            </div>
                            <div class="col-4" style="border:1px black solid;margin-top:2px">
                                <p><strong>Passo quatro</strong> - <strong>Salve</strong> o arquivo. Feche o Excel. Clique no botão <strong>Escolher Arquivo</strong> desta página e clique no botão <strong>Enviar dados</strong> que será exibido depois de carregados os dados.<s <p>
                                <img src="/img/excel4.png" style="height: 150px!important;">
                            </div>
                        </div>
                    </div>
                </div>
                `
            }else{
                jornadaTrabalho.forEach(register => {
                    innerInfo = `
                    ${innerInfo}
                    <tr>
                        <td class="text-center">${register.matricula}</td>
                        <td class="text-left">${register.periodo}</td>
                        <td class="text-center">${register.diaUtil}</td>
                        <td class="text-center">${register.situacao}</td>
                        <td class="text-center">${register.nomeSituacao}</td>
                    </tr>
                    `
                })

                this.mainContent.innerHTML = `
                <div class=".container-fluid" style="height:85%!important;overflow-y:scroll">
                    <div id="${this.divsIDs.uploadQuizTable}" class=".container-fluid" > 
                        <table class="table table-sm table-hover table-striped mx-auto">
                        <thead class="thead-dark">
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Matricula</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Período</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Dia útil</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Código Situação</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nome Situação</th>
                        </thead>
                        <tbody>
                            ${innerInfo}
                        </tbody>
                        </table>
                    </div>
                </div>
                <div class="container mx-auto text-center" style="margin-top:5px">
                    <button id="${this.acessoGS.btns.submit}" class="btn btn-primary not-include" type="button">Enviar dados</button>
                    <button id="${this.acessoGS.btns.clear}" class="btn btn-warning not-include" type="button">Recarregar planilha</button>
                </div>
            `
            appCtrl.loadUploadedJornadaDeTrabalhoEventListeners(dataCtrl,this)
            this.mainContent.style.margin = '5px'
            this.mainContent.style.border= 'none'
            return
            }
        }
        if(appState===(appCtrl.returnAppStateList())._UPQUIZ){
            this.clearMaintContent()
            this.iterateOverButtons(this.listOfClasses.btnActive) ? this.iterateOverButtons(this.listOfClasses.btnActive).classList.remove(this.listOfClasses.btnActive) : null
            var uploadedArray = dataCtrl.returnData('uploadedQuiz')
            var innerInfo = ''
            if(uploadedArray==null){
                this.mainContent.innerHTML = `
                <div id="${this.divsIDs.spreadsheetWrapper}" class="card card-body d-table-cell align-middle">
                    <p class="h2" style="color:rgba(65, 105, 225, 0.534)">Escolha o arquivo de resultados QUIZ a ser carregado!</p>
                    <div class=".container-fluid w-100 mx-auto text-center" style="height: 50px"></div>
                    <div id="wrapper" class="container mx-auto text-center">
                        <input type="file" id="${this.inputExcelBtn}" />
                        <div style="height:10px;"></div>
                        <p> Faça o download da planilha para fazer upload dos resultados do quiz <a href="/downloads/template.xlsx"><strong>aqui</strong></a>.</p>
                    </div>
                </div>
                `
            }else{
                uploadedArray.forEach(register => {
                    innerInfo = `
                    ${innerInfo}
                    <tr>
                        <td class="text-center">${register.nome_funci}</td>
                        <td class="text-left">${register.matricula}</td>
                        <td class="text-center">${register.nroProva}</td>
                        <td class="text-center">${register.periodo}</td>
                        <td class="text-center">${register.qtdePerguntas}</td>
                        <td class="text-center">${register.qtdeAcertos}</td>
                        <td class="text-center">${register.abonoFerias}</td>
                    </tr>
                    `
                })
                
                this.mainContent.innerHTML = `
                <div class=".container-fluid" style="height: ${this.height-4}vh!important;overflow-y:scroll">
                    <div id="${this.divsIDs.uploadQuizTable}" class=".container-fluid" > 
                        <table class="table table-sm table-hover table-striped mx-auto">
                        <thead class="thead-dark">
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nome</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Matricula</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nro Prova</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Período</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Total perguntas</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Total Acertos</th>
                            <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Abono</th>
                        </thead>
                        <tbody>
                            ${innerInfo}
                        </tbody>
                        </table>
                    </div>
                </div>
                <div class="container mx-auto text-center" style="margin-top:5px">
                    <button id="${this.uploadQuizBtns.submitUploadedQuiz}" class="btn btn-primary not-include" type="button">Enviar dados</button>
                    <button id="${this.uploadQuizBtns.clearUploadedQuiz}" class="btn btn-warning not-include" type="button">Recarregar planilha</button>
                </div>
            `
            appCtrl.loadUploadedQuizEventListeners(dataCtrl,this)
            this.mainContent.style.margin = '5px'
            this.mainContent.style.border= 'none'
            return
            }
            this.mainContent.style.border= 'rgba(65, 105, 225, 0.534) 14px solid'
        }
    }
    clearMaintContent(){
        this.mainContent.style.margin = '0'
        this.mainContent.innerHTML = ''
        this.mainContent.style.border= ''
    }
    /*=======================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =======================================================================================================*/
    //CHANGING UI WITH SEARCH MODE ON
    changeUISearchModeON(dataCtrl,appCtrl,inputValue){
        if(!appCtrl.returnSearchMode()){
            return 
        }
        const data = this.searchBoxRegExp(inputValue)
        var innerTable = []
        data.forEach(funci =>{
            var checked = ''
            if(appCtrl.returnAppState()===(appCtrl.returnAppStateList())._ACESSO){
                checked = funci.acesso===1 ? 'checked' : ''
            }
            if(appCtrl.returnAppState()===(appCtrl.returnAppStateList())._PARTICIPANTES){
                checked = funci.participante===1 ? 'checked' : ''
            }
            innerTable = ` ${innerTable}
                <tr>
                    <td class="text-center">
                        <input id="${funci.matricula}" type="checkbox" name="participante" ${checked}>
                    </td>
                    <td class="text-center">${funci.matricula}</td>
                    <td class="text-left">${funci.nome}</td>
                    <td class="text-center">${funci.nome_area_trabalho}</td>
                    <td class="text-center">${funci.nome_equipe}</td>
                </tr>
            `
        })
        if(appCtrl.returnAppState()===(appCtrl.returnAppStateList())._ACESSO){
            var table = `
            <table class="table table-sm table-hover table-striped mx-auto">
                <thead class="thead-dark">
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Acesso</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Matricula</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nome</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Area</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Equipe</th>
                </thead>
                <tbody>
                    ${innerTable}
                </tbody>
            </table>
            `
        }
        if(appCtrl.returnAppState()===(appCtrl.returnAppStateList())._PARTICIPANTES){
            var table = `
            <table class="table table-sm table-hover table-striped mx-auto">
                <thead class="thead-dark">
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Participante</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Matricula</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Nome</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Area</th>
                    <th class="text-center" style="background-color:rgba(0, 45, 75, 1)!important">Equipe</th>
                </thead>
                <tbody>
                    ${innerTable}
                </tbody>
            </table>
            `
        }
        if(appCtrl.returnAppState()===(appCtrl.returnAppStateList())._RESULTADOS){
            var data2 = []
            dataCtrl.returnData('mostrarResults').forEach(result => {
                if(result.searchField.match(this.searchBoxRegExp(inputValue,true))){
                    data2.push(result)
                }
            })
            var innerCol = ''
            data2.forEach(funci => {
                innerCol = `${innerCol} 
                    <div class="col-6">
                        <div class=".container-fluid" style="margin: 3px;border:rgba(0, 45, 75, 1) 1px solid">
                            <div class="row">
                                <div class="col-3 mx-auto" style="margin-top:5px;margin-left:5px">
                                    <div class="row mx-auto my-auto text-center">
                                        <div class="col-12 text-center">
                                            <img src="https://humanograma.intranet.bb.com.br/avatar/${funci.matricula}" alt="foto de <%= nome %>" style="height: 8vh; border-radius: 50%;">
                                        </div>
                                        <div class="col-12 text-center">
                                            <p style="font-size:2.5rem">${funci.media}</p>
                                        </div>
                                    </div>
                                </div>
                                <style>
                                    .inside-text{
                                        font-size:.9rem;
                                        padding:0;
                                        margin:0
                                    }
                                    .truncate {
                                        font-size:larger;
                                        margin:0;
                                        width: auto;
                                        text-align: justify;
                                        word-break: keep-all;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }
                                </style>
                                <div class="col-9 text-left">
                                    <div class=".container-fluid text-center mx-auto">
                                        <p id="${funci.matricula}" class="truncate"><strong>${funci.nome}</strong></p>
                                    </div>
                                    <p class="inside-text"><strong>Acesso intranetGS: </strong> ${funci.gsIntra}</p>
                                    <p class="inside-text"><strong>Capacitação: </strong> ${funci.capacitacao}</p>
                                    <p class="inside-text"><strong>Quiz: </strong> ${funci.quiz}</p>
                                    <p class="inside-text"><strong>Indicador por equipe: </strong> ${funci.equipe}</p>
                                    <p class="inside-text"><strong>Total pontos: </strong> ${funci.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `   
            })
            if(document.getElementsByClassName(this.divsIDs.innerTableResults).length > 0){
                document.getElementsByClassName(this.divsIDs.innerTableResults)[0].innerHTML = innerCol
            }
        }else{
            document.getElementById(this.searchFieldIDs.dynamicTable).innerHTML = table
        }
    }
    searchBoxRegExp(inputValue,resultadosTrue){
        inputValue = inputValue.replace(/[ÁÃÂÀÄ]/ig,'a')
        inputValue = inputValue.replace(/[ÉÊËÈ]/ig,'e')
        inputValue = inputValue.replace(/[ÍÏÎÌ]/ig,'i')
        inputValue = inputValue.replace(/[ÓÕÔÖÒ]/ig,'o')
        inputValue = inputValue.replace(/[ÚÙÛÜ]/ig,'u')
        inputValue = inputValue.replace(/[Ç]/ig,'c')
        const regExpr = new RegExp(inputValue, 'ig')
        if(resultadosTrue){
            return regExpr
        }   
        var data = []
        dataCtrl.returnData('funcis').forEach(funci => {
            if(funci.searchField.match(regExpr)){
                data.push(funci)
            }
        })
        return data
    }
    clearSearchBox(){
        document.getElementById(this.searchFieldIDs.searchBox).value = ''
    }
    /*=======================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =======================================================================================================*/
    //RETURN IDs
    returnIDs(){
        return this
    }
    //SET PLANILHA IDS
    setPlanilhaIDs(periodoArray){
        periodoArray.forEach(r => {
            this.dynamicBtnsIDs.push(r.periodo)
            this.dynamicFilterIds.push(`btnGroup-${r.periodo}`)
        })
    }
    /*=======================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =========================================================================================================
    =======================================================================================================*/
    //change main display
    changeMainDispaly(none_block){
        if(none_block==='none'){
            document.getElementById(this.main).style.display = none_block
            document.getElementById(this.spinner).style.display = 'block'
        }else if(none_block==='block'){
            document.getElementById(this.spinner).style.display = 'none'
            document.getElementById(this.main).style.display = none_block
        }
    }
}