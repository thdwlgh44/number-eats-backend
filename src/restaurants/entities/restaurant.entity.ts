import { InputType, ObjectType, Field } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsBoolean, Length, IsOptional } from 'class-validator';

@InputType({isAbstract:true}) //InputType이 스키마에 포함되지 않도록 한다.
@ObjectType() //GraphQL Entity
@Entity() //TypeORM Entity
export class Restaurant {

    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id: number;

    @Field(type => String) //func => type
    @Column()
    @IsString()
    @Length(5)
    name: string;

    @Field(type => Boolean, {nullable: true }) //graphQL 스키마에서 이 필드의 defaultValue는 True이다.
    @Column({default:true})
    @IsOptional() //해당 field를 보내거나 보내지 않을 수 있다.
    @IsBoolean()
    isVegan?: boolean;

    @Field(type => String, {defaultValue: "강남"})
    @Column()
    @IsString()
    address: string;

    @Field(type => String)
    @Column()
    @IsString()
    ownerName: string;
    
    @Field(type => String)
    @Column()
    @IsString()
    categoryName: string;
}