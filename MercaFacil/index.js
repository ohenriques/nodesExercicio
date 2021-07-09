const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const rotaContatos = require('./routes/RotaContato');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.listen(3010);

let db = [
    {'contacts' : [{name: 'teste', cellphone:'10101010' },{name: 'testess', cellphone:'1010101022' }] }
];

app.get('/',(req,resp) => {
    
    resp.json(db);
});

app.use('/contato',rotaContatos);



app.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'luiz' && req.body.password === '123'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, 'process.env.SECRET', {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})



app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})
