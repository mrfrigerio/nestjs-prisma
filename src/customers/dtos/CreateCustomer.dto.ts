import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddressDto';

export class CreateCustomerDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
