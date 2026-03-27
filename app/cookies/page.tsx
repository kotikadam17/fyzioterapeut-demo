export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <a href="/" className="inline-flex items-center gap-2 text-[#7B9E87] text-sm font-medium mb-10 hover:underline">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Zpět na hlavní stránku
        </a>

        <h1 className="font-serif text-4xl font-bold text-[#1C1C1C] mb-2">Zásady cookies</h1>
        <p className="text-[#9CA3AF] text-sm mb-12">Poslední aktualizace: března 2026</p>

        <div className="prose prose-sm max-w-none text-[#4B5563] space-y-8">

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Co jsou cookies?</h2>
            <p className="leading-relaxed">
              Cookies jsou malé textové soubory, které se ukládají do vašeho prohlížeče při návštěvě webových stránek.
              Slouží k zapamatování vašich preferencí a zajištění správné funkčnosti webu.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Jaké cookies používáme?</h2>
            <div className="space-y-4">
              <div className="bg-white border border-[#E8EEE9] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#7B9E87]" />
                  <span className="font-semibold text-[#1C1C1C] text-sm">Nezbytné cookies</span>
                  <span className="ml-auto text-[10px] bg-[#EAF1EC] text-[#4A7A5A] px-2 py-0.5 rounded-full font-semibold">Vždy aktivní</span>
                </div>
                <p className="text-sm leading-relaxed">
                  Tyto cookies jsou nezbytné pro správné fungování webu. Zahrnují například zapamatování vašeho souhlasu
                  s cookies (<code className="bg-[#F5F5F0] px-1 rounded text-xs">cookie_consent</code>) a přihlašovací session
                  administrátora (<code className="bg-[#F5F5F0] px-1 rounded text-xs">admin_auth</code>).
                  Bez těchto cookies web nemůže správně fungovat.
                </p>
              </div>

              <div className="bg-white border border-[#E8EEE9] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#D1D5DB]" />
                  <span className="font-semibold text-[#1C1C1C] text-sm">Analytické cookies</span>
                  <span className="ml-auto text-[10px] bg-[#F5F5F0] text-[#9CA3AF] px-2 py-0.5 rounded-full font-semibold">Nepoužíváme</span>
                </div>
                <p className="text-sm leading-relaxed">
                  Tento web v současné době nepoužívá žádné analytické ani marketingové cookies třetích stran.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Jak dlouho jsou cookies uloženy?</h2>
            <p className="leading-relaxed">
              Cookie souhlasu (<code className="bg-[#F5F5F0] px-1 rounded text-xs">cookie_consent</code>) je uložena po dobu
              <strong> 1 roku</strong>. Po uplynutí této doby budete znovu dotázáni na souhlas.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Jak cookies odmítnout nebo smazat?</h2>
            <p className="leading-relaxed">
              Souhlas s cookies můžete kdykoli odvolat smazáním cookies ve vašem prohlížeči.
              V nastavení prohlížeče (Chrome, Firefox, Safari, Edge) najdete možnost spravovat
              nebo smazat všechny uložené cookies pro tento web.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Kontakt</h2>
            <p className="leading-relaxed">
              Pokud máte dotazy ohledně zpracování cookies, kontaktujte nás na{" "}
              <a href="mailto:petra@markova-fyzio.cz" className="text-[#7B9E87] hover:underline">
                petra@markova-fyzio.cz
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
