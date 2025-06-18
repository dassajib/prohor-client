import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { easeOut, motion } from "framer-motion"

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

const Login = () => {
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

          <form>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </CardContent>
          </form>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700">
              Log In
            </Button>
            <p className="text-sm text-center text-gray-600 mt-4">
              Registered User?
              <Link to="/registration" className="text-indigo-600 font-medium hover:underline"> Registration</Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login