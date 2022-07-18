import { HttpException, HttpStatus } from '@nestjs/common';
import { fakeFirstPlace, mockPlaceRepository, savedFakePlace, fakePlaces, updatedFakePlace } from './../../test/fake';
import { Place } from './place.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { PlaceService } from './place.service';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('PlaceService', () => {
  let service: PlaceService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaceService,
        { provide: getRepositoryToken(Place), useValue: mockPlaceRepository },
      ],
    }).compile();

    service = module.get<PlaceService>(PlaceService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return the places with correct params', async () => {
      const places = await service.getAll()
      expect(places).toBe(fakePlaces)
      expect(places).toHaveLength(2)
    });
  });

  describe('getById', () => {
    it('should return the place by id', async () => {
      const place = await service.getById(1)
      expect(place).toBe(fakeFirstPlace)
    });

    it('should return throw when get place with invalid id', async () => {
      jest.spyOn(mockPlaceRepository, 'findOne').mockResolvedValue(null);
      const placeId = 123;
      await expect(service.getById(placeId)).rejects.toThrow(new HttpException('Place not found', HttpStatus.NOT_FOUND))
    });
  })

  describe('create', () => {
    it('should create place with correct params and return', async () => {
      const savedPlace = await service.create({
        name: "Dubai",
        country: "Qatar",
        goal: "02/2026",
        flagUrl: "any_flagUrl",
      })
      expect(savedPlace).toBe(savedFakePlace)
    });
  });

  describe('update', () => {
    it('should update place with correct params and return', async () => {
      jest.spyOn(mockPlaceRepository, 'findOne').mockResolvedValue(updatedFakePlace);
      const placeId = 1;
      const updatePlace = await service.update(placeId, {
        name: "Santos",
        goal: "10/2023",
      })
      expect(updatePlace).toBe(updatedFakePlace)
    });

    it('should return throw when update place with invalid id', async () => {
      jest.spyOn(mockPlaceRepository, 'findOne').mockResolvedValue(null);
      const placeId = 123;
      await expect(service.update(placeId, {
        name: "Santos",
        goal: "10/2023",
      })).rejects.toThrow(new HttpException('Place not found', HttpStatus.NOT_FOUND))
    });
  });

  describe('delete', () => {
    it('should delete place with correct params and return', async () => {
      const placeId = 1;
      await expect(service.delete(placeId)).resolves.not.toThrow(new Error())
    });

    it('should return exception when delete place with invalid id', async () => {
      jest.spyOn(mockPlaceRepository, 'delete').mockResolvedValue({ affected: false });
      const placeId = 123;
      await expect(service.delete(placeId)).rejects.toThrow(new HttpException('Place not found', HttpStatus.NOT_FOUND))
    });
  });  
});
