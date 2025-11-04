// Message Entity
// メッセージエンティティ

export interface MessageProps {
  id: string;
  content: string;
  userId: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Message {
  private constructor(private props: MessageProps) {}

  static create(props: Omit<MessageProps, 'id' | 'createdAt' | 'updatedAt'>): Message {
    return new Message({
      ...props,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstitute(props: MessageProps): Message {
    return new Message(props);
  }

  get id(): string {
    return this.props.id;
  }

  get content(): string {
    return this.props.content;
  }

  get userId(): string {
    return this.props.userId;
  }

  get channelId(): string {
    return this.props.channelId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateContent(content: string): void {
    this.props.content = content;
    this.props.updatedAt = new Date();
  }

  toJSON(): MessageProps {
    return { ...this.props };
  }
}
