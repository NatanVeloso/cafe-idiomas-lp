import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Play } from 'lucide-react';

const videos = [
  {
    id: 'hVDMiUqV7_I',
    title: 'Daniele Cardoso',
    course: 'Francês Iniciante'
  },
  {
    id: 'vIZCa7gzXKg',
    title: 'Thierry dos Santos',
    course: 'Inglês Intermediário-Avançado'
  },
  {
    id: '-FBU0kvZqug',
    title: 'Marcela Custódio',
    course: 'Francês Intermediário'
  },
  {
    id: 'msn0bps580c',
    title: 'Emily Ramos',
    course: 'Inglês Básico-Intermediário'
  },
];

function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <div
      ref={ref}
      className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 bg-gradient-to-br from-[#00415d] to-[#09598f] p-1 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="rounded-[20px] overflow-hidden bg-black">
        {/* Aspect ratio 9:16 para Shorts */}
        <div className="relative w-full pt-[177.78%]">
          {!isPlaying ? (
            /* Thumbnail com botão de play */
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Botão de play */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 text-[#ee6b52] fill-[#ee6b52] ml-1" />
                </div>
              </div>

              {/* Info no thumbnail */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-bold text-base sm:text-lg drop-shadow-lg">{video.title}</p>
                <p className="text-xs sm:text-sm text-white/90 drop-shadow-md">{video.course}</p>
              </div>
            </div>
          ) : (
            /* iframe do vídeo */
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&loop=1&playlist=${video.id}&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function VideoTestimonials() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2
            ref={titleRef}
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00415d] mb-3 sm:mb-4 transition-all duration-700 ${
              titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Depoimentos em Vídeo
          </h2>
          <p
            ref={subtitleRef}
            className={`text-base sm:text-lg lg:text-xl text-[#515859] max-w-2xl mx-auto transition-all duration-700 delay-150 ${
              subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Histórias reais de quem transformou sua comunicação em inglês e francês
          </p>
        </div>

        {/* Grid responsivo para vídeos verticais */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}