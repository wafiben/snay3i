import { Controller, Post, Body } from '@nestjs/common';

@Controller('categories')
export class CategorieHttpController {
  @Post()
  create(@Body() createCategoryDto: any) {
    console.log('ssssssssssss');
    return {
      message: 'Category created successfully',
      data: createCategoryDto,
    };
  }
}
