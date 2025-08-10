import z from 'zod';

export const registerSchema = z.object({
	name: z
		.string('Name is required')
		.min(2, {message: 'Name must be at least 2 characters long'})
		.max(100, {message: 'Name must be at most 100 characters long'}),
	email: z
		.string('Email is required')
		.min(2, {message: 'Email must be at least 2 characters long'})
		.max(100, {message: 'Email must be at most 100 characters long'})
		.email({message: 'Email must be a valid email address'})
		.email({message: 'Email must be a valid email address'}),

	password: z
		.string('Password is required')
		.min(6, {message: 'Password must be at least 6 characters long'})
		.max(100, {message: 'Password must be at most 100 characters long'})
		.nonempty({message: 'Password is required'}),
});
