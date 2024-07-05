import ButtonAccount from "@/components/ButtonAccount";
import Link from "next/link";
export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard</h1>
        
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
        <div className="bg-white p-4 rounded-lg">
          <div className="relative bg-inherit">
            <input type="text" id="prompt" name="prompt" className="peer bg-transparent h-10 w-100 rounded-lg text-gray-200 placeholder-transparent ring-2 px-10 mr-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Enter Your Prompt"/>
              <label htmlFor="username" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
                Enter Your Prompt
              </label>
            <button className="btn btn-primary" name="submit">Submit</button>
          </div>
        </div> 
      </section>
    </main>
  );
}
