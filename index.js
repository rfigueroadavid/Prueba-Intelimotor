
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const puppeteer = require('puppeteer');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/publicarAnuncio',async (req, res) => {
    const body = req.body;
    const browser = await puppeteer.launch({"headless":true});
    try{
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
        await page.type(pwd, 'Intelimotor123')
        await page.click("#btnLogin")
        await page.waitForSelector("#login-bar")
        /* Click boton vender vehiculo */
        let clickVendeAuto = '#primaryNav .cta-btn .btn-primary'
        await page.evaluate((clickVendeAuto) =>{document.querySelector(clickVendeAuto).click()}, clickVendeAuto);
        /* Llenar formulario paso 1 */
        /* Seleccionando auto */
        let clickType = "#dropdown_types a"
        await page.waitForSelector('#dropdown_types a')
        await page.evaluate((clickType) =>{
            try {
                document.querySelectorAll(clickType)[0].click()
            } catch (error) {
                throw 'dropdown_types'+error
            }
        }, clickType);
        /* Seleccionando marca */
        clickType = "#dropdown_brands a"
        await page.waitForSelector('#dropdown_brands a')
        await page.waitFor(3000);
        await page.evaluate((clickType) =>{ 
            try{
            document.querySelectorAll(clickType)[0].click()
            } catch (error) {
                throw 'dropdown_brands'+error
            }
        }, clickType);
        /* Seleccionando modelo */
        clickType = "#dropdown_models a"
        await page.waitForSelector('#dropdown_models a')
        await page.waitFor(3000);
        await page.evaluate((clickType) =>{
            try{
                document.querySelectorAll(clickType)[1].click()
            } catch (error) {
                throw 'dropdown_models'+error
            }
        }, clickType);
        /* Seleccionando subtipo */
        clickType = "#dropdown_subtypes a"
        await page.waitForSelector('#dropdown_subtypes a')
        await page.evaluate((clickType) =>{
            try{
                document.querySelectorAll(clickType)[3].click()
            } catch (error) {
                throw 'dropdown_subtypes'+error
            }
        }, clickType);
        /* Seleccionando subtipo */
        clickType = "#dropdown_years a"
        await page.waitForSelector('#dropdown_years a')
        await page.evaluate((clickType) =>{
            try{
                document.querySelectorAll(clickType)[3].click()
            } catch (error) {
                throw 'dropdown_years'+error
            }
        }, clickType);
        /* Seleccionando estado */
        clickType = "#dropdown_provinces a"
        await page.waitForSelector('#dropdown_provinces a')
        await page.evaluate((clickType) =>{
            try{
                document.querySelectorAll(clickType)[18].click()
            } catch (error) {
                throw 'dropdown_provinces'+error
            }
        }, clickType);
        /* Seleccionando estado */
        clickType = "#dropdown_cities a"
        await page.waitForSelector('#dropdown_cities a')
        await page.evaluate((clickType) =>{
            try{
                document.querySelectorAll(clickType)[51].click()
            } catch (error) {
                throw 'dropdown_cities'+error
            }
        }, clickType);
        /* setear recorrido */
        await page.type('#input_recorrido', '2000')    
        /* setear precio */
        await page.type('#input_precio', body.precio.toString())
        /* click finalizar primer paso */
        let nxtB = ".next-button"
        await page.evaluate((nxtB) =>{
            try{
                document.querySelector(nxtB).click()
            } catch (error) {
                throw '.next-button 1 '+error
            }
        }, nxtB);
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
            await page.evaluate((nxtB) =>{ 
                try{
                    document.querySelectorAll(nxtB)[1].click()
                } catch (error) {
                    throw '.next-button 2 '+error
                }
            }, nxtB);
            await page.waitForSelector("#cancelButton")
            let free = "#cancelButton"
            await page.evaluate((free) =>{ 
                try{
                    document.querySelector(free).click()
                } catch (error) {
                    throw 'cancelButton '+error
                }
            }, free);
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
    }
    catch (error) {
        console.log("error",error.message)
        await browser.close();
        res.status(400).json({msg:error.message})
    }
    
})


app.listen(8080, () => {
 console.log("Server corriendo!");
});