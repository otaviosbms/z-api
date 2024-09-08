import { Controller, Post, Get, Patch, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto, UpdatePublicationDto } from './dto/publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  // Rota para criar um post
  @Post()
  async createPost(@Body() createPublicationDto: CreatePublicationDto, @Res() res: Response) {
    try {
      const publication = await this.publicationsService.createPost(createPublicationDto);
      return res.status(HttpStatus.CREATED).json(publication);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para obter um post pelo ID
  @Get('/:id')
  async getPostById(@Param('id') id: number, @Res() res: Response) {
    try {
      const publication = await this.publicationsService.getPostById(id);
      return res.status(HttpStatus.OK).json(publication);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'Post not found' });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para atualizar um post pelo ID
  @Patch('/:id')
  async updatePost(@Param('id') id: number, @Body() updatePublicationDto: UpdatePublicationDto, @Res() res: Response) {
    try {
      const updatedPost = await this.publicationsService.updatePost(id, updatePublicationDto);
      return res.status(HttpStatus.OK).json(updatedPost);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'Post not found' });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para deletar um post pelo ID
  @Delete('/:id')
  async deletePost(@Param('id') id: number, @Res() res: Response) {
    try {
      const result = await this.publicationsService.deletePost(id);
      return res.status(HttpStatus.OK).json({ message: result });
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'Post not found' });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para listar todos os posts
  @Get()
  async getPosts(@Res() res: Response) {
    try {
      const publications = await this.publicationsService.getPosts();
      return res.status(HttpStatus.OK).json(publications);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para listar todos os posts de um usuário
  @Get('/user/:userId')
  async getPostsByUserId(@Param('userId') userId: number, @Res() res: Response) {
    try {
      const publications = await this.publicationsService.getPostsByUserId(userId);
      return res.status(HttpStatus.OK).json(publications);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
