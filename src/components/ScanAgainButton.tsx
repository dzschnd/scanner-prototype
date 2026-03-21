type ScanAgainButtonProps = {
  onClick: () => void
}

function ScanAgainButton({ onClick }: ScanAgainButtonProps) {
  return (
    <button
      type="button"
      className="mt-4 min-h-12 w-full rounded-2xl border border-slate-400/24 bg-slate-200 px-4 py-3.5 text-base leading-[1.2] font-semibold text-slate-950"
      onClick={onClick}
    >
      Сканировать снова
    </button>
  )
}

export default ScanAgainButton
