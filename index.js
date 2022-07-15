const express = require('express');
const { engine } = require('express-handlebars');
const { create } = require('express-handlebars');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();

const fakedata = [
    {
        id: 1,
        marca: 'Volvo',
        modelo: 'XC 60 POLESTAR',
        datafab: '12/12/1987',
        cordocarro: 'Preto',
        consumoMedioCidade: '12.1',
        consumoMedioRodovia: '18.2',
        numerochasssi: '1DBN38KMDJ',
    },
    {
        id: 2,
        marca: 'Volkswagen',
        modelo: 'Jetta',
        datafab: '12/12/2021',
        cordocarro: 'Branco',
        consumoMedioCidade: '12.1',
        consumoMedioRodovia: '18.2',
        numerochasssi: '89DNMI8761'
    }
];
/*Configura a engine (motor) do express para utilizar o handlebars */
app.use(bodyparser.urlencoded({extended: false}));
app.set('view engine','handlebars');
app.engine('handlebars', engine());

create({}).handlebars.registerHelper('checked', function(value, test) {
    if (value == undefined) return '';
    return value==test ? 'checked' : '';
});
/*disponibilizando acesso para as bibliotecas estaticas do bootstrap e jquery */
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
    //res.send("<h1>eu nao acredito</h1>");
    res.render('index');
});

/* DELETE */

app.get('/carros/delete/:id', function(req,res){
    let umcarro = fakedata.find(o => o.id == req.params['id']);
    let index = fakedata.indexOf(umcarro);
    if (index > -1){
        fakedata.splice(index,1);
    }
    res.render('carros/carros',{data: fakedata});
});


/* NOVO */

app.get('/carros/novo', function(req,res){
    res.render('carros/formcarro');
});

/* ALTERAR */

app.get('/carros/alterar/:id', function(req,res){
    let idcarro = req.params['id'];
    let umcarro = fakedata.find( o => o.id == idcarro);
    
    res.render('carros/formcarro', {carros: umcarro});
    
});



/* SAVE */ 
app.post('/carros/save', function(req,res){
    let carroantigo = fakedata.find(o => o.id == req.body.id);

    if(carroantigo != undefined){
        /*ALTERAR */
        carroantigo.marca = req.body.marca;
        carroantigo.modelo = req.body.modelo;
        carroantigo.datafab = req.body.datafab;
        carroantigo.cordocarro = req.body.cordocarro;
        carroantigo.consumoMedioCidade = req.body.consumoMedioCidade;
        carroantigo.consumoMedioRodovia = req.body.consumoMedioRodovia;
        carroantigo.numerochasssi = req.body.numerochasssi
    }else{
        /*INCLUIR */
        let maxid = Math.max(...fakedata.map( o => o.id));
        if (maxid == -Infinity) maxid = 0;

        let novocarro = {
            id: maxid + 1,
            /*cancelado: req.body.cancelado,*/
            marca: req.body.marca,
            modelo: req.body.modelo,
            datafab: req.body.datafab,
            cordocarro: req.body.cordocarro,
            consumoMedioCidade: req.body.consumoMedioCidade,
            consumoMedioRodovia: req.body.consumoMedioRodovia,
            numerochasssi: req.body.numerochasssi
        };
        fakedata.push(novocarro);
    }
    res.redirect("/carros");
});




app.get('/carros', function(req,res){
    //res.send("<h1>eu nao acredito</h1>");
    res.render('carros/carros', {listaclientes: fakedata});
});

/*inicialização da aplicação NodeJS + Express */
app.listen(3000, () =>{
    console.log('Server online - http://localhost:3000/');
});
