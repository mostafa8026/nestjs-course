import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UtilityModule } from 'src/utility/utility.module';
import { AuthService } from './auth.service';
import { SessionSerializer } from './serializers/session.serializer';
import { LocalStrategy } from './strategy/local.strategy';
import { UserSecurityService } from './user-sercurity.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    UtilityModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '3d',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UserSecurityService,
    SessionSerializer,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
