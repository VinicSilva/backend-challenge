import { UpdatePlaceDto } from './dto/update-place.dto';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceService } from './place.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Place } from './place.entity';

@ApiTags('places')
@Controller('api/v1/place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  get(): Promise<Place[]> {
    return this.placeService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Place> {
    return this.placeService.getById(Number(id));
  }

  @Post()
  async create(@Body() place: CreatePlaceDto): Promise<Place> {
    return this.placeService.create(place);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() place: UpdatePlaceDto): Promise<Place> {
    return this.placeService.update(Number(id), place);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.placeService.delete(Number(id));
  }
}
