import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePlaceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public goal: string;
}