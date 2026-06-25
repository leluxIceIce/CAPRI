import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface ColorPickerPopoverProps {
  label: string;
  gradient: string;
  value: string | undefined;
  defaultHex: string;
  onChange: (hex: string) => void;
  onReset: () => void;
  fromValue?: string | undefined;
  defaultFromHex?: string;
  onChangeFrom?: (hex: string) => void;
}

export const ColorPickerPopover: React.FC<ColorPickerPopoverProps> = ({
  label,
  gradient,
  value,
  defaultHex,
  onChange,
  onReset,
  fromValue,
  defaultFromHex,
  onChangeFrom,
}) => {
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState(value || defaultHex);
  const [fromHexInput, setFromHexInput] = useState(fromValue || defaultFromHex || "#000000");
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setHexInput(value || defaultHex); }, [value, defaultHex]);
  useEffect(() => { setFromHexInput(fromValue || defaultFromHex || "#000000"); }, [fromValue, defaultFromHex]);

  const openPopover = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.left });
    }
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current && !popoverRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleScroll = () => setOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  const commitHex = (hex: string) => {
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={openPopover}
        className="w-full h-3 rounded-sm border border-[var(--eef-border)] hover:border-[var(--eef-border-strong)] transition-colors cursor-pointer"
        style={{ background: gradient }}
        title={`Customize ${label} color`}
      />
      {open && createPortal(
        <div
          ref={popoverRef}
          className="glass-panel fixed z-50 rounded-lg p-2.5 flex flex-col gap-2 min-w-[160px]"
          style={{ top: pos.top, left: pos.left, boxShadow: "var(--eef-shadow-lg)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[var(--eef-text-2)]">{label} color</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[var(--eef-text-3)] hover:text-[var(--eef-text)] text-sm leading-none px-1"
              title="Close"
            >&times;</button>
          </div>
          {onChangeFrom && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-[var(--eef-text-3)]">From (dark end)</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fromValue || defaultFromHex || "#000000"}
                  onChange={(e) => { setFromHexInput(e.target.value); if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) onChangeFrom(e.target.value); }}
                  className="w-7 h-7 rounded cursor-pointer bg-transparent border border-[var(--eef-border-strong)]"
                />
                <input
                  type="text"
                  value={fromHexInput}
                  onChange={(e) => setFromHexInput(e.target.value)}
                  onBlur={() => { if (/^#[0-9a-fA-F]{6}$/.test(fromHexInput)) onChangeFrom(fromHexInput); }}
                  onKeyDown={(e) => { if (e.key === "Enter" && /^#[0-9a-fA-F]{6}$/.test(fromHexInput)) onChangeFrom(fromHexInput); }}
                  className="tnum flex-1 bg-[var(--eef-inset)] border border-[var(--eef-border)] rounded px-1.5 py-1 text-[11px] text-[var(--eef-text-2)] w-20"
                  placeholder="#rrggbb"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-[var(--eef-text-3)]">To (bright peak)</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value || defaultHex}
                onChange={(e) => {
                  setHexInput(e.target.value);
                  commitHex(e.target.value);
                }}
                className="w-7 h-7 rounded cursor-pointer bg-transparent border border-[var(--eef-border-strong)]"
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                onBlur={() => commitHex(hexInput)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitHex(hexInput);
                }}
                className="tnum flex-1 bg-[var(--eef-inset)] border border-[var(--eef-border)] rounded px-1.5 py-1 text-[11px] text-[var(--eef-text-2)] w-20"
                placeholder="#rrggbb"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onReset();
              setOpen(false);
            }}
            className="text-[10px] text-[var(--eef-text-3)] hover:text-[var(--eef-accent)] text-left"
          >
            Reset to default
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};
