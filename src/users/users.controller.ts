import { User } from '@prisma/client';
import { TokenData } from 'src/decorators/token-data.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.usersService.register(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() data: any) {
    return this.usersService.login(data);
  }


  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @UseGuards(AuthGuard)
  getMyProfile(@TokenData() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile/:id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return this.usersService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('profile')
  @UseGuards(AuthGuard)
  update(@TokenData('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @HttpCode(HttpStatus.NO_CONTENT)
  // @Delete('profile')
  // @UseGuards(AuthGuard)
  // remove(@TokenData('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
  //   return this.usersService.remove(id);
  // }
}
