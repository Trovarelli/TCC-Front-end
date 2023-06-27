"use client";
import React, { useEffect } from "react";
import { PDFRenderModalProps } from "./types";
import { DefaultModal } from "../DefaultModal";
import { X } from "phosphor-react";

export const PDFRenderModal = ({
  base64 = "",
  open,
  title,
  setOpen,
}: PDFRenderModalProps) => {
  return (
    <DefaultModal open={open} size="lg" className="h-[80vh]">
      <div className="w-full flex justify-end">
        <X
          onClick={() => setOpen(false)}
          size={18}
          className="cursor-pointer mr-1 mt-1"
        />
      </div>
      <div className="w-full h-full p-4">
        <embed src={base64} title="PDF Viewer" width="100%" height="95%" />
      </div>
    </DefaultModal>
  );
};
