"use server";
import { signIn } from "@/auth/auth";
import { signInSchema } from "@/utils/validationSchema.ts/zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const loginAction = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  const formDataObj = Object.fromEntries(formData.entries());
  const validationFields = signInSchema.safeParse(formDataObj);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    };
  }
  const { email, password } = validationFields.data;
  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error: any) {
      let errorMsg: any = null;
      if (error instanceof Error && error.message === "NEXT_REDIRECT") {
        redirect('/dashboard')
      } else if (error instanceof AuthError) {
        errorMsg = error.message;
      } else {
        errorMsg = (error as any).message;
      }
      return { error: errorMsg };
  }
};
