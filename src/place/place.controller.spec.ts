import { mockPlaceRepository } from './../../test/fake';
import { Place } from './place.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlaceController', () => {
  let controller: PlaceController;
  let service: PlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
      providers: [
        PlaceService,
        { provide: getRepositoryToken(Place), useValue: mockPlaceRepository },
      ]
    }).compile();

    controller = module.get<PlaceController>(PlaceController);
    service = module.get<PlaceService>(PlaceService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
