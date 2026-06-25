import React, { useEffect, useRef, useState } from "react";

type Saved = { scale: number; x: number; y: number; locked?: boolean };

const STORAGE_KEY = "layoutAdjust";

export default function LayoutAdjuster({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [locked, setLocked] = useState(true);
  const [scale, setScale] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const dragging = useRef(false);
  const last = useRef<{ mx: number; my: number } | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch("/layoutAdjust.json", { cache: "no-store" });
        if (mounted && resp.ok) {
          // LayoutAdjuster removed — transformations are baked into CSS in src/index.css.
          export default {} as any;
            touchAction: "none",
            background: "transparent",
          }}
        />
      )}
    </div>
  );
}
