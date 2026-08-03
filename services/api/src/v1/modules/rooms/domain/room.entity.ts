export interface RoomEntityProps {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  isPrivate: boolean;
  maxParticipants: number;
  participants: string[];
}

export class RoomEntity {
  constructor(private readonly props: RoomEntityProps) {}

  get id(): string { return this.props.id; }
  get title(): string { return this.props.title; }
  get isPrivate(): boolean { return this.props.isPrivate; }
  get participants(): string[] { return [...this.props.participants]; }

  public canUserJoin(userId: string): boolean {
    if (this.props.participants.includes(userId)) return true;
    return this.props.participants.length < this.props.maxParticipants;
  }
}
