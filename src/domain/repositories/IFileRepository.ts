// File Repository Interface
// ファイルリポジトリインターフェース

import { File } from '../entities';

export interface IFileRepository {
  findById(id: string): Promise<File | null>;
  findByMessageId(messageId: string): Promise<File[]>;
  findByUserId(userId: string): Promise<File[]>;
  save(file: File): Promise<File>;
  delete(id: string): Promise<void>;
}
