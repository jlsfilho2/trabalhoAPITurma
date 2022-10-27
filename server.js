const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2')

const cors = corsMiddleware({
  origins: ['*'],
})

const erros = require('restify-errors');
const servidor = restify.createServer({
    name:'loja',
    version:'1.0.0'
})
servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());
servidor.pre(cors.preflight)
servidor.use(cors.actual)
servidor.listen(8001,function(){
    console.log("%s executando em %s",servidor.name,servidor.url);
});


const knex = require('knex')({
    client: 'postgresql',
    connection: {
    host: 'localhost',
    user : "sistema",
    password : "admin",
    database:"api5",
    host : "localhost"
    }
});

servidor.get('/usuarios', (req,res,next) =>{
    console.log("lendo todos usuários")
        knex('usuarios').then((dados)=>{ res.send(dados) },next);
});


servidor.get('/usuarios/:idUser', (req,res,next)=> {
    const idUser = req.params.idUser;
    knex('usuarios').where('id',idUser)
    .first().then((dados)=> {
        if(!dados)
        return res.send(new erros.BadRequestError("usuario não encontrado"));
        else res.send(dados)
    },next);
});

servidor.del('/usuarios/:idUser', (req,res,next)=> {
    const idUser = req.params.idUser;
    console.log("deletando "  +idUser);
    knex('usuarios').where('id',idUser)
    .delete().then((dados)=> {
        if(!dados)
        return res.send(new erros.BadRequestError("usuario não encontrado"));
    },next);
});

servidor.put('/usuarios/:idUser', (req,res,next)=> {
    const idUser = req.params.idUser;
    console.log("editando "  +req.body.nome + ", email " + req.body.email);
    let nome = req.body.nome;
    let email = req.body.email;
    knex('usuarios').where('id',idUser)
    .update({
        nome,
        email
       })
       .returning(['id','nome', 'email'])
       .then(user=>{
        if(!user)
        return res.send(new erros.BadRequestError("usuario não encontrado"));
       else res.send(user)
       },next)
    });


servidor.post('/usuarios', (req,res,next)=> {
   // console.log("body " + JSON.parse(req));
    console.log("inserindo "  +req.body.nome + ", email " + req.body.email);
    let nome = req.body.nome;
    let email = req.body.email;
        knex('usuarios')
        .insert({
            nome, email
           })
           .returning(['id','nome', 'email'])
           .then(user=>{
            if(!user)
            return res.send(new erros.BadRequestError("erro ao inserir dados "));
           else res.send(user)
           },next);
        });
