import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestResetDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address to send password reset OTP',
    required: true,
  })
  @IsEmail()
  email!: string;
}