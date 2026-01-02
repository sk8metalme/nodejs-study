// File DTO
// ファイルデータ転送オブジェクト

export interface FileDto {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  userId: string;
  messageId?: string;
  createdAt: Date;
}

export interface CreateFileDto {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  userId: string;
  messageId?: string;
}
