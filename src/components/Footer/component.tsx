import Image from "next/image";

export const Footer = () => (
  <footer className="w-full bottom-0 bg-primary h-[32vh] z-50 flex justify-center items-center relative">
    <div className="grid grid-cols-2 divide-x divide-white">
      <div className="flex justify-end items-center p-4">
        <Image
          src="img/logo/logo-text-white.svg"
          width="150"
          height="150"
          alt="TAHR"
        />
      </div>
      <div className="flex flex-col p-4">
        <div className="text-white font-semibold text-sm text-center mb-4">
          Inscreva-se em nossa newsletter
        </div>
        <a
          id="mailInput"
          className="text-sm text-center rounded-md bg-white p-2.5 text-primary w-full"
          href="mailto:newsletter@tahr.com?cc=tahr@gmail.com&subject=Inscrição"
        >
          Inscrever-se
        </a>
      </div>
    </div>
    <div className="text-white absolute bottom-5 right-5">
      Desenvolvido por
      <a
        target="_blank"
        href="https://www.linkedin.com/in/jos%C3%A9-trovarelli-neto-31b2801b9/"
      >
        <strong>José Trovarelli Neto</strong>
      </a>
      &copy; {new Date().getFullYear()}
    </div>
  </footer>
);
