import { Outlet } from 'react-router-dom'
export default function AuthLayout() {
  return (
    <body className="auth-layout">
      <section>
        <Outlet />
      </section>
    </body>
  )
}