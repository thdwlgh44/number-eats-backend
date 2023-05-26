import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Restaurant {

    @Field(type => String) //func => type
    name: string;

    @Field(type => Boolean)
    isGood?: boolean;

    @Field(type => String)
    address: string;

    @Field(type => String)
    ownerName: string;
}