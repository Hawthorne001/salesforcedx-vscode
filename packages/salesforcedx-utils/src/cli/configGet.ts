/*
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { CliCommandExecutor } from './cliCommandExecutor';
import { CommandOutput } from './commandOutput';
import { SfCommandBuilder } from './sfCommandBuilder';
/**
 * @deprecated
 * NOTE: This code is deprecated in favor of using ConfigUtil.ts
 */
export class ConfigGet {
  public async getConfig(
    projectPath: string,
    ...keys: string[]
  ): Promise<Map<string, string>> {
    const commandBuilder = new SfCommandBuilder().withArg('config:get');
    keys.forEach(key => commandBuilder.withArg(key));

    const execution = new CliCommandExecutor(
      commandBuilder.withJson().build(),
      {
        cwd: projectPath
      }
    ).execute();

    const cmdOutput = new CommandOutput();
    const result = await cmdOutput.getCmdResult(execution);
    try {
      const configMap = new Map<string, string>();
      const results = JSON.parse(result).result as any[];
      results.forEach(entry => configMap.set(entry.key, entry.value));
      return Promise.resolve(configMap);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
