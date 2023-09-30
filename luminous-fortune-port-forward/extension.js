
const vscode = require('vscode');
const net = require('net')
// we can use the inbuild methods in vscode in Js
// const { 
// 	ExtensionContext,
// 	StatusBarAlignment,
// 	window,
// 	StatusBarItem,
// 	Selection,
// 	workspace,
// 	TextEditor,
// 	commands,
// 	ProgressLocation
// } = vscode;

/**
 * @param {vscode.ExtensionContext} context
 */

async function forwardPortWithProgress(sourcePort, destinationPort, destinationHost) {
	const totalSteps = 100;
	const progressTitle = 'Port Forwarding Progress';
	// const currentTime = new Date().toLocaleTimeString();
    // const debugMessage = `[${currentTime}] ${message}`;
	const progressMessage = 'Forwarding traffic...';
	console.log(`Port Forwarding starts --> HostName : ${destinationHost} and Port Number : ${destinationPort}`);
	console.log("Port Forwarding Progress Starts")
	await vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: progressTitle,
		cancellable: true,
	}, async (progress, token) => {
		progress.report({ increment: 0, message: progressMessage });

		try {
			const server = net.createServer((sourceSocket) => {
				const destinationSocket = net.connect(destinationPort, destinationHost, () => {
					sourceSocket.pipe(destinationSocket);
					destinationSocket.pipe(sourceSocket);
				});

				sourceSocket.on('error', (err) => {
					console.error('Source socket error:', err);
				});

				destinationSocket.on('error', (err) => {
					console.error('Destination socket error:', err);
				});
				sourceSocket.on('end', () => {
					destinationSocket.end();
				});

				destinationSocket.on('end', () => {
					sourceSocket.end();
				});
			});
			server.listen(sourcePort, () => {
				console.log(`Port forwarding server is listening on port ${sourcePort}`);
			});
			for (let step = 0; step < totalSteps; step++) {
				if (token.isCancellationRequested) {
					vscode.window.showInformationMessage('Port Forwarding was canceled.');
					break;
				}

				const increment = 100 / totalSteps;
				progress.report({ increment, message: progressMessage });

				await new Promise((resolve) => setTimeout(resolve, 100));
			}

			vscode.window.showInformationMessage('Port Forwarding completed.');

		} catch (error) {
			vscode.window.showErrorMessage('Port Forwarding encountered an error: ' + error.message);
		}
	});
}

function UserAction(inputString, startString, endString) {
	const startIndex = inputString.indexOf(startString);
	const endIndex = inputString.indexOf(endString, startIndex + startString.length);

	if (startIndex !== -1 && endIndex !== -1) {
		return inputString.substring(startIndex + startString.length, endIndex);
	} else {
		return null;
	}
}

function checkInputFormat(inputString, char1, char2) {
	return inputString.includes(char1) && inputString.includes(char2);
}

function isPortInUse(port) {
	return new Promise((resolve) => {
		const server = net.createServer()
			.once('error', (err) => {
				if (err.code === 'EADDRINUSE') {
					resolve(true); // Port is in use
				} else {
					resolve(false); // Other error
				}
			})
			.once('listening', () => {
				server.close();
				resolve(false); // Port is not in use
			})
			.listen(port, '127.0.0.1');
	});
}

function activate(context) {

	context.subscriptions.push(vscode.commands.registerCommand(
		"luminous-fortune-port-forward.port-forward",
		async function () {
			const userInput = await vscode.window.showInputBox({
				prompt: 'Enter source Port Number or source Host Name with Port Number : ',
				placeHolder: 'Enter here...',
			});
			if ((typeof userInput === "string") && checkInputFormat(userInput, ':', '/')) {
				// vscode.window.showInformationMessage("Success");
				const hostName = UserAction(userInput, "", ":");
				const portNumber = UserAction(userInput, ":", "/");
				const userAction = userInput.split("/")[1]

				console.log(`User Action : ${userAction}`)
				console.log(`HostName : ${hostName}`);
				console.log(`PortName: ${portNumber}`);

				isPortInUse(portNumber)
					.then((inUse) => {
						if (inUse) {
							vscode.window.showErrorMessage("Port is already Allocated...");
						} else {
							const infoPortDetails = `HostName : ${hostName}\nPortName : ${portNumber}`;
							vscode.window.showInformationMessage("Port is Not Available");
							vscode.window.showWarningMessage(
								`Shall I start the port forwarding action?\n${infoPortDetails}`,
								'Yes', 'No'
							)
								.then((selectedAction) => {
									const extensionConfigDetails = vscode.workspace.getConfiguration('luminous-fortune-port-forward');
									if (selectedAction === 'Yes') {
										if (userAction == "add") {
											const portDetails = extensionConfigDetails.get('PortDetails', []);
											const data = {
												"hostname": hostName,
												"port": portNumber,
												"action": userAction
											}
											console.log(`Data : ${data}`)
											portDetails.push(data);
											// // Update the configuration with the modified array
											extensionConfigDetails.update('PortDetails', portDetails, vscode.ConfigurationTarget.Global);
											vscode.window.showInformationMessage(`Port is Forwared to Hostname : ${hostName} and PortName : ${portNumber}`);
											console.log(`Added : ${data}`);
											// forwardPortWithProgress(sourcePort, destinationPort, destinationHost)
											forwardPortWithProgress(portNumber, portNumber, 'localhost')
										}

									}
									else if (selectedAction === 'No') {
										vscode.window.showInformationMessage('Port Forward tesk was Cancelled by the User...');
									}
								})
						}
					})
					.catch((error) => {
						console.error(`Error checking port: ${error.message}`);
					});

			} else {
				vscode.window.showErrorMessage("Invalid Input values...");
			}

		}
	)
	)
}
exports.activate = activate

function deactivate() { }

module.exports = {
	activate,
	deactivate,
}

