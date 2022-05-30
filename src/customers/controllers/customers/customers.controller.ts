import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  getCustomers(@Res() res: Response) {
    return res.json(this.customersService.getCustomers());
  }

  @Get(':id')
  findCustomer(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    return res.json(this.customersService.findCustomers(id));
  }

  @Get('/search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomers(id);
    if (customer) return customer;
    throw new HttpException('Customer not found!', HttpStatus.NOT_FOUND);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    this.customersService.createCustomer(createCustomerDto);
    return { ok: 'Created' };
  }
}
