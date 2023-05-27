import { v4 as uuid4 } from 'uuid';
import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';


@InputType({isAbstract:true})
@ObjectType()
@Entity()
export class Verification extends CoreEntity {

    @Column()
    @Field(type => String)
    code: string;

    @OneToOne(type => User, {onDelete: "CASCADE"}) //user가 삭제되었을 때의 동작을 정의해둔다.
    @JoinColumn()
    user: User;

    @BeforeInsert()
    createCode(): void {
        this.code = uuid4();
    }
}
