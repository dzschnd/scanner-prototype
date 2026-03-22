import ScanAgainButton from './ScanAgainButton';
import { Package, MapPin, User } from 'lucide-react';
import type { mockLahta } from '../mocks';

type LahtaCardProps = {
  data: typeof mockLahta;
  onScanAgain: () => void;
};

function LahtaCard({ data, onScanAgain }: LahtaCardProps) {
  return (
    <section className="grid min-h-svh place-items-center bg-slate-950 p-5" aria-live="polite">
      <div className="w-full max-w-md rounded-3xl border border-slate-400/24 bg-slate-900 p-6 shadow-[0_20px_50px_rgba(2,6,23,0.45)]">
        
       
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-amber-500/10 p-3">
            <Package className="h-8 w-8 text-amber-500" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400">ЛАХТА СКЛАД</p>
            <p className="text-xl font-semibold text-white">{data.id}</p>
            <p className="text-sm text-amber-300">{data.type}</p> 
          </div>
        </div>

       
        <div className="mb-5 text-center">
          <p className="text-lg font-medium text-white">{data.productName}</p>
        </div>

        
        <div className="mb-6 rounded-2xl bg-slate-800 p-5 text-center">
          <div className="flex justify-center mb-2">
            <MapPin className="h-10 w-10 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-white tracking-tight">{data.location}</p>
          <p className="mt-1 text-amber-400 text-sm">Местоположение на складе</p>
        </div>

        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-4xl font-bold text-white">{data.stockCount}</p>
            <p className="text-xs text-slate-400">в наличии ({data.unit})</p>
          </div>
          <div className="rounded-2xl bg-emerald-950/50 p-4">
            <p className="font-semibold text-emerald-400">{data.warehouseStatus}</p>
          </div>
        </div>

        
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-slate-400" />
            <span className="text-slate-400">Ответственный:</span>
            <span className="text-white">{data.responsible}</span>
          </div>
        </div>

        <ScanAgainButton onClick={onScanAgain} />
      </div>
    </section>
  );
}

export default LahtaCard;