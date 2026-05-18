import { Section } from '@lightspeed/unified-components-helios-theme/react'
import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppHeader, APP_HEADER_HEIGHT_PX } from './components/AppHeader'
import { ProductLineUsersRoute } from './routes/ProductLineUsersRoute'

function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-topmost">
      <AppHeader />
      <div style={{ paddingTop: APP_HEADER_HEIGHT_PX }}>
        <Section
          appearance="secondary"
          contentWidth="wide"
          paddingTop="large"
          paddingBottom="large"
          customClasses={{
            container: ['min-h-[calc(100vh-67px)]', 'bg-neutral-topmost'],
          }}
        >
          {children}
        </Section>
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
