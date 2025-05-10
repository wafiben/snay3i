import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetOneCategorieHttpController } from '@modules/categories/queries/get-categorie/get-categorie.http.controller';

@Module({
  imports: [],
  controllers: [AppController,GetOneCategorieHttpController],
  providers: [AppService],
})
export class AppModule {}