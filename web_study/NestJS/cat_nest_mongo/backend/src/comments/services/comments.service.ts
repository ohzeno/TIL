import { Injectable } from '@nestjs/common';
import { CommentCreateDto } from '../dtos/comment.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'getAllComments';
  }

  async createComment(id: string, comment: CommentCreateDto) {
    return 'createComment';
  }

  async likeComment(id: string) {
    return 'likeComment';
  }
}
