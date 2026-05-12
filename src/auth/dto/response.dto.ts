import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    example: 'User registered successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'user@example.com',
      name: 'John Doe',
    },
    description: 'User information',
    required: false,
  })
  user?: {
    id: string;
    email: string;
    name: string;
  };

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
    required: false,
  })
  token?: string;
}

export class MessageResponseDto {
  @ApiProperty({
    example: 'OTP sent to your email address',
    description: 'Response message',
  })
  message: string;
}

export class UserProfileDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  name: string;
}