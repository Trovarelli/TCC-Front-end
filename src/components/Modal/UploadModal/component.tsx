"use client";
import React, { ChangeEvent, useState } from "react";
import { UploadModalProps } from "./types";
import { DefaultModal } from "../DefaultModal";
import { X } from "phosphor-react";

export const UploadModal = ({ open, setOpen }: UploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);

  // const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     for (const key in e.target.files) {
  //       if (!isNaN(Number(key))) {
  //         const base64 = await handleBase64Convert(e.target.files[key]);
  //         setFiles([...files, base64]);
  //       }
  //     }
  //   }
  // };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleBase64Convert = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

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
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center">
          <label
            htmlFor="fileInput"
            className="text-gray-600 cursor-pointer block mb-2"
          >
            Arraste e solte arquivos PDF aqui ou clique para selecionar
          </label>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <div className="mt-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-200 rounded-md px-2 py-1 mb-2"
                >
                  <span className="mr-2">{file?.name}</span>
                  <button
                    className="text-red-500 focus:outline-none"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <X size={30} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DefaultModal>
  );
};
