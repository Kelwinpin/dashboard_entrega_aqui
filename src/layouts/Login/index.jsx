import { Outlet } from 'react-router-dom'
export default function AuthLayout() {
  return (
    <main className="bg-red-900">
      <section>
        <Outlet />
      </section>
    </main>
  )
}