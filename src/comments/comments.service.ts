import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  // Criar um novo comentário
  async createComment(commentData: CreateCommentDto) {
    try {
      const comment = this.commentsRepository.create(commentData);
      await this.commentsRepository.save(comment);
      return comment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Obter um comentário por ID
  async getCommentById(id: number) {
    try {
      const comment = await this.commentsRepository.findOne({ where: { id } });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      return comment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Atualizar um comentário
  async updateComment(id: number, commentData: UpdateCommentDto) {
    try {
      await this.commentsRepository.update(id, commentData);
      const updatedComment = await this.getCommentById(id);
      if (!updatedComment) {
        throw new NotFoundException('Comment not found');
      }
      return updatedComment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Deletar um comentário
  async deleteComment(id: number) {
    try {
      const result = await this.commentsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Comment not found');
      }
      return 'Comment deleted successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Listar todos os comentários de um post
  async getCommentsByPostId(postId: number) {
    try {
      const comments = await this.commentsRepository.find({ where: { postId } });
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Listar todos os comentários de um usuário
  async getCommentsByUserId(userId: number) {
    try {
      const comments = await this.commentsRepository.find({ where: { userId } });
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
