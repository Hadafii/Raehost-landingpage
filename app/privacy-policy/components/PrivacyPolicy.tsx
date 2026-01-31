"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Chip,
  Link,
  Alert,
} from "@heroui/react";
import {
  IconShield,
  IconArrowLeft,
  IconEye,
  IconLock,
  IconDatabase,
  IconCookie,
  IconMail,
  IconUserCheck,
  IconFileText,
  IconClock,
  IconGavel,
  IconInfoCircle,
  IconAlertTriangle,
  IconHeadphones,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Image from "next/image";

import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import SpotlightCard from "@/components/SpotlightCard";

interface PolicySection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  content: string;
}

export default function PrivacyPolicyPage(): JSX.Element {
  const lastUpdated = "30 May 2025";

  const policySections: PolicySection[] = [
    {
      id: "disclaimer",
      title: "Penafian",
      icon: IconInfoCircle,
      color: "primary",
      content: `Kebijakan Privasi ini mengatur bagaimana Raehost mengumpulkan, menggunakan, mengelola, dan mengungkapkan informasi yang dikumpulkan dari pengguna (masing-masing disebut "Pengguna") dari website https://raehost.com ("Situs"). Kebijakan privasi ini berlaku untuk Situs dan semua produk serta layanan yang ditawarkan oleh Raehost. Dengan menggunakan Situs kami, Anda menyatakan persetujuan Anda terhadap Kebijakan Privasi ini.`,
    },
    {
      id: "personal-info",
      title: "Identifikasi Informasi Pribadi",
      icon: IconUserCheck,
      color: "secondary",
      content: `Kami dapat mengumpulkan informasi yang dapat diidentifikasi secara pribadi dari Pengguna dalam berbagai cara, termasuk ketika Pengguna mengunjungi Situs kami, mendaftar di situs, melakukan pemesanan, dan sehubungan dengan aktivitas, layanan, fitur atau sumber daya lain yang kami sediakan di Situs kami. Pengguna mungkin diminta, jika diperlukan, nama mereka, alamat email, alamat rumah, nomor telepon. Pengguna dapat, bagaimanapun, mengunjungi Situs kami secara anonim. Kami akan mengumpulkan informasi yang dapat diidentifikasi secara pribadi dari Pengguna hanya jika mereka secara sukarela menyerahkan informasi tersebut kepada kami. Pengguna selalu dapat menolak untuk memberikan informasi yang dapat diidentifikasi secara pribadi, kecuali bahwa melakukan hal tersebut dapat mencegah mereka terlibat dalam aktivitas tertentu yang terkait dengan Situs.`,
    },
    {
      id: "non-personal-info",
      title: "Identifikasi Informasi Non-Pribadi",
      icon: IconDatabase,
      color: "success",
      content: `Kami dapat mengumpulkan informasi yang tidak dapat diidentifikasi secara pribadi tentang Pengguna setiap kali mereka berinteraksi dengan Situs kami. Informasi identifikasi non-pribadi dapat mencakup nama browser, jenis komputer dan informasi teknis tentang Pengguna yang terhubung ke Situs kami, seperti sistem operasi dan penyedia layanan Internet yang digunakan dan informasi serupa lainnya.`,
    },
    {
      id: "cookies",
      title: "Cookie Browser Web",
      icon: IconCookie,
      color: "warning",
      content: `Situs kami dapat menggunakan "cookie" untuk meningkatkan pengalaman Pengguna. Browser web pengguna menempatkan cookie di hard drive mereka untuk tujuan pencatatan dan kadang-kadang untuk melacak informasi tentang mereka. Pengguna dapat memilih untuk mengatur browser web mereka untuk menolak cookie atau untuk memperingatkan mereka ketika cookie dikirim. Jika mereka melakukannya, harap dicatat bahwa beberapa bagian dari Situs mungkin tidak berfungsi dengan benar.`,
    },
    {
      id: "data-usage",
      title: "Bagaimana Kami Menggunakan Informasi yang Dikumpulkan",
      icon: IconEye,
      color: "primary",
      content: `Raehost dapat mengumpulkan dan menggunakan informasi pribadi Pengguna untuk tujuan pemrosesan pembayaran dan memelihara catatan yang sesuai. Kami dapat menggunakan informasi yang diberikan Pengguna tentang diri mereka ketika melakukan pemesanan semata-mata untuk menyediakan layanan pada pesanan tersebut. Kami tidak membagikan informasi ini dengan pihak luar kecuali sejauh yang diperlukan untuk menyediakan layanan. Kami dapat menggunakan alamat email untuk mengirim informasi dan pembaruan kepada Pengguna mengenai pesanan mereka. Ini juga dapat digunakan untuk menjawab pertanyaan, inquiry dan / atau permintaan lain mereka serta informasi yang dianggap penting sehubungan dengan layanan yang diberikan.`,
    },
    {
      id: "data-protection",
      title: "Bagaimana Kami Melindungi Informasi Anda",
      icon: IconLock,
      color: "success",
      content: `Kami mengadopsi praktik pengumpulan, penyimpanan dan pemrosesan data yang tepat serta langkah-langkah keamanan untuk melindungi dari akses yang tidak sah, perubahan, pengungkapan atau perusakan informasi pribadi Anda, nama pengguna, kata sandi, informasi transaksi dan data yang disimpan di Situs kami. Semua data sensitif ditransmisikan melalui koneksi terenkripsi SSL dan dilindungi dengan enkripsi tingkat militer.`,
    },
    {
      id: "data-sharing",
      title: "Berbagi Informasi Pribadi Anda",
      icon: IconShield,
      color: "danger",
      content: `Kami tidak menjual, memperdagangkan atau menyewakan informasi yang dapat diidentifikasi secara pribadi Pengguna kepada orang lain. Kami dapat membagikan informasi demografis agregat generik yang tidak terkait dengan informasi yang dapat diidentifikasi secara pribadi tentang pengunjung dan pengguna dengan mitra bisnis kami, afiliasi tepercaya dan pengiklan untuk tujuan yang dijelaskan di atas. Kami juga dapat membagikan informasi dengan penyedia layanan pihak ketiga yang membantu kami dalam mengoperasikan website dan melakukan bisnis kami.`,
    },
    {
      id: "third-party",
      title: "Layanan Pihak Ketiga",
      icon: IconGavel,
      color: "secondary",
      content: `Situs kami dapat mengintegrasikan layanan pihak ketiga seperti payment gateway, analytics tools, dan live chat support. Layanan-layanan ini memiliki kebijakan privasi mereka sendiri. Kami mendorong Anda untuk membaca kebijakan privasi dari setiap layanan pihak ketiga yang kami gunakan. Raehost tidak bertanggung jawab atas praktik privasi atau konten dari situs web atau layanan pihak ketiga tersebut.`,
    },
    {
      id: "data-retention",
      title: "Penyimpanan Data",
      icon: IconDatabase,
      color: "warning",
      content: `Kami menyimpan informasi pribadi Anda selama akun Anda aktif atau sesuai kebutuhan untuk menyediakan layanan kepada Anda. Kami akan menyimpan dan menggunakan informasi Anda sejauh yang diperlukan untuk mematuhi kewajiban hukum kami, menyelesaikan sengketa, dan menegakkan perjanjian kami. Data dapat disimpan hingga 7 tahun setelah akun ditutup untuk keperluan audit dan kepatuhan hukum.`,
    },
    {
      id: "user-rights",
      title: "Hak-Hak Pengguna",
      icon: IconUserCheck,
      color: "primary",
      content: `Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi yang kami simpan tentang Anda. Anda juga dapat meminta salinan data pribadi Anda atau meminta pembatasan pemrosesan data Anda. Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang tersedia di website. Kami akan merespons permintaan Anda dalam waktu 30 hari kerja.`,
    },
    {
      id: "policy-changes",
      title: "Perubahan Kebijakan Privasi",
      icon: IconClock,
      color: "warning",
      content: `Raehost memiliki kebijaksanaan untuk memperbarui kebijakan privasi ini setiap saat. Ketika kami melakukannya, kami akan merevisi tanggal yang diperbarui di bagian bawah halaman ini dan mengirimkan notifikasi kepada pengguna terdaftar. Kami mendorong Pengguna untuk sering memeriksa halaman ini untuk perubahan untuk tetap terinformasi tentang bagaimana kami membantu melindungi informasi pribadi yang kami kumpulkan. Anda mengakui dan setuju bahwa adalah tanggung jawab Anda untuk secara berkala meninjau kebijakan privasi ini dan menyadari setiap modifikasi.`,
    },
    {
      id: "acceptance",
      title: "Penerimaan Ketentuan Ini",
      icon: IconFileText,
      color: "success",
      content: `Dengan menggunakan Situs ini, Anda menyatakan penerimaan Anda terhadap kebijakan dan ketentuan layanan ini. Jika Anda tidak setuju dengan kebijakan ini, jangan gunakan Situs kami. Penggunaan berkelanjutan Anda terhadap Situs setelah posting perubahan kebijakan ini akan dianggap sebagai penerimaan Anda terhadap perubahan tersebut.`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="">
        {/* Hero Section with Background Image */}
        <div className="relative overflow-hidden text-white">
          {/* Background Image dengan Next.js Image */}
          <div className="absolute inset-0">
            <Image
              fill
              priority
              alt="Privacy Policy Background"
              className="object-cover"
              quality={85}
              src="/assets/landing/stock/landing2.png"
            />
            {/* Blur Effect */}
            <div className="absolute inset-0 backdrop-blur-sm bg-black/20 dark:bg-black/60" />
          </div>

          <div className="relative container mx-auto px-6 py-16">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                  <Shield className="text-white" size={48} />
                </div>
              </div>
              <BlurText
                animateBy="words"
                className="text-4xl md:text-5xl font-bold mb-4"
                delay={200}
                direction="top"
                text="Kebijakan Privasi"
              />
              <TextGenerateEffect
                className="text-xl text-blue-100 max-w-3xl mx-auto mb-6"
                duration={0.8}
                words="Kami berkomitmen melindungi privasi dan keamanan data pribadi Anda. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda."
              />
              <Chip
                className="text-white bg-white/20 backdrop-blur-sm border border-white/10"
                color="warning"
                startContent={<IconClock size={16} />}
                variant="flat"
              >
                Terakhir diperbarui: {lastUpdated}
              </Chip>
            </motion.div>
          </div>
        </div>

        {/* Navigation Breadcrumb */}
        <div className="container mx-auto px-6 py-4">
          <Button
            as={Link}
            className="text-default-600 hover:text-primary"
            href="/"
            startContent={<IconArrowLeft size={18} />}
            variant="light"
          >
            Kembali ke Beranda
          </Button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 pb-16">
          <motion.div
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            initial="hidden"
            variants={containerVariants}
          >
            {/* Sidebar Navigation */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              variants={itemVariants}
            >
              {/* Quick Navigation */}
              <Card className="bg-white/10 backdrop-blur-sm ">
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <IconFileText size={20} />
                    Daftar Isi
                  </h3>
                </CardHeader>
                <Divider />
                <CardBody className="p-0">
                  <nav className="space-y-1">
                    {policySections.map((section) => (
                      <Button
                        key={section.id}
                        className="w-full justify-start h-auto p-3 text-left"
                        startContent={<section.icon size={16} />}
                        variant="light"
                        onPress={() => {
                          const element = document.getElementById(section.id);

                          element?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <span className="text-sm line-clamp-2">
                          {section.title}
                        </span>
                      </Button>
                    ))}
                  </nav>
                </CardBody>
              </Card>

              {/* Important Notice */}
              <Card className="bg-white/10 backdrop-blur-sm border-2 border-warning-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning-100  rounded-lg">
                      <IconAlertTriangle
                        className="text-warning-600"
                        size={20}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Penting!</h3>
                      <p className="text-sm text-default-600">
                        Baca dengan seksama
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Alert
                    color="warning"
                    description="Kebijakan ini dapat berubah sewaktu-waktu. Pengguna terdaftar akan mendapat notifikasi email untuk setiap perubahan penting."
                    title="Perubahan Kebijakan"
                    variant="flat"
                  />
                </CardBody>
              </Card>

              {/* Contact Support */}
              <Card className="bg-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100  rounded-lg">
                      <IconHeadphones className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Ada Pertanyaan?</h3>
                      <p className="text-sm text-default-600">
                        Tim support siap membantu
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="space-y-3">
                  <Button
                    as={Link}
                    className="w-full"
                    color="primary"
                    href="/contact"
                    startContent={<IconMail size={18} />}
                    variant="flat"
                  >
                    Hubungi Support
                  </Button>
                  <p className="text-xs text-default-500 text-center">
                    support@raehost.com
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-3 space-y-8"
              variants={itemVariants}
            >
              {/* Introduction */}
              <AnimatedContent delay={200} direction="vertical" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm">
                  <CardBody className="p-8">
                    <div className="text-center mb-6">
                      <h1 className="text-3xl font-bold mb-4">
                        Kebijakan Privasi Raehost
                      </h1>
                      <p className="text-lg text-default-600 leading-relaxed">
                        Di Raehost, kami sangat menghargai kepercayaan yang Anda
                        berikan kepada kami. Kebijakan Privasi ini menjelaskan
                        bagaimana kami mengumpulkan, menggunakan, menyimpan, dan
                        melindungi informasi pribadi Anda saat menggunakan
                        layanan hosting game kami.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <SpotlightCard>
                        <div className="text-center">
                          <div className="inline-flex p-3 rounded-full bg-primary-100  mb-3">
                            <IconLock className="text-primary-600" size={24} />
                          </div>
                          <h3 className="font-semibold mb-2">
                            Keamanan Terjamin
                          </h3>
                          <p className="text-sm text-default-600">
                            Data Anda dilindungi dengan enkripsi tingkat militer
                          </p>
                        </div>
                      </SpotlightCard>

                      <SpotlightCard>
                        <div className="text-center">
                          <div className="inline-flex p-3 rounded-full bg-success-100  mb-3">
                            <IconUserCheck
                              className="text-success-600"
                              size={24}
                            />
                          </div>
                          <h3 className="font-semibold mb-2">Kontrol Penuh</h3>
                          <p className="text-sm text-default-600">
                            Anda memiliki kontrol penuh atas data pribadi Anda
                          </p>
                        </div>
                      </SpotlightCard>

                      <SpotlightCard>
                        <div className="text-center">
                          <div className="inline-flex p-3 rounded-full bg-warning-100  mb-3">
                            <IconShield
                              className="text-warning-600"
                              size={24}
                            />
                          </div>
                          <h3 className="font-semibold mb-2">Tidak Dijual</h3>
                          <p className="text-sm text-default-600">
                            Kami tidak pernah menjual data pribadi Anda
                          </p>
                        </div>
                      </SpotlightCard>
                    </div>
                  </CardBody>
                </Card>
              </AnimatedContent>

              {/* Policy Sections */}
              {policySections.map((section, index) => (
                <AnimatedContent
                  key={section.id}
                  delay={200}
                  direction="vertical"
                  distance={30}
                >
                  <Card
                    className="bg-white/10 backdrop-blur-sm scroll-mt-6"
                    id={section.id}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 bg-${section.color}-100  rounded-lg`}
                        >
                          <section.icon
                            className={`text-${section.color}-600`}
                            size={20}
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold">
                            {section.title}
                          </h2>
                          <Chip color={section.color} size="sm" variant="flat">
                            Bagian {index + 1}
                          </Chip>
                        </div>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <p className="text-default-700 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </AnimatedContent>
              ))}

              {/* Contact Information */}
              <AnimatedContent delay={200} direction="vertical" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-primary-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100  rounded-lg">
                        <IconMail className="text-primary-600" size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">Hubungi Kami</h2>
                        <p className="text-sm text-default-600">
                          Untuk pertanyaan terkait privasi dan perlindungan data
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-3">
                            Data Protection Officer
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Email:</strong> support@raehost.com
                            </p>
                            <p>
                              <strong>Response Time:</strong> 1-2 hari kerja
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-3">Alamat Kantor</h3>
                          {/* <div className="space-y-2 text-sm">
                            <p>PT. Raehost Indonesia</p>
                            <p>Jl. Telekomunikasi No. 1</p>
                            <p>Bandung, Jawa Barat 40257</p>
                            <p>Indonesia</p>
                          </div> */}
                        </div>
                      </div>

                      <Divider />

                      <Alert
                        color="primary"
                        description="Anda berhak mengakses, memperbarui, menghapus, atau membatasi penggunaan data pribadi Anda kapan saja. Hubungi kami untuk menggunakan hak-hak tersebut."
                        title="Hak Anda Sebagai Pengguna"
                        variant="flat"
                      />
                    </div>
                  </CardBody>
                </Card>
              </AnimatedContent>

              {/* Legal Footer */}
              <AnimatedContent delay={200} direction="vertical" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm">
                  <CardBody>
                    <div className="text-center space-y-2">
                      <p className="text-sm text-default-600">
                        © {new Date().getFullYear()} Raehost. Seluruh hak cipta
                        dilindungi undang-undang.
                      </p>
                      <p className="text-xs text-default-500">
                        Kebijakan ini terakhir diperbarui pada {lastUpdated}.
                        Dokumen ini dapat berubah sewaktu-waktu tanpa
                        pemberitahuan sebelumnya. Versi terbaru selalu tersedia
                        di website resmi Raehost.
                      </p>
                      <div className="flex justify-center gap-4 mt-4">
                        <Button
                          as={Link}
                          href="/terms-of-service"
                          size="sm"
                          variant="light"
                        >
                          Terms of Service
                        </Button>
                        <Button
                          as={Link}
                          href="/contact"
                          size="sm"
                          variant="light"
                        >
                          Hubungi Kami
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </AnimatedContent>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
