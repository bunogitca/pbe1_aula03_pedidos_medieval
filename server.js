const express = require('express')
const pedidos = require('../dados.json')

const calcularSubtotais = () => {
        pedidos.forEach(p=>{
            p.subtotal = p.quantidade * p.preco
        })
    }
const listarPedidos = (req, res) => {
     calcularSubtotais()
    res.send(pedidos)
    }

const novoPedido = (req, res) => {
    if(req.body){
        pedidos.push(req.body)
        res.send("Pedido recebido, em processamento")
    }else{
        res.send("Erro ao receber pedido")
    }
}

const porta = 3000
const app = express()
app.use(express.urlencoded({extended:true}))

app.post("/", novoPedido)
app.get("/", listarPedidos)

app.listen(porta, () => {
    console.log(`Servidor http://127.0.0.1:${porta}`)
    console.log(`Cliente http://127.0.0.1:5500/cliente/`)
})
