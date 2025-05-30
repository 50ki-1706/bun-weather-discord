import { ActivityType, Client, Events } from 'discord.js';
// botがdiscordに接続したときに発火するイベント
export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    // ステータスを設定（オプション）
    client.user?.setActivity('コマンドを待機中', { type: ActivityType.Watching });
  },
};
