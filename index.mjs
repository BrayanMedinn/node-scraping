import { chromium } from "playwright";

// AMAZON: guitarra esp

// Abrimos el navegador sin la ventana
const browser = await chromium.launch(
    { headless: true }
)

// Creamos una nueva pagina
const page = await browser.newPage()


// Url de la pagina de la cual queremos extraer los datos
await page.goto(
    'https://www.amazon.com.mx/s?k=guitarra+esp&__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=U32FVY97H1F&sprefix=guitarra+esp%2Caps%2C140&ref=nb_sb_noss_1'
)

// Recuperamos los productos con base a el contenedor en el HTML
const products = await page.$$eval('.s-card-container',
    (results) => (
        // Recorremos los productos y extraemos y retornamos la informacion que necesitemos
        results.map((el) =>{
            const title = el
            .querySelector('h2')
            ?.innerText

            if (!title) return null

            const image = el
            .querySelector('img')
            .getAttribute('src')

            const price = el
            .querySelector('.a-price .a-offscreen')
            ?.innerText

            const link = el
            .querySelector('.a-link-normal')
            .getAttribute('href')

            return { title, image, price, link }
        })
    )
)
// imprimimos y cerramos el navegador
console.log(products)
await browser.close()