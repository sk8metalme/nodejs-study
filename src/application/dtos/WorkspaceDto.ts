// Workspace DTO
// ワークスペースデータ転送オブジェクト

export interface WorkspaceDto {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkspaceDto {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceDto {
  name?: string;
  description?: string;
  avatar?: string;
}
