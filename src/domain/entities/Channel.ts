// Channel Entity
// チャンネルエンティティ

export interface ChannelProps {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Channel {
  private constructor(private props: ChannelProps) {}

  static create(props: Omit<ChannelProps, 'id' | 'createdAt' | 'updatedAt'>): Channel {
    return new Channel({
      ...props,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstitute(props: ChannelProps): Channel {
    return new Channel(props);
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

  get isPrivate(): boolean {
    return this.props.isPrivate;
  }

  get workspaceId(): string {
    return this.props.workspaceId;
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

  toJSON(): ChannelProps {
    return { ...this.props };
  }
}
