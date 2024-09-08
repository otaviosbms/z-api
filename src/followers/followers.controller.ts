import { Controller, Post, Delete, Get, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/follower.dto';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  // Rota para criar um novo seguidor
  @Post()
  async createFollower(@Body() createFollowerDto: CreateFollowerDto, @Res() res: Response) {
    try {
      const follower = await this.followersService.createFollower(createFollowerDto);
      return res.status(HttpStatus.CREATED).json(follower);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para deletar um seguidor pelo ID
  @Delete('/:id')
  async deleteFollower(@Param('id') id: number, @Res() res: Response) {
    try {
      const result = await this.followersService.deleteFollower(id);
      return res.status(HttpStatus.OK).json({ message: result });
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'Follower not found' });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para listar todos os seguidores de um usuário
  @Get('/user/:userId')
  async getFollowersByUserId(@Param('userId') userId: number, @Res() res: Response) {
    try {
      const followers = await this.followersService.getFollowersByUserId(userId);
      return res.status(HttpStatus.OK).json(followers);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
