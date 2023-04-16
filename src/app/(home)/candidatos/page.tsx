"use client";

import Spinner from "@/components/Spinner/component";
import { useEffect, useState } from "react";

export default function Candidatos() {
  const [renderLoading, setRenderLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setRenderLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="bg-background p-4 min-h-screen">
      {renderLoading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <Spinner color="primary" size={40} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
