
const express = require('express');
const router = express.Router();

const contatoData = require ('../dataFiles/Contato');

const mysql = require('../dataFiles/ContatoMysql');
const postgree = require('../dataFiles/ContatoPostgree');

const conexaoMysql = new mysql();
const conexaoPostgree = new postgree();


const conexao = conexaoPostgree;

router.get('/',(req,res)=>{
    res.status(200).send({
        mensagem:'Rota para gerenciar Contatos'
    });

});


router.post('/add',verifyJWT,(req,resp)=>{

    const body = req.body;
    if(!body)
        return resp.status(400).end();
    
    var quant = body.contacts.length;

    var logs = "OK";
    for(var j=0;j<quant;j++){
        const dataContato = new contatoData(conexao);
        
        dataContato.addNovoContato(body.contacts[j].name,body.contacts[j].cellphone);
        console.log('ROTA ADD Contato:',logs,"<",body.contacts[j].name,"<",body.contacts[j].cellphone);
        
    }
        
    return resp.json(logs);
});

router.post('/list',verifyJWT,(req,resp)=>{
    const dataContato = new contatoData(conexao);
    return resp.json(dataContato.list());
});


function verifyJWT(req, res, next){
    
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, 'process.env.SECRET', function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}
module.exports = router;