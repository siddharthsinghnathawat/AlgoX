
'use client';

import { Logo } from './logo';
import { AnimatePresence, motion } from 'framer-motion';

type PreloaderProps = {
  isLoading: boolean;
};

export function Preloader({ isLoading }: PreloaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Logo width={100} height={100} />
          </motion.div>
          <motion.div
            className="absolute bottom-8 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p>Powered by Dexriod</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
