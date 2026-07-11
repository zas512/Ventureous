"use client";
import { motion } from "motion/react";

export interface IntegrationItem {
  _key: string;
  name?: string;
  description?: string;
  icon?: string | null;
}

export function IntegrationsColumn(
  props: Readonly<{
    integrations: IntegrationItem[];
    className?: string;
    reverse?: boolean;
  }>
) {
  const { integrations, className, reverse } = props;

  return (
    <motion.div
      initial={{ y: reverse ? "-50%" : 0 }}
      animate={{ y: reverse ? 0 : "-50%" }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className={`flex flex-col gap-4 pb-4 ${className ?? ""}`}
    >
      {["first", "second"].map((loopKey) => (
        <div key={loopKey} className="flex flex-col gap-4">
          {integrations.map((integration) => (
            <div
              key={integration._key}
              className="rounded-3xl border border-neutral-200/60 dark:border-white/10 bg-linear-to-b from-neutral-50 to-white shadow-sm dark:from-neutral-900 dark:to-neutral-900 dark:shadow-none p-6"
            >
              <div className="flex justify-center">
                <div className="flex size-24 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500/20 to-purple-500/20 ring-1 ring-neutral-200 dark:ring-white/10">
                  <span className="text-2xl font-bold text-pink-400">
                    {(integration.name ?? "?").charAt(0)}
                  </span>
                </div>
              </div>
              <h3 className="mt-6 text-center text-3xl">
                {integration.name ?? "Integration"}
              </h3>
              <p className="mt-2 text-center text-neutral-500 dark:text-white/50">
                {integration.description}
              </p>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
