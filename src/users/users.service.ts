import { AuthService } from 'src/services/auth/auth.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon from "argon2";
import { UpdateUserDto } from './dto/update-user.dto';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private authService: AuthService) { }

  //  difference between Prisma.UserCreateInput and CreateUserDto
  async register(data: Prisma.UserCreateInput) {
    try {
      data.password = await argon.hash(data.password);

      await this.prisma.user.create({
        data,
      });

      return true;
    } catch (error) {
      if (error.code === "P2002") {
        throw new ForbiddenException("user with email already exists");
      }
      throw error
    }
  }

  async login(dto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });

    if (!user) {
      throw new ForbiddenException("Credentials incorrect");
    }

    const pwMatch = await argon.verify(user.password, dto.password);
    if (!pwMatch) {
      throw new ForbiddenException("Credentials incorrect");
    }

    const token = await this.authService.generateToken(user);
    return { access_token: token };
  }

  async findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
