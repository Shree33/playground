import { NextResponse, NextRequest } from "next/server";
import { sendopenai } from 'libs/gpt';

export default async function gptRoute(req: NextRequest, res: NextResponse) {
    try {
        // Get the input data from the request body
        const { input } = req.body;

        // Call the sendopenai function from the gpt library
        const response = await sendopenai(input);

        // Send the response back to the client
        res.json();
    } catch (error) {
        // Handle any errors that occur during the request
        res.json();
    }
}
