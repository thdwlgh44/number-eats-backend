import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { InputType, ObjectType, Field, registerEnumType } from "@nestjs/graphql";
import { IsEmail, IsEnum } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";

enum UserRole {
    Owner,
    Client,
    Delivery
}

registerEnumType(UserRole, {name: 'UserRole'});

@InputType({isAbstract:true})
@ObjectType()
@Entity()
export class User extends CoreEntity {

    @Column()
    @Field(type=>String)
    @IsEmail()
    email: string;

    @Column({ select: false })
    @Field(type=>String)
    password: string;

    @Column({type: 'enum', enum : UserRole})
    @Field(type=>UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @Column({default:false}) //user의 email이 verification에 저장이 되었는지 확인하는 컬럼
    @Field(type=>Boolean)
    verified: boolean;

    @BeforeInsert()
    @BeforeUpdate() //password 저장 시 항상 해시화 할 수 있도록 한다. update()에서 이것을 호출하지 못하는 이유는?
    async hashPassword() : Promise<void> { //entity를 저장하기 전 password를 hash로 변환하고 이후 저장
        if (this.password) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}

    @BeforeInsert()
    async checkPassword(aPassword:string) : Promise<boolean> {
        try {
            const ok =  await bcrypt.compare(aPassword, this.password);
            return ok;
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

}