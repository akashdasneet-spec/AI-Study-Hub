import { EventEmitter } from 'events';

export type StudyHubEvent =
  | 'RoomCreated'
  | 'NotesGenerated'
  | 'QuizCompleted'
  | 'UserJoinedRoom'
  | 'PomodoroFinished';

export class EventBusService extends EventEmitter {
  private static instance: EventBusService;

  private constructor() {
    super();
  }

  public static getInstance(): EventBusService {
    if (!EventBusService.instance) {
      EventBusService.instance = new EventBusService();
    }
    return EventBusService.instance;
  }

  public publish(event: StudyHubEvent, payload: unknown): void {
    console.log(`📡 [EventBus] Published event: ${event}`, payload);
    this.emit(event, payload);
  }

  public subscribe(event: StudyHubEvent, handler: (payload: unknown) => void): void {
    this.on(event, handler);
  }
}

export const eventBus = EventBusService.getInstance();
