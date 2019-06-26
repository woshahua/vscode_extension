import * as vscode from "vscode";

export class GotourView{
    private static panel: vscode.WebviewPanel | undefined;
    public static show(context: vscode.ExtensionContext){
        const panel = vscode.window.createWebviewPanel(
			"goIsBest",
			"go is the best language",
			vscode.ViewColumn.One,
			{}
        );
        (async ()=>{
			panel.webview.html = await this.getGotourContent();
		})();
    }
    public static async getGotourContent(): Promise<string>{
        const webdriver = require("selenium-webdriver");
        const chromedriver = require("chromedriver");

        const goTourList = ["welcome", "basics", "flowcontrol", "moretypes", "methods", "concurrency"];
        let choice = this.getRandomInt(0, goTourList.length);
        let page = this.getRandomInt(1, 10);
        let url = "https://go-tour-jp.appspot.com/" + goTourList[choice] + "/" + page;

        // chrome options
        const capabilities = webdriver.Capabilities.chrome();
        capabilities.set('goog:chromeOptions', {
        args: [
            '--headless',
            '--no-sandbox',
            '--disable-gpu',
            `--window-size=1980,1200`
            // other chrome options
            ]
        });

        const browser = await new webdriver.Builder().forBrowser("chrome").withCapabilities(capabilities).build();
        await browser.get(url);
        this.sleep(300);

        let html = await browser.executeScript(function() {
            // return document.getElementsByClassName('CodeMirror-line')[0].innerHTML; 
            return document.getElementsByClassName('slide-content ng-binding')[0].innerHTML;
        });

        await browser.quit();
        return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
        + '<title>Golang is the best</title></head><body><img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />'
        + html + '</body></html>';

    }

    private static getRandomInt(min:number, max:number) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min)) + min;
    }

    private static sleep(miliseconds: number){
    	var startMiliseconds = new Date();
    	while (new Date().getTime() - new Date(startMiliseconds).getTime() < miliseconds){
        }
    }
}