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
	const errorMessage =
		error instanceof Error
			? error.message.trim()
			: typeof error === 'string'
				? error.trim()
				: ''

	const normalizedErrorMessage = errorMessage.toLowerCase()

	if (
		normalizedErrorMessage.includes('notreadableerror') ||
		normalizedErrorMessage.includes('could not start video source') ||
		normalizedErrorMessage.includes('track start failed') ||
		normalizedErrorMessage.includes('device in use') ||
		normalizedErrorMessage.includes('device is in use') ||
		normalizedErrorMessage.includes('camera is already in use') ||
		normalizedErrorMessage.includes('could not access video stream')
	) {
		return 'Камера уже используется другим приложением или вкладкой. Закройте их и попробуйте снова.'
	}

	if (
		normalizedErrorMessage.includes('notallowederror') ||
		normalizedErrorMessage.includes('permission denied') ||
		normalizedErrorMessage.includes('permissiondismissederror')
	) {
		return 'Доступ к камере запрещен. Разрешите использование камеры в настройках браузера и попробуйте снова.'
	}

	if (
		normalizedErrorMessage.includes('notfounderror') ||
		normalizedErrorMessage.includes('requested device not found') ||
		normalizedErrorMessage.includes('no camera found')
	) {
		return 'Камера не найдена на устройстве.'
	}

	if (error instanceof Error && error.message.trim().length > 0) {
		return error.message
	}

	if (typeof error === 'string' && error.trim().length > 0) {
		return error
	}

	return 'Не удалось получить доступ к камере.'
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
