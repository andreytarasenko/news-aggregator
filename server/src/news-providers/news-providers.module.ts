import { Module } from '@nestjs/common';
import { NewsProvidersService } from './news-providers.service';
import { NewsProvidersController } from './news-providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import NewsProviderEntity from './entities/news-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsProviderEntity])],
  controllers: [NewsProvidersController],
  providers: [NewsProvidersService],
  exports: [TypeOrmModule],
})
export class NewsProvidersModule {}
