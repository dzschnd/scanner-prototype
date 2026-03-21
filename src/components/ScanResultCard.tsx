import ScanAgainButton from './ScanAgainButton'

type ScanResultCardProps = {
	value: string
	onScanAgain: () => void
}

function ScanResultCard({ value, onScanAgain }: ScanResultCardProps) {
	return (
		<section
			className="grid min-h-svh place-items-center bg-slate-950 p-5"
			aria-live="polite"
		>
			<div className="w-full max-w-md rounded-3xl border border-slate-400/24 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.45)]">
				<pre className="m-0 break-words whitespace-pre-wrap font-mono text-[0.9375rem] leading-[1.6] text-slate-50">
					{value}
				</pre>
				<ScanAgainButton onClick={onScanAgain} />
			</div>
		</section>
	)
}

export default ScanResultCard
