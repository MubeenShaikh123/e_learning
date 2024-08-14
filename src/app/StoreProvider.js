'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../lib/store';

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    console.log("StoreProvider loss")
  }
  console.log("StoreProvider win")
  return <Provider store={storeRef.current}>{children}</Provider>;
}
