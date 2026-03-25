"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { BookingModal } from "./BookingModal";

interface BookingContextType {
  openModal: () => void;
}

const BookingContext = createContext<BookingContextType>({ openModal: () => {} });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingContext.Provider value={{ openModal: () => setIsOpen(true) }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
