export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Brand */}
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-10 w-0.5 bg-primary" />

              <div>
                <h2 className="font-title text-lg font-semibold tracking-widest sm:text-xl">
                  Sunu Latifudin, S.Pd.
                </h2>
                <p className="mt-0.5 font-desc text-xs uppercase tracking-[0.14em] text-white/50">
                  Guru PPKN
                </p>
              </div>
            </div>

            <p className="max-w-full font-desc text-sm leading-relaxed text-white/60 text-justify">
              Guru Pendidikan Pancasila dan Kewarganegaraan
              yang berkomitmen menghadirkan pembelajaran yang bermakna,
              kontekstual, dan relevan.
            </p>
          </div>

          {/* Contact & Copyright */}
          <div className="font-desc text-sm md:text-right">
            <div className="mb-4 space-y-1.5 text-white/70">
              <p className="transition-colors hover:text-white">
                lagam7ng@gmail.com
              </p>
              <p className="text-white/50">
                0858 0274 7478
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 text-xs text-white/40">
              <p>
                &copy; {new Date().getFullYear()} Sunu Latifudin.
              </p>
              <p className="mt-1">
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
