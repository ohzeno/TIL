import { Socket } from 'socket.io';
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

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
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
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
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
