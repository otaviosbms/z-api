import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Publication } from '../publications/publication.entity';
import { Follower } from '../followers/follower.entity';
import { Like } from '../likes/like.entity';
import { Comment } from '../comments/comment.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Publication)
    private publicationsRepository: Repository<Publication>,
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  // Criar um usuário
  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Obter um usuário por ID
  async getUserById(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const userPosts = await this.publicationsRepository.find({ where: { userId: id } });
      const userFollowers = await this.followersRepository.find({ where: { followeeId: id } });
      const userLikes = await this.likesRepository.find({ where: { userId: id } });
      const userComments = await this.commentsRepository.find({ where: { userId: id } });

      return {
        user,
        userPosts,
        userFollowers,
        userLikes,
        userComments,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Atualizar um usuário pelo ID
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.usersRepository.update(id, updateUserDto);
      if (result.affected === 0) {
        throw new NotFoundException('User not found');
      }
      return this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Deletar um usuário pelo ID
  async deleteUser(id: number) {
    try {
      const result = await this.usersRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('User not found');
      }
      return 'User deleted successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Listar todos os usuários
  async getAllUsers() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
