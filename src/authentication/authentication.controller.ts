import {
    Body,
    Req,
    Controller,
    HttpCode,
    Post,
    UseGuards,
    Res,
    Get,
    ClassSerializerInterceptor,
    UseInterceptors,
  } from '@nestjs/common';
  import { Response } from 'express';
import { AuthenticationService } from './authentications.service';
import RegisterDto from './dto/register.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';
  
  @Controller('authentication')
  @UseInterceptors(ClassSerializerInterceptor)
  export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}
  
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
      return this.authenticationService.register(registrationData);
    }
  
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(
      @Req() request: RequestWithUser,
      @Res({ passthrough: true }) response: Response,
    ) {
      const { user } = request;
      const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
      response.setHeader('Set-Cookie', cookie);
      return user;
    }
  
    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Res() response: Response) {
      response.setHeader(
        'Set-Cookie',
        this.authenticationService.getCookieForLogOut(),
      );
      return response.sendStatus(200);
    }
  
    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
      return request.user;
    }
  }