import { Mutation, Args, Query, Resolver, Context } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { error } from "console";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUser } from "src/auth/auth-user.decorator";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileInput, EditProfileOut } from "./dtos/edit-profile.dto";
import { VerifyEmailInputput, VerifyEmailOutput } from "./dtos/verify-email.dto";

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput,): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
}

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        return this.usersService.login(loginInput);
    }

    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User) {
        return authUser;
    }

    @UseGuards(AuthGuard)
    @Query(returns => UserProfileOutput)
    async userProfile(@Args() userProfileInput: UserProfileInput,): Promise<UserProfileOutput> {
        return this.usersService.findById(userProfileInput.userId);
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => EditProfileOut)
    async editProfile(
        @AuthUser() authUser: User,
        @Args('input') editProfileInput: EditProfileInput): Promise<EditProfileOut> {
        return this.usersService.editProfile(authUser.id, editProfileInput);
    }

    @Mutation(returns => VerifyEmailOutput)
    async verifyEmail(@Args('input') { code }: VerifyEmailInputput): Promise<VerifyEmailOutput> {
        return this.usersService.verifyEmail(code);
}
    // me(@Context() context) {
    //     if(!context.user) {
    //         return;
    //     } else {
    //         return context.user;
    //     }
    // }

}

