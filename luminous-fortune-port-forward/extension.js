
const vscode = require('vscode');
const net = require('net')
const {
	ExtensionContext,
	StatusBarAlignment,
	window,
	StatusBarItem,
	Selection,
	workspace,
	TextEditor,
	commands,
	ProgressLocation
} = vscode;

/**
 * @param {vscode.ExtensionContext} context
 */


function tcp_Connection(sourcePort, destinationHost, destinationPort) {
	const server = net.createServer((sourceSocket) => {

		const destinationSocket = net.connect(destinationPort, destinationHost);

		sourceSocket.pipe(destinationSocket);
		destinationSocket.pipe(sourceSocket);

		sourceSocket.on('close', () => {
			console.log('Source socket closed');
			destinationSocket.end();
		});

		destinationSocket.on('close', () => {
			console.log('Destination socket closed');
			sourceSocket.end();
		});
	});

	server.listen(sourcePort, () => {
		vscode.window.showInformationMessage(`TCP server listening on port ${sourcePort} and forwarding to ${destinationHost}:${destinationPort}`);
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
				const userNetwork = UserAction(userInput, "/", "-");
				const hostName = UserAction(userInput, "", ":");
				const portNumber = UserAction(userInput, ":", "/");
				const userAction = userInput.split("-")[1]

				isPortInUse(portNumber)
					.then((inUse) => {
						if (inUse) {
							vscode.window.showErrorMessage("Port is already Allocated...");
						} else {
							const infoPortDetails = `HostName : ${hostName}\nPortName : ${portNumber}\nNetwork : ${userNetwork}`;
							vscode.window.showInformationMessage("Port is Not Available");
							vscode.window.showWarningMessage(
								`Shall I start the port forwarding action?\n${infoPortDetails}`,
								'Yes', 'No'
							)
								.then((selectedAction) => {
									if (selectedAction === 'Yes') {
										vscode.window.withProgress({
											location: vscode.ProgressLocation.Notification,
											title: 'Running Port Forwarding Task',
											cancellable: true
										}, async (progress, token) => {
											const totalSteps = 100;
											for (let step = 0; step < totalSteps; step++) {
												if (token.isCancellationRequested) {
													vscode.window.showInformationMessage('Port Forward tesk was Cancelled...');
													break;
												}


												progress.report({ increment: (100 / totalSteps) });

												await new Promise(resolve => setTimeout(resolve, 100));
											}

											// vscode.window.showInformationMessage('Port Forwarding was successfully Completed...');
										});
									} else if (selectedAction === 'No') {
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
	);
	context.subscriptions.push(vscode.commands.registerCommand('luminous-fortune-port-forward.showWarningWithActions', () => {
		vscode.window
			.showWarningMessage(
				'Shall I Start Port forwarding',
				'Add', 'Cancel'
			)
			.then((selectedAction) => {
				if (selectedAction === 'Add') {
					// vscode.window.showInformationMessage('You clicked Action 1');
					vscode.window.withProgress({
						location: vscode.ProgressLocation.Notification, // Display in the notification area
						title: 'Running Long Task', // Title of the progress notification
						cancellable: true // Allow users to cancel the task
					}, async (progress, token) => {
						// Simulate a long-running task
						const totalSteps = 100;
						for (let step = 0; step < totalSteps; step++) {
							if (token.isCancellationRequested) {
								// Task was canceled by the user
								vscode.window.showInformationMessage('Task canceled by the user.');
								break;
							}

							// Update progress
							progress.report({ increment: (100 / totalSteps) });

							// Simulate a delay
							await new Promise(resolve => setTimeout(resolve, 100));
						}

						// Task completed
						vscode.window.showInformationMessage('Long task completed.');
					});
				} else if (selectedAction === 'Cancel') {
					vscode.window.showInformationMessage('Your Task will be canced..');
				}
			})
	})
	)
}
exports.activate = activate

function deactivate() { }

module.exports = {
	activate,
	deactivate,
}

