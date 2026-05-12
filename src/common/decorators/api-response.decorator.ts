import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiConflictResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiStandardResponse = <TModel extends Type<any>>(model: TModel, status: 'ok' | 'created' = 'ok') => {
  const decorator = status === 'created' ? ApiCreatedResponse : ApiOkResponse;
  return decorator({
    schema: {
      allOf: [
        {
          properties: {
            message: { type: 'string' },
            data: { $ref: getSchemaPath(model) },
            token: { type: 'string' }
          }
        }
      ]
    }
  });
};

export const ApiAuthResponses = () => {
  return applyDecorators(
    ApiUnauthorizedResponse({ description: 'Invalid credentials' }),
    ApiBadRequestResponse({ description: 'Invalid input data' }),
    ApiConflictResponse({ description: 'User already exists' })
  );
};