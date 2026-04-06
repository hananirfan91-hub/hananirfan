import { Section } from './ui/Section';

export function DesignGallery() {
  const designs = [
    { id: 1, url: 'https://picsum.photos/seed/design1/600/800', span: 'md:row-span-2' },
    { id: 2, url: 'https://picsum.photos/seed/design2/800/600', span: 'md:col-span-2' },
    { id: 3, url: 'https://picsum.photos/seed/design3/600/600', span: '' },
    { id: 4, url: 'https://picsum.photos/seed/design4/600/600', span: '' },
    { id: 5, url: 'https://picsum.photos/seed/design5/800/600', span: 'md:col-span-2' },
  ];

  return (
    <Section id="design">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Graphic Design</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Visual identities, UI concepts, and digital art.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {designs.map((design) => (
          <div
            key={design.id}
            className={`relative rounded-xl overflow-hidden group ${design.span}`}
          >
            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-300 z-10" />
            <img
              src={design.url}
              alt="Design showcase"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
