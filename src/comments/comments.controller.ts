import { Controller, Post, Get, Patch, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Rota para criar um novo comentário
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto, @Res() res: Response) {
    try {
      const comment = await this.commentsService.createComment(createCommentDto);
      return res.status(HttpStatus.CREATED).json(comment);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para obter um comentário por ID
  @Get('/:id')
  async getCommentById(@Param('id') id: number, @Res() res: Response) {
    try {
      const comment = await this.commentsService.getCommentById(id);
      return res.status(HttpStatus.OK).json(comment);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: err.message });
    }
  }

  // Rota para atualizar um comentário pelo ID
  @Patch('/:id')
  async updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @Res() res: Response) {
    try {
      const comment = await this.commentsService.updateComment(id, updateCommentDto);
      return res.status(HttpStatus.OK).json(comment);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: err.message });
    }
  }

  // Rota para deletar um comentário pelo ID
  @Delete('/:id')
  async deleteComment(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.commentsService.deleteComment(id);
      return res.status(HttpStatus.OK).json({ message: 'Comment deleted successfully' });
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: err.message });
    }
  }

  // Rota para listar todos os comentários de um post
  @Get('/post/:postId')
  async getCommentsByPostId(@Param('postId') postId: number, @Res() res: Response) {
    try {
      const comments = await this.commentsService.getCommentsByPostId(postId);
      return res.status(HttpStatus.OK).json(comments);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para listar todos os comentários de um usuário
  @Get('/user/:userId')
  async getCommentsByUserId(@Param('userId') userId: number, @Res() res: Response) {
    try {
      const comments = await this.commentsService.getCommentsByUserId(userId);
      return res.status(HttpStatus.OK).json(comments);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
