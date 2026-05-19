import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppHeader, APP_HEADER_HEIGHT_PX } from './components/AppHeader'
import { ProductLineUsersRoute } from './routes/ProductLineUsersRoute'

function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-topmost">
      <AppHeader />
      <div
        className="min-h-[calc(100vh-67px)] bg-neutral-topmost"
        style={{ paddingTop: APP_HEADER_HEIGHT_PX }}
      >
        {children}
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/x-series" replace />} />
      <Route
        path="/x-series"
        element={
          <AppShell>
            <ProductLineUsersRoute productLineId="x-series" />
          </AppShell>
        }
      />
      <Route
        path="/golf"
        element={
          <AppShell>
            <ProductLineUsersRoute productLineId="golf" />
          </AppShell>
        }
      />
      <Route path="*" element={<Navigate to="/x-series" replace />} />
    </Routes>
  )
}

export default App
