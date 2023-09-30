// // const net = require('net');

// // // Define the source and destination ports and addresses
// // const sourcePort = 8080;        // The port your clients will connect to
// // const destinationHost = 'localhost';  // The host where the traffic will be forwarded
// // const destinationPort = 3000;   // The port on the destination host

// // // Create a server that listens on the source port
// // const server = net.createServer((sourceSocket) => {
// //     const destinationSocket = net.connect(destinationPort, destinationHost, () => {
// //         sourceSocket.pipe(destinationSocket);
// //         destinationSocket.pipe(sourceSocket);
// //     });

// //     sourceSocket.on('error', (err) => {
// //         console.error('Source socket error:', err);
// //     });

// //     destinationSocket.on('error', (err) => {
// //         console.error('Destination socket error:', err);
// //     });
// //     sourceSocket.on('end', () => {
// //         destinationSocket.end();
// //     });

// //     destinationSocket.on('end', () => {
// //         sourceSocket.end();
// //     });
// // });

// // // Listen on the source port
// // server.listen(sourcePort, () => {
// //     console.log(`Port forwarding server is listening on port ${sourcePort}`);
// // });

// const net = require('net');
// const vscode = require('vscode');

// // Define the source and destination ports and addresses
// const sourcePort = 8080;        // The port your clients will connect to
// const destinationHost = 'localhost';  // The host where the traffic will be forwarded
// const destinationPort = 3000;   // The port on the destination host

// async function forwardPortWithProgress() {
//     const totalSteps = 100;
//     const progressTitle = 'Port Forwarding Progress';
//     const progressMessage = 'Forwarding traffic...';


//     await vscode.window.withProgress({
//         location: vscode.ProgressLocation.Notification,
//         title: progressTitle,
//         cancellable: true,
//     }, async (progress, token) => {
//         progress.report({ increment: 0, message: progressMessage });

//         try {
//             const server = net.createServer((sourceSocket) => {
//                 const destinationSocket = net.connect(destinationPort, destinationHost, () => {
//                     sourceSocket.pipe(destinationSocket);
//                     destinationSocket.pipe(sourceSocket);
//                 });

//                 sourceSocket.on('error', (err) => {
//                     console.error('Source socket error:', err);
//                 });

//                 destinationSocket.on('error', (err) => {
//                     console.error('Destination socket error:', err);
//                 });
//                 sourceSocket.on('end', () => {
//                     destinationSocket.end();
//                 });

//                 destinationSocket.on('end', () => {
//                     sourceSocket.end();
//                 });
//             });
//             server.listen(sourcePort, () => {
//                 console.log(`Port forwarding server is listening on port ${sourcePort}`);
//             });
//             for (let step = 0; step < totalSteps; step++) {
//                 if (token.isCancellationRequested) {
//                     vscode.window.showInformationMessage('Port Forwarding was canceled.');
//                     break;
//                 }

//                 const increment = 100 / totalSteps;
//                 progress.report({ increment, message: progressMessage });

//                 await new Promise((resolve) => setTimeout(resolve, 100));
//             }

//             vscode.window.showInformationMessage('Port Forwarding completed.');

//         } catch (error) {
//             vscode.window.showErrorMessage('Port Forwarding encountered an error: ' + error.message);
//         }
//     });
// }

// // Call the function to start port forwarding with progress reporting



// vscode.window.withProgress({
//     location: vscode.ProgressLocation.Notification, // Display in the notification area
//     title: 'Running Long Task', // Title of the progress notification
//     cancellable: true // Allow users to cancel the task
// }, async (progress, token) => {
//     // Simulate a long-running task
//     const totalSteps = 100;
//     for (let step = 0; step < totalSteps; step++) {
//         if (token.isCancellationRequested) {
//             // Task was canceled by the user
//             vscode.window.showInformationMessage('Task canceled by the user.');
//             break;
//         }

//         // Update progress
//         progress.report({ increment: (100 / totalSteps) });

//         // Simulate a delay
//         await new Promise(resolve => setTimeout(resolve, 100));
//     }

//     // Task completed
//     vscode.window.showInformationMessage('Long task completed.');
// });

// else if (userAction === "remove") {
//     // Remove Port Details in Configuration file
//     // Remove the selected value from the array
//     const updatedValues = portDetails.filter((value) => value !== data);
//     // Update the configuration with the modified array
//     extensionConfigDetails.update('PortDetails', updatedValues, vscode.ConfigurationTarget.Global);
//     vscode.window.showInformationMessage(`Removed: ${data}`);
//     console.log(`Removed: ${data}`);
//     portDetails.forEach((portDetail, index) => {
//         console.log(`details : ${portDetail[0]}`);
//     });
// }
// else {
//     // Show the Configuaration values
//     // console.log(portDetails[0]);
//     // portDetails.forEach((portDetail, index) => {
//     // 	console.log(`details : ${portDetail[0]}`);
//     // });