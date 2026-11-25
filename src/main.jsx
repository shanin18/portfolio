import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { trackVisit } from './lib/track'
import './index.css'

// /stats is the private visitor dashboard; it is loaded only on that path.
// eslint-disable-next-line react-refresh/only-export-components
const Stats = lazy(() => import('./pages/Stats.jsx'))
const isStats = location.pathname.replace(/\/+$/, '') === '/stats'

if (!isStats) trackVisit()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isStats ? (
      <Suspense fallback={null}>
        <Stats />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>,
)
