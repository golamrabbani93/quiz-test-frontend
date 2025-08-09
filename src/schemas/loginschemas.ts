//useing zod for login validation

import z from 'zod';

export const loginSchema = z.object({
	email: z
		.string('Email is required')
		.nonempty({message: 'Email is required'})
		.email({message: 'Email must be a valid email address'}),
	password: z
		.string('Password is required')
		.min(6, {message: 'Password must be at least 6 characters'})
		.max(100, {message: 'Password must be at most 100 characters'}),
});
