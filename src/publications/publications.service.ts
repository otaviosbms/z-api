import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './publication.entity';
import { CreatePublicationDto, UpdatePublicationDto } from './dto/publication.dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private publicationsRepository: Repository<Publication>,
  ) {}

  // Criar um novo post
  async createPost(postData: CreatePublicationDto) {
    try {
      const publication = this.publicationsRepository.create(postData);
      await this.publicationsRepository.save(publication);
      return publication;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Obter um post por ID
  async getPostById(id: number) {
    try {
      const publication = await this.publicationsRepository.findOne({ where: { id } });
      if (!publication) {
        throw new NotFoundException('Post not found');
      }
      return publication;
    } catch (error) {
      throw new BadRequestException(error.message);
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
      throw new BadRequestException(error.message);
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
      throw new BadRequestException(error.message);
    }
  }

  // Obter posts de um usuário
  async getPostsByUserId(userId: number) {
    try {
      const publications = await this.publicationsRepository.find({ where: { userId } });
      return publications;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Obter todos os posts
  async getPosts() {
    try {
      const publications = await this.publicationsRepository.find();
      return publications;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
