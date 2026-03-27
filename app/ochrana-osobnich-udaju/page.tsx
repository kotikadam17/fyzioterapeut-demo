export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <a href="/" className="inline-flex items-center gap-2 text-[#7B9E87] text-sm font-medium mb-10 hover:underline">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Zpět na hlavní stránku
        </a>

        <h1 className="font-serif text-4xl font-bold text-[#1C1C1C] mb-2">Ochrana osobních údajů</h1>
        <p className="text-[#9CA3AF] text-sm mb-12">Poslední aktualizace: března 2026</p>

        <div className="text-[#4B5563] space-y-8">

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Správce osobních údajů</h2>
            <p className="leading-relaxed">
              Mgr. Petra Marková, fyzioterapeutka<br />
              Karlovo náměstí 12, 280 00 Kolín<br />
              E-mail: <a href="mailto:petra@markova-fyzio.cz" className="text-[#7B9E87] hover:underline">petra@markova-fyzio.cz</a><br />
              Tel: <a href="tel:+420777932382" className="text-[#7B9E87] hover:underline">+420 777 932 382</a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Jaké údaje zpracováváme?</h2>
            <p className="leading-relaxed mb-3">
              Při odeslání rezervace prostřednictvím tohoto webu zpracováváme následující osobní údaje:
            </p>
            <div className="bg-white border border-[#E8EEE9] rounded-2xl p-5 space-y-2">
              {[
                { label: "Jméno a příjmení", purpose: "identifikace pacienta" },
                { label: "Telefonní číslo", purpose: "potvrzení termínu" },
                { label: "E-mailová adresa", purpose: "zasílání potvrzení" },
                { label: "Poznámka / zdravotní problém", purpose: "příprava na sezení" },
                { label: "Datum a čas rezervace", purpose: "správa kalendáře" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B9E87] flex-shrink-0 mt-1.5" />
                  <span><strong className="text-[#1C1C1C]">{item.label}</strong> — {item.purpose}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Účel a právní základ zpracování</h2>
            <p className="leading-relaxed">
              Osobní údaje zpracováváme za účelem správy rezervací a poskytování fyzioterapeutické péče.
              Právním základem zpracování je <strong>plnění smlouvy</strong> (čl. 6 odst. 1 písm. b GDPR) —
              rezervace termínu představuje uzavření smluvního vztahu.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Jak dlouho údaje uchováváme?</h2>
            <p className="leading-relaxed">
              Osobní údaje uchováváme po dobu nezbytně nutnou k poskytnutí péče, nejdéle však
              <strong> 5 let</strong> od poslední návštěvy, v souladu s požadavky zdravotnické dokumentace.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Vaše práva</h2>
            <p className="leading-relaxed mb-3">Máte právo na:</p>
            <div className="space-y-2">
              {[
                "Přístup ke svým osobním údajům",
                "Opravu nepřesných údajů",
                "Výmaz údajů (právo být zapomenut)",
                "Omezení zpracování",
                "Přenositelnost údajů",
                "Podání stížnosti u Úřadu pro ochranu osobních údajů (uoou.cz)",
              ].map((right) => (
                <div key={right} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B9E87] flex-shrink-0 mt-1.5" />
                  <span className="text-[#4B5563]">{right}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Kontakt</h2>
            <p className="leading-relaxed">
              Pro uplatnění vašich práv nebo dotazy ohledně zpracování osobních údajů nás kontaktujte na{" "}
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
