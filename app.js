const express = require('express');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const app = express();
const port = 3000;

let options = new chrome.Options();
options.setChromeBinaryPath(process.env.CHROME_BINARY_PATH);
options.addArguments(
    '--headless',
    '--disable-gpu',
    '--window-size=1024x768'
);

app.get('/scrape', async (req, res) => {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    try {
        await driver.get('http://www.bianca.com');
        let body = await driver.findElement(By.tagName('body')).getAttribute('innerHTML');
        res.send(body);
    } catch(error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro durante o web scraping.');
    } finally {
        await driver.quit();
    }
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
