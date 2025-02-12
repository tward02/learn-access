import {getUser, hasSession} from "@/app/lib/dal";

const request = {
    files: [
        {
            name: "styles.css",
            type: "css",
            content: ".app-container {\n    text-align: center;\n    font-family: Arial, sans-serif;\n}\n\nh1 {\n    color: #4CAF50;\n}\n"
        },
        {
            name: "App.js",
            type: "js",
            content: "export default function App() {\n    console.log(\"Hello World\");\n    return <h1>Hello world</h1>\n}\n"
        }
    ]
}

const response = {
    passed: true,
    message: "msg"
}

export async function POST(request, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const levelId = (await params).levelId;

    const user = await getUser();

}