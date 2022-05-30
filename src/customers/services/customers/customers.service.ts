import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'samuel.ragnelli@gmail.com',
      name: 'Samuel Azevedo Ragnelli',
    },
    {
      id: 2,
      email: 'marcelo.ragnelli@gmail.com',
      name: 'Marcelo Ragnelli Frigério',
    },
    {
      id: 3,
      email: 'daiana.ragnelli@gmail.com',
      name: 'Daiana Azevedo Ragnelli',
    },
  ];
  getCustomers(): Customer[] {
    return this.customers;
  }
  findCustomers(id: number): Customer | undefined {
    return this.customers.find((c) => c.id === id);
  }
  createCustomer(createCustomerDto: CreateCustomerDto) {
    this.customers.push(createCustomerDto);
  }
}
