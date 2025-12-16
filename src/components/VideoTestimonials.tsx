import { useInView } from '../hooks/useInView';

const videos = [
  {
    id: '_WyFm46mIWo',
    title: 'Depoimento Aluno 1'
  },
  {
    id: '_WyFm46mIWo',
    title: 'Depoimento Aluno 2'
  },
  {
    id: '_WyFm46mIWo',
    title: 'Depoimento Aluno 3'
  }
];

function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative w-full pt-[56.25%] bg-gray-900">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="bg-gray-50 p-4">
        <p className="font-semibold text-[#00415d]">{video.title}</p>
      </div>
    </div>
  );
}

export default function VideoTestimonials() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={`text-4xl lg:text-5xl font-bold text-[#00415d] mb-4 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Depoimentos
          </h2>
          <p
            ref={subtitleRef}
            className={`text-xl text-[#515859] max-w-2xl mx-auto transition-all duration-700 delay-150 ${subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Confira relatos reais de alunos que transformaram suas vidas com a escola Café Idiomas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}