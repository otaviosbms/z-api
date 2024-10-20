import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { Publication } from './publication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publication]),
    UsersModule
  ],
  providers: [PublicationsService],
  controllers: [PublicationsController],
  exports: [PublicationsService]
})
export class PublicationsModule {}
