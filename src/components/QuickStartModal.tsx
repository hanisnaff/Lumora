import React, { useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'start' | 'signin';
  onNavigateToLearn?: () => void;
}

export const QuickStartModal: React.FC<QuickStartModalProps> = ({
  isOpen,
  onClose,
  type,
  onNavigateToLearn,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#242A27]/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Surface */}
      <div className="relative w-full max-w-[460px] bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-7 shadow-2xl z-10 text-left">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#68716C] hover:text-[#242A27] hover:bg-[#E8EBE9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#242A27]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'start' ? (
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#242A27] text-[#C6F36B] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>

            <h3 id="modal-title" className="font-heading font-bold text-xl text-[#242A27] tracking-tight">
              Begin your learning path
            </h3>

            <p className="text-sm text-[#68716C] mt-2 leading-relaxed">
              In the complete MindPath platform, this launches a 3-minute diagnostic assessment that maps your specific knowledge gaps and crafts your custom path.
            </p>

            {/* Illustrative preview steps */}
            <div className="mt-5 space-y-2 bg-[#E8EBE9]/60 p-4 rounded-xl border border-[#D6DDD8]/80 text-xs">
              <div className="flex items-center gap-2.5 text-[#242A27] font-medium">
                <span className="w-5 h-5 rounded-full bg-[#242A27] text-[#F8FAF9] flex items-center justify-center text-[11px] font-bold">1</span>
                <span>3-minute diagnostic check</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#242A27] font-medium">
                <span className="w-5 h-5 rounded-full bg-[#C6F36B] text-[#242A27] flex items-center justify-center text-[11px] font-bold">2</span>
                <span>Concept-level gap identification</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#68716C]">
                <span className="w-5 h-5 rounded-full bg-[#D6DDD8] text-[#68716C] flex items-center justify-center text-[11px] font-bold">3</span>
                <span>Personalized curriculum generation</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              {onNavigateToLearn && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToLearn();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#242A27] text-[#F8FAF9] py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-[#222222] transition-colors"
                >
                  <span>Launch Diagnostic Setup</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B]" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#F8FAF9] text-[#242A27] border border-[#D6DDD8] py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-[#E8EBE9] transition-colors"
              >
                <span>Close preview</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#F8FAF9] border border-[#D6DDD8] text-[#242A27] flex items-center justify-center mb-4">
              <Check className="w-5 h-5 text-[#C6F36B]" />
            </div>

            <h3 id="modal-title" className="font-heading font-bold text-xl text-[#242A27] tracking-tight">
              Student Sign In
            </h3>

            <p className="text-sm text-[#68716C] mt-2 leading-relaxed">
              The student authentication and learning portal will be available in the next release. Explore the homepage to discover the underlying adaptive methodology.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              {onNavigateToLearn && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToLearn();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#242A27] text-[#F8FAF9] py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-[#222222] transition-colors"
                >
                  <span>Enter Student Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B]" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center bg-[#F8FAF9] text-[#242A27] border border-[#D6DDD8] py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-[#E8EBE9] transition-colors"
              >
                Return to homepage
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
