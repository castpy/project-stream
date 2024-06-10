import { ApiProperty } from '@nestjs/swagger';

export class AuthCustomerBodyDto {
  @ApiProperty({ type: String, example: 'customer@email.com' })
  email: string;

  @ApiProperty({ type: String, example: 'Teste@123' })
  password: string;
}
