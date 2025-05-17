import { Module } from '@nestjs/common';
import { GetOneCategorieHttpController } from './queries/get-categorie/get-categorie.http.controller';
import { GetOneCategorieHandler } from './queries/get-categorie/get-categorie.handler';

@Module({
    controllers: [GetOneCategorieHttpController],
    providers: [GetOneCategorieHandler],
})
export class CategoryModule { }