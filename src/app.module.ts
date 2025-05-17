import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/categories/categorie.module';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }

