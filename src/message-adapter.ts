export interface GroupMessage {
  groupId: string;
  senderId: string;
  text: string;
  mentionedBot: boolean;
}

export type GroupMessageHandler = (
  message: GroupMessage,
) => Promise<void>;

export interface MessageAdapter {
  start(onMessage: GroupMessageHandler): Promise<void>;
  sendText(groupId: string, text: string): Promise<void>;
  stop(): Promise<void>;
}