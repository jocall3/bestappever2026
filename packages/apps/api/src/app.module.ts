import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

// Placeholder modules for common application features.
// import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Global configuration module using @nestjs/config
    // Loads environment variables from .env files and validates them.
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available throughout the application
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        API_GLOBAL_PREFIX: Joi.string().default('api/v1'), // Example API prefix
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().default('1h'),
        // Add other environment variables here
      }),
    }),
    PrismaModule,
    UsersModule,
    // AuthModule,
    // HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}