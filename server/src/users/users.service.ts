import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const roleId = createUserInput.roleId || 1;
    const role = await this.roleRepository.findOneBy({ id: roleId });

    if (!role) {
      throw new Error('Role not found');
    }

    const newUser = this.userRepository.create({
      ...createUserInput,
      role,
    });

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userRepository.update(id, updateUserInput);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
