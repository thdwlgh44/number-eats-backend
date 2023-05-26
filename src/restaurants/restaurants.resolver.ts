import { Mutation, Args, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";

@Resolver(of => Restaurant)
export class RestaurantResolver {
    @Query(returns => [Restaurant]) //GraphQL을 위한 return type
        restaurnts(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
            return [];
        }
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() createRestaurantDto: CreateRestaurantDto
        // @Args('name') name: string,
        // @Args('isVegan') isVegan: boolean,
        // @Args('address') address: string,
        // @Args('ownerName') ownerName: string,
    ): boolean {
        console.log(createRestaurantDto);
        return true;
    }  
}