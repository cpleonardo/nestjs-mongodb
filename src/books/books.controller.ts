import { Req } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ParseObjectIdPipe } from '../utilities/parse-object-id-pipe.pipe';
import { NotFoundException } from '@nestjs/common';

@Controller('books')
@ApiTags('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.booksService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.booksService.findOne(id).then((book) => {
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    });
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto).then((book) => {
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.booksService.remove(id).then((result) => {
      if (result.deletedCount === 0) {
        throw new NotFoundException('Book not found');
      }
      return result
    });
  }
}
