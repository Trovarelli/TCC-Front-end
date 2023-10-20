export const Footer = () => (
  <footer className="w-full static bottom-0 bg-primary h-[32vh] z-50 flex justify-center items-center">
    <div className="grid grid-cols-2 divide-x divide-white">
      <div className="flex justify-end items-center p-4">
        <img src="img/logo/logo-text-white.svg" width="150px" />
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
  </footer>
);
