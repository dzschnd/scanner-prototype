import { useState } from 'react'
import ScanResultCard from './components/ScanResultCard'
import ScannerView from './components/ScannerView'

function App() {
  const [scannedValue, setScannedValue] = useState<string | null>(null)

  if (scannedValue) {
    return (
      <ScanResultCard
        value={scannedValue}
        onScanAgain={() => setScannedValue(null)}
      />
    )
  }

  return <ScannerView onScan={setScannedValue} />
}

export default App
