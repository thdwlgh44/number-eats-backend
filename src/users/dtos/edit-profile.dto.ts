import { CoreOutput } from "src/common/dtos/output.dto";
import { InputType, ObjectType, PickType, PartialType } from '@nestjs/graphql';
import { User } from "../entities/user.entity";

@ObjectType()
export class EditProfileOut extends CoreOutput {}

@InputType()
export class EditProfileInput extends PartialType(
    PickType(User, ["email", "password"]),
    ) {}