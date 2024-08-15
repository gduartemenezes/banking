"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter()

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema({ type });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    setIsLoading(true);
    try {
      //Sign up with Appwrite & create plaid token

      if(type === 'sign-up') {
        const newUser = await signUp(data)
        setUser(newUser)
      }
      if(type === 'sign-in') {
        // const response = await signIn()
        // if(response) router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    setIsLoading(false);
  }

  const footerText = {
    "sign-in": {
      message: "Don't have an account?",
      text: "Sign up",
      href: "/sign-up",
    },
    "sign-up": {
      message: "Already have an account?",
      text: "Sign in",
      href: "/sign-in",
    },
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href="/"
          className="cursor-pointer
        flex items-center gap-1"
        >
          <Image
            width={34}
            height={34}
            src="/icons/logo.svg"
            alt={"Horizon logo"}
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"First Name"}
                      name={"firstName"}
                      placeholder={"Enter your first name"}
                    />
                    <CustomInput
                      control={form.control}
                      label={"Last Name"}
                      name={"lastName"}
                      placeholder={"Enter your last name"}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    label={"Address"}
                    name={"address1"}
                    placeholder={"Enter your specific address"}
                  />
                  <CustomInput
                    control={form.control}
                    label={"City"}
                    name={"city"}
                    placeholder={"Enter your city"}
                  />

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"State"}
                      name={"state"}
                      placeholder={"Enter your state"}
                    />
                    <CustomInput
                      control={form.control}
                      label={"Postal Code"}
                      name={"postalCode"}
                      placeholder={"example: 102122"}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"Date of Birth"}
                      name={"dateOfBirth"}
                      placeholder={"YYYY-MM-DD"}
                    />
                    <CustomInput
                      control={form.control}
                      label={"SSN"}
                      name={"ssn"}
                      placeholder={"example: 1021"}
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                label={"Email"}
                name={"email"}
                placeholder={"Enter your email"}
                type={"text"}
              />
              <CustomInput
                control={form.control}
                label={"Password"}
                name={"password"}
                placeholder={"Enter your password"}
                type={"password"}
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign in"
                  ) : type === "sign-up" ? (
                    "Sign up"
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1 text-14">
            <p className=" font-normal text-gray-600">
              {footerText[type].message}
            </p>
            <Link className="form-link" href={footerText[type].href}>
              {footerText[type].text}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
