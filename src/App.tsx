import { useState, useEffect } from 'react'
import ScanResultCard from './components/ScanResultCard'
import ScannerView from './components/ScannerView'
import AnkfCard from './components/AnkfCard'
import LahtaCard from './components/LahtaCard'
import { fetchData } from './api'
import DebugPanel from './components/DebugPanel'

function App() {
  const [scannedValue, setScannedValue] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)


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
  {/* Ниже панель для отладки (ввод QR вручную, без использования камеры). Раскомментируйте для использования */}
    {/* <DebugPanel onSubmit={setScannedValue} /> */}
    <ScannerView onScan={setScannedValue} />
  </>
)
}

export default App