import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { CreateLikeDto } from './dto/like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  // Criar um novo like
  async createLike(likeData: CreateLikeDto) {
    try {
      const like = this.likesRepository.create(likeData);
      await this.likesRepository.save(like);
      return like;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Deletar um like
  async deleteLike(id: number) {
    try {
      const result = await this.likesRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Like not found');
      }
      return 'Like deleted successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Listar todos os likes de um post
  async getLikesByPostId(postId: number) {
    try {
      const likes = await this.likesRepository.find({ where: { postId } });
      return likes;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Listar todos os likes de um usuário
  async getLikesByUserId(userId: number) {
    try {
      const likes = await this.likesRepository.find({ where: { userId } });
      return likes;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
