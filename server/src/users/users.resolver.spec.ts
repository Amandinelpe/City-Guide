import { Test } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersResolver = moduleRef.get<UsersResolver>(UsersResolver);
  });

  it('should return an array of users', async () => {
    const user = new User();
    user.id = '1';
    user.email = 'test@test.com';

    jest.spyOn(usersService, 'findAll').mockResolvedValue([user]);

    expect(await usersResolver.getUsers()).toEqual([user]);
  });
});
