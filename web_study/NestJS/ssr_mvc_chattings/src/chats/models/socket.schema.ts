import { IsNotEmpty, IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  /* 
  강의에서는 id가 true이면 id와 _id가 같게 만들어준다고 했는데
  그게 아니라 id를 호출하면 _id(ObjectId)가 스트링 타입으로 반환되도록 
  getter를 만들어준다.
  헷갈리지 않게 socketid를 만들어주는게 낫다.
  */
  // id: false,
  timestamps: true,
};

@Schema(options)
export class Socket extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  socketid: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;
}

export const SocketSchema = SchemaFactory.createForClass(Socket);
