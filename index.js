
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const puppeteer = require('puppeteer');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/publicarAnuncio',async (req, res) => {
    try{
        const body = req.body;
        const browser = await puppeteer.launch({"headless":true});
        const page = await browser.newPage();
        await page.goto('https://www.seminuevos.com/');
        //Click login
        let selector = '#loginBtn';
        await page.evaluate((selector) => document.querySelector(selector).click(), selector);
        /* Login */
        let email = '#emailSignIn'
        let pwd = '#passwordSignIn'
        await page.waitForSelector(email)
        await page.type(email, 'rfigueroadavid@gmail.com')
        await page.type(pwd, 'Da102977')
        await page.click("#btnLogin")
        await page.waitForSelector("#login-bar")
        /* Click boton vender vehiculo */
        let clickVendeAuto = '#primaryNav .cta-btn .btn-primary'
        await page.evaluate((clickVendeAuto) => document.querySelector(clickVendeAuto).click(), clickVendeAuto);
        /* Llenar formulario paso 1 */
        /* Seleccionando auto */
        let clickType = "#dropdown_types a"
        await page.waitForSelector('#dropdown_types a')
        await page.evaluate((clickType) =>document.querySelectorAll(clickType)[0].click(), clickType);
        /* Seleccionando marca */
        clickType = "#dropdown_brands a"
        await page.waitForSelector('#dropdown_brands a')
        await page.evaluate((clickType) =>document.querySelectorAll(clickType)[0].click(), clickType);
        /* Seleccionando modelo */
        clickType = "#dropdown_models a"
        await page.waitForSelector('#dropdown_models a')
        await page.waitFor(3000);
        await page.evaluate((clickType) =>document.querySelectorAll(clickType)[1].click(), clickType);
        /* Seleccionando subtipo */
        clickType = "#dropdown_subtypes a"
        await page.waitForSelector('#dropdown_subtypes a')
        await page.evaluate((clickType) =>document.querySelectorAll(clickType)[3].click(), clickType);
        /* Seleccionando subtipo */
        clickType = "#dropdown_years a"
        await page.waitForSelector('#dropdown_years a')
        await page.evaluate((clickType) =>document.querySelectorAll(clickType)[3].click(), clickType);
        /* Seleccionando estado */
        clickType = "#dropdown_provinces a"
        await page.waitForSelector('#dropdown_provinces a')
        await page.evaluate((clickType) =>document.querySelectorAll(clickType)[18].click(), clickType);
        /* Seleccionando estado */
        clickType = "#dropdown_cities a"
        await page.waitForSelector('#dropdown_cities a')
        await page.evaluate((clickType) =>document.querySelectorAll(clickType)[51].click(), clickType);
        /* setear recorrido */
        await page.type('#input_recorrido', '2000')    
        /* setear precio */
        await page.type('#input_precio', body.precio.toString())
        /* click finalizar primer paso */
        let nxtB = ".next-button"
        await page.evaluate((nxtB) =>document.querySelector(nxtB).click(), nxtB);
        await page.waitForSelector('#input_text_area_review')
        /* Poner descripcion */
        await page.type('#input_text_area_review', body.descripcion)
       
        /* Subir imagenes */
        let imgs = ['./acura_1.jpeg','./acura_2.jpeg','./acura_3.jpeg']
        await page.waitForSelector('#Uploader')
        await page.click('#Uploader')
        const input = await page.$('input[type="file"]')
    
    
        Promise.all(imgs.map(async (path)=>{
            input.uploadFile(path)
        })).then( async ()=>{
            await page.waitFor(7000)
            await page.evaluate((nxtB) =>document.querySelectorAll(nxtB)[1].click(), nxtB);
            await page.waitForSelector("#cancelButton")
            let free = "#cancelButton"
            await page.evaluate((free) =>document.querySelector(free).click(), free);
            await page.waitFor(3000)
            await page.screenshot({path: 'imgPublish.png', fullPage: true});
            await browser.close();
            fs.readFile('imgPublish.png', 'base64',
                (e, base64Image) => {
                    if(e) res.status(400).json({msg:e.message})
                    const dataUrl = `data:image/jpeg;base64, ${base64Image}`
                    res.status(200).json({msg:"success",src:dataUrl})
                }
            );
        })
    }catch(e){
        res.status(400).json({msg:e.message})
    }
    
})



app.get('/',async (req,res)=>{
    const browser = await puppeteer.launch({"headless":false});
    const page = await browser.newPage();
    await page.goto('https://www.seminuevos.com/');
    //Click login
    let selector = '#loginBtn';
    await page.evaluate((selector) => document.querySelector(selector).click(), selector);
    /* Login */
    let email = '#emailSignIn'
    let pwd = '#passwordSignIn'
    await page.waitForSelector(email)
    await page.type(email, 'rfigueroadavid@gmail.com')
    await page.type(pwd, 'Da102977')
    await page.click("#btnLogin")
    await page.waitForSelector("#login-bar")
    /* Click boton vender vehiculo */
    let clickVendeAuto = '#primaryNav .cta-btn .btn-primary'
    await page.evaluate((clickVendeAuto) => document.querySelector(clickVendeAuto).click(), clickVendeAuto);
    /* Llenar formulario paso 1 */
    /* Seleccionando auto */
    let clickType = "#dropdown_types a"
    await page.waitForSelector('#dropdown_types a')
    await page.evaluate((clickType) =>document.querySelectorAll(clickType)[0].click(), clickType);
    /* Seleccionando marca */
    clickType = "#dropdown_brands a"
    await page.waitForSelector('#dropdown_brands a')
    await page.evaluate((clickType) =>document.querySelectorAll(clickType)[0].click(), clickType);
    /* Seleccionando modelo */
    clickType = "#dropdown_models a"
    await page.waitForSelector('#dropdown_models a')
    await page.waitFor(3000);
    await page.evaluate((clickType) =>document.querySelectorAll(clickType)[1].click(), clickType);
    /* Seleccionando subtipo */
    clickType = "#dropdown_subtypes a"
    await page.waitForSelector('#dropdown_subtypes a')
    await page.evaluate((clickType) =>document.querySelectorAll(clickType)[3].click(), clickType);
    /* Seleccionando subtipo */
    clickType = "#dropdown_years a"
    await page.waitForSelector('#dropdown_years a')
    await page.evaluate((clickType) =>document.querySelectorAll(clickType)[3].click(), clickType);
    /* Seleccionando estado */
    clickType = "#dropdown_provinces a"
    await page.waitForSelector('#dropdown_provinces a')
    await page.evaluate((clickType) =>document.querySelectorAll(clickType)[18].click(), clickType);
    /* Seleccionando estado */
    clickType = "#dropdown_cities a"
    await page.waitForSelector('#dropdown_cities a')
    await page.evaluate((clickType) =>document.querySelectorAll(clickType)[51].click(), clickType);
    /* setear recorrido */
    await page.type('#input_recorrido', '2000')    
    /* setear precio */
    await page.type('#input_precio', '150000')
    /* click finalizar primer paso */
    let nxtB = ".next-button"
    await page.evaluate((nxtB) =>document.querySelector(nxtB).click(), nxtB);
    await page.waitForSelector('#input_text_area_review')
    /* Poner descripcion */
    await page.type('#input_text_area_review', 'soy un prueba de puppeteer')
    
    /* Subir imagenes */
    let imgs = ['./acura_1.jpeg','./acura_2.jpeg','./acura_3.jpeg']
    await page.waitForSelector('#Uploader')
    await page.click('#Uploader')
    const input = await page.$('input[type="file"]')


    Promise.all(imgs.map(async (path)=>{
        input.uploadFile(path)
    })).then( async ()=>{
        await page.waitFor(7000)
        await page.evaluate((nxtB) =>document.querySelectorAll(nxtB)[1].click(), nxtB);
        await page.waitForSelector("#cancelButton")
        let free = "#cancelButton"
        await page.evaluate((free) =>document.querySelector(free).click(), free);
        // await browser.close();
        res.send('hola')
    })
})

app.listen(8080, () => {
 console.log("Server corriendo!");
});