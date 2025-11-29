import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private toResponseDto(user: User): UserResponseDto {
    const { passwordHash, ...result } = user;
    // This is a simplified mapping. In a real app, you might use class-transformer.
    return result as UserResponseDto;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const { password, ...userData } = createUserDto;

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        passwordHash: hashedPassword,
      },
    });

    return this.toResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => this.toResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return this.toResponseDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const { password, ...userData } = updateUserDto;
    let hashedPassword;

    if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
    }
    
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
            ...userData,
            ...(hashedPassword && { passwordHash: hashedPassword }),
        },
      });

      return this.toResponseDto(user);
    } catch (error) {
        // Handle case where user to update is not found
        throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async remove(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return this.toResponseDto(user);
    } catch (error) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}