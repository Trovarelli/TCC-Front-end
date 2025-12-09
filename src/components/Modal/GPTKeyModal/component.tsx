"use client";
import { TextInput } from "@/components/Inputs";
import { DefaultModal } from "../DefaultModal";
import { GptFormModalProps } from "./types";
import { Button } from "@/components/Buttons";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";

export const GptFormModal = ({ open, setOpen }: GptFormModalProps) => {
  const [key, setKey] = useState("");
  const { setApiKey, apiKey } = useUserStore();

  const handleSave = () => {
    setApiKey(key);
    setOpen(false);
  };

  const handleCancel = () => {
    setKey(apiKey);
    setOpen(false);
  };

  useEffect(() => {
    setKey(apiKey);
  }, [apiKey]);

  return (
    <DefaultModal open={open} size="sm" className="p-4 relative">
      <div className="flex flex-col">
        <div className="flex flex-col px-3 pb-3 gap-3">
          <div className="text-lg font-semibold text-gray-800">
            O que é a Chave GPT?
          </div>
          <div className="text-sm text-gray-600">
            A <strong>Chave GPT</strong> é um código único fornecido pela OpenAI
            que permite acesso aos serviços da API do ChatGPT. É necessária para
            autenticar solicitações e utilizar os recursos disponibilizados.
          </div>

          <div className="text-lg font-semibold text-gray-800 mt-4">
            Como conseguir a chave?
          </div>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            <li>
              Acesse sua conta na OpenAI através do site:{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                https://platform.openai.com/api-keys
              </a>
              .
            </li>
            <li>
              Vá até a seção <strong>API Keys</strong>.
            </li>
            <li>
              Clique em <strong>Create new secret key</strong> para gerar sua
              chave.
            </li>
            <li>
              Copie e guarde a chave com segurança. Ela será exibida apenas uma
              vez.
            </li>
          </ul>

          <div className="text-lg font-semibold text-gray-800 mt-4">
            Insira sua chave abaixo:
          </div>
          <TextInput
            label="Chave GPT"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            inputType="password"
          />
        </div>
        <div className="w-full flex justify-end px-4 mb-4">
          <Button
            btnName={"Cancelar"}
            className="mr-2"
            color="error"
            onClick={handleCancel}
          />
          <Button
            btnName={"Salvar"}
            color="success"
            onClick={handleSave}
          />
        </div>
      </div>
    </DefaultModal>
  );
};
