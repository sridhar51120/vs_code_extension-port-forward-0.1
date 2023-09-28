const vscode = require("vscode")
const net = require('net')

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

function activate(context) {

    let disposable = vscode.commands.registerCommand(
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
                
                const extensionConfigDetails = vscode.workspace.getConfiguration('luminous-fortune-port-forward');

                if  (userNetwork === 'tcp' || userNetwork === 'TCP') {

                    // console.log(`User Network : ${userNetwork}`)
                    // console.log(`HostName : ${hostName}`);
                    // console.log(`PortName: ${portNumber}`);

                    const data = {
                        "hostname": hostName,
                        "port": portNumber,
                        "type": userNetwork,
                        "action":userAction
                    }
                    // create or retive the Port Details in Configuration file
                    const portDetails = extensionConfigDetails.get('PortDetails', []);
                    // console.log(data)
                    if (userAction === "add") {
                        // Add Port Details to Configuration files
                        // Add the new value to the array
                        portDetails.push(data);
                        // Update the configuration with the modified array
                        extensionConfigDetails.update('PortDetails', portDetails, vscode.ConfigurationTarget.Global);
                        vscode.window.showInformationMessage(`Port is Forwared to Hostname : ${hostName} and PortName : ${portNumber}`);

                        console.log(`Added : ${data}`);

                    } else if (userAction === "remove") {
                        // Remove Port Details in Configuration file
                        // Remove the selected value from the array
                        const updatedValues = portDetails.filter((value) => value !== data);
                        // Update the configuration with the modified array
                        extensionConfigDetails.update('PortDetails', updatedValues, vscode.ConfigurationTarget.Global);
                        vscode.window.showInformationMessage(`Removed: ${data}`);
                        console.log(`Removed: ${data}`);
                        portDetails.forEach((portDetail, index) => {
                            console.log(`details : ${portDetail[0]}`);
                        });
                    }
                    else {
                        // Show the Configuaration values
                        // console.log(portDetails[0]);
                        portDetails.forEach((portDetail, index) => {
                            console.log(`details : ${portDetail[0]}`);
                        });

                    }

                    // vscode.window.showInformationMessage(`TCP Connection details added : host -> ${hostname}, Port Number -> ${portname}`)

                }
                else if (userNetwork === 'udp' || userNetwork === 'UDP') {
                    vscode.window.showInformationMessage("UDP Protocal Port Forwrding Methods");
                }
                else {
                    vscode.window.showErrorMessage("Invalid Network method...");
                }

            } else {
                vscode.window.showErrorMessage("Invalid Input values...");
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