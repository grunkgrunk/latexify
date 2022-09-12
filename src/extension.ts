import * as vscode from 'vscode';
import * as fs from 'fs';

import { Configuration, OpenAIApi } from "openai";

const getConf = <T = string>(key: string) => vscode.workspace.getConfiguration('latexify').get(key) as T;

export function activate(context: vscode.ExtensionContext) {
	// console.log('"latexify" is now active!');
	const mathText = fs.readFileSync('math.txt', 'utf8');
	let disposable = vscode.commands.registerCommand('latexify.convert', async () => {

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("No editor is active");
			return;
		}

		const text = editor.selection.isEmpty ?
			editor.document.lineAt(editor.selection.active.line).text :
			editor.document.getText(editor.selection);

		const apiKey = getConf<string>("apiKey");
		const model = "text-davinci-002"
		const temperature = 0.7;
		const max_tokens = 256;
		
		const openai = new OpenAIApi(new Configuration({ apiKey }));
		const prompt = `${mathText}${text}\nOutput:`;
		

		try {
			const response = await openai.createCompletion({
				model,							
				prompt,																												
				temperature,
				max_tokens,
				stop: ["Input:"]
			});

			const result = (response.data.choices ? response.data?.choices[0].text ?? "" : "");

			editor.edit(edit => {
				const active = editor.selection.active;
				
				const text = editor.selection.isEmpty ?
					(new vscode.Selection(new vscode.Position(active.line, 0), new vscode.Position(active.line + 1, 0))) :
					editor.selection

				edit.replace(text, result);
				
				}).then(success => 
					{
						const position = editor.selection.end; 
						editor.selection = new vscode.Selection(position, position);
					})
		} catch(e ) {
			vscode.window.showErrorMessage("Something went wrong. Did you set your API key?"); 
		}																																																																																																																																							
	});
	context.subscriptions.push(disposable);
}

export function deactivate() { }
