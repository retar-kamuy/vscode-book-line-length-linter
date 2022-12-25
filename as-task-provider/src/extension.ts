import * as vscode from 'vscode';
import * as log4js from 'log4js';

const logger = log4js.getLogger();

interface LllTaskDefinition extends vscode.TaskDefinition {
  src?: string;
}

/**
 * シェルコマンドを作成する
 */
function createCommand(
  settings: LllTaskDefinition,
  scope: vscode.WorkspaceFolder,
):vscode.ShellExecution {
  return new vscode.ShellExecution(
    settings.type,
    ['.', '--skiplist', 'node_modules'],
    { cwd: scope.uri.fsPath },
  );
}

/**
 * 自動検出タスクを作成する
 */
async function getLllTasks(): Promise<vscode.Task[]> {
  const tasks: vscode.Task[] = [];

  if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
    // ワークスペースがあるかどうかのチェック
    return tasks;
  }

  vscode.workspace.workspaceFolders.forEach((workspaceFolder) => {
    // ワークスペースごとのタスクを生成
    const taskDefinition = { type: 'lll' };
    const task = new vscode.Task(
      taskDefinition,
      workspaceFolder,
      `lint ${workspaceFolder.name}`,
      'lll',
      createCommand(taskDefinition, workspaceFolder),
      '$lll',
    );
    tasks.push(task);
  });
  return tasks;
}

/**
 * tasks.jsonから、実行可能なタスクを作成する
 */
async function getTask(): Promise<vscode.Task> {
  let task: vscode.Task;
  const settings = task.definition as LllTaskDefinition;
  task.execution = createCommand(settings, task.scope as vscode.WorkspaceFolder);
  task.source = 'lll';
  task.problemMatchers = ['$lll'];
  return task;
}

export function activate(context: vscode.ExtensionContext) {
  logger.info(
    'Congratulations, your extension "line-length-linter" is now active!',
  );

  const disposable = vscode.tasks.registerTaskProvider('lll', {
    provideTasks: getLllTasks,
    resolveTask: getTask, // TODO: 現在、getTaskは未実装
  });
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
