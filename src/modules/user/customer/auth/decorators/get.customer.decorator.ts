import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCustomerAuth = createParamDecorator(
  async (_data, context: ExecutionContext): Promise<any> => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
