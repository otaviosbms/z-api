import { Controller, Post, Delete, Get, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // Rota para criar um novo like
  @Post()
  async createLike(@Body() createLikeDto: CreateLikeDto, @Res() res: Response) {
    try {
      const like = await this.likesService.createLike(createLikeDto);
      return res.status(HttpStatus.CREATED).json(like);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para deletar um like pelo ID
  @Delete('/:id')
  async deleteLike(@Param('id') id: number, @Res() res: Response) {
    try {
      const result = await this.likesService.deleteLike(id);
      if (result === 'Like deleted successfully') {
        return res.status(HttpStatus.OK).json({ message: result });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'Like not found' });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para listar todos os likes de um post
  @Get('/post/:postId')
  async getLikesByPostId(@Param('postId') postId: number, @Res() res: Response) {
    try {
      const likes = await this.likesService.getLikesByPostId(postId);
      return res.status(HttpStatus.OK).json(likes);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para listar todos os likes de um usuário
  @Get('/user/:userId')
  async getLikesByUserId(@Param('userId') userId: number, @Res() res: Response) {
    try {
      const likes = await this.likesService.getLikesByUserId(userId);
      return res.status(HttpStatus.OK).json(likes);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
