const inquirer = require('inquirer')
const chalk = require('chalk')

//modulos internos
const fs = require('fs')
const { error } = require('console')
operation()
function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que voce deseja fazer',
            choices: ['Criar Conta', 'Consutar Saldo', 'Depositar', 'Sacar', 'Sair',],
        },
    ]).then((answer) => {
        const action = answer['action']
        if(action === 'Criar Conta'){
            createAccount()
        }else if(action === 'Depositar'){
            deposit()
        }else if(action === 'Consutar Saldo'){

        }else if(action === 'Sacar'){

        }else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o account!'))
            process.exit()
        }

    }).catch((err) => console.log(err))
}
 //Criação de conta
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.bgGreen('Defina as opção da sua conta a seguir'))
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([{

        name:'accoutName',
        message:'Digite um nome para sua conta',


    },]).then((answer) =>{
        const accoutName = answer['accoutName']
        console.info(accoutName)
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/ ${accoutName}.json`)){
            console.log(chalk.bgRed.black('Esta conta ja existe, escolha outro nome!'),)
            buildAccount()
            return
        }
        fs.writeFileSync(`accounts/${accoutName}.json`,'{"balance":0}',function(err){
            console.log(err)
        },)
            console.log(chalk.green('Parabéns, a sua conta foi criada'))
            operation()
    }).catch((err) => console.log(err))
}


//Funçao para depositar dinheiro na conta
function deposit(){
    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da sua conta',
    },]).then((answer) => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return deposit()
        }
        inquirer.prompt([{
            name:'accountName',
            message:'Quanto voce deseja depositar',
        },]).then((answer) =>{
            

        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
}
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta nao existe, escolha outro nome!'))
        return false
    }
    return true
}