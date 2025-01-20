import { BadRequestException, Injectable } from '@nestjs/common';
import NewsProviderEntity, {
  NewsProvider,
  NewsProviderBase,
} from './entities/news-provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsProvidersService {
  constructor(
    @InjectRepository(NewsProviderEntity)
    private newsProviderRepository: Repository<NewsProviderEntity>,
  ) {}

  async create(createNewsProviderDto: NewsProviderBase) {
    return this.newsProviderRepository.save(
      new NewsProviderEntity(createNewsProviderDto),
    );
  }

  async findOne(id: string) {
    return this.newsProviderRepository.findOne({ where: { id } });
  }

  async update(updateNewsProviderDto: NewsProvider) {
    if (
      this.newsProviderRepository.exists({
        where: { id: updateNewsProviderDto.id },
      })
    ) {
      throw new BadRequestException('News provider does not exist');
    }

    return this.newsProviderRepository.save(
      new NewsProviderEntity(updateNewsProviderDto),
    );
  }

  async remove(id: string) {
    return this.newsProviderRepository.delete(id);
  }
}
