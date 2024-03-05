import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Password of the user' })
  password: string;

  @Field(() => String, { description: 'First name of the user' })
  firstName: string;

  @Field(() => String, { description: 'Last name of the user' })
  lastName: string;

  @Field(() => Number, { description: 'Role ID of the user' })
  roleId: number;
}
