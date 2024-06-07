import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    RolesModule,
    ArticlesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nnra'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
