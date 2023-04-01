export const Footer = () => (
  <footer className="w-full static bottom-0 bg-primary h-[32vh] z-50 flex justify-center items-center">
    <div className="grid grid-cols-2 divide-x divide-white">
      <div className="flex justify-end items-center p-4">
        <img src="img/logo/logo-text-white.png" width="150px" />
      </div>
      <div className="grid grid-cols-2 gap-3 p-4">
        <label
          htmlFor="mailInput"
          className="text-white font-semibold text-sm col-span-2"
        >
          Inscreva-se em nossa newsletter
        </label>
        <div className="max-md:col-span-2">
          <input
            id="mailInput"
            className="p-2.5 bg-transparent w-full border-white border text-white text-sm rounded-md borde appearance-none focus:outline-none focus:ring-0 focus:border-2 peer"
          />
        </div>
        <div className="max-md:col-span-2">
          <button className="rounded-md bg-white p-2.5 text-primary max-md:w-full">
            <span className="text-sm">Inscrever-se</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
);
