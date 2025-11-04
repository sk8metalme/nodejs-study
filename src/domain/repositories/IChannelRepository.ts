// Channel Repository Interface
// チャンネルリポジトリインターフェース

import { Channel } from '../entities';

export interface IChannelRepository {
  findById(id: string): Promise<Channel | null>;
  findByWorkspaceId(workspaceId: string): Promise<Channel[]>;
  save(channel: Channel): Promise<Channel>;
  update(channel: Channel): Promise<Channel>;
  delete(id: string): Promise<void>;
}
