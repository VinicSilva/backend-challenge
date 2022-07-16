import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './place.entity';
import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
