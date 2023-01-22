let visibled = false

function handleChangeVisibleMenuNavegation(){
    if(visibled){
        document.getElementById('navegation').className = ''
        visibled = false
    }else{
        document.getElementById('navegation').className = 'invisibled'
        visibled = true
    }
}
