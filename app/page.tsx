"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Form from "next/form";
import { loginAction } from "./actions/auth";
import { useActionState } from "react";

export default function Home() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <Form action={formAction}>
      <div className="flex items-center justify-center h-screen bg-gray-300 ">
        <div className="flex flex-col rounded-lg md:w-1/2 h-auto shadow-lg space-y-3 bg-white p-5">
          <div>
            <Input placeholder="email" name="email" defaultValue={state?.email as string}/>
            {state?.error?.email && (
              <ul className="text-red-500">
                {state.error.email.map((error: string) => (
                  <li key={error} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <Input type="password" placeholder="Password" name="password" defaultValue={state?.password as string}/>
            {state?.error?.password && (
              <ul className="text-red-500">
                {state.error.password.map((error: string) => (
                  <li key={error} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="submit" disabled={pending}>
            Login
          </Button>
        </div>
      </div>
    </Form>
  );
}
