export interface CreateRoomDto {
  title: string;
  description?: string;
  isPrivate?: boolean;
  maxParticipants?: number;
}
