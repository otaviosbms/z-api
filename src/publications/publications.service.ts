import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './publication.entity';
import { CreatePublicationDto, UpdatePublicationDto } from './dto/publication.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private publicationsRepository: Repository<Publication>,
    private readonly usersService: UsersService
  ) { }

  // Criar um novo post
  async createPost(postData: CreatePublicationDto) {
    try {
      const user = await this.usersService.getUserById(postData.userId)

      const publication = this.publicationsRepository.create({
        ...postData,
        user
      });

      await this.publicationsRepository.save(publication);

      return publication.user.id;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Obter um post por ID
  async getPostById(id: number) {
    try {
      const publication = await this.publicationsRepository.findOne(
        {
          where: { id },
          relations: ['user','comments', 'likes',]
        });

      if (!publication) {
        throw new NotFoundException('Post not found');
      }
      return publication;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Atualizar um post pelo ID
  async updatePost(id: number, postData: UpdatePublicationDto) {
    try {
      const result = await this.publicationsRepository.update(id, postData);
      if (result.affected === 0) {
        throw new NotFoundException('Post not found');
      }
      const updatedPost = await this.getPostById(id);
      return updatedPost;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Deletar um post pelo ID
  async deletePost(id: number) {
    try {
      const result = await this.publicationsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Post not found');
      }
      return 'Post deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Obter posts de um usuário
  async getPostsByUserId(userId: number) {
    try {
      const publications = await this.publicationsRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['user', 'comments', 'likes'],
      });
      return publications;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Obter todos os posts
  async getPosts() {
    try {
      const publications = await this.publicationsRepository.find();
      return publications;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
