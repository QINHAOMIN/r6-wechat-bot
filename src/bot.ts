import { handleMessage } from "./message-handler.js";
import type { MessageAdapter } from "./message-adapter.js";
import type { StatsProvider } from "./stats-provider.js";

export function startBot(
  adapter: MessageAdapter,
  statsProvider: StatsProvider
): Promise<void> {
  return startMessageBot(adapter, (text) => handleMessage(text, statsProvider));
}

export async function startMessageBot(
  adapter: MessageAdapter,
  replyTo: (text: string) => Promise<string | null>
): Promise<void> {
  await adapter.start(async (message) => {
    if (!message.mentionedBot) {
      return;
    }

    const reply = await replyTo(message.text);

    if (reply !== null) {
      await adapter.sendText(message.groupId, reply);
    }
  });
}
