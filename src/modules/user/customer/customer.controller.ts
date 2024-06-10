import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Customer')
export class CustomerController {
  constructor() {}
}
