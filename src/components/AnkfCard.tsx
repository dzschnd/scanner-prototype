import ScanAgainButton from './ScanAgainButton';
import { CheckCircle } from 'lucide-react';
import type { mockAnkf } from '../mocks';

type AnkfCardProps = {
  data: typeof mockAnkf;
  onScanAgain: () => void;
};

function AnkfCard({ data, onScanAgain }: AnkfCardProps) {
  return (
    <section className="grid min-h-svh place-items-center bg-slate-950 p-5" aria-live="polite">
      <div className="w-full max-w-md rounded-3xl border border-slate-400/24 bg-slate-900 p-6 shadow-[0_20px_50px_rgba(2,6,23,0.45)]">
        
       
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-emerald-500/10 p-3">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-400">ЦИФРОВОЙ ПАСПОРТ АНКФ</p>
            <p className="text-xl font-semibold text-white">{data.id}</p>
            <p className="text-sm text-emerald-300">{data.type}</p>
          </div>
        </div>

        
        <div className="mb-6 rounded-2xl bg-emerald-950/50 px-5 py-4 text-center">
          <p className="text-emerald-400 font-semibold">{data.status}</p>
        </div>

        
        <div className="space-y-4 text-sm">
          <div><span className="text-slate-400">Изделие:</span> <span className="font-medium text-white">{data.productName}</span></div>
          <div><span className="text-slate-400">Производитель:</span> <span className="text-white">{data.manufacturer}</span></div>
          <div><span className="text-slate-400">ГОСТ:</span> <span className="text-white">{data.gost}</span></div>
          <div><span className="text-slate-400">Гарантия:</span> <span className="text-white">{data.guarantee}</span></div>
          
          <div className="pt-4 border-t border-slate-700">
            <p className="mb-2 text-slate-400">Документы:</p>
            <ul className="space-y-1 text-emerald-300">
              {data.documents.map((doc, i) => (
                <li key={i} className="underline">• {doc}</li>
              ))}
            </ul>
          </div>
        </div>

        <ScanAgainButton onClick={onScanAgain} />
      </div>
    </section>
  );
}

export default AnkfCard;