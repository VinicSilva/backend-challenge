import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreatePlaceDto {
  @JoiSchema(Joi.string().required())
  @ApiProperty({
    example: 'Jericoacoara',
    description: `Should have the place name of the trip`,
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty({
    example: 'Brazil',
    description: `Should have the country name of the trip`,
  })
  @IsString()
  @IsNotEmpty()
  public country: string;

  @JoiSchema(
    Joi.string()
      .regex(/(0[1-9]|1[0-2])\/(20([2-9][2-9]|[3-9][0-9])|2[1-9][0-9][0-9])/)
      .max(7)
      .required(),
  )
  @ApiProperty({
    example: '05/2025',
    description: `Should have the trip date with month and year`,
  })
  @IsString()
  @IsNotEmpty()
  public goal: string;

  @JoiSchema(
    Joi.string()
      .regex(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/,
      )
      .required(),
  )
  @ApiProperty({
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJUOTBifve4D5fT6xqQzGls-LrHKz-znwNw&usqp=CAU',
    description: 'Should have the flag url from the country',
  })
  @IsString()
  @IsNotEmpty()
  public flagUrl: string;
}
