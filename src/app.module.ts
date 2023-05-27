import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { Verification } from './users/entities/verification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",
      ignoreEnvFile: process.env.NODE_ENV === 'prod', //prod 환경일 때 모듈이 환경변수 파일을 무시하게 된다.
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(), //token을 지정하기 위한 private key
      }),
    }), 
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, //+: string=>number
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod', //DB의 구성을 자동으로 바꾸어준다. (migration)
      logging: process.env.NODE_ENV !== 'prod', //prod 환경에서만 모든 DB 로그들을 확인하도록 한다.
      entities: [User, Verification],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({req}) => ({ user: req['user'] }),
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    UsersModule,  
  ],  
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtMiddleware).forRoutes({path:"graphql", method:RequestMethod.POST});
  }
}
