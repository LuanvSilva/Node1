const http = require('http')
const fs = require('fs')



const port = 3000

const server = http.createServer((req,res) =>{
const urlInfo = require('url').parse(req.url,true)
const name = urlInfo.query.name

    if(!name){                                         // se usuario digita o nome ele cria um arquivo txt com o nome senao so axibe o formulario
    fs.readFile('index.html', function(err,data){
        res.writeHead(200, {'Contenty-Type' : 'text/html'})
        res.write(data)
        return res.end()
      })}else{
        fs.writeFile('arquivo.txt',name,function(err,data){
            res.writeHead(302,{
                location:'/',
            })
         return res.end()
        })
      }

    
})
server.listen(port,()=>{
    console.log(`O servidor esta rodando na porta ${port}`)
})