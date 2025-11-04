// Message Repository Interface
// メッセージリポジトリインターフェース

import { Message } from '../entities';

export interface IMessageRepository {
  findById(id: string): Promise<Message | null>;
  findByChannelId(channelId: string, limit?: number, offset?: number): Promise<Message[]>;
  save(message: Message): Promise<Message>;
  update(message: Message): Promise<Message>;
  delete(id: string): Promise<void>;
}
