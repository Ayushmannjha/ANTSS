import { XCircle } from 'lucide-react';

interface UnderProcessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UnderProcessModal({ open, onClose }: UnderProcessModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-900/90 text-white rounded-2xl p-6 w-full max-w-sm border border-white/10">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Feature in Progress</h3>
            <p className="text-sm text-gray-400 mt-2">Adding Hospitals/Clinics from the user panel is planned for a future release and is currently under development. Please contact admin for urgent additions.</p>
          </div>
          <button onClick={onClose} className="ml-4 p-1.5 rounded-full bg-slate-800 text-gray-300 hover:text-white">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium">Got it</button>
        </div>
      </div>
    </div>
  );
}
