// File Entity
// ファイルエンティティ

export interface FileProps {
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

export class File {
  private constructor(private props: FileProps) {}

  static create(props: Omit<FileProps, 'id' | 'createdAt'>): File {
    return new File({
      ...props,
      id: '',
      createdAt: new Date(),
    });
  }

  static reconstitute(props: FileProps): File {
    return new File(props);
  }

  get id(): string {
    return this.props.id;
  }

  get filename(): string {
    return this.props.filename;
  }

  get originalName(): string {
    return this.props.originalName;
  }

  get mimeType(): string {
    return this.props.mimeType;
  }

  get size(): number {
    return this.props.size;
  }

  get url(): string {
    return this.props.url;
  }

  get userId(): string {
    return this.props.userId;
  }

  get messageId(): string | undefined {
    return this.props.messageId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  toJSON(): FileProps {
    return { ...this.props };
  }
}
