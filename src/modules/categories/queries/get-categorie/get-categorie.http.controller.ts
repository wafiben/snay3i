import { Controller, Get, Body } from '@nestjs/common';
import { routesV1 } from '@modules/categories/categorie.routes';

@Controller(routesV1.categorie.createCategorie)
export class GetOneCategorieHttpController {
  @Get()
  getHello(): string {
    return "Hello From the other side"
  }
}
