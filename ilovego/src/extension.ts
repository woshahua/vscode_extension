// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

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
		panel.webview.html = getWebviewContent();
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World!');
	});

	// context.subscriptions.push(disposable);
}

function getWebviewContent(){
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Cat Coding</title>
	</head>
	<body>
		<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
	</body>
	</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
