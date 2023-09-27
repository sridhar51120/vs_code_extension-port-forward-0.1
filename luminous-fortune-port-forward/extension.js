const vscode = require("vscode")

/**
 * @param {vscode.ExtensionContext} context
 */

async function activate(context) {

	let disposable = vscode.commands.registerCommand(
		"luminous-fortune-port-forward.port-forward",
		async function () {
			const userInput = await vscode.window.showInputBox({
				prompt: 'Enter Port Number or Host Name with Port Number : ',
				placeHolder: 'Enter here...',
			});
			if (userInput) {
				// vscode.window.showInformationMessage(`Value is : ${userInput}`);
				if(typeof userInput == 'number' && Number(userInput) != NaN){
					vscode.window.showInformationMessage(`Value type is  Number: ${userInput}`);
				}
				else if(userInput == 'string' && userInput.split(":")){
					const userinput = userInput.split(":");
					const hostName = userinput[0];
					const portNumber = userinput[1];
					// TODO: Add Functionalities
				}
				else {
					vscode.window.sshowErrorMessage(`Given String is invalid : ${userInput}`);
				}
			} else {
				vscode.window.showWarningMessage('Port Forward ==> No input provided...');
			}
		}
	)

	context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() { }

module.exports = {
	activate,
	deactivate,
}