// import ButtonAccount from "@/components/ButtonAccount";
// import Link from "next/link";
// export const dynamic = "force-dynamic";
// import { sendOpenAi } from "@/libs/gpt";

// // This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// // It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// // See https://shipfa.st/docs/tutorials/private-page
// export default async function Dashboard() {
//   return (
//     <main className="min-h-screen p-8 pb-24">
//       <section className="max-w-xl mx-auto space-y-8">
//         <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard</h1>
//         <ButtonAccount />
//         <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
//         <div className="bg-white p-4 rounded-lg">
//           <div className="relative bg-inherit">
//             <input type="text" id="prompt" name="prompt" className="peer bg-transparent h-10 w-100 rounded-lg text-gray-200 placeholder-transparent ring-2 px-10 mr-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Enter Your Prompt"/>
//               <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
//                 Enter Your Prompt
//               </label>
//             <button className="btn btn-primary" name="submit">Submit</button>
//           </div>
//         </div> 
//       </section>
//     </main>
//   );
// }
"use client";
import { useState } from 'react';
import ButtonAccount from "@/components/ButtonAccount";
export const dynamic = "force-dynamic";
import { sendOpenAi } from "@/libs/gpt";

export default function Dashboard() {
  // Step 1: State hooks for prompt and response
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  // Step 2: Event handler for submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const aiResponse = await sendOpenAi([{role:'user', content:prompt}], 123); // Assuming sendOpenAi returns a promise
    setResponse(aiResponse); // Update state with the response
  };

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard</h1>
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg">
          <div className="relative bg-inherit">
            <input
              type="text"
              id="prompt"
              name="prompt"
              className="peer bg-transparent h-10 w-100 rounded-lg text-gray-200 placeholder-transparent ring-2 px-10 mr-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Enter Your Prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)} // Step 3: Bind prompt state to input
            />
            <button type="submit" className="btn btn-primary" name="submit">Submit</button>
          </div>
        </form>
        {/* Step 4: Display the response */}
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold">Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </section>
    </main>
  );
}