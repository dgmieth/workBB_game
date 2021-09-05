//node modules

//npm modules
const express = require('express')

//router criation
const pageRouter = express.Router()
//application controller
const AppCtrl = require('../controller/appCtrl')
// =====================================================================================================================
//                                                  ROUTES
// =====================================================================================================================
pageRouter.get('', AppCtrl.getRootPage)
pageRouter.get('/desafioMoedas', AppCtrl.getDesafioMoedas)
pageRouter.get('/avaliaEfic', AppCtrl.avaliaEfic)
pageRouter.get('/personalResults', AppCtrl.personalResults)


module.exports = pageRouter