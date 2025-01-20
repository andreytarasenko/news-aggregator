import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsProvidersService } from './news-providers.service';
import {
  NewsProvider,
  NewsProviderBase,
} from './entities/news-provider.entity';

@Controller('news-providers')
export class NewsProvidersController {
  constructor(private readonly newsProvidersService: NewsProvidersService) {}

  @Post()
  create(@Body() createNewsProviderDto: NewsProviderBase) {
    return this.newsProvidersService.create(createNewsProviderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsProvidersService.findOne(id);
  }

  @Patch()
  update(@Body() updateNewsProviderDto: NewsProvider) {
    return this.newsProvidersService.update(updateNewsProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsProvidersService.remove(id);
  }
}
