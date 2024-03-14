import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepositoryMock: Partial<Record<keyof Repository<User>, jest.Mock>>;
  let roleRepositoryMock: Partial<Record<keyof Repository<Role>, jest.Mock>>;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };
    roleRepositoryMock = {
      findOneBy: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: roleRepositoryMock,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should create a new user and return it', async () => {
    const createUserInput =
      {
        email: 'test@test.com',
        password: 'password',
        firstName: 'Nathan',
        lastName: 'Dupont',
        roleId: 1
      } as CreateUserInput;
    const role = new Role();
    role.id = 1;
    role.name = 'User';

    const expectedUser = new User();
    expectedUser.email = createUserInput.email;
    expectedUser.password = createUserInput.password;
    expectedUser.firstName = createUserInput.firstName;
    expectedUser.lastName = createUserInput.lastName;
    expectedUser.role = role;

    roleRepositoryMock.findOneBy.mockReturnValue(Promise.resolve(role));
    userRepositoryMock.create.mockReturnValue(expectedUser);
    userRepositoryMock.save.mockResolvedValue(expectedUser);

    const result = await usersService.create(createUserInput);

    expect(result).toEqual(expectedUser);
    expect(userRepositoryMock.create).toHaveBeenCalledWith({
      ...createUserInput,
      role,
    });
    expect(userRepositoryMock.save).toHaveBeenCalledWith(expectedUser);
  });
});
