import { Section } from '@lightspeed/unified-components-helios-theme/react'
import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProductLineUsersRoute } from './routes/ProductLineUsersRoute'

function AppShell({ children }: { children: ReactNode }) {
  return (
    <Section
      appearance="secondary"
      contentWidth="wide"
      paddingTop="large"
      paddingBottom="large"
      customClasses={{
        container: ['min-h-screen', 'bg-neutral-topmost'],
      }}
    >
      {children}
    </Section>
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
