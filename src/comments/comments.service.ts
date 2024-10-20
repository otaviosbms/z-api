import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { UsersService } from '../users/users.service';
import { PublicationsService } from '../publications/publications.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private readonly usersService: UsersService,
    private readonly publicationsService: PublicationsService
  ) { }

  // Criar um novo comentário
  async createComment(commentData: CreateCommentDto) {
    try {
      const { userId, publicationId } = commentData;

      const [user, publication] = await Promise.all([
        this.usersService.getUserById(userId),
        this.publicationsService.getPostById(publicationId),
      ]);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!publication) {
        throw new NotFoundException('Publication not found');
      }

      const comment = this.commentsRepository.create({
        ...commentData,
        user,
        publication,
      });

      await this.commentsRepository.save(comment);
      return comment;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Obter um comentário por ID
  async getCommentById(id: number) {
    try {
      const comment = await this.commentsRepository.findOne(
        {
          where: { id },
          relations: ['user', 'publication']
        }
      );
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      return comment;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }

  // Listar todos os comentários de um post
  async getCommentsByPostId(postId: number) {
    try {
      const comments = await this.commentsRepository.find({
        where: {
          publication: { id: postId }
        },
        relations: ['user'],
      });
      return comments;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Listar todos os comentários de um usuário
  async getCommentsByUserId(userId: number) {
    try {
      const comments = await this.commentsRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['publication']
      });
      return comments;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
