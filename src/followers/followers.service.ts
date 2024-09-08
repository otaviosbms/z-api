import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './follower.entity';
import { CreateFollowerDto } from './dto/follower.dto';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
  ) {}

  // Criar um novo seguidor
  async createFollower(followerData: CreateFollowerDto) {
    try {
      const follower = this.followersRepository.create(followerData);
      await this.followersRepository.save(follower);
      return follower;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Deletar um seguidor
  async deleteFollower(id: number) {
    try {
      const result = await this.followersRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Follower not found');
      }
      return 'Follower deleted successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Listar todos os seguidores de um usuário
  async getFollowersByUserId(userId: number) {
    try {
      const followers = await this.followersRepository.find({ where: { followeeId: userId } });
      return followers;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
