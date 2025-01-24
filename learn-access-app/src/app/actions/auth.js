'use server'

import {SignupFormSchema} from "@/app/lib/utility/definitions";
import bcrypt from "bcrypt";
import {createUser, getUser} from "@/app/lib/database/userDAO";
import {redirect} from "next/navigation";
import {createSession, deleteSession} from "@/app/lib/session";


export async function signup(state, formData) {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {errors: validatedFields.error.flatten().fieldErrors,};
    }

    const users = await getUser(formData.get('name'));

    if (users.length > 0) {
        return {errors: {name: ['Username Already Exists']}};
    }

    try {
        const newUser = await createUser({
            username: formData.get('name'),
            password: await hashPassword(formData.get('password'))
        });
        console.log(newUser);
        await createSession(newUser.id);
        redirect('/');
    } catch (error) {
        return {errors: {name: ['Failed to create account. Please try again later']}};
    }
}


export async function logout() {
    await deleteSession()
    redirect('/login')
}

export async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}