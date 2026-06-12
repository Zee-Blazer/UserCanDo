"use client";

import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import Image from "next/image";

import { useAuthSelector } from "@/Redux/selectors";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTransactions: () => void;
}

export default function SuccessModal({ isOpen, onClose, onImportTransactions }: SuccessModalProps) {
  const { user } = useAuthSelector();

  return (
    <>
      <Dialog
        open={isOpen}
        handler={onClose}
        size="sm"
        className="rounded-xl bg-white dark:bg-black"
      >
        <div className="flex flex-col md:max-w-[438px] mx-auto">
          <DialogBody className="text-base self-center text-black dark:text-white">
            <div className="flex justify-center my-10 md:mt-[45px] md:mb-6">
              <Image
                src="/images/svg/keepingly-plaid.svg" 
                alt="Plaid Logo"
                width={175}
                height={94.11}
              />
            </div>

            <h2 className="text-center text-2xl font-bold self-center my-5">
              Connection Successful
            </h2>

            <div className="flex flex-col text-center justify-center font-normal opacity-65">
              Your bank has been successfully connected. Would you like to
              import your transactions now?
            </div>
          </DialogBody>

          <DialogFooter className="flex flex-col gap-2 sm:mb-10">
            <button
              onClick={onImportTransactions}
              className="bg-pry text-white w-full py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              Import now
            </button>
            <button
              onClick={onClose} 
              className="bg-white text-pry border border-pry w-full py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              Not now
            </button>
          </DialogFooter>
        </div>
      </Dialog>
    </>
  );
}
