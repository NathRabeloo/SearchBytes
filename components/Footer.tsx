"use client";

import React from "react";
import { Separator } from "components/ui/separator";
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
  return (
    <footer
      className={cn(
        "w-full bg-blue-400 dark:bg-slate-800 text-white text-center text-sm py-4"
      )}
    >
      <Separator className="bg-white/20 dark:bg-white/10 mb-2" />
      <p className="px-4">
        Política de Privacidade & Suporte — Direitos Autorais ©{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
