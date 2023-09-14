import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketSchema, Socket as UserSocket } from './models/socket.schema';
import { ChatSchema, Chat } from './models/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      // Socket이라고 하면 socket.io의 Socket과 충돌이 일어나므로
      { name: UserSocket.name, schema: SocketSchema },
    ]),
  ],
  providers: [ChatsGateway],
})
export class ChatsModule {}
