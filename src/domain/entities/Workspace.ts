// Workspace Entity
// ワークスペースエンティティ

export interface WorkspaceProps {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Workspace {
  private constructor(private props: WorkspaceProps) {}

  static create(props: Omit<WorkspaceProps, 'id' | 'createdAt' | 'updatedAt'>): Workspace {
    return new Workspace({
      ...props,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstitute(props: WorkspaceProps): Workspace {
    return new Workspace(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get avatar(): string | undefined {
    return this.props.avatar;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateName(name: string): void {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  updateDescription(description: string): void {
    this.props.description = description;
    this.props.updatedAt = new Date();
  }

  toJSON(): WorkspaceProps {
    return { ...this.props };
  }
}
