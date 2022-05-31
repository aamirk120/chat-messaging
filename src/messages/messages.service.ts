import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
// import { Message } from './entities/message.entity';



@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) { }

  //  difference between Prisma.MessageCreateInput and CreateMessageDto
  async create(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prisma.message.create({
      data,
    });
  }

  async findAll(user_id: number) {
    return this.prisma.message.findMany({
      where: { from: user_id }
    });
  }

  async update(id: number, data: UpdateMessageDto) {
    return this.prisma.message.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}