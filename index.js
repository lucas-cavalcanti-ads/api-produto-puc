const express = require('express');
const app = express();
const apicache = require('apicache');
let cache = apicache.middleware;

app.use(express.json());

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  }
    ]
};

let produtos = lista_produtos.produtos;

let lastModifiedTime = new Date();

app.put('/produtos/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const produto = produtos.find(produto => produto.id === id);
    const payload = req.body;    
    const index = produtos.indexOf(produto);

    if(payload.descricao == null || payload.valor == null || payload.marca == null){
        res.status(400).json({ mensagem: 'Verifique o preenchimento da requisição' })
    } else{
        if(produto){
            const produto = { id: id, descricao: payload.descricao, valor: payload.valor, marca: payload.marca };            
            produtos[index] = produto;            
            lastModifiedTime = new Date();
            res.status(201).json(produto);
        } else {
            res.status(404).json({ mensagem: `Produto de id ${id} não encontrado` }).send();
        }        
    } 
})

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(produto => produto.id === id);

    if(produto){
        const index = produtos.indexOf(produto);
        produtos.splice(index, 1);        
        lastModifiedTime = new Date();
        res.status(204).send();
    } else {
        res.status(404).json({ mensagem: `Produto de id ${id} não encontrado` }).send();
    }

})

app.post('/produtos', (req, res) => {

    const payload = req.body;

    if(payload.descricao == null || payload.valor == null || payload.marca == null){
        res.status(400).json({ mensagem: 'Verifique o preenchimento da requisição' })
    } else{
        produto = { id: produtos.length + 1, descricao: payload.descricao, valor: payload.valor, marca: payload.marca }
        produtos.push(produto);
        lastModifiedTime = new Date(); 
        res.status(200).json(produtos);
    }    
})

app.get('/produtos', cache('2 minutes'), (req, res) => {
    const ifModifiedSince = req.get('If-Modified-Since');
    if (ifModifiedSince && new Date(ifModifiedSince) >= lastModifiedTime) {
        return res.status(304).send(); // Retorna 304 se os dados não foram modificados
    }

    res.setHeader('Last-Modified', lastModifiedTime.toUTCString());
    res.json(produtos).send();
})

app.get('/produtos/:id', cache('2 minutes'), (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(produto => produto.id === id);

    const ifModifiedSince = req.get('If-Modified-Since');
    
    if (ifModifiedSince && new Date(ifModifiedSince) >= lastModifiedTime) {
        return res.status(304).send(); // Retorna 304 se os dados não foram modificados
    }else if(produto){
        res.setHeader('Last-Modified', lastModifiedTime.toUTCString());
        res.json(produto).send();
    } else {
        res.status(404).send();

    }
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
