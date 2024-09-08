import { Controller, Post, Get, Patch, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Rota para criar um usuário
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.createUser(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para obter um usuário pelo ID
  @Get('/:id')
  async getUserById(@Param('id') id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.getUserById(id);
      if (user) {
        return res.status(HttpStatus.OK).json(user);
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para atualizar um usuário pelo ID
  @Patch('/:id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.updateUser(id, updateUserDto);
      if (user) {
        return res.status(HttpStatus.OK).json(user);
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para deletar um usuário pelo ID
  @Delete('/:id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    try {
      const result = await this.usersService.deleteUser(id);
      if (result === 'User deleted successfully') {
        return res.status(HttpStatus.OK).json({ message: result });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  // Rota para listar todos os usuários
  @Get()
  async getAllUsers(@Res() res: Response) {
    try {
      const users = await this.usersService.getAllUsers();
      return res.status(HttpStatus.OK).json(users);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
