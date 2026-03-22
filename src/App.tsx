import { useState } from 'react'
import ScanResultCard from './components/ScanResultCard'
import ScannerView from './components/ScannerView'
import AnkfCard from './components/AnkfCard';
import LahtaCard from './components/LahtaCard';
import { mockAnkf, mockLahta } from './mocks';

function App() {
  const [scannedValue, setScannedValue] = useState<string | null>(null)

  if (scannedValue) {
    if (scannedValue.startsWith('ankf:v1:')) {
      return (
        <AnkfCard
          data={mockAnkf}
          onScanAgain={() => setScannedValue(null)}
        />
      );
    }

    if (scannedValue.startsWith('LHT-')) {
      return (
        <LahtaCard
          data={mockLahta}
          onScanAgain={() => setScannedValue(null)}
        />
      );
    }
    return (
      <ScanResultCard
        value={`Неверный формат QR-кода:\n\n${scannedValue}`}
        onScanAgain={() => setScannedValue(null)}
      />
    );
  }

  return <ScannerView onScan={setScannedValue} />
}

export default App
