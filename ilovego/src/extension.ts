// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { start } from 'repl';
// const superagent = require("superagent");
// const cheerio = require("cheerio");


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

		console.log('Congratulations, your extension "ilovego" is now active!');
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const panel = vscode.window.createWebviewPanel(
			"helloWorld",
			"cat coding",
			vscode.ViewColumn.One,
			{}
		);
		(async function test(){
			panel.webview.html = await getGotourContent();
		})();
	});
}

async function getGotourContent(){
	const webdriver = require("selenium-webdriver");
	const chrome = require("selenium-webdriver/chrome");
	const chromedriver = require("chromedriver");

	const goTourList = ["welcome", "basics", "flowcontrol", "moretypes", "methods", "concurrency"]
	let choice = getRandomInt(0, goTourList.length);
	let page = getRandomInt(1, 10);
	let url = "https://go-tour-jp.appspot.com/" + goTourList[choice] + "/" + page;

	// chrome options
	const capabilities = webdriver.Capabilities.chrome();
	capabilities.set('chromeOptions', {
    args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        `--window-size=1980,1200`
        // other chrome options
	    ]
	});

	// chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
	const browser = await new webdriver.Builder().withCapabilities(capabilities).build();
	await browser.get(url);
	sleep(500);

    let html = await browser.executeScript(function() {
        return document.getElementsByClassName('slide-content ng-binding')[0].innerHTML;
	});

	await browser.quit();
	return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
	+ '<title>Golang is the best</title></head><body><img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />'
	+ html + '</body></html>';

}

function getRandomInt(min:number, max:number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function sleep(miliseconds: number){
	var startMiliseconds = new Date();
	while (new Date().getTime() - new Date(startMiliseconds).getTime() < miliseconds){
	};
}

export function deactivate() {}
