import { Controller, Get } from '@nestjs/common';
import { routesV1 } from '../../categorie.routes';
import { GetOneCategorieHandler } from './get-categorie.handler';
import { CategorieResponseDTO } from './get-categorie.response';


@Controller(routesV1.categorie.resourceById)
export class GetOneCategorieHttpController {
  constructor(private readonly categoryHandler: GetOneCategorieHandler) { }

  @Get()
  async getCategorie(id: string): Promise<CategorieResponseDTO> {
    return await this.categoryHandler.handle(id);
  }
}