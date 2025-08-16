import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Query
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount(user);

    if (!session) {
      toast({ title: "Login failed. Please try again." });
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Login failed. Please try again." });
      console.log("Login failed. Please try again.");
      form.reset(); 
      return;
    }
  };

  return (
    <Form {...form}>
      <div className="min-h-screen w-full bg-white text-black relative">
        {/* Logo */}
        <div className="absolute top-6 left-6 sm:w-[30px] md:w-[60px] lg:w-[120px] xl:w-[200px] flex">
          <img
            src="/assets/icons/logos.svg"
            alt="Logo"
            className="w-40 sm:w-full"
          />
        </div>

        {/* Centered Form */}
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 pt-6 text-center">
              Log In
            </h1>

            <form
              onSubmit={form.handleSubmit(handleSignin)}
              className="space-y-6"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="h-12 bg-white text-black border border-gray-300 placeholder-gray-400 rounded px-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="h-12 bg-white text-black border border-gray-300 placeholder-gray-400 rounded px-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {isLoading || isUserLoading ? (
                  <div className="flex-center gap-2">
                    <Loader /> Loading...
                  </div>
                ) : (
                  "Log in"
                )}
              </Button>

              {/* Sign-up Link */}
              <p className="text-small-regular text-black text-center mt-2">
                Don&apos;t have an account?
                <Link
                  to="/sign-up"
                  className="text-primary-500 text-small-semibold ml-1"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SigninForm;
