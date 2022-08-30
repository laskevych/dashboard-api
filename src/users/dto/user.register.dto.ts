import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Name is empty.'})
	name: string;

	@IsEmail({}, { message: 'Incorrect email. '})
	email: string;

	@IsString({ message: 'Password is empty.'})
	password: string;
}
