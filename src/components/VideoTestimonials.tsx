import { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { fadeUp, revealItem, stagger, VIEWPORT } from '../motion/presets';

const videos = [
  { id: 'hVDMiUqV7_I', title: 'Daniele Cardoso', course: 'Francês Iniciante' },
  { id: 'vIZCa7gzXKg', title: 'Thierry dos Santos', course: 'Inglês Intermediário-Avançado' },
  { id: '-FBU0kvZqug', title: 'Marcela Custódio', course: 'Francês Intermediário' },
  { id: 'msn0bps580c', title: 'Emily Ramos', course: 'Inglês Básico-Intermediário' },
];

function VideoCard({ video, index }: { video: (typeof videos)[number]; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <motion.div
      variants={fadeUp}
      {...revealItem(index * 0.12)}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cafe-navy to-cafe-blue p-1 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="overflow-hidden rounded-[20px] bg-black">
        {/* 9:16 for Shorts */}
        <div className="relative w-full pt-[177.78%]">
          {!isPlaying ? (
            <button
              type="button"
              className="absolute inset-0 cursor-pointer text-left"
              onClick={() => setIsPlaying(true)}
              aria-label={`Assistir depoimento de ${video.title}`}
            >
              <img
                src={thumbnailUrl}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm transition-colors group-hover:bg-white sm:h-20 sm:w-20"
                >
                  <Play className="ml-1 h-7 w-7 fill-cafe-coral text-cafe-coral sm:h-9 sm:w-9" />
                </motion.span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-base font-bold drop-shadow-lg sm:text-lg">{video.title}</p>
                <p className="text-xs text-white/90 drop-shadow-md sm:text-sm">{video.course}</p>
              </div>
            </button>
          ) : (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&loop=1&playlist=${video.id}&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function VideoTestimonials() {
  return (
    <section className="bg-gradient-to-b from-cafe-cream to-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.1)}
          className="mb-10 text-center sm:mb-16"
        >
          <motion.h2 variants={fadeUp} className="font-bold mb-3 text-3xl text-cafe-navy sm:mb-4 sm:text-4xl lg:text-5xl">
            Depoimentos em Vídeo
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-base text-cafe-ink sm:text-lg lg:text-xl">
            Histórias reais de quem transformou sua comunicação em inglês e francês
          </motion.p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
