import React from 'react';
import { motion } from 'framer-motion';

interface MemoryStackVisualizerProps {
  variableName?: string;
  variableValue?: string;
  variableAddress?: string;
  pointerName?: string;
  pointerValue?: string;
  pointerAddress?: string;
}

export const MemoryStackVisualizer: React.FC<MemoryStackVisualizerProps> = ({
  variableName = 'number',
  variableValue = '42 (was 10)',
  variableAddress = '0x7ffed40',
  pointerName = 'ptr',
  pointerValue = '0x7ffed40',
  pointerAddress = '0x7ffed48',
}) => {
  const hasVariable = variableName !== '(none)' && variableValue !== 'N/A' && variableAddress !== 'N/A';
  const hasPointer = pointerName !== '(none)' && pointerAddress !== 'N/A';

  return (
    <section className="w-full bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 sm:p-7 shadow-xs" aria-label="Illustrative process address space">
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#D9CCBA]/70 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8E348] border border-[#1A3628]" />
          <span className="font-heading font-bold text-sm text-[#1A3628]">
            Illustrative Process Address Space
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#5C675F]">
          <span className="px-2 py-0.5 rounded bg-[#F3EBDD] border border-[#D9CCBA]">
            Example: x86-64
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1A3628] text-[#FAF8F3]">
            Simplified layout
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
        {hasVariable && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full md:w-64 bg-white border-2 border-[#1A3628] rounded-xl p-5 shadow-xs"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#D9CCBA]/60">
              <span className="text-[10px] font-mono uppercase bg-[#1A3628] text-[#FAF8F3] px-2 py-0.5 rounded font-bold">
                Object slot
              </span>
              <span className="text-xs font-mono font-bold text-[#1A3628]">{variableAddress}</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-[#5C675F] uppercase tracking-wider">
                Object: <code className="text-[#1A3628] font-bold font-mono text-xs">{variableName}</code>
              </div>
              <div className="p-3.5 rounded-lg bg-[#F4F8E4] border border-[#C8E348] text-center">
                <span className="text-[10px] text-[#5C675F] uppercase font-mono block">Stored value</span>
                <span className="font-mono text-2xl font-extrabold text-[#1A3628] block mt-0.5">{variableValue}</span>
              </div>
              <div className="text-[11px] text-[#5C675F] pt-1">
                Example object address: <code className="font-mono text-[#1A3628]">{variableAddress}</code>
              </div>
            </div>
          </motion.div>
        )}

        {hasVariable && hasPointer && (
          <div className="flex flex-col items-center justify-center gap-1.5 my-2 md:my-0">
            <div className="hidden md:flex items-center gap-1">
              <div className="h-0.5 w-10 bg-[#1A3628]" />
              <div className="w-0 h-0 border-y-4 border-y-transparent border-l-8 border-l-[#1A3628]" />
            </div>
            <div className="md:hidden flex flex-col items-center gap-1">
              <div className="w-0.5 h-8 bg-[#1A3628]" />
              <div className="w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-[#1A3628]" />
            </div>
            <div className="px-2.5 py-1 rounded-md bg-[#1A3628] text-[#C8E348] font-mono text-[10px] font-bold tracking-wide text-center">
              Dereference *{pointerName}
            </div>
            <span className="text-[10px] text-[#5C675F] font-sans">Follows the stored address</span>
          </div>
        )}

        {hasPointer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative w-full md:w-64 bg-white border-2 border-[#C8E348] rounded-xl p-5 shadow-xs ring-2 ring-[#C8E348]/30"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#D9CCBA]/60">
              <span className="text-[10px] font-mono uppercase bg-[#C8E348] text-[#1A3628] px-2 py-0.5 rounded font-extrabold">
                Pointer slot
              </span>
              <span className="text-xs font-mono font-bold text-[#5C675F]">{pointerAddress}</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-[#5C675F] uppercase tracking-wider">
                Pointer: <code className="text-[#1A3628] font-bold font-mono text-xs">{pointerName}</code>
              </div>
              <div className="p-3.5 rounded-lg bg-[#1A3628] text-center text-[#FAF8F3]">
                <span className="text-[10px] text-[#C8E348] uppercase font-mono block">Stored pointer value</span>
                <span className="font-mono text-base font-bold text-[#FAF8F3] block mt-0.5 break-all">{pointerValue}</span>
              </div>
              <div className="text-[11px] text-[#5C675F] pt-1">
                Address of the pointer object: <code className="font-mono text-[#1A3628]">{pointerAddress}</code>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#D9CCBA]/70 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#5C675F]">
        <div className="p-2.5 rounded-lg bg-[#F3EBDD]/60 border border-[#D9CCBA]/60">
          <strong className="text-[#1A3628] block mb-0.5">1. Object storage</strong>
          {hasVariable ? <>In this illustration, <code>{variableName}</code> is shown at <code>{variableAddress}</code>.</> : 'No target object is shown in this example.'}
        </div>
        <div className="p-2.5 rounded-lg bg-[#F3EBDD]/60 border border-[#D9CCBA]/60">
          <strong className="text-[#1A3628] block mb-0.5">2. Address-of</strong>
          {hasVariable ? <><code>&amp;{variableName}</code> produces a pointer to the object in the program's address space.</> : 'The address-of operator obtains an object address while that object is alive.'}
        </div>
        <div className="p-2.5 rounded-lg bg-[#F3EBDD]/60 border border-[#D9CCBA]/60">
          <strong className="text-[#1A3628] block mb-0.5">3. Dereference</strong>
          {hasPointer ? pointerValue.includes('nullptr') ? <><code>{pointerName}</code> holds a null pointer value, so it does not point to an object.</> : <><code>*{pointerName}</code> accesses the pointed-to object only when the pointer is valid.</> : 'A pointer can store an object address; dereference it only while it points to a live object.'}
        </div>
      </div>
      <p className="mt-4 text-[10px] text-[#68716C]">
        Simplified teaching diagram only. Addresses and layout are illustrative, not physical RAM coordinates or guaranteed C++ sizes.
      </p>
    </section>
  );
};
