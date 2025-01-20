import { Entity } from 'typeorm';

import { Column, PrimaryGeneratedColumn } from 'typeorm';

export interface NewsProviderBase {
  name: string;
  apiUrl: string;
  description: string;
}

export interface NewsProvider extends NewsProviderBase {
  id: string;
}

@Entity('news_provider_entity')
export default class NewsProviderEntity implements NewsProvider {
  constructor(newsProviderBase: NewsProviderBase) {
    Object.assign(this, newsProviderBase);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  apiUrl: string;

  @Column()
  description: string;
}
