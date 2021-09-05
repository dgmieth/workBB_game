//npm modules
const { getJsDateFromExcel } = require("excel-date-to-js")
//infoAsText
const bbInfo = require('./infoAsText/bbInfo')
//model class
const Funci = require('../../model/classes/funcis')
const OtherData = require('../../model/classes/otherData')
//==================================================================================
//PAGE RENDERING
//==================================================================================
//root page
exports.getRootPage = (req,res,next) =>{
    if(!req.session.hasAccess){
        res.redirect('/personalResults')
    }
    getPeriodsToShow()
    .then(([data,metadata])=>{
        res.render('root', 
        {
            info: bbInfo,
            nome: req.session.nome,
            imgAddress: `https://humanograma.intranet.bb.com.br/avatar/${req.session.chave}`,
            data
        }
        )
    })
    .catch(err => console.log(err))
}
//desafio Moedas page
exports.getDesafioMoedas = (req,res,next) =>{
    res.send('Pagina em construção')
}
//avalia projetos Efic
exports.avaliaEfic = (req,res,next) => {
    var passedVariable = ''
    if(req.query.success){
        passedVariable = req.query.success
    }
    console.log(passedVariable)
    OtherData.fetchAvaliadores()
    .then(([data,metadata])=>{
        var eAvaliador = false
        data.forEach(avaliador =>{
            if(avaliador.matricula===req.session.chave){
                eAvaliador = true
            }
        })
        if(!eAvaliador){
            res.redirect('/personalResults')
        }else{
            var dataFerramentas = ''
            OtherData.fetchAvaliaEficFerramentas(req.session.chave)
            .then(([dataFerramentas,metadataFerramentas])=>{
                getPeriodsToShow()
                .then(([data,metadata])=>{
                    OtherData.fetchCurrentPeriod()
                    .then(([data3,metadata3])=>{
                        if(!req.session.loggedPagAvaliacaoEfic){
                            Funci.registerLog(req.session.chave,null,'Avaliacao Efic - Acesso a pagina')
                            .then(([data4,metadata4])=>{
                                req.session.loggedPagAvaliacaoEfic = true 
                                res.render('avaliaEfic',{
                                    info: bbInfo,
                                    nome: req.session.nome,
                                    imgAddress: `https://humanograma.intranet.bb.com.br/avatar/${req.session.chave}`,
                                    data,
                                    dataFerramentas,
                                    success: passedVariable==='true' ? true : false,
                                    error: passedVariable==='false' ? true : false,
                                    currentPeriod: data3[0].periodo,
                                    noMore: dataFerramentas.length > 0 ? false : true
                                })
                            })
                        } else {
                            res.render('avaliaEfic',{
                                info: bbInfo,
                                nome: req.session.nome,
                                imgAddress: `https://humanograma.intranet.bb.com.br/avatar/${req.session.chave}`,
                                data,
                                dataFerramentas,
                                success: passedVariable==='true' ? true : false,
                                error: passedVariable==='false' ? true : false,
                                currentPeriod: data3[0].periodo,
                                noMore: dataFerramentas.length > 0 ? false : true
                            })
                        }
                    })
                })
            })
        }
    })
    .catch(err => console.log(err))
}
//notAuthorized
exports.notAuthorized = (req,res,next)=>{
    res.render('notAuthorizaed')
}
//personalResults
exports.personalResults = (req,res,next) =>{
    res.render('personalResults',
        {info: bbInfo,
        nome: req.session.nome,
        imgAddress: `https://humanograma.intranet.bb.com.br/avatar/${req.session.chave}`})
}
//==================================================================================
//DATA MANIPULATION
//==================================================================================
//fetch all funcis
exports.fetchAllFuncis = (req,res,next)=>{
    Funci.fetchAllFuncis()
    .then(([data,metadata])=>{
        if(data){
            res.status(200).json(data)
        }
    })
    .catch(err =>{
        res.status(500).json({error: 'No data returned'})
    })
}
//find by chave
exports.findByChave = (req,res,next) =>{
    const chave = req.params.chave
    Funci.findByChave(chave)
    .then(([data,metadata])=>{
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json({error: 'No data returned'})
    })
}
//acesso by chave 
exports.acessoByChave = (req,res,next) =>{
    const dataOld = req.params.data.split('&')
    Funci.acessoByChave(dataOld[1], dataOld[0])
    .then(([data,metadata])=>{
        if(data.affectedRows>0){
            Funci.registerLog(req.session.chave,dataOld[0],dataOld[1]==1 ? 'Acesso dado' : 'Acesso excluído')
            .then(([data,metadata])=>{
                res.status(200).json({success: `${dataOld[0]} ${dataOld[1]==1 ? 'incluído' : 'excluído'}`})
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error: 'No data returned'})
    })
}
//participante by chave
exports.participanteByChave = (req,res,next) =>{
    const dataOld = req.params.data.split('&')
    Funci.participanteByChave(parseInt(dataOld[1]),dataOld[0])
    .then(([data,metadata])=>{
        if(data.affectedRows>0){
            res.status(200).json({success: `Participante ${dataOld[1]==1 ? 'incluído' : 'excluído'}`})
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error: 'No data returned'})
    })
}
//fetchCurrentPerio
exports.fetchCurrentPeriod = (req,res,next)=>{
    OtherData.fetchCurrentPeriod()
    .then(([data,metadata])=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: 'No data returned'})
    })
}
//fetch all results
exports.fetchAllResults = (req,res,next)=>{
    Funci.fetchAllResults()
    .then(([data,metadata])=>{
        if(data){
            res.status(200).json(data)
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error: 'No data returned'})
    })
}
//fetchPeriodsToShow
exports.fetchPeriodsToShow = (req,res,next) => {
    getPeriodsToShow()
    .then(([data,metadata])=>{
        res.status(200).json(data)
    })
    .catch(err => console.log(err))

}
//fetch ferramentas da efic para acaliar
exports.fetchAvaliaEficFerramentas = (req,res,next)=>{ 
    OtherData.fetchAvaliaEficFerramentas(req.session.chave)
    .then(([data,metadata])=>{
        if(data.length > 0){
            res.json(data)
        } else {
            res.json({avaliaca: `Avaliacao concluida para este periodo`})
        }
    })
    .catch(err => console.log(err))
}
//upload results quiz
exports.uploadQuiz = (req,res,next)=>{
    var data = req.body
    OtherData.uploadQuiz(data,(e)=>{
        if(e){
            Funci.registerLog(req.session.chave,null,'Quiz upload')
            .then(([data,metadata])=>{
                res.status(200).json(e)
            })
        }
    })
    .catch(err => console.log(err))
}
//fetchIndicadores
exports.fetchIndicadores = (req,res,next)=>{
    OtherData.fetchIndicadores()
    .then(([data,metadata])=>{
        if(data){
            res.json(data)
        }
    })
    .catch(err => console.log(err))
}
//uploadIndicadores
exports.uploadIndicadores = (req,res,next)=>{
    var data = req.body
    OtherData.uploadIndicadores(data.ajuizamentoEstrategico)
    .then(([data,metadata1])=>{
        if(data){
            Funci.registerLog(req.session.chave,null,'Indicador upload')
            .then(([data,metadata])=>{
                res.status(200).json({success: `Indicador e resultados atualizados`})
            })
        }
    })
    .catch(err => console.log(err))
}
//uploadJornadaDeTrabalho
exports.uploadJornadaDeTrabalho = (req,res,next)=>{
    var data = req.body
    data.forEach(r => {
        var date = getJsDateFromExcel(`${r.data}`).toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '') 
        r.data = date
    })
    OtherData.uploadJornadaDeTrabalho(data)
    .then(([data,metadata])=>{
        var affectedRows = 0
        if(data.length > 0){
            affectedRows = data[1].affectedRows
        }else {
            affectedRows = data.affectedRows
        }
        Funci.registerLog(req.session.chave,null,'Quiz upload')
            .then(([data,metadata])=>{
                res.json({success: `${affectedRows} registros atualizados`})
            })
    })
    .catch(err => console.log(err))
}
//get form data from post method in avaliaEfic
exports.avaliaEficPost = (req,res,next)=>{
    var data = req.body
    console.log(data)
    OtherData.avaliaEficPost(req.session.chave,data)
    .then(([data,metadata])=>{
        Funci.registerLog(req.session.chave,null,'Avaliacao Efic - Registro')
        .then(([data,metadata])=>{
            console.log(data)
            res.redirect(`/avaliaEfic/?success=true`)
        })
        .catch(err => { console.log(err)})
    })
    .catch(err => { 
        console.log(err)
        res.redirect(`/avaliaEfic/?success=false`)
    })

}
//fetchAllPersonalResults
exports.fetchAllPersonalResults = (req,res,next) => {
    Funci.fetchAllPersonalResults(req.session.chave)
    .then(([data,metadata])=>{
        res.json(data)
    })
    .catch(err => console.log(err))
}
//COMON FUNCTIONS 
function getPeriodsToShow(){
    return OtherData.fetchPeriodsToShow()
}