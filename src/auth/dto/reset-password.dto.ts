import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
    required: true,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '123456',
    description: '6-digit OTP received via email',
    minLength: 6,
    maxLength: 6,
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  otp!: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'New password (min 6 characters)',
    minLength: 6,
    maxLength: 50,
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  newPassword!: string;
}