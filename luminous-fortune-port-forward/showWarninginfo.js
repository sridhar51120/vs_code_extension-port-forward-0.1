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