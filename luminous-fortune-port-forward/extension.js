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
                const data = userInput.split("/");
                if (data[1] === 'tcp' || data[1] === 'TCP') {
                    // vscode.window.showInformationMessage("Tcp Protocal Port Forwrding Methods");
                    const datas = data[0].split(":");
                    const hostname = datas[0];
                    const portname = datas[1];
                    vscode.window.showInformationMessage(`Port number ${portname},Host name ${hostname}`);
                    // Port forwarding using TCP Connection
                    tcp_Connection(portname,hostname,portname);
                    vscode.window.showInformationMessage(`TCP Connection Success : host -> ${hostname}, Port Number -> ${portname}`)

                }
                else if (data[1] === 'udp' || data[1] === 'UDP') {
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