"use client";

import { motion } from "framer-motion";
import { ParcelOwnershipChain } from "@/components/parcel/ParcelOwnershipChain";
import { demoParcel } from "@/lib/data/demo-chat";
import { getOwnershipChain } from "@/lib/data/ownership-chains";

export function OwnershipChainCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <ParcelOwnershipChain
        nodes={getOwnershipChain("parcel-05")}
        address={`${demoParcel.address}, ${demoParcel.city}`}
        compact
      />
    </motion.div>
  );
}
