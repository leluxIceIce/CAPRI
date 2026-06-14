import React, { useState, useRef, useEffect } from "react";

interface ColorPickerPopoverProps {
  label: string;
  gradient: string;
  value: string | undefined;
  defaultHex: string;
  onChange: (hex: string) => void;
  onReset: () => void;
}

// Click a colormap gradient strip to open a small popover with a native color
// picker + hex text input, plus a reset-to-default action.
export const ColorPickerPopover: React.FC<ColorPickerPopoverProps> = ({
  label,
  gradient,
  value,
  defaultHex,
  onChange,
  onReset,
}) => {
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState(value || defaultHex);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHexInput(value || defaultHex);
  }, [value, defaultHex]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const commitHex = (hex: string) => {
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full h-3 rounded-sm border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
        style={{ background: gradient }}
        title={`Customize ${label} color`}
      />
      {open && (
        <div className="absolute z-30 top-full mt-1.5 left-0 bg-[#0a0a14] border border-white/10 rounded-lg p-2.5 shadow-xl flex flex-col gap-2 min-w-[160px]">
          <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{label} Color</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value || defaultHex}
              onChange={(e) => {
                setHexInput(e.target.value);
                commitHex(e.target.value);
              }}
              className="w-7 h-7 rounded cursor-pointer bg-transparent border border-white/10"
            />
            <input
              type="text"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              onBlur={() => commitHex(hexInput)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitHex(hexInput);
              }}
              className="flex-1 bg-white/5 border border-white/10 rounded px-1.5 py-1 text-[11px] font-mono text-white/80 w-20"
              placeholder="#rrggbb"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              onReset();
              setOpen(false);
            }}
            className="text-[10px] font-mono text-white/40 hover:text-white/80 uppercase tracking-widest text-left"
          >
            Reset to default
          </button>
        </div>
      )}
    </div>
  );
};
