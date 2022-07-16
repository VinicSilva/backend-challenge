import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdatePlaceDto {
  @JoiSchema(Joi.string().optional())
  @ApiProperty({
    example: 'Jericoacoara',
    description: `Should have the place name of the trip`,
  })
  @IsString()
  @IsOptional()
  public name: string;

  @JoiSchema(
    Joi.string()
      .regex(/(0[1-9]|1[0-2])\/(20([2-9][2-9]|[3-9][0-9])|2[1-9][0-9][0-9])/)
      .max(7)
      .optional(),
  )
  @ApiProperty({
    example: '05/2025',
    description: `Should have the trip date with month and year`,
  })
  @IsString()
  @IsOptional()
  public goal: string;
}
