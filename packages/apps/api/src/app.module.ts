import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Placeholder modules for common application features.
// These are expected to be created in sibling directories to 'app'.
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { HealthModule } from '../health/health.module';

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
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().default('1h'),
        // Add other environment variables specific to your application (e.g., Redis, S3, Email service keys)
      }),
      envFilePath: ['.env.development.local', '.env.development', '.env'], // Prioritized list of .env files
    }),

    // TypeORM module for database integration.
    // Configured asynchronously to leverage ConfigService for database credentials.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Or 'mysql', 'sqlite', etc.
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Scan for TypeORM entities across feature modules
        // In production, synchronize should be false and migrations should be used.
        // For development, it can be true for convenience.
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<string>('NODE_ENV') === 'development', // Log SQL queries in development
        // AutoLoadEntities: true, // Use this if you want entities to be loaded automatically
      }),
      inject: [ConfigService], // Inject ConfigService into the useFactory
    }),

    // Feature Modules:
    // Organize your application's logic into distinct modules for better maintainability and scalability.
    AuthModule, // Handles user authentication and authorization
    UserModule, // Manages user-related operations (CRUD, profiles, etc.)
    HealthModule, // Provides API endpoints for health checks and readiness probes
    // Add more feature modules here as your application grows, e.g.:
    // ProductsModule,
    // OrdersModule,
    // PaymentsModule,
  ],
  controllers: [AppController], // Root application controllers
  providers: [AppService], // Root application services
})
export class AppModule {}