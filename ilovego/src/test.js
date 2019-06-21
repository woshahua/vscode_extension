// const superagent = require("superagent");
// const cheerio = require("cheerio");
const webdriver = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
const chromedriver = require("chromedriver")

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

(async function test(){
    const browser = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    try{
        await browser.get("https://tour.golang.org/basics/1");
        // let title = await browser.findElement(webdriver.By.className("slide-content ng-binding")).getInnerHtml();
        // // let title = await browser.getTitle();
        // console.log(title)
        let html = await browser.executeScript(function() {
           return document.getElementsByClassName('slide-content ng-binding')[0].innerHTML;
        });
        console.log(html)

    }finally{
        await browser.quit();
    }
})()