import { Controller, Post, Body } from '@nestjs/common';
import { routesV1 } from '@modules/categories/categorie.routes';

@Controller(routesV1.categorie.createCategorie)
export class CategorieHttpController {
  @Post()
  create(@Body() createCategoryDto: any) {
    console.log('create categorie ...');
  }
}
