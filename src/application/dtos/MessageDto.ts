// Message DTO
// メッセージデータ転送オブジェクト

export interface MessageDto {
  id: string;
  content: string;
  userId: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageDto {
  content: string;
  userId: string;
  channelId: string;
}

export interface UpdateMessageDto {
  content: string;
}
