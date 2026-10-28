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
  return (
    <div className="w-full bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 sm:p-7 shadow-xs">
      
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#D9CCBA]/70 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8E348] border border-[#1A3628]" />
          <span className="font-heading font-bold text-sm text-[#1A3628]">
            Stack Memory Allocation Layout
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#5C675F]">
          <span className="px-2 py-0.5 rounded bg-[#F3EBDD] border border-[#D9CCBA]">
            Architecture: x86-64
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1A3628] text-[#FAF8F3]">
            Stack Frame
          </span>
        </div>
      </div>

      {/* Main Visual Schema */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
        
        {/* Variable Box 1: Target Variable 'number' */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full md:w-64 bg-[#FFFFFF] border-2 border-[#1A3628] rounded-xl p-5 shadow-xs"
        >
          {/* Address Tag on Top */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#D9CCBA]/60">
            <span className="text-[10px] font-mono uppercase bg-[#1A3628] text-[#FAF8F3] px-2 py-0.5 rounded font-bold">
              Variable Slot
            </span>
            <span className="text-xs font-mono font-bold text-[#1A3628]">
              {variableAddress}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-[#5C675F] uppercase tracking-wider">
              Identifier: <code className="text-[#1A3628] font-bold font-mono text-xs">{variableName}</code> (int)
            </div>
            
            {/* Memory Cell Inner */}
            <div className="p-3.5 rounded-lg bg-[#F4F8E4] border border-[#C8E348] text-center">
              <span className="text-[10px] text-[#5C675F] uppercase font-mono block">Stored Data Value</span>
              <span className="font-mono text-2xl font-extrabold text-[#1A3628] block mt-0.5">
                {variableValue}
              </span>
            </div>

            <div className="text-[11px] text-[#5C675F] pt-1 flex items-center justify-between">
              <span>Size: 4 bytes (32-bit)</span>
              <span className="font-mono text-[10px] text-[#1A3628] font-bold">&amp;{variableName} = {variableAddress}</span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Connector Arrow */}
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
            Dereferenced via *{pointerName}
          </div>
          <span className="text-[10px] text-[#5C675F] font-sans">Points to address</span>
        </div>

        {/* Variable Box 2: Pointer Variable 'ptr' */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-full md:w-64 bg-[#FFFFFF] border-2 border-[#C8E348] rounded-xl p-5 shadow-xs ring-2 ring-[#C8E348]/30"
        >
          {/* Address Tag on Top */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#D9CCBA]/60">
            <span className="text-[10px] font-mono uppercase bg-[#C8E348] text-[#1A3628] px-2 py-0.5 rounded font-extrabold">
              Pointer Slot
            </span>
            <span className="text-xs font-mono font-bold text-[#5C675F]">
              {pointerAddress}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-[#5C675F] uppercase tracking-wider">
              Identifier: <code className="text-[#1A3628] font-bold font-mono text-xs">{pointerName}</code> (int*)
            </div>

            {/* Memory Cell Inner */}
            <div className="p-3.5 rounded-lg bg-[#1A3628] text-center text-[#FAF8F3]">
              <span className="text-[10px] text-[#C8E348] uppercase font-mono block">Stored Pointer Target</span>
              <span className="font-mono text-base font-bold text-[#FAF8F3] block mt-0.5 truncate">
                {pointerValue}
              </span>
            </div>

            <div className="text-[11px] text-[#5C675F] pt-1 flex items-center justify-between">
              <span>Size: 8 bytes (64-bit addr)</span>
              <span className="font-mono text-[10px] text-[#1A3628] font-bold">{pointerName} stores &amp;{variableName}</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Explanatory callout footer */}
      <div className="mt-6 pt-4 border-t border-[#D9CCBA]/70 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#5C675F]">
        <div className="p-2.5 rounded-lg bg-[#F3EBDD]/60 border border-[#D9CCBA]/60">
          <strong className="text-[#1A3628] block mb-0.5">1. Storage:</strong>
          <code>int number = 10;</code> allocates 4 bytes at memory address <code>{variableAddress}</code>.
        </div>
        <div className="p-2.5 rounded-lg bg-[#F3EBDD]/60 border border-[#D9CCBA]/60">
          <strong className="text-[#1A3628] block mb-0.5">2. Address-Of:</strong>
          <code>&amp;number</code> queries the physical memory address (<code>{variableAddress}</code>).
        </div>
        <div className="p-2.5 rounded-lg bg-[#F3EBDD]/60 border border-[#D9CCBA]/60">
          <strong className="text-[#1A3628] block mb-0.5">3. Dereference:</strong>
          <code>*ptr = 42;</code> follows the stored address and overwrites the memory cell directly.
        </div>
      </div>

    </div>
  );
};
