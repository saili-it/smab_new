import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player/youtube';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const ProjectShowcase = ({ title, subtitle, projects }) => {
  const hasProjects = Array.isArray(projects) && projects.length > 0;
  const [selectedProject, setSelectedProject] = useState(hasProjects ? projects[0] : null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Update selectedProject if projects prop changes
  React.useEffect(() => {
    if (hasProjects) {
      setSelectedProject(projects[0]);
    } else {
      setSelectedProject(null);
    }
  }, [projects]);

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
        >
          {title}
        </motion.h2>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3 relative aspect-video rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  <ReactPlayer
                    url={selectedProject.video}
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    controls={true}
                    light={true}
                    className="rounded-2xl"
                  />
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full text-white text-lg bg-gray-800 rounded-2xl">
                  Aucun projet à afficher
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Project List */}
          <div className="lg:col-span-2 space-y-4">
            {hasProjects ? projects.map((project) => (
              <motion.button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                  selectedProject && selectedProject.id === project.id
                    ? 'bg-[#e63812] text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <div className="flex items-center text-sm">
                  <svg
                    className={`w-5 h-5 ${
                      selectedProject && selectedProject.id === project.id ? 'text-white' : 'text-[#e63812]'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="ml-2">Regarder la vidéo</span>
                </div>
              </motion.button>
            )) : (
              <div className="text-gray-400">Aucun projet à afficher</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
