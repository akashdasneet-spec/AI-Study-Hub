import { EventEmitter } from 'events';

export type EventType =
  | 'RoomCreated'
  | 'NotesGenerated'
  | 'QuizCompleted'
  | 'UserJoinedRoom'
  | 'PomodoroFinished';

export interface RoomCreatedPayload {
  roomId: string;
  title: string;
  ownerId: string;
  timestamp: string;
}

export interface NotesGeneratedPayload {
  noteId: string;
  title: string;
  userId: string;
  modelUsed: string;
}

export interface QuizCompletedPayload {
  quizId: string;
  userId: string;
  score: number;
  totalCount: number;
}

export class InfrastructureEventBus extends EventEmitter {
  private static instance: InfrastructureEventBus;

  private constructor() {
    super();
  }

  public static getInstance(): InfrastructureEventBus {
    if (!InfrastructureEventBus.instance) {
      InfrastructureEventBus.instance = new InfrastructureEventBus();
    }
    return InfrastructureEventBus.instance;
  }

  public publishEvent<T>(type: EventType, payload: T): void {
    console.log(`📡 [@hub/events] Dispatching Event: ${type}`, payload);
    this.emit(type, payload);
  }

  public subscribeEvent<T>(type: EventType, handler: (payload: T) => void): void {
    this.on(type, handler as (args: any) => void);
  }
}

export const eventBus = InfrastructureEventBus.getInstance();
