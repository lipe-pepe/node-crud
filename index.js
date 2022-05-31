const express = require('express')
const cors = require('cors')

const server = express()
server.use(cors())
// Temos que fazer a aplicação usar o formato JSON para pedidos e respostas:
server.use(express.json())

// Lista de produtos:
let produtos = [
    {id: 1, nome: 'Banana', preco: 'R$10,20'},
    {id: 2, nome: 'Uva', preco: 'R$5,60'},
    {id: 3, nome: 'Pão', preco: 'R$8,40'},
    {id: 4, nome: 'Peito de Frango', preco: 'R$29,90'},
    {id: 5, nome: 'Laranja', preco: 'R$2,80'},
]

// ----- Método GET - Usado para buscar informações: -----

server.get('/produtos', (req, res) => {
    res.json({
        // Num caso real, teríamos algum serviço para buscar os dados no bando de dados,
        // como só estamos demonstrando, usamos a variável produtos.
        produtos: produtos
    })
})

// ----- Método POST - Usado para enviar dados ao back-end: -----

// A rota pode ter o mesmo nome, mas com métodos http diferentes. Vamos simular um usuário preenchendo
// um formulário. Os dados virão no corpo da requisição.
server.post('/produtos', (req, res) => {
    const produto = req.body
    produtos.push(produto)

    res.send('Produto cadastrado com sucesso')
})

// ----- Método PUT- Usado para fazer edição de registros no back-end: -----

server.put('/produto/:id', (req, res) => {
    const {id} = req.params

    const indexProduto = produtos.findIndex(p => p.id == id)
    produtos[indexProduto] = {
        ...produtos[indexProduto],
        ...req.body
    }

    res.send('Produto atualizado com sucesso!')
})


// ----- Método DELETE- Usado para fazer edição de registros no back-end: -----

// Vamos usar os parâmetros pelo query params agora: 
server.delete('/produto', (req, res) => {
    const {id} = req.query

    // Nesse filtro, ele vai copiar tudo o que tiver a id diferente da id do produto que queremos deletar:
    produtos = produtos.filter(p => p.id != id)

    res.send('Produto deletado com sucesso!')
})

// Rota acessada da raiz:
server.get('/', (req, res) => {
    res.send('Hello world!')
})

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000... Acesse localhost:3000")
})