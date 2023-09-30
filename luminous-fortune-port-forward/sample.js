// const extensionConfigDetails = vscode.workspace.getConfiguration('luminous-fortune-port-forward');
// const portDetails = extensionConfigDetails.get('PortDetails', []);

// if (userNetwork === 'tcp' || userNetwork === 'TCP') {

//     // console.log(`User Network : ${userNetwork}`)
//     // console.log(`HostName : ${hostName}`);
//     // console.log(`PortName: ${portNumber}`);

//     const data = {
//         "hostname": hostName,
//         "port": portNumber,
//         "type": userNetwork,
//         "action": userAction
//     }
//     // create or retive the Port Details in Configuration file

//     // console.log(data)
//     if (userAction === "add") {
//         // TODO: when the user adds the details,show dialog check if the details is correct or not
//         //  --> if correct which means add the details to config file else don't


//         // Add Port Details to Configuration files
//         // Add the new value to the array
//         // portDetails.push(data);
//         // // Update the configuration with the modified array
//         // extensionConfigDetails.update('PortDetails', portDetails, vscode.ConfigurationTarget.Global);
//         // vscode.window.showInformationMessage(`Port is Forwared to Hostname : ${hostName} and PortName : ${portNumber}`);

//         // console.log(`Added : ${data}`);



//     } else if (userAction === "remove") {
//         // Remove Port Details in Configuration file
//         // Remove the selected value from the array
//         const updatedValues = portDetails.filter((value) => value !== data);
//         // Update the configuration with the modified array
//         extensionConfigDetails.update('PortDetails', updatedValues, vscode.ConfigurationTarget.Global);
//         vscode.window.showInformationMessage(`Removed: ${data}`);
//         console.log(`Removed: ${data}`);
//         portDetails.forEach((portDetail, index) => {
//             console.log(`details : ${portDetail[0]}`);
//         });
//     }
//     else {
//         // Show the Configuaration values
//         // console.log(portDetails[0]);
//         // portDetails.forEach((portDetail, index) => {
//         // 	console.log(`details : ${portDetail[0]}`);
//         // });

//     }

//     // vscode.window.showInformationMessage(`TCP Connection details added : host -> ${hostname}, Port Number -> ${portname}`)

// }
// else if (userNetwork === 'udp' || userNetwork === 'UDP') {
//     vscode.window.showInformationMessage("UDP Protocal Port Forwrding Methods");
// }
// else {
//     vscode.window.showErrorMessage("Invalid Network method...");
// }