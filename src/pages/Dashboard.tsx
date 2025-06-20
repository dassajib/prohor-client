import Navbar from "@/components/shared/Navbar"
import Sidebar from "@/components/shared/Sidebar"

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">Main</h2>
        </main>
      </div>
    </div>
  )
}

export default Dashboard