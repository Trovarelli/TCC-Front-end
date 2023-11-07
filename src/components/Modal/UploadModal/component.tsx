"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { UploadModalProps } from "./types";
import { DefaultModal } from "../DefaultModal";
import { Checks, SpinnerGap, X } from "phosphor-react";
import { Button } from "@/components/Buttons";
import { toast } from "react-toastify";
import { useUsertore } from "@/store";
import { CreateCandidato } from "@/api/requests";

export const UploadModal = ({
  open,
  setOpen,
  handleGetAllCandidatos,
}: UploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [sucess, setSucess] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useUsertore().user;

  const handleUpload = async () => {
    setLoading(true);

    const uploadFile = async (file: File) => {
      try {
        const curriculum = await handleBase64Convert(file);

        await CreateCandidato({ userId: id, curriculum });

        setSucess((prev) => [...prev, file.name]);
        setIsLoading((prev) => prev.filter((item) => item !== file.name));
      } catch (err: any) {
        toast.error(err.response?.data.message);
        console.log(err);
      }
    };

    const uploadSequentially = async (keys: any) => {
      if (keys.length === 0) {
        setLoading(false);
        return;
      }

      const currentKey = keys[0];
      if (!isNaN(Number(currentKey))) {
        setIsLoading((prev) => [...prev, files[currentKey].name]);
        await uploadFile(files[currentKey]);
        const remainingKeys = keys.slice(1);
        await uploadSequentially(remainingKeys);
      } else {
        const remainingKeys = keys.slice(1);
        await uploadSequentially(remainingKeys);
      }
    };

    const fileKeys = Object.keys(files);
    await uploadSequentially(fileKeys);
  };

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

  const handleGetIcon = (fileName: string, index: number) => {
    if (sucess.includes(fileName))
      return <Checks size={30} weight="bold" className="text-success" />;
    if (isLoading.includes(fileName))
      return (
        <SpinnerGap
          size={30}
          weight="bold"
          className="text-warning animate-spin"
        />
      );

    return (
      <button
        className="text-red-500 focus:outline-none z-50"
        onClick={() => handleRemoveFile(index)}
      >
        <X size={30} />
      </button>
    );
  };

  const allUploaded = useMemo(() => {
    return sucess.length !== files.length;
  }, [sucess, files]);

  useEffect(() => {
    if (allUploaded) handleGetAllCandidatos();
  }, [allUploaded, files]);

  return (
    <>
      <Button
        btnName="Salvar Candidatos"
        onClick={() => setOpen(true)}
        loading={loading}
      />
      <DefaultModal
        open={open}
        size="lg"
        className="h-[80vh] flex flex-col justify-between"
      >
        <div className=" overflow-auto border-2 m-4 border-dashed border-gray-400 rounded-lg p-4 text-center h-[67vh] relative cursor-pointer">
          <label htmlFor="fileInput" className="text-gray-600 block mb-2">
            Arraste e solte arquivos PDF aqui ou clique para selecionar
          </label>
          <input
            id="fileInput"
            type="file"
            className="inset-0 absolute w-full h-full opacity-0 cursor-pointer"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
          />

          {files.length > 0 && (
            <div className="mt-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-200 rounded-md px-2 py-1 mb-2 z-50"
                >
                  <span className="mr-2">{file?.name}</span>
                  {handleGetIcon(file.name, index)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full flex justify-end px-4 mb-4">
          {allUploaded && (
            <Button
              btnName={"Cancelar"}
              className="mr-2"
              onClick={() => setOpen(false)}
              loading={loading}
            />
          )}
          <Button
            btnName={"Ok"}
            onClick={() => (allUploaded ? handleUpload() : setOpen(false))}
            loading={loading}
          />
        </div>
      </DefaultModal>
    </>
  );
};
