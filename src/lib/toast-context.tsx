'use client';

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';

type ToastCtx = { show: (msg: string) => void };
const Ctx = createContext<ToastCtx>({ show: () => {} });
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2500);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div className={`toast ${visible ? 'show' : ''}`}>{message}</div>
    </Ctx.Provider>
  );
}
