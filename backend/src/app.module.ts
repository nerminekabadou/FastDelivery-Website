import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { FoodModule } from './food/food.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { JwtMiddleware } from './auth/middleware/jwt.middleware';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    FoodModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude('auth/register') // ✅ Exclude public routes like register
      .forRoutes('*'); // Apply it to all other routes
  }
}