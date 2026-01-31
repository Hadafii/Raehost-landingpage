"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  results: string[];
}

const testimonials: Testimonial[] = [
  {
    name: "Wawan",
    role: "Founder",
    company: "MieayamSMP",
    avatar: "",
    rating: 5,
    text: "Menurutku RaeHost bener bener worth it. Dengan harga segitu, performanya udah lebih dari cukup. Walaupun player lagi banyak, server tetap stabil tanpa drama lag. Support team Raehost nya juga cepat dan enak diajak komunikasi, jadi kalau ada masalah langsung kelar.",
    results: [
      "Server stabil 24/7",
      "Support super responsif",
      "Harga terjangkau",
    ],
  },
  {
    name: "Malik Haura",
    role: "Owner",
    company: "SkyBlock Nation",
    avatar: "",
    rating: 5,
    text: "Gila sih, gue pindah dari hosting lain ke RaeHost dan bedanya kerasa banget. Loading chunk lebih cepat, TPS selalu stabil di 20, player juga pada ngerasa perbedaannya. Worth every rupiah!",
    results: ["TPS stabil 20", "Loading chunk cepat", "Uptime 99.9%"],
  },
  {
    name: "Rehan Saputra",
    role: "Administrator",
    company: "Indo RPG Server",
    avatar: "",
    rating: 5,
    text: "Udah 8 bulan pake RaeHost dan belum pernah kecewa. Pas ada kendala, support langsung fast response bahkan tengah malam. Panel pterodactyl nya juga user-friendly, gampang banget manage server.",
    results: [
      "Response time Super cepat",
      "Panel mudah dipake",
      "4 bulan tanpa masalah",
    ],
  },
  {
    name: "Fajar Nugroho",
    role: "Co-Owner",
    company: "Survival Adventures",
    avatar: "",
    rating: 5,
    text: "Budget terbatas tapi pengen server yang mumpuni? RaeHost jawabannya! Harga terjangkau tapi spek gak main-main. Server 44+ player pun masih lancar jaya.",
    results: ["44+ player smooth", "Harga ramah kantong", "Performa maksimal"],
  },
  {
    name: "Rizky",
    role: "Developer",
    company: "Prison Mania",
    avatar: "",
    rating: 5,
    text: "Sebagai developer yang sering test plugin dan mod, butuh server yang reliable. RaeHost kasih full access, restart cepat, dan backup otomatis. Kerjaan jadi lebih efisien.",
    results: ["Mudah digunakan", "Backup otomatis", "Restart instan"],
  },
];

export function TestimonialCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Main Testimonial Card */}
      <div className="relative h-[500px] md:h-[400px] perspective-1000 mb-8">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.6 },
            }}
            className="absolute inset-0"
          >
            <div className="relative h-full bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-sky-500/10 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-cyan-400/20 p-6 md:p-8 overflow-hidden group shadow-xl">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.08] via-blue-500/[0.05] to-sky-500/[0.08] rounded-2xl"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "300% 300%",
                }}
              />

              {/* Quote icon */}
              <motion.div
                className="absolute top-8 right-8 opacity-20"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Quote className="w-16 h-16 text-cyan-300" />
              </motion.div>

              <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-8">
                {/* User Info */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-cyan-400/30 relative bg-gradient-to-br from-cyan-500 to-blue-600">
                      {testimonials[currentIndex].avatar ? (
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                          {testimonials[currentIndex].name
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>

                    {/* Floating ring animation */}
                    <motion.div
                      className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-cyan-300 mb-1 font-medium">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-white/60 mb-4">
                    {testimonials[currentIndex].company}
                  </p>

                  {/* Star Rating */}
                  <div className="flex justify-center md:justify-start gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.15, duration: 0.3 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      )
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <motion.blockquote
                    className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.blockquote>

                  {/* Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {testimonials[currentIndex].results.map((result, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/[0.05] rounded-lg p-3 border border-cyan-400/20 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        whileHover={{
                          backgroundColor: "rgba(34, 211, 238, 0.1)",
                          borderColor: "rgba(34, 211, 238, 0.3)",
                        }}
                      >
                        <span className="text-sm text-white/80 font-medium">
                          {result}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6">
        <motion.button
          onClick={prevTestimonial}
          className="p-3 rounded-full bg-white/[0.08] border border-cyan-400/30 backdrop-blur-sm text-white hover:bg-cyan-400/20 transition-all"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(34, 211, 238, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous testimonial"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex gap-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-cyan-400 scale-125"
                  : "bg-white/30 hover:bg-cyan-400/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={nextTestimonial}
          className="p-3 rounded-full bg-white/[0.08] border border-cyan-400/30 backdrop-blur-sm text-white hover:bg-cyan-400/20 transition-all"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(34, 211, 238, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next testimonial"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
