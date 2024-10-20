import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './follower.entity';
import { CreateFollowerDto } from './dto/follower.dto';
import { User } from '../users/user.entity';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

// Criar um novo seguidor
async createFollower(followerData: CreateFollowerDto) {
  try {
    const { followerId, followeeId } = followerData;

    const [followerUser, followeeUser] = await Promise.all([
      this.usersRepository.findOneBy({ id: followerId }),
      this.usersRepository.findOneBy({ id: followeeId }),
    ]);

    if (!followerUser || !followeeUser) {
      throw new NotFoundException('User not found');
    }

    const follower = this.followersRepository.create({
      follower: followerUser,
      followee: followeeUser,
    });

    await this.followersRepository.save(follower);
    return follower;
  } catch (error) {
    throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }

  // Listar todos os seguidores de um usuário
async getFollowersByUserId(userId: number) {
  try {
    const followers = await this.followersRepository.find({
      where: {
        followee: { id: userId },
      },
      relations: ['follower'],
    });
    return followers;
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
}
}
