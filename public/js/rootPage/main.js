const appCtrl = new AppCtrl()
const dataCtrl = new DataCtrl()
const uiCtrl = new UICtrl()

uiCtrl.changeMainDispaly('none')
appCtrl.fetchAllFuncis(dataCtrl,uiCtrl)
