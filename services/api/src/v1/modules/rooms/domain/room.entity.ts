export interface RoomEntityProps {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  isPrivate: boolean;
  maxParticipants: number;
  participants?: string[];
}

export class RoomEntity {
  private readonly participantsList: string[];

  constructor(private readonly props: RoomEntityProps) {
    this.participantsList = props.participants || [props.ownerId];
  }

  get id(): string { return this.props.id; }
  get title(): string { return this.props.title; }
  get isPrivate(): boolean { return this.props.isPrivate; }
  get participants(): string[] { return [...this.participantsList]; }

  public canUserJoin(userId: string): boolean {
    if (this.participantsList.includes(userId)) return true;
    return this.participantsList.length < this.props.maxParticipants;
  }
}

