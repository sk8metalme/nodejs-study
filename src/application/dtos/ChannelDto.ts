// Channel DTO
// チャンネルデータ転送オブジェクト

export interface ChannelDto {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateChannelDto {
  name: string;
  description?: string;
  isPrivate: boolean;
  workspaceId: string;
}

export interface UpdateChannelDto {
  name?: string;
  description?: string;
}
