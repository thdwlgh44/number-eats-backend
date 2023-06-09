import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Verification } from './entities/verification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Verification])], //app.module에서 Global:true로 설정하였으므로 ConfigService 사용하지 않아도 됨.
    providers: [UsersResolver, UsersService],
    exports: [UsersService],
})
export class UsersModule {}
