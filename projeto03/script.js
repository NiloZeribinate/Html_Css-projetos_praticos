const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const table = createTable(alfabeto)

function createTable(alf){
    let newTable = []

    for(let y in alf){
        let line = []

        for(let x in alf){
            const _x = Number(x)
            const _y = Number(y)

            let letterIndex = _x + _y > alf.length - 1 ? _x + _y - alf.length : _x + _y

            line.push(alf[letterIndex])
        }

        newTable.push(line)
    }

    return newTable
}



function handleCryptMessage(key, cryptionMessage){
    const elongatedKey = ElongathenString(key, cryptionMessage.length)
    let message = ''

    for(let i in cryptionMessage){
        message += GetLetter(elongatedKey[i], cryptionMessage[i])
    }

    return message

    function GetLetter(key, cryptionMessage){
        const isEqualKey = (letter) => (letter == key)
        const isEqualCryptionMessage = (letter) => (letter == cryptionMessage)
        let indexKey = table[0].findIndex(isEqualKey)
        let indexCryptionMessage = table[0].findIndex(isEqualCryptionMessage)
        
        return table[indexKey] [indexCryptionMessage]
    }
}

function handleEncryptMessage(key, encryptionMessage){
    const elongatedKey = ElongathenString(key, encryptionMessage.length)
    let message = ''

    for(let i in encryptionMessage){
        message += GetLetter(elongatedKey[i], encryptionMessage[i])
    }

    return message

    function GetLetter(key, encryptionLetter){
        const isEqualKey = (letter) => (letter == key)
        const isEqualEncryptionMessage = (letter) => (letter == encryptionLetter)
        let indexKey = alfabeto.findIndex(isEqualKey)
        let indexEncryptionMessage = table[indexKey].findIndex(isEqualEncryptionMessage)
        
        return table[indexEncryptionMessage][0]
    }
}



function ElongathenString(text, size){
    if(text.length >= size){
        return text.substr(0, size)
    }else{
        let elongatedText = text

        while(elongatedText.length < size){
            for(let i in text){
                if(elongatedText.length >= size) break

                elongatedText += text[i]
            }
        }

        return elongatedText
    }
}


function Crypt(){
    const key = document.getElementById('key').value
    const cryptionMessage = document.getElementById('cryptionMessage').value

    document.getElementById('encryptionMessage').value = handleCryptMessage(key, cryptionMessage)
}

function Encrypt(){
    const key = document.getElementById('key').value
    const encryptionMessage = document.getElementById('encryptionMessage').value

    document.getElementById('cryptionMessage').value = handleEncryptMessage(key, encryptionMessage)
}