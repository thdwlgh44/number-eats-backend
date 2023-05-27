import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";
import { ObjectType, Field, PickType, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput extends PickType(User, ["email", "password", "role",
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
    
}