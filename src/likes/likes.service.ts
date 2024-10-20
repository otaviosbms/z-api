import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { CreateLikeDto } from './dto/like.dto';
import { Publication } from '../publications/publication.entity';
import { User } from '../users/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Publication)
    private publicationsRepository: Repository<Publication>,
  ) { }

  // Criar um novo like
  async createLike(likeData: CreateLikeDto) {
    try {
      const { userId, publicationId } = likeData;

      const [user, publication] = await Promise.all([
        this.usersRepository.findOneBy({ id: userId }),
        this.publicationsRepository.findOneBy({ id: publicationId })
      ]);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!publication) {
        throw new NotFoundException('Publication not found');
      }

      const existingLike = await this.likesRepository.findOneBy({
        user: { id: userId },
        publication: { id: publicationId },
      });

      if (existingLike) {
        throw new BadRequestException('liked');
      }

      const like = this.likesRepository.create({
        user,
        publication,
      });

      await this.likesRepository.save(like);
      return like;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Usuário deletar um like de post
  async userDeleteLike(userId: number, publicationId: number) {
    try {
      const like = await this.likesRepository.findOne({
        where: {
          user: { id: userId },
          publication: { id: publicationId },
        },
      });

      if (!like) {
        throw new NotFoundException('Like not found');
      }

      await this.likesRepository.remove(like);
      return 'Like deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Deletar um like pelo id
  async deleteLike(id: number) {
    try {
      const result = await this.likesRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Like not found');
      }
      return 'Like deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Listar todos os likes de um post
  async getLikesByPostId(publicationId: number) {
    try {
      const likes = await this.likesRepository.find({
        where: {
          publication: { id: publicationId },
        },
        relations: ['user'],
      });
      return likes;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Listar todos os likes de um usuário
  async getLikesByUserId(userId: number) {
    try {
      const likes = await this.likesRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['publication'],
      });
      return likes;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}