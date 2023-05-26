import { Mutation, Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { error } from "console";
import { LoginInput, LoginOutput } from "./dtos/login.dto";

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput,): Promise<CreateAccountOutput> {
    try {
        return this.usersService.createAccount(createAccountInput);
    } catch (error) {
        return {
            error,
            ok: false,
        };
    }
}

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try {
            return this.usersService.login(loginInput);
        } catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }

    @Query(returns => User)
    me() {
        
    }

}

