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
    
    getAll() {
        return this.placeRepository.find();
    }

    async getById(id: number) {
        const todo = await this.placeRepository.findOne({where: {id}});
        if (todo) {
        return todo;
        }

        throw new HttpException('Place not found', HttpStatus.NOT_FOUND);
    }

    async create(todo: CreatePlaceDto) {
        const newTodo = await this.placeRepository.create(todo);
        await this.placeRepository.save(newTodo);

        return newTodo;
    }

    async update(id: number, post: UpdatePlaceDto) {
        await this.placeRepository.update(id, post);
        const updatedTodo = await this.placeRepository.findOne({where: {id}});
        if (updatedTodo) {
        return updatedTodo;
        }

        throw new HttpException('Place not found', HttpStatus.NOT_FOUND);
    }

    async delete(id: number) {
        const deletedTodo = await this.placeRepository.delete(id);
        if (!deletedTodo.affected) {
        throw new HttpException('Place not found', HttpStatus.NOT_FOUND);
        }
    }
}
