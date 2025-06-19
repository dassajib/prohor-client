import { Link, useNavigate } from "react-router-dom"
import { easeOut, motion } from "framer-motion"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRegisterUser } from "@/hooks/useAuth"
import { RegisterInput, registerSchema } from "@/schemas/userSchemas"
import { toast } from "sonner";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
}

const UserRegistration = () => {
  const { mutateAsync, isSuccess, isPending, isError, error } = useRegisterUser()

  const { handleSubmit, register, formState: { errors, isValid } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  })

  const navigate = useNavigate()

  const onSubmit = async (data: RegisterInput) => {
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
      }
      // return promise
      await mutateAsync(payload)
      // toast({
      //   title: "Success",
      //   description: "Registration successful! Redirecting...",
      // })
      navigate("/login")
    } catch (error: any) {
      // toast({
      //   title: "Error",
      //   description: error.response?.data?.message || "Something went wrong",
      //   variant: "destructive",
      // });
    }
  };


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-purple-500 to-indigo-600 p-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm"
      >
        <Card className="shadow-2xl rounded-lg border-none backdrop-blur-md bg-white/80">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-indigo-700">
              Create Account
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="username" className="text-sm">User Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                  {...register("username")}
                  autoComplete="username"
                />
                {errors.username && <p className="text-sm text-red-700">{errors.username.message}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter Your Email"
                  {...register("email")}
                  autoComplete="email"
                />
                {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  autoComplete="password"
                />
                {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  autoComplete="confirmPassword"
                />
                {errors.confirmPassword && <p className="text-sm text-red-700">{errors.confirmPassword.message}</p>}
              </div>
              {isError && (
                <p className="text-sm text-red-700">
                  {(error as any)?.response?.data?.message || "Something went wrong"}
                </p>
              )}

              {isSuccess && <p className="text-sm text-green-600">Registration successful! Please login.</p>}
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button disabled={!isValid || isPending} type="submit" className="w-full mt-4 cursor-pointer text-white bg-indigo-600 hover:bg-indigo-700 transition-all">
                {isPending ? "Registering..." : "Register"}
              </Button>
              <p className="text-sm text-center text-gray-700 mt-4">
                Already have an account?
                <Link to="/login" className="text-indigo-700 font-semibold hover:underline"> Log In</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

export default UserRegistration
