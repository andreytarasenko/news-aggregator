import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsProvidersModule } from './news-providers/news-providers.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/services/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsProvidersController } from './news-providers/news-providers.controller';
import { AuthController } from './auth/auth.controller';
import { AdminService } from './users/services/admin.service';
import { NewsProvidersService } from './news-providers/news-providers.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: 5432,
        database: config.get('POSTGRES_DB'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5s' },
    }),
    NewsProvidersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, NewsProvidersController, AuthController],
  providers: [
    AppService,
    UsersService,
    NewsProvidersService,
    AdminService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
