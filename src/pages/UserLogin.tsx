import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { easeOut, motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

import { useLoginUser } from "@/hooks/useAuth"
import { LoginInput, loginSchemas } from "@/schemas/userSchemas"
import { toast } from "sonner"

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

const UserLogin = () => {
  const { mutateAsync, isPending } = useLoginUser()

  const { handleSubmit, register, formState: { errors, isValid } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchemas),
    mode: "onChange",
  })

  const navigate = useNavigate()

  const onSubmit = async (data: LoginInput) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      }
      // return promise
      await mutateAsync(payload)
      toast.success("Login Successful.")
      navigate("/")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Login failed.")
      } else {
        toast.error("Unexpected error occurred.")
      }
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-purple-500 to-indigo-600 p-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm"
      >
        <Card className="w-full max-w-sm shadow-2xl rounded-lg border-none">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-indigo-700">Welcome to PROHOR</CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  autoComplete="new-password"
                />
                {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p>}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button disabled={!isValid || isPending} type="submit" className="w-full cursor-pointer mt-4 text-white bg-indigo-600 hover:bg-indigo-700">
                {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Log In"}
              </Button>
              <p className="text-sm text-center text-gray-600 mt-4">
                Registered User?
                <Link to="/registration" className="text-indigo-600 font-medium hover:underline"> Registration</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

export default UserLogin