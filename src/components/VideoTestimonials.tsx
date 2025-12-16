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

export default function VideoTestimonials() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Histórias de Sucesso em Vídeo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confira relatos reais de alunos que transformaram suas vidas com o Café Idiomas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{
                animationDelay: isInView ? `${index * 0.1}s` : '0s',
              }}
            >
              <div className="relative w-full pt-[56.25%] bg-gray-900">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">{video.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
