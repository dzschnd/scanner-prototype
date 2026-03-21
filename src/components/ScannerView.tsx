import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import {
  createScannerInstance,
  destroyScanner,
  getCameraErrorMessage,
  scanConfig,
} from '../lib/scanner'

const scannerElementId = 'qr-reader'

type ScannerViewProps = {
  onScan: (value: string) => void
}

function ScannerView({ onScan }: ScannerViewProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const isCompletingScanRef = useRef(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    const startScanner = async () => {
      const scanner = createScannerInstance(scannerElementId)
      scannerRef.current = scanner

      try {
        await scanner.start(
          { facingMode: 'environment' },
          scanConfig,
          (decodedText) => {
            if (isCompletingScanRef.current) {
              return
            }

            isCompletingScanRef.current = true

            const activeScanner = scannerRef.current
            scannerRef.current = null

            if (activeScanner) {
              void destroyScanner(activeScanner)
            }

            onScan(decodedText)
          },
          () => {},
        )

        if (isActive) {
          setCameraError(null)
        }
      } catch (error) {
        await destroyScanner(scanner)

        if (scannerRef.current === scanner) {
          scannerRef.current = null
        }

        if (isActive) {
          setCameraError(getCameraErrorMessage(error))
        }
      }
    }

    void startScanner()

    return () => {
      isActive = false

      const scanner = scannerRef.current
      scannerRef.current = null

      if (scanner) {
        void destroyScanner(scanner)
      }
    }
  }, [onScan])

  return (
    <main className="relative min-h-svh overflow-hidden bg-slate-950 md:grid md:min-h-svh md:place-items-center md:p-6">
      <div
        id={scannerElementId}
        className="h-svh min-h-svh w-full md:h-[min(100svh-3rem,52rem)] md:min-h-[min(100svh-3rem,52rem)] md:w-full md:max-w-md md:overflow-hidden md:rounded-[2rem] md:shadow-[0_20px_50px_rgba(2,6,23,0.55),0_0_0_1px_rgba(148,163,184,0.14)] [&>div]:h-full [&>div]:w-full [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:object-cover [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(72vw,20rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border-[3px] border-slate-50/90 [box-shadow:0_0_0_200vmax_rgba(15,23,42,0.38),inset_0_0_0_1px_rgba(255,255,255,0.08)] md:w-[min(65vw,18rem)]"
      />
      {cameraError ? (
        <p
          className="absolute inset-x-4 bottom-4 m-0 rounded-2xl border border-red-400/45 bg-slate-800/92 px-4 py-3.5 text-[0.9375rem] leading-[1.4] text-slate-50 backdrop-blur-[10px] md:left-1/2 md:w-[min(calc(100%-3rem),28rem)] md:-translate-x-1/2"
          role="alert"
        >
          {cameraError}
        </p>
      ) : null}
    </main>
  )
}

export default ScannerView
