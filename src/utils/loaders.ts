import fs from 'fs';
import path from 'path';
import { client } from './client'; // Assuming you have a client instance exported from your client module

// コマンドファイルの読み込み
const loadCommands = async (): Promise<void> => {
  const folderPath = path.join(__dirname, '../commands');
  const commandsPath = path.join(folderPath, 'util');
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

  // 各コマンドファイルを読み込む
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);

    // コマンドに必要なプロパティがあるか確認
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command.execute);
      console.warn(`Command ${command.data.name} loaded successfully`);
    } else {
      console.warn(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
};

// イベントファイルの読み込み
const loadEvents = async (): Promise<void> => {
  const eventsPath = path.join(__dirname, '../events');
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(filePath);

    if (event.default && 'execute' in event.default) {
      if (event.default.once) {
        client.once(event.default.name, (...args) => event.default.execute(...args));
      } else {
        client.on(event.default.name, (...args) => event.default.execute(...args));
      }
      console.warn(`Event ${event.default.name} loaded successfully`);
    } else {
      console.warn(`[WARNING] The event at ${filePath} is missing a required property.`);
    }
  }
};

export { loadCommands, loadEvents };
