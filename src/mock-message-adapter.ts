import type {
  GroupMessage,
  GroupMessageHandler,
  MessageAdapter,
} from "./message-adapter.js";

export class MockMessageAdapter implements MessageAdapter {
  private running = false;

  constructor(private readonly messages: readonly GroupMessage[]) {}

  async start(onMessage: GroupMessageHandler): Promise<void> {
    if (this.running) {
      throw new Error("模拟适配器已在运行");
    }

    this.running = true;

    try {
      for (const message of this.messages) {
        if (!this.running) {
          break;
        }

        console.log(`[模拟接收][${message.groupId}] ${message.text}`);
        await onMessage(message);
      }
    } finally {
      this.running = false;
    }
  }

  async sendText(groupId: string, text: string): Promise<void> {
    console.log(`[模拟发送][${groupId}]\n${text}`);
  }

  async stop(): Promise<void> {
    this.running = false;
  }
}