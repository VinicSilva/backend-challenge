import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceDto {
  @ApiProperty({
    example: 'Jericoacoara',
    description: `Should have the place name of the trip`,
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: 'Brazil',
    description: `Should have the country name of the trip`,
  })
  @IsString()
  @IsNotEmpty()
  public country: string;

  @ApiProperty({
    example: '05/2025',
    description: `Should have the trip date with month and year`,
  })
  @IsString()
  @IsNotEmpty()
  public goal: string;

  @ApiProperty({
    example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJUOTBifve4D5fT6xqQzGls-LrHKz-znwNw&usqp=CAU',
    description: 'Should have the flag url from the country',
  })
  @IsString()
  @IsNotEmpty()
  public flagUrl: string;
}