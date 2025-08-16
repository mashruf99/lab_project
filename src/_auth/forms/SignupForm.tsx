import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queries";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } =
    useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again." });
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({
          title: "Something went wrong. Please login your new account",
        });
        navigate("/sign-in");
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });
        return;
      }
    } catch (error) {
      console.log({ error });
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
            <h1 className="text-2xl font-bold mb-6 pt-6 text-center">Sign Up</h1>

            <form
              onSubmit={form.handleSubmit(handleSignup)}
              className="space-y-6"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        {...field}
                        className="h-12 bg-white text-black border border-gray-300 placeholder-gray-400 rounded px-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">User Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Name you want to use"
                        {...field}
                        className="h-12 bg-white text-black border border-gray-300 placeholder-gray-400 rounded px-4"
                      />
                    </FormControl>
                    <FormDescription>
                      This will be your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {isCreatingAccount || isSigningInUser || isUserLoading ? (
                  <div className="flex-center gap-2">
                    <Loader /> Loading...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>

              <p className="text-small-regular text-black text-center mt-2">
                Already have an account?
                <Link
                  to="/sign-in"
                  className="text-primary-500 text-small-semibold ml-1"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SignupForm;
