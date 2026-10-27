"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';

const TALLY_URL = "https://tally.so/r/VLdDX6";

export const RegisterForm = () => {
  return (
    <section id="dang-ky" className="py-12 md:py-20 lg:py-32 bg-bg-deep relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent/[0.01] rounded-full blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Đăng ký để làm chủ AI ngay hôm nay"
            titleClassName="text-3xl sm:text-4xl md:text-5xl"
          />
        </motion.div>

        <motion.div 
          className="mt-8 md:mt-12 bg-bg-1 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 border border-accent/15 shadow-[0_4px_24px_rgba(124,58,237,0.08)] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative z-10">
            {/* Submit button */}
            <div>
              <Button
                variant="primary"
                className="w-full py-4 text-lg"
                onClick={() => window.open(TALLY_URL, '_blank', 'noopener,noreferrer')}
              >
                ĐĂNG KÝ NGAY
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
