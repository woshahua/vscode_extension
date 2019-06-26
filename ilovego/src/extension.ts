// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { start } from 'repl';
import { Scheduler } from './scheduler';
import {GotourView} from "./goTourView";


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const scheduler = new Scheduler(context);
	scheduler.start();
	context.subscriptions.push(vscode.commands.registerCommand('extension.iloveGo', () => {
		GotourView.show(context);
	}));
}


export function deactivate() {}
