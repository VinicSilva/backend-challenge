import { UpdatePlaceDto } from './dto/update-place.dto';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceService } from './place.service';
import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('places')
@Controller('api/v1/place')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    @Get()
    getTodos() {
      return this.placeService.getAll();
    }
  
    @Get(':id')
    getById(@Param('id') id: string) {
      return this.placeService.getById(Number(id));
    }
  
    @Post()
    async create(@Body() place: CreatePlaceDto) {
      return this.placeService.create(place);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() place: UpdatePlaceDto) {
      return this.placeService.update(Number(id), place);
    }
  
    @Delete(':id')
    async deleteTodo(@Param('id') id: string) {
      this.placeService.delete(Number(id));
    }
}
