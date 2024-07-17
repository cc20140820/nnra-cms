import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { BasicModule } from './basic/basic.module';

@Module({
  imports: [
    RolesModule,
    BookModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nnra'),
    CategoryModule,
    TagModule,
    BasicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
