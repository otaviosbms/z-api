import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
  ) {}

  // Criar um novo like
  async createLike(likeData: CreateLikeDto) {
    try {
      const { userId, publicationId } = likeData;

      const user = await this.usersRepository.findOneBy({ id: userId });
      const publication = await this.publicationsRepository.findOneBy({ id: publicationId });

      if (!user || !publication) {
        throw new BadRequestException('User or Publication not found');
      }

      const like = this.likesRepository.create({
        user,
        publication,
      });
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
    throw new BadRequestException(error.message);
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
    throw new BadRequestException(error.message);
  }
}

}
