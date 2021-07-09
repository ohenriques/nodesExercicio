const mysql = require('../database/Mysql').pool;

const mysqlContato = function () {

    return {
        addContato: (nome, cell) => {
            console.log("cadastrar novo :[", nome, ",", cell, "]");
            mysql.getConnection((error, conn) => {
                conn.query('INSERT INTO contacts (nome, celular) VALUES (?,?)',
                    [nome, cell],
                    (error, resultado, field) => {
                        conn.release();
                        if (error) {
                            console.log("Houve um erro:", error);

                        }
                    });
                console.log("Houve um sucesso:");

            });

        },
        listContato: (resultadoContato)  => {
            resultadoContato = [{ 'contacts' : [{name:"oi"}]}];
            console.log("Contato sendo listado");
            mysql.getConnection((error, conn) => {
                conn.query('SELECT * FROM contacts', (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        console.log("Houve um erro:",error);
                    }
                    var cont = resultado.length;
                    console.log("TOTAL:",cont);
                    for(var yes=0;yes<cont;yes++){
                          console.log("Nome: ",resultado[yes].nome, " Telefone:",resultado[yes].celular);
                    }
                    
                    resultadoContato.push(resultado[2].nome);
                    //resultadoContato = resultado;
                });
            });
            console.log("Contato>>>>>>:",resultadoContato[0].contacts);

        }
    }

}
module.exports = mysqlContato;