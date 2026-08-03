import { UserRepository, RoomRepository, StudySessionRepository, QuizRepository } from '@hub/database';

describe('Domain-Expressive Repositories Unit Tests', () => {
  let userRepo: UserRepository;
  let roomRepo: RoomRepository;
  let sessionRepo: StudySessionRepository;
  let quizRepo: QuizRepository;

  beforeEach(() => {
    userRepo = new UserRepository();
    roomRepo = new RoomRepository();
    sessionRepo = new StudySessionRepository();
    quizRepo = new QuizRepository();
  });

  it('UserRepository creates and finds user by email', async () => {
    const user = await userRepo.createUser({
      email: 'newstudent@studyhub.com',
      name: 'Jane Student',
      passwordHash: 'hashedpwd123',
    });
    expect(user.id).toBeDefined();
    expect(user.email).toBe('newstudent@studyhub.com');

    const found = await userRepo.findByEmail('newstudent@studyhub.com');
    expect(found).not.toBeNull();
    expect(found?.name).toBe('Jane Student');
  });

  it('RoomRepository allows user to join public study room', async () => {
    const room = await roomRepo.joinRoom('jee-physics', 'usr-103');
    expect(room.participants).toContain('usr-103');
  });

  it('StudySessionRepository starts and finishes a Pomodoro study session', async () => {
    const session = await sessionRepo.startSession('jee-physics', 1500);
    expect(session.isActive).toBe(true);

    const finished = await sessionRepo.finishSession(session.id);
    expect(finished.isActive).toBe(false);
    expect(finished.endedAt).toBeDefined();
  });

  it('QuizRepository records student quiz attempts', async () => {
    const attempt = await quizRepo.recordAttempt('quiz-101', 'usr-101', 4, 5);
    expect(attempt.score).toBe(4);
    expect(attempt.totalCount).toBe(5);

    const attempts = await quizRepo.getUserAttempts('usr-101');
    expect(attempts.length).toBeGreaterThanOrEqual(1);
  });
});
