//criando as variáveis
const axios = require('axios')
const https = require('https')

const urlInfo = require('./urlInfo')

const Funci = require('../../model/classes/funcis')
const { copyFileSync } = require('fs')
//const registraLog = require('../functions/registraLog')
//criado código para validação do usuário e inserindo informações do intranet.bb.com.br no req
module.exports = {
    async validaToken(req,res,next) {
        var header = req.headers
        var objetoHeader = header
        
        objetoDados = []
        delete objetoHeader["content-length"]
        objetoHeader.host = urlInfo.host;
        objetoHeader["user-agent"] = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:60.0) Gecko/20100101 Firefox/60.0"
        return await axios({
            method: 'GET',
            url: urlInfo.endereco,
            headers: objetoHeader,
            strctSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).then(async response => {
            if(response.status > 300) {
                res.charset = 'UTF-8',
                res.status(401).send({error: 'Efetue login na intranet novamente'})
            } else {
                const usuario = response.data.attributes
                
                for await (objeto of usuario) {
                    if (objeto.name == "cd-cmss-usu") {
                        req.session.comissao = parseInt(objeto.values)
                    }
                    if (objeto.name == "displayname") {
                        req.session.nome = objeto.values
                    }
                    if (objeto.name == "chaveFuncionario") {
                        req.session.chave = objeto.values + ""
                    }
                    if (objeto.name == "cd-pref-depe") {
                        req.session.prefixo = parseInt(objeto.values)
                    }
                    if (objeto.name == "cd-eqp") {
                        req.session.eqp = objeto.values
                    }
                } 
                if (req.session.prefixo === 4935) {
                    if(!req.session.logged){
                        Funci.getAcessoByChave(req.session.chave)
                        .then(([data,metadata])=>{
                            if(data[0].acesso===1){
                                req.session.hasAccess = true
                            }else{
                                req.session.hasAccess = false
                            }
                            req.session.logged = true
                            Funci.registerLog(req.session.chave,null,'Log-in')
                            .then(([data,metadata])=>{
                                next()
                            })
                            .catch(err => {
                                console.log(err)
                                next()
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(301).render('notAuthorized', {message: 'Faça Log-In na Intranet novamente!', link: 'https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://gs4935.intranet.bb.com.br:4021'})  
                        })
                    }else{
                        next()
                    }
                } else {
                    res.status(301).render('notAuthorized', {message: 'Funcionário não pertence ao prefixo 4935!',link:false})  
                    
                }
            }
        }).catch(err =>{
            res.status(301).render('notAuthorized', {message: 'Faça Log-In na Intranet novamente!', link: 'https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://gs4935.intranet.bb.com.br:4021'})  
            
        })
    }
}
