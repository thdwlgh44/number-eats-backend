import { MutationOutput } from "src/common/dtos/output.dto";
import { ObjectType, Field, PickType, InputType } from '@nestjs/graphql';
import { User } from "../entities/user.entity";

@InputType()
export class LoginInput extends PickType(User, ["email", "password"]) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
    @Field(type => String, {nullable:true}) //token은 있을 수도 없을 수도
    token?: string;

}