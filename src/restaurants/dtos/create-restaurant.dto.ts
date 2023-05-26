import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { IsString, IsBoolean, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurant.entity';


@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) { //id 요소만 생략하는 옵션

}