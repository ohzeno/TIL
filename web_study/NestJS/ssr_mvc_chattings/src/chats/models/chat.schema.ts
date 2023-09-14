import { IsNotEmpty, IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { Socket as SocketModel } from './socket.schema';

const options: SchemaOptions = {
  // collection: 'chats', // 수동으로 안해도 몽구스가 자동으로 소문자 복수형으로 만들어준다.
  timestamps: true,
};

@Schema(options)
export class Chat extends Document {
  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'sockets' },
      socketid: { type: String },
      username: { type: String, required: true },
    },
  })
  @IsNotEmpty()
  user: SocketModel;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chat: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
