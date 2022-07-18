import { UpdatePlaceDto } from './dto/update-place.dto';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './place.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {}

  async getAll(): Promise<Place[]> {
    const places = await this.placeRepository.find();
    return places.sort((firstElement: any, nextElement: any) => (new Date(`01/${firstElement.goal}`) > new Date(`01/${nextElement.goal}`)) ? 1 : -1);
  }

  async getById(id: number): Promise<Place> {
    const place = await this.placeRepository.findOne({ where: { id } });
    if (place) {
      return place;
    }

    throw new HttpException('Place not found', HttpStatus.NOT_FOUND);
  }

  async create(place: CreatePlaceDto): Promise<Place> {
    const newPlace = await this.placeRepository.create(place);
    await this.placeRepository.save(newPlace);

    return newPlace;
  }

  async update(id: number, place: UpdatePlaceDto): Promise<Place> {
    await this.placeRepository.update(id, place);
    const updatedPlace = await this.placeRepository.findOne({ where: { id } });
    if (updatedPlace) {
      return updatedPlace;
    }

    throw new HttpException('Place not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number): Promise<void> {
    const deletedPlace = await this.placeRepository.delete(id);
    if (!deletedPlace.affected) {
      throw new HttpException('Place not found', HttpStatus.NOT_FOUND);
    }
  }
}
