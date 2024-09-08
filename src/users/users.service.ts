import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['publications', 'following', 'followers', 'likes', 'comments'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        user,
        userPosts: user.publications,
        userFollowers: user.followers,
        userLikes: user.likes,
        userComments: user.comments,
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
