import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentCreateDto } from '../dtos/comment.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../comments.schema';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, commentData: CommentCreateDto) {
    try {
      const targetCat =
        await this.catsRepository.findCatByIdWithoutPassword(id);
      const { content, author } = commentData;

      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);

      const newComment = new this.commentModel({
        author: validatedAuthor._id,
        content,
        targetId: targetCat._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async likeComment(id: string) {
    try {
      const comment = await this.commentModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {
      console.log(error);
    }
  }
}
