import { handleMessage } from "./message-handler.js";
import type { MessageAdapter } from "./message-adapter.js";
import type { StatsProvider } from "./stats-provider.js";

export async function startBot(
  adapter: MessageAdapter,
  statsProvider: StatsProvider,
): Promise<void> {
  await adapter.start(async (message) => {
    if (!message.mentionedBot) {
      return;
    }

    const reply = await handleMessage(message.text, statsProvider);

    if (reply !== null) {
      await adapter.sendText(message.groupId, reply);
    }
  });
}