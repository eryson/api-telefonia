const mysql = require('../mysql').pool;

exports.getRamal = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            'SELECT * FROM ramal',
            (error, result, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error, response: null})};
                const response = {
                    quantidade: result.length,
                    ramais: result.map(ramal => {
                        return {
                            id_ramal: ramal.id_ramal,
                            nome: ramal.nome,
                            numero: ramal.numero,
                            request: {
                                tipo: 'GET',
                                decricao: 'Retorna um ramal específico',
                                url: 'http://localhost:3000/ramal/' + ramal.id_ramal
                            }
                        };
                    })
                };
                return res.status(200).send(response);
            }
        );
    });
};

exports.postRamal = (req, res, next) => {
    console.log(req.file);
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            'INSERT INTO ramal (nome, numero) VALUES (?,?)',
            [
                req.body.nome, 
                req.body.numero
            ],
            (error, result, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error, response: null})};
                const response = {
                    mensagem: 'Ramal Inserido com Sucesso',
                    ramalCriado: {
                        id_ramal: result.id_ramal,
                        nome: req.body.nome,
                        numero: req.body.numero,
                        request: {
                            tipo: 'GET',
                            decricao: 'Retorna todos os ramais',
                            url: 'http://localhost:3000/ramal'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
};

exports.getUmRamal = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            'SELECT * FROM ramal WHERE id_ramal = ?;',
            [req.params.id_ramal],
            (error, result, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error, response: null})};
                if (result == 0) {
                    return res.status(404).send({
                        mensagem: "Não foi encontrado um ramal com este ID"
                    });
                }

                const response = {
                    ramal: {
                        id_ramal: result[0].id_ramal,
                        nome: result[0].nome,
                        numero: result[0].numero,
                        request: {
                            tipo: 'GET',
                            decricao: 'Retorna todos os ramais',
                            url: 'http://localhost:3000/ramal'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    });
};

exports.updateRamal = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            `UPDATE
                ramal
             SET
                nome   = ?,
                numero = ?
             WHERE
                id_ramal = ?`,
            [
                req.body.nome, 
                req.body.numero,
                req.body.id_ramal
            ],

            (error, result, field) => {
                conn.release();
                if (error) {return res.status(500).send({error: error, response: null})};
                const response = {
                    mensagem: 'Ramal alterado com Sucesso',
                    ramalAtualizado: {
                        id_ramal: result.id_ramal,
                        nome: req.body.nome,
                        numero: req.body.numero,
                        request: {
                            tipo: 'PATCH',
                            decricao: 'Altera um ramal',
                            url: 'http://localhost:3000/ramal/' + req.body.id_ramal
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};

exports.deleteRamal = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            'DELETE FROM ramal WHERE id_ramal = ?',
            [req.body.id_ramal],
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({error: error, response: null})};
                const response = {
                    mensagem: 'Ramal Excluido com Sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um Ramal',
                        url: 'http://localhost:3000/ramal',
                        body: {
                            nome: 'String',
                            numero: 'INT'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};