import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RequestResetDto } from './dto/request-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponseDto, MessageResponseDto, UserProfileDto } from './dto/response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ 
    summary: 'Register a new user',
    description: 'Creates a new user account with email, name, and password'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    type: AuthResponseDto
  })
  @ApiResponse({ 
    status: 409, 
    description: 'User already exists with this email'
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data'
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ 
    summary: 'Login user',
    description: 'Authenticates user with email and password and returns JWT token'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    type: AuthResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials'
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('request-reset')
  @ApiOperation({ 
    summary: 'Request password reset OTP',
    description: 'Sends a 6-digit OTP to the user\'s email for password reset'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'OTP sent successfully',
    type: MessageResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'User not found or email service failed'
  })
  requestReset(@Body() requestResetDto: RequestResetDto) {
    return this.authService.requestPasswordReset(requestResetDto);
  }

  @Post('reset-password')
  @ApiOperation({ 
    summary: 'Reset password with OTP',
    description: 'Resets user password using the OTP sent to their email'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Password reset successful',
    type: MessageResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid OTP or expired OTP'
  })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Get user profile',
    description: 'Returns the authenticated user\'s profile information'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Profile retrieved successfully',
    type: UserProfileDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  getProfile(@Request() req) {
    return req.user;
  }
}