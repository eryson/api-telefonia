const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rotaRamal = require('./routes/ramal');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // ACEITAR APENAS DADOS SIMPLES
app.use(bodyParser.json()); // ACEITAR APENAS FORMATO JSON NO BODY

app.use((req, res, next) =>{
    //  res.header('Acces-Control-Allow-Origin', '*');
    //  res.header(
    //      'Acces-Control-Allow-Header',
    //      'Origin, X-Requested-With, Content-Type, Accpet, Authorization'
    //  );

    //  if (req.method === 'OPTIONS') {
    //      res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //      return res.status(200).send({});
    //  }

    //  next();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();

});

app.use('/ramal', rotaRamal);

// QUANDO NÃO ENCONTRA ROTAS
app.use((req, res, next) => {
    const erro = new Error('Não Encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;