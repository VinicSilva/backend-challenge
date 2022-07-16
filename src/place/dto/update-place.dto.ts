import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdatePlaceDto {
  @ApiProperty({
    example: 'Jericoacoara',
    description: `Should have the place name of the trip`,
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: '05/2025',
    description: `Should have the trip date with month and year`,
  })
  @IsString()
  @IsNotEmpty()
  public goal: string;
}