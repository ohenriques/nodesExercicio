const contatoData = function(conexao){   
    return {
        addNovoContato: (nome,cell)=>{
            console.log("ADD function Contato ",nome,":",cell);
            conexao.addContato(nome,cell);
        },

        list: ()=>{
            var t ;
            conexao.listContato(t);
            console.log('Resultado AA:',t);
            return t;
        }
    }
}

module.exports = contatoData;