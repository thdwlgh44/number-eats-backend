import { Mutation, Args, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { RestaurantService } from './restaurant.service';
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";

@Resolver(of => Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService) {}
    @Query(returns => [Restaurant]) //GraphQL을 위한 return type
        restaurnts(): Promise<Restaurant[]> {
            return this.restaurantService.getAll();
        }
    @Mutation(returns => Boolean)
    async createRestaurant(@Args('input') createRestaurantDto: CreateRestaurantDto): Promise<boolean> {
        try {
            await this.restaurantService.createRestaurant(createRestaurantDto);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
    
    @Mutation(returns => Boolean)
    async updateRestaurant(
        @Args('input') updateRestaurantDto : UpdateRestaurantDto,
        ) : Promise<boolean> { //InputType을 쓴다면 args 안에 input을 명시해야 함
        try {
            await this.restaurantService.updateRestaurant(updateRestaurantDto);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

}