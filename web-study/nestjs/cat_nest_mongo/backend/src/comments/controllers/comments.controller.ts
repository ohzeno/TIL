import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentCreateDto } from '../dtos/comment.create.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '특정 고양이 프로필에 댓글 남기기' })
  @Post(':id')
  async createComment(@Param('id') id: string, @Body() body: CommentCreateDto) {
    return this.commentsService.createComment(id, body);
  }

  // 강의에서는 Post를 사용하는데, 그러면 메서드와 엔드포인트가 같아서 위쪽 라우터만 작동할 것이다. 그래서 Patch로 바꿨다.
  @ApiOperation({ summary: '좋아요' })
  @Patch(':id')
  async likeComment(@Param('id') id: string) {
    return this.commentsService.likeComment(id);
  }
}
