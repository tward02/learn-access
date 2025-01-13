import { serialize } from 'cookie'

export async function POST(request) {
    const data = await request.json();

    // 1. Validate form fields
    // ...

    // 2. Prepare data for insertion into database
    const { name, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Insert the user into the database or call an Library API

    // TODO:
    // 4. Create user session
    // 5. Redirect user

}