import { commands, DocumentFilter, ExtensionContext, languages } from 'vscode';
import { GenerateTypeProvider } from './actionProvider';
import { commandHandler, commandId } from './command';

export function activate(context: ExtensionContext) {
  const selector: DocumentFilter[] = [];
  for (const language of ['typescript', 'typescriptreact']) {
    selector.push({ language, scheme: 'file' });
    selector.push({ language, scheme: 'untitled' });
  }

  const command = commands.registerCommand(commandId, commandHandler);
  const codeActionProvider = languages.registerCodeActionsProvider(selector, new GenerateTypeProvider(), GenerateTypeProvider.metadata);

  context.subscriptions.push(command);
  context.subscriptions.push(codeActionProvider);
}
