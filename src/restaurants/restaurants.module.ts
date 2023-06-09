import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant])], //repository import
    providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
