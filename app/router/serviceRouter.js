//node modules

//npm modules
const express = require('express')

//router criation
const serviceRouter = express.Router()
//application controller
const AppCtrl = require('../controller/appCtrl')
// =====================================================================================================================
//                                                  ROUTES
// =====================================================================================================================
serviceRouter.get('/fetchAllFuncis', AppCtrl.fetchAllFuncis)
serviceRouter.get('/fetchCurrentPeriod',AppCtrl.fetchCurrentPeriod)
serviceRouter.get('/findByChave/:chave', AppCtrl.findByChave)
serviceRouter.get('/acessoByChave/:data', AppCtrl.acessoByChave)
serviceRouter.get('/participanteByChave/:data', AppCtrl.participanteByChave)
serviceRouter.get('/fetchAllResults', AppCtrl.fetchAllResults)
serviceRouter.get('/fetchPeriodsToShow',AppCtrl.fetchPeriodsToShow)
serviceRouter.get('/fetchAvaliaEficFerramentas',AppCtrl.fetchAvaliaEficFerramentas)
serviceRouter.post('/uploadQuiz',AppCtrl.uploadQuiz)
serviceRouter.get('/fetchIndicadores',AppCtrl.fetchIndicadores)
serviceRouter.post('/uploadIndicadores',AppCtrl.uploadIndicadores)
serviceRouter.post('/uploadJornadaDeTrabalho',AppCtrl.uploadJornadaDeTrabalho)
serviceRouter.post('/avaliaEfic', AppCtrl.avaliaEficPost)
serviceRouter.get('/fetchAllPersonalResults', AppCtrl.fetchAllPersonalResults)

module.exports = serviceRouter