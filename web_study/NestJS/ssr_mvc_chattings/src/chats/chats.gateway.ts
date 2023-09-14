import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io';
import { Chat } from './models/chat.schema';
import { Socket as UserSocket } from './models/socket.schema';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel(UserSocket.name)
    private readonly userSocket: Model<UserSocket>,
  ) {
    this.logger.log('constructor');
  }

  // Lifecycle Hooks
  // OnGatewayInit은 afterInit을 구현해야 한다.
  // 웹소켓 게이트웨이가 초기화된 후에 실행된다.
  afterInit() {
    this.logger.log('after init');
  }

  // OnGatewayConnection은 handleConnection을 구현해야 한다.
  // 클라이언트가 연결될 때 실행된다.
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  // OnGatewayDisconnect는 handleDisconnect를 구현해야 한다.
  // 클라이언트가 연결을 끊을 때 실행된다.
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const user = await this.userSocket.findOne({
      socketid: socket.id,
    });
    if (user) {
      socket.broadcast.emit('user_disconnected', user.username);
      /* 
      강의에서는 delete를 사용했고 검색해보면 remove를 사용했다는데
      공식문서를 찾아봐도 보이지 않고, delete, remove를 넣어봐도 document에 그런 메서드 없다고 에러가 났다. 
      await this.userSocket.deleteOne({ socketid: socket.id });
      model에서 직접 deleteOne하려니, 이미 찾은 유저를 또 deleteOne으로 탐색한다는 것이 굉장히 비효율적이라고 느껴졌다.
      mongoose가 기본적인 crud에서 그렇게 허술하게 설계됐을지 의문이 들었다.
      그래서 Document에 직접 들어가서 찾아보니 deleteOne이 있고, 여기에 설명으로 다음과 같이 적혀있다.
      Removes this document from the db.
      deleteOne(options?: QueryOptions): Promise<this>;
      model.deleteOne과 별개로 다큐멘트 자체에서 자신을 삭제할 수 있는 메서드.
      */
      await user.deleteOne();
    }
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('new_user')
  async handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const isUserExist = this.userSocket.exists({ username });
    /* 
    강의에서는 Math.floor(Math.random() * 100)을 붙여주는데,
    서비스 초기에는 괜찮을지 모르지만 규모가 커지면 수정해야 한다.
    그냥 처음부터 안전하게 uuid를 붙여주는게 낫다.
    */
    if (isUserExist) username = `${username}_${uuidv4()}`;
    await this.userSocket.create({
      socketid: socket.id,
      username,
    });
    // broadcast: 자신을 제외한 연결된 모든 클라이언트에게 메시지를 보낸다.
    // 클라이언트 측에서 user_connected 이벤트에 대한 리스너를 등록해야 한다.
    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('send_message')
  handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit('new_chat', {
      username: socket.id,
      chat,
    });
  }
}
