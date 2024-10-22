import { PickType } from '@nestjs/swagger';
import { Comment } from '../comments.schema';

export class CommentCreateDto extends PickType(Comment, [
  'author',
  'content',
] as const) {}
