import { useState, useEffect } from 'react'
import ScanResultCard from './components/ScanResultCard'
import ScannerView from './components/ScannerView'
import AnkfCard from './components/AnkfCard'
import LahtaCard from './components/LahtaCard'
import { fetchData } from './api'

function App() {
  const [scannedValue, setScannedValue] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugInput, setDebugInput] = useState('')
  const handleManualFetch = () => {
  if (!debugInput.trim()) return

  setScannedValue(debugInput.trim())
}
const DebugPanel = (
  <div style={{
    position: 'fixed',
    bottom: 20,
    left: 20,
    background: '#111',
    padding: 12,
    borderRadius: 8,
    color: 'white',
    zIndex: 9999,
    width: 300
  }}>
    <div style={{ marginBottom: 8 }}>
      <b>Debug QR input</b>
    </div>

    <input
      value={debugInput}
      onChange={(e) => setDebugInput(e.target.value)}
      placeholder="Введите QR (ankf:... / LHT-...)"
      style={{ width: '100%', marginBottom: 8, padding: 6 }}
    />

    <button
      onClick={handleManualFetch}
      style={{
        width: '100%',
        padding: 6,
        cursor: 'pointer'
      }}
    >
      Отправить
    </button>
  </div>
)

useEffect(() => {
  if (!scannedValue) return;

  const isValid =
    scannedValue.startsWith("ankf:") ||
    scannedValue.startsWith("LHT-");

  if (!isValid) {
    setError("Неверный формат QR-кода");
    setData(null);
    return;
  }

  fetchData(scannedValue)
    .then((res) => {
      setData(res);
      setError(null);
    })
    .catch((e) => {
      setError(e.message);
      setData(null);
    });
}, [scannedValue]);

  if (scannedValue && !data && !error) {
  return (
    <ScanResultCard
      value="Загрузка данных..."
      onScanAgain={() => {
        setScannedValue(null)
      }}
    />
  )
}

  if (error) {
    return (
      <ScanResultCard
        value={`Ошибка:\n\n${error}`}
        onScanAgain={() => {
          setScannedValue(null)
          setError(null)
        }}
      />
    )
  }

  if (data) {
    if (data.id.startsWith('ankf:')) {
      return (
        <AnkfCard
          data={data}
          onScanAgain={() => {
            setScannedValue(null)
            setData(null)
          }}
        />
      )
    }

    if (data.id.startsWith('LHT-')) {
      return (
        <LahtaCard
          data={data}
          onScanAgain={() => {
            setScannedValue(null)
            setData(null)
          }}
        />
      )
    }
  }

 return (
  <>
    {DebugPanel}
    <ScannerView onScan={setScannedValue} />
  </>
)
}

export default App