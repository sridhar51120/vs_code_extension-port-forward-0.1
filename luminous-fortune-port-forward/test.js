
// const vscode = require('vscode');
// const net = require('net')
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

// /**
//  * @param {vscode.ExtensionContext} context
//  */


// function tcp_Connection(sourcePort, destinationHost, destinationPort) {
// 	const server = net.createServer((sourceSocket) => {

// 		const destinationSocket = net.connect(destinationPort, destinationHost);

// 		sourceSocket.pipe(destinationSocket);
// 		destinationSocket.pipe(sourceSocket);

// 		sourceSocket.on('close', () => {
// 			console.log('Source socket closed');
// 			destinationSocket.end();
// 		});

// 		destinationSocket.on('close', () => {
// 			console.log('Destination socket closed');
// 			sourceSocket.end();
// 		});
// 	});

// 	server.listen(sourcePort, () => {
// 		vscode.window.showInformationMessage(`TCP server listening on port ${sourcePort} and forwarding to ${destinationHost}:${destinationPort}`);
// 	});
// }

// function UserAction(inputString, startString, endString) {
// 	const startIndex = inputString.indexOf(startString);
// 	const endIndex = inputString.indexOf(endString, startIndex + startString.length);

// 	if (startIndex !== -1 && endIndex !== -1) {
// 		return inputString.substring(startIndex + startString.length, endIndex);
// 	} else {
// 		return null;
// 	}
// }

// function checkInputFormat(inputString, char1, char2) {
// 	return inputString.includes(char1) && inputString.includes(char2);
// }

// function activate(context) {

// 	context.subscriptions.push(vscode.commands.registerCommand(
// 		"luminous-fortune-port-forward.port-forward",

// 		async function () {
// 			const userInput = await vscode.window.showInputBox({
// 				prompt: 'Enter source Port Number or source Host Name with Port Number : ',
// 				placeHolder: 'Enter here...',
// 			});
// 			if ((typeof userInput === "string") && checkInputFormat(userInput, ':', '/')) {
// 				// vscode.window.showInformationMessage("Success");
// 				const userNetwork = UserAction(userInput, "/", "-");
// 				const hostName = UserAction(userInput, "", ":");
// 				const portNumber = UserAction(userInput, ":", "/");
// 				const userAction = userInput.split("-")[1]

// 				const extensionConfigDetails = vscode.workspace.getConfiguration('luminous-fortune-port-forward');

// 				if (userNetwork === 'tcp' || userNetwork === 'TCP') {

// 					// console.log(`User Network : ${userNetwork}`)
// 					// console.log(`HostName : ${hostName}`);
// 					// console.log(`PortName: ${portNumber}`);

// 					const data = {
// 						"hostname": hostName,
// 						"port": portNumber,
// 						"type": userNetwork,
// 						"action": userAction
// 					}
// 					// create or retive the Port Details in Configuration file
// 					const portDetails = extensionConfigDetails.get('PortDetails', []);
// 					// console.log(data)
// 					if (userAction === "add") {
// 						// TODO: when the user adds the details,show dialog check if the details is correct or not
// 						//  --> if correct which means add the details to config file else don't


// 						// Add Port Details to Configuration files
// 						// Add the new value to the array
// 						// portDetails.push(data);
// 						// // Update the configuration with the modified array
// 						// extensionConfigDetails.update('PortDetails', portDetails, vscode.ConfigurationTarget.Global);
// 						// vscode.window.showInformationMessage(`Port is Forwared to Hostname : ${hostName} and PortName : ${portNumber}`);

// 						// console.log(`Added : ${data}`);



// 					} else if (userAction === "remove") {
// 						// Remove Port Details in Configuration file
// 						// Remove the selected value from the array
// 						const updatedValues = portDetails.filter((value) => value !== data);
// 						// Update the configuration with the modified array
// 						extensionConfigDetails.update('PortDetails', updatedValues, vscode.ConfigurationTarget.Global);
// 						vscode.window.showInformationMessage(`Removed: ${data}`);
// 						console.log(`Removed: ${data}`);
// 						portDetails.forEach((portDetail, index) => {
// 							console.log(`details : ${portDetail[0]}`);
// 						});
// 					}
// 					else {
// 						// Show the Configuaration values
// 						// console.log(portDetails[0]);
// 						// portDetails.forEach((portDetail, index) => {
// 						// 	console.log(`details : ${portDetail[0]}`);
// 						// });

// 					}

// 					// vscode.window.showInformationMessage(`TCP Connection details added : host -> ${hostname}, Port Number -> ${portname}`)

// 				}
// 				else if (userNetwork === 'udp' || userNetwork === 'UDP') {
// 					vscode.window.showInformationMessage("UDP Protocal Port Forwrding Methods");
// 				}
// 				else {
// 					vscode.window.showErrorMessage("Invalid Network method...");
// 				}

// 			} else {
// 				vscode.window.showErrorMessage("Invalid Input values...");
// 			}

// 		}
// 	)
// 	);
// 	context.subscriptions.push(vscode.commands.registerCommand('luminous-fortune-port-forward.showWarningWithActions', () => {
// 		vscode.window
// 			.showWarningMessage(
// 				'Shall I Start Port forwarding',
// 				'Add', 'Cancel'
// 			)
// 			.then((selectedAction) => {
// 				if (selectedAction === 'Add') {
// 					// vscode.window.showInformationMessage('You clicked Action 1');
// 					vscode.window.withProgress({
// 						location: vscode.ProgressLocation.Notification, // Display in the notification area
// 						title: 'Running Long Task', // Title of the progress notification
// 						cancellable: true // Allow users to cancel the task
// 					}, async (progress, token) => {
// 						// Simulate a long-running task
// 						const totalSteps = 100;
// 						for (let step = 0; step < totalSteps; step++) {
// 							if (token.isCancellationRequested) {
// 								// Task was canceled by the user
// 								vscode.window.showInformationMessage('Task canceled by the user.');
// 								break;
// 							}

// 							// Update progress
// 							progress.report({ increment: (100 / totalSteps) });

// 							// Simulate a delay
// 							await new Promise(resolve => setTimeout(resolve, 100));
// 						}

// 						// Task completed
// 						vscode.window.showInformationMessage('Long task completed.');
// 					});
// 				} else if (selectedAction === 'Cancel') {
// 					vscode.window.showInformationMessage('Your Task will be canced..');
// 				}
// 			});
// 	})
// 	);
// }
// exports.activate = activate

// function deactivate() { }

// module.exports = {
// 	activate,
// 	deactivate,
// }

// context.subscriptions.push(vscode.commands.registerCommand('luminous-fortune-port-forward.showWarningWithActions', () => {
//     vscode.window.showWarningMessage(
//         'Shall I Start Port forwarding',
//         'Add', 'Cancel'
//     )
//         .then((selectedAction) => {
//             if (selectedAction === 'Add') {
//                 // vscode.window.showInformationMessage('You clicked Action 1');
//                 vscode.window.withProgress({
//                     location: vscode.ProgressLocation.Notification, // Display in the notification area
//                     title: 'Running Long Task', // Title of the progress notification
//                     cancellable: true // Allow users to cancel the task
//                 }, async (progress, token) => {
//                     // Simulate a long-running task
//                     const totalSteps = 100;
//                     for (let step = 0; step < totalSteps; step++) {
//                         if (token.isCancellationRequested) {
//                             // Task was canceled by the user
//                             vscode.window.showInformationMessage('Task canceled by the user.');
//                             break;
//                         }

//                         // Update progress
//                         progress.report({ increment: (100 / totalSteps) });

//                         // Simulate a delay
//                         await new Promise(resolve => setTimeout(resolve, 100));
//                     }

//                     // Task completed
//                     vscode.window.showInformationMessage('Long task completed.');
//                 });
//             } else if (selectedAction === 'Cancel') {
//                 vscode.window.showInformationMessage('Your Task will be canced..');
//             }
//         })

// })
// );