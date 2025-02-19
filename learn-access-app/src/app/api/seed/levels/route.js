import { db } from '@vercel/postgres';

const client = await db.connect();

const seedTutorial = async () => {
    await client.sql`
        INSERT INTO levels (name, description, objectives, expiration, previousLevelId, enhancedDescription)
        VALUES ('Tutorial', 'Introduction to the application and the basics.', '1. Change the h1 element to display "I love WCAG!" \n\n2. Change the colour of the h1 element to be blue rgb(0, 0, 255) \n\n3. No other elements should be displayed', NULL, NULL, 'This is a tutorial on the basics of using the application and completing levels. \n\nThe Description tells you about the content of the level, the WCAG challenges being tackled and any background knowledge needed. \n\nThe Objectives section lays out what you must do in order to complete the level and advance to the next. \n\nThe code editor will render anything coded in react into the window to the right, any console outputs being displayed below that. \n\nHints can be viewed and using the Hint button, a maximum of three hints are allowed per level. The reset button will reset the code in the editor to the default value and cannot be undone. The Test button will run the test suites on your solution in order to check if it has passed, all results will be displayed in the test console and finally the Submit button will submit your solution.')
    `

    await client.sql`
        INSERT INTO level_files (levelId, name, fileType, content)
        VALUES (id, 'App.js', 'js', 'export default function App() {\n    return <h1>Hello world</h1>\n}'),
               (id, 'styles.css', 'css', 'h1 {\n    color: red;\n}')
    `
}

export async function GET(request) {

    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return Response.json({ error: 'Authorization header missing or invalid' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return Response.json({ error: 'Token is missing' }, { status: 401 });
    }

    if (process.env.ADMIN_SECRET !== token) {
        return Response.json({ error: "You do not have permission to do this" }, {status: 403});
    }

    try {
      await client.sql`BEGIN`;

      await client.sql`COMMIT`;

      return Response.json({ message: 'Levels seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
}
