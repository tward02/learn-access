import {z} from 'zod'

//adapted from https://nextjs.org/docs/app/building-your-application/authentication, Title: Authentication, Organisation: Vercel, Accessed 11/02/2025
//validates login and register forms
export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, {message: 'Name must be at least 2 characters long.'})
        .max(200, {message: 'Name must no more than 200 characters long.'})
        .trim(),
    password: z
        .string()
        .min(8, {message: 'Be at least 8 characters long'})
        .regex(/[a-zA-Z]/, {message: 'Contain at least one letter.'})
        .regex(/[0-9]/, {message: 'Contain at least one number.'})
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),

})
