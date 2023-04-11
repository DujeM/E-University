import { IsString, IsUUID, IsArray } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsArray()
  roles: string[];

  public static from(dto: Partial<UserDto>) {
    const u = new UserDto();
    u.id = dto.id;
    u.username = dto.username;
    u.email = dto.email;
    u.password = dto.password;
    u.firstName = dto.firstName;
    u.lastName = dto.lastName;
    u.roles = dto.roles;
    return u;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      password: entity.password,
      firstName: entity.firstName,
      lastName: entity.lastName,
      roles: entity.roles,
    });
  }

  public toEntity() {
    const u = new User();
    u.id = this.id;
    u.username = this.username;
    u.email = this.email;
    u.password = this.password;
    u.firstName = this.firstName;
    u.lastName = this.lastName;
    u.roles = this.roles;
    u.createDateTime = new Date();
    return u;
  }
}
