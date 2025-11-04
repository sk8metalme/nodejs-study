// Workspace Repository Interface
// ワークスペースリポジトリインターフェース

import { Workspace } from '../entities';

export interface IWorkspaceRepository {
  findById(id: string): Promise<Workspace | null>;
  findByUserId(userId: string): Promise<Workspace[]>;
  save(workspace: Workspace): Promise<Workspace>;
  update(workspace: Workspace): Promise<Workspace>;
  delete(id: string): Promise<void>;
}
