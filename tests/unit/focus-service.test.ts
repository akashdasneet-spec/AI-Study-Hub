import { FocusService } from '../../services/api/src/v1/modules/focus/services/focus.service';
import { CreateFocusSessionDto } from '../../services/api/src/v1/modules/focus/dto/create-focus-session.dto';

describe('FocusService Pomodoro Unit Suite', () => {
  let service: FocusService;

  beforeEach(() => {
    service = new FocusService();
  });

  it('should successfully record a valid focus session', async () => {
    const dto: CreateFocusSessionDto = {
      durationMinutes: 25,
      subject: 'Organic Chemistry',
      notes: 'Reviewed reaction mechanisms',
    };

    const session = await service.recordSession('usr_focus_1', dto);
    expect(session.id).toBeDefined();
    expect(session.userId).toBe('usr_focus_1');
    expect(session.durationMinutes).toBe(25);
    expect(session.subject).toBe('Organic Chemistry');
  });

  it('should retrieve focus sessions for specific user', async () => {
    const dto: CreateFocusSessionDto = {
      durationMinutes: 50,
      subject: 'Data Structures',
    };

    await service.recordSession('usr_focus_2', dto);
    const userSessions = await service.getUserSessions('usr_focus_2');
    expect(userSessions.length).toBe(1);
    expect(userSessions[0].subject).toBe('Data Structures');
  });
});
