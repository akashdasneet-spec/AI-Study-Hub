import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { AIModule } from './ai/ai.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    AuthModule,
    RoomsModule,
    AIModule,
  ],
})
export class AppModule {}
