import { Html5Qrcode, type Html5QrcodeCameraScanConfig } from 'html5-qrcode'

export const scanConfig: Html5QrcodeCameraScanConfig = {
	fps: 20,
}

export function createScannerInstance(elementId: string): Html5Qrcode {
	return new Html5Qrcode(elementId, {
		useBarCodeDetectorIfSupported: false,
		verbose: false,
	})
}

export function getCameraErrorMessage(error: unknown): string {
	if (error instanceof Error && error.message.trim().length > 0) {
		return error.message
	}

	if (typeof error === 'string' && error.trim().length > 0) {
		return error
	}

	return 'Camera access is unavailable.'
}

export async function destroyScanner(scanner: Html5Qrcode): Promise<void> {
	try {
		if (scanner.isScanning) {
			await scanner.stop()
		}
	} finally {
		try {
			scanner.clear()
		} catch {
		}
	}
}
