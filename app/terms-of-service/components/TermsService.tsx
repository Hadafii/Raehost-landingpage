"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Accordion,
  AccordionItem,
  Chip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Alert,
  Link,
} from "@heroui/react";
import {
  IconScale,
  IconShield,
  IconAlertHexagon,
  IconCreditCard,
  IconServer2,
  IconDatabase,
  IconAlertTriangle,
  IconClock,
  IconUserCheck,
  IconFileText,
  IconMail,
  IconHome,
  IconArrowLeft,
  IconExternalLink,
  IconInfoCircle,
  IconCreditCardOff,
  IconReceipt,
  IconLock,
  IconUsers,
  IconRefresh,
  IconWorld,
} from "@tabler/icons-react";
import { HeartHandshake, Headset } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SubSubItem {
  number: string;
  content: string;
}

interface SubItem {
  number: string;
  title: string;
  items: SubSubItem[];
}

interface Section {
  id: string;
  letter: string;
  title: string;
  icon: any;
  color: "primary" | "warning" | "success" | "danger" | "secondary" | "default";
  overview: string;
  subSections: SubItem[];
}

export default function TermsOfServicePage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [lastUpdated] = useState(new Date("2025-07-15"));

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

  const sections: Section[] = [
    {
      id: "ketentuan-layanan",
      letter: "A",
      title: "KETENTUAN LAYANAN",
      icon: IconServer2,
      color: "primary",
      overview:
        "Syarat dan ketentuan penggunaan layanan game server hosting RaeHost.",
      subSections: [
        {
          number: "1",
          title: "Tentang Layanan",
          items: [
            {
              number: "1.1",
              content:
                "RaeHost menyediakan layanan **game server hosting** dengan performa tinggi untuk berbagai jenis game populer seperti **Minecraft**, **FiveM**, **Rust**, **ARK**, dan lainnya.",
            },
            {
              number: "1.2",
              content:
                "Setiap paket hosting memiliki **batasan resource** (CPU, RAM, Storage, Database, Backup) yang telah ditentukan sesuai dengan harga paket.",
            },
            {
              number: "1.3",
              content:
                "RaeHost berhak melakukan **maintenance berkala** untuk menjaga kualitas layanan dengan pemberitahuan minimal **24 jam sebelumnya**.",
            },
            {
              number: "1.4",
              content:
                "Pengguna wajib menggunakan layanan sesuai dengan peruntukannya, yaitu untuk menjalankan **game server** dan **tidak melanggar hukum yang berlaku**.",
            },
            {
              number: "1.5",
              content:
                "Layanan dikelola menggunakan **panel manajemen server** untuk memudahkan pengguna dalam mengatur dan memantau server mereka.",
            },
          ],
        },
      ],
    },
    {
      id: "ketentuan-pembayaran",
      letter: "B",
      title: "KETENTUAN PEMBAYARAN",
      icon: IconCreditCard,
      color: "success",
      overview: "Ketentuan pembayaran dan metode transaksi resmi RaeHost.",
      subSections: [
        {
          number: "1",
          title: "Metode Pembayaran",
          items: [
            {
              number: "1.1",
              content:
                "Semua transaksi dilakukan melalui **payment gateway resmi Duitku**, yang menyediakan metode seperti **QRIS, Virtual Account Bank, dan e-Wallet**.",
            },
            {
              number: "1.2",
              content:
                "RaeHost juga menerima pembayaran langsung melalui **Team RaeHost** atas nama resmi **RaeHost / Team RaeHost**.",
            },
            {
              number: "1.3",
              content:
                "Layanan akan **aktif secara otomatis** setelah sistem menerima konfirmasi pembayaran yang sah.",
            },
          ],
        },
        {
          number: "2",
          title: "Penanganan Masalah Pembayaran",
          items: [
            {
              number: "2.1",
              content:
                "Jika terjadi **kesalahan nominal, keterlambatan, atau kendala transaksi**, pengguna dapat menghubungi tim dukungan RaeHost untuk dibantu melakukan pengecekan ke pihak payment gateway.",
            },
            {
              number: "2.2",
              content:
                "RaeHost akan berupaya membantu penyelesaian masalah pembayaran, namun proses dan hasil akhir mengikuti **kebijakan pihak Duitku** sebagai penyedia sistem pembayaran.",
            },
          ],
        },
      ],
    },
    {
      id: "kebijakan-refund",
      letter: "C",
      title: "KEBIJAKAN REFUND",
      icon: IconCreditCardOff,
      color: "danger",
      overview: "Ketentuan pengembalian dana (refund) untuk layanan RaeHost.",
      subSections: [
        {
          number: "1",
          title: "Ketentuan Refund",
          items: [
            {
              number: "1.1",
              content:
                "Refund **tidak dapat dilakukan setelah layanan aktif**, kecuali terdapat **kesalahan teknis dari pihak RaeHost** yang tidak dapat diperbaiki.",
            },
            {
              number: "1.2",
              content:
                "Refund hanya dapat diberikan apabila terjadi **pembayaran ganda (double payment)**, atau layanan **belum diaktifkan sama sekali**.",
            },
          ],
        },
        {
          number: "2",
          title: "Pengecualian Refund",
          items: [
            {
              number: "2.1",
              content:
                "Refund **tidak berlaku** untuk kesalahan konfigurasi pengguna, penggunaan plugin/mod/datapack yang tidak kompatibel, atau kerusakan akibat tindakan pengguna sendiri.",
            },
            {
              number: "2.2",
              content:
                "Pelanggaran terhadap kebijakan atau aktivitas ilegal akan mengakibatkan penghentian layanan **tanpa refund**.",
            },
          ],
        },
      ],
    },
    {
      id: "perpanjangan-penghentian",
      letter: "D",
      title: "PERPANJANGAN DAN PENGHENTIAN LAYANAN",
      icon: IconRefresh,
      color: "warning",
      overview:
        "Ketentuan terkait masa aktif, perpanjangan, dan penghapusan data server.",
      subSections: [
        {
          number: "1",
          title: "Masa Aktif dan Perpanjangan",
          items: [
            {
              number: "1.1",
              content:
                "Pengguna bertanggung jawab untuk melakukan **perpanjangan layanan** sebelum masa aktif berakhir.",
            },
            {
              number: "1.2",
              content:
                "Layanan akan **dinonaktifkan otomatis** setelah masa aktif habis.",
            },
          ],
        },
        {
          number: "2",
          title: "Penghapusan Data",
          items: [
            {
              number: "2.1",
              content:
                "Data server akan **dihapus permanen** setelah melewati masa tenggang **3 (tiga) hari kalender** sejak tanggal kedaluwarsa.",
            },
            {
              number: "2.2",
              content:
                "RaeHost tidak bertanggung jawab atas kehilangan data akibat **keterlambatan pembayaran** atau **kelalaian pengguna**.",
            },
          ],
        },
        {
          number: "3",
          title: "Ketentuan Khusus Private Node",
          items: [
            {
              number: "3.1",
              content:
                "Layanan **Private Node** akan **langsung dihentikan (terminate)** setelah melewati masa kadaluarsa **tanpa masa tenggang**.",
            },
            {
              number: "3.2",
              content:
                "Kebijakan ini diberlakukan karena **keterbatasan waktu sewa server fisik** yang digunakan untuk Private Node.",
            },
            {
              number: "3.3",
              content:
                "Pengguna Private Node sangat **disarankan untuk melakukan backup secara rutin** dan **memperpanjang layanan sebelum tanggal kedaluwarsa** untuk menghindari kehilangan data.",
            },
          ],
        },
        {
          number: "4",
          title: "Akses Backup Setelah Masa Kedaluwarsa",
          items: [
            {
              number: "4.1",
              content:
                "Setelah layanan memasuki masa kedaluwarsa (expired), server akan berada dalam status suspend. Dalam kondisi ini, pengguna tidak memiliki akses ke data server, termasuk namun tidak terbatas pada: file server, database, dan backup.",
            },
            {
              number: "4.2",
              content:
                "Meskipun masih terdapat masa tenggang 3 (tiga) hari kalender, masa tenggang tersebut hanya diberikan untuk keperluan perpanjangan layanan, bukan untuk pengambilan data atau backup server.",
            },
            {
              number: "4.3",
              content:
                "Pengambilan backup atau data server saat masa kedaluwarsa hanya dapat dilakukan melalui permintaan khusus kepada tim RaeHost dan dikenakan biaya tambahan, sesuai dengan tingkat kesulitan dan durasi pengerjaan.",
            },
            {
              number: "4.4",
              content:
                "RaeHost berhak menolak permintaan pengambilan backup apabila data telah terhapus, sistem tidak memungkinkan, atau telah melewati masa penghapusan permanen.",
            },
            {
              number: "4.5",
              content:
                "RaeHost telah menyediakan fitur backup terjadwal (scheduled backup) melalui panel manajemen. Namun demikian, pengguna tetap bertanggung jawab untuk memastikan backup berjalan dengan baik, tersimpan dengan benar, dan melakukan backup tambahan secara mandiri apabila diperlukan sebelum masa aktif layanan berakhir.",
            },
          ],
        },
      ],
    },
    {
      id: "larangan-penggunaan",
      letter: "E",
      title: "LARANGAN PENGGUNAAN",
      icon: IconAlertHexagon,
      color: "danger",
      overview:
        "Aturan penggunaan layanan yang harus dipatuhi oleh seluruh pengguna RaeHost.",
      subSections: [
        {
          number: "1",
          title: "Aktivitas yang Dilarang",
          items: [
            {
              number: "1.1",
              content:
                "Dilarang menggunakan layanan untuk **aktivitas ilegal, penipuan, peretasan, DDoS, atau penyebaran malware**.",
            },
            {
              number: "1.2",
              content:
                "Dilarang mengunggah atau menjalankan **konten yang melanggar hukum**, termasuk namun tidak terbatas pada pornografi, SARA, perjudian, dan pelanggaran hak cipta.",
            },
            {
              number: "1.3",
              content:
                "Dilarang mengganggu performa server lain atau melakukan eksploitasi terhadap **infrastruktur RaeHost**.",
            },
          ],
        },
        {
          number: "2",
          title: "Sanksi Pelanggaran",
          items: [
            {
              number: "2.1",
              content:
                "RaeHost berhak menangguhkan atau menghapus layanan tanpa pemberitahuan sebelumnya apabila ditemukan pelanggaran terhadap kebijakan ini.",
            },
            {
              number: "2.2",
              content:
                "Layanan yang dihentikan karena pelanggaran **tidak berhak atas refund**.",
            },
          ],
        },
      ],
    },
    {
      id: "batasan-tanggung-jawab",
      letter: "F",
      title: "BATASAN TANGGUNG JAWAB",
      icon: IconAlertTriangle,
      color: "warning",
      overview:
        "Pernyataan mengenai batas tanggung jawab RaeHost terhadap layanan pengguna.",
      subSections: [
        {
          number: "1",
          title: "Limitasi Layanan",
          items: [
            {
              number: "1.1",
              content:
                "RaeHost tidak bertanggung jawab atas **kehilangan data, gangguan layanan, atau kerugian** yang diakibatkan oleh penggunaan plugin, mod, datapack, atau konfigurasi pihak ketiga.",
            },
            {
              number: "1.2",
              content:
                "RaeHost tidak menjamin performa server apabila pengguna menambahkan file, skrip, atau konfigurasi di luar standar sistem yang disediakan.",
            },
            {
              number: "1.3",
              content:
                "Pengguna sangat disarankan untuk melakukan **backup secara rutin** melalui fitur yang tersedia di panel manajemen.",
            },
          ],
        },
      ],
    },
    {
      id: "dukungan-teknis",
      letter: "G",
      title: "DUKUNGAN TEKNIS (TECHNICAL SUPPORT)",
      icon: Headset,
      color: "primary",
      overview:
        "Ketentuan mengenai bantuan teknis dan cakupan dukungan RaeHost.",
      subSections: [
        {
          number: "1",
          title: "Layanan Dukungan",
          items: [
            {
              number: "1.1",
              content:
                "RaeHost menyediakan dukungan teknis melalui **ticket system** dan **Discord resmi RaeHost**.",
            },
            {
              number: "1.2",
              content:
                "Dukungan teknis mencakup pengoperasian panel dan konfigurasi dasar server, serta panduan pemecahan masalah umum yang berkaitan dengan layanan hosting.",
            },
          ],
        },
        {
          number: "2",
          title: "Batasan Dukungan",
          items: [
            {
              number: "2.1",
              content:
                "Dukungan teknis **tidak mencakup** perbaikan atau penyesuaian terhadap **plugin, mod, world, atau file pihak ketiga**.",
            },
            {
              number: "2.2",
              content:
                "Bantuan teknisi hanya berlaku untuk **permasalahan teknis terkait hosting**, bukan isi atau konfigurasi server pengguna.",
            },
          ],
        },
      ],
    },
    {
      id: "biaya-tambahan",
      letter: "H",
      title: "BIAYA LAYANAN TAMBAHAN",
      icon: IconReceipt,
      color: "warning",
      overview:
        "Ketentuan mengenai biaya tambahan untuk layanan teknis opsional RaeHost.",
      subSections: [
        {
          number: "1",
          title: "Layanan Teknis Opsional",
          items: [
            {
              number: "1.1",
              content:
                "RaeHost dapat memberikan bantuan teknis tambahan seperti **instalasi plugin/modpack, optimasi performa server, atau pemulihan error** yang tidak disebabkan oleh sistem.",
            },
            {
              number: "1.2",
              content:
                "Beberapa layanan tambahan dapat dikenakan **biaya sesuai tingkat kesulitan dan durasi pekerjaan**. Estimasi biaya akan diinformasikan terlebih dahulu kepada pengguna sebelum tindakan dilakukan.",
            },
          ],
        },
        {
          number: "2",
          title: "Persetujuan dan Pengecualian",
          items: [
            {
              number: "2.1",
              content:
                "Layanan teknis hanya akan dilakukan setelah pengguna **menyetujui biaya yang diinformasikan**.",
            },
            {
              number: "2.2",
              content:
                "Bantuan dasar seperti **restart server, reset password panel, dan pengecekan umum** tetap diberikan secara **gratis**.",
            },
          ],
        },
      ],
    },
    {
      id: "kebijakan-privasi",
      letter: "I",
      title: "KEBIJAKAN PRIVASI DATA",
      icon: IconLock,
      color: "secondary",
      overview: "Perlindungan dan pengelolaan data pengguna layanan RaeHost.",
      subSections: [
        {
          number: "1",
          title: "Pengumpulan dan Penggunaan Data",
          items: [
            {
              number: "1.1",
              content:
                "RaeHost menghormati privasi setiap pengguna dan berkomitmen untuk melindungi data pribadi pelanggan.",
            },
            {
              number: "1.2",
              content:
                "RaeHost hanya mengumpulkan data yang diperlukan untuk keperluan **transaksi, verifikasi akun, dan dukungan teknis**.",
            },
            {
              number: "1.3",
              content:
                "Data pelanggan tidak akan dijual, dibagikan, atau diserahkan kepada pihak ketiga tanpa izin, kecuali diwajibkan oleh hukum yang berlaku.",
            },
          ],
        },
        {
          number: "2",
          title: "Keamanan Data",
          items: [
            {
              number: "2.1",
              content:
                "Backup, log aktivitas, serta data server disimpan dengan **standar keamanan server modern** dan hanya dapat diakses oleh tim resmi RaeHost.",
            },
            {
              number: "2.2",
              content:
                "Pengguna bertanggung jawab menjaga kerahasiaan kredensial akun seperti username dan password.",
            },
            {
              number: "2.3",
              content:
                "Dengan menggunakan layanan RaeHost, pengguna dianggap telah menyetujui pengumpulan dan penggunaan data sebagaimana dijelaskan dalam kebijakan ini.",
            },
          ],
        },
      ],
    },
    {
      id: "program-partnership",
      letter: "J",
      title: "PROGRAM PARTNERSHIP",
      icon: HeartHandshake,
      color: "success",
      overview: "Ketentuan kerja sama dan manfaat bagi partner RaeHost.",
      subSections: [
        {
          number: "1",
          title: "Peluang Kerja Sama",
          items: [
            {
              number: "1.1",
              content:
                "RaeHost membuka peluang kerja sama bagi **influencer, content creator, dan komunitas game server**.",
            },
          ],
        },
        {
          number: "2",
          title: "Manfaat Partner",
          items: [
            {
              number: "2.1",
              content:
                "Manfaat utama bagi partner meliputi **diskon harga khusus** untuk paket hosting tertentu.",
            },
            {
              number: "2.2",
              content:
                "Partner mendapatkan **prioritas dukungan teknis (fast support)** untuk penanganan masalah terkait hosting.",
            },
            {
              number: "2.3",
              content:
                "Bentuk kerja sama dan ketentuan tambahan akan disesuaikan berdasarkan **kesepakatan antara pihak RaeHost dan partner**.",
            },
          ],
        },
      ],
    },
    {
      id: "perubahan-ketentuan",
      letter: "K",
      title: "PERUBAHAN KETENTUAN",
      icon: IconFileText,
      color: "default",
      overview:
        "Pemberitahuan mengenai pembaruan dan perubahan Syarat & Ketentuan.",
      subSections: [
        {
          number: "1",
          title: "Hak Perubahan",
          items: [
            {
              number: "1.1",
              content:
                "RaeHost berhak memperbarui atau mengubah Syarat dan Ketentuan ini **tanpa pemberitahuan sebelumnya**.",
            },
            {
              number: "1.2",
              content:
                "Perubahan akan berlaku setelah dipublikasikan di **situs resmi RaeHost**.",
            },
            {
              number: "1.3",
              content:
                "Pengguna dianggap menyetujui perubahan apabila tetap menggunakan layanan setelah pembaruan diberlakukan.",
            },
          ],
        },
      ],
    },
    {
      id: "hukum-yurisdiksi",
      letter: "L",
      title: "HUKUM DAN YURISDIKSI INTERNASIONAL",
      icon: IconWorld,
      color: "primary",
      overview:
        "Penerapan hukum dan ketentuan bagi pelanggan dalam dan luar negeri.",
      subSections: [
        {
          number: "1",
          title: "Hukum yang Berlaku",
          items: [
            {
              number: "1.1",
              content:
                "Syarat dan Ketentuan ini tunduk pada **hukum Republik Indonesia**.",
            },
            {
              number: "1.2",
              content:
                "Sengketa yang timbul akan diselesaikan terlebih dahulu melalui **musyawarah**, dan jika tidak tercapai kesepakatan, akan diselesaikan sesuai dengan hukum yang berlaku di Indonesia.",
            },
          ],
        },
        {
          number: "2",
          title: "Cakupan Layanan Internasional",
          items: [
            {
              number: "2.1",
              content:
                "RaeHost melayani pelanggan dari berbagai negara termasuk **Indonesia, Malaysia, Singapura, dan wilayah lain** di Asia Tenggara.",
            },
            {
              number: "2.2",
              content:
                "Semua komunikasi resmi, dukungan teknis, dan perjanjian kontrak dilakukan dalam **Bahasa Indonesia atau Bahasa Inggris**.",
            },
          ],
        },
      ],
    },
  ];

  const quickLinks = [
    { title: "Beranda", href: "/", icon: IconHome },
    { title: "Kontak Support", href: "/contact", icon: IconMail },
    { title: "FAQ", href: "/faq", icon: IconInfoCircle },
  ];

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
              alt="TOS-Background"
              className="object-cover"
              quality={85}
              src="/assets/landing/stock/landinglunar.png"
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
                  <IconScale className="text-white" size={48} />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Syarat & Ketentuan
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
                Ketentuan penggunaan layanan game server hosting RaeHost yang
                wajib dipahami dan disetujui oleh setiap pengguna
              </p>
              <Chip
                className="text-white bg-white/20"
                color="warning"
                startContent={<IconClock size={16} />}
                variant="flat"
              >
                Terakhir diperbarui:{" "}
                {lastUpdated.toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
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
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <Card className="sticky top-16 backdrop-blur-sm">
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <IconFileText size={20} />
                    Daftar Isi
                  </h3>
                </CardHeader>
                <Divider />
                <CardBody className="p-0">
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <Button
                        key={section.id}
                        className="w-full justify-start h-auto p-4"
                        color={
                          selectedSection === section.id
                            ? section.color
                            : "default"
                        }
                        startContent={<section.icon size={18} />}
                        variant={
                          selectedSection === section.id ? "flat" : "light"
                        }
                        onClick={() => {
                          setSelectedSection(section.id);
                          document.getElementById(section.id)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }}
                      >
                        <span className="text-left text-xs">
                          {section.letter}. {section.title}
                        </span>
                      </Button>
                    ))}
                  </nav>

                  <Divider className="my-4" />

                  {/* Quick Links */}
                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-medium text-default-600 mb-2">
                      Link Terkait
                    </h4>
                    {quickLinks.map((link) => (
                      <Button
                        key={link.title}
                        as={Link}
                        className="w-full justify-start"
                        endContent={<IconExternalLink size={14} />}
                        href={link.href}
                        size="sm"
                        startContent={<link.icon size={16} />}
                        variant="light"
                      >
                        {link.title}
                      </Button>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-3 space-y-8"
              variants={itemVariants}
            >
              {/* Important Notice */}
              <Alert
                color="warning"
                description="Dengan menggunakan layanan RaeHost, Anda dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan yang tercantum dalam dokumen ini."
                title="Pemberitahuan Penting"
                variant="bordered"
              />

              {/* Terms Sections */}
              <Accordion
                className="px-0"
                defaultExpandedKeys={["ketentuan-layanan"]}
                selectionMode="multiple"
                variant="splitted"
              >
                {sections.map((section) => (
                  <AccordionItem
                    key={section.id}
                    aria-label={section.title}
                    className="mb-4"
                    title={
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg bg-${section.color}-100`}
                        >
                          <section.icon
                            className={`text-${section.color}-600`}
                            size={20}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {section.letter}. {section.title}
                          </h3>
                          <p className="text-sm text-default-600">
                            {section.overview}
                          </p>
                        </div>
                      </div>
                    }
                  >
                    <div className="space-y-6 pb-4" id={section.id}>
                      {section.subSections.map((subSection, subIndex) => (
                        <div key={subIndex} className="space-y-3">
                          {/* Sub Section Title */}
                          <h4 className="font-semibold text-base text-default-800">
                            {subSection.number}. {subSection.title}
                          </h4>

                          {/* Sub Sub Items */}
                          <div className="space-y-3 ml-4">
                            {subSection.items.map((item, itemIndex) => (
                              <motion.div
                                key={itemIndex}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                transition={{ delay: itemIndex * 0.1 }}
                              >
                                <span className="font-medium text-default-700 min-w-[2.5rem]">
                                  {item.number}
                                </span>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: item.content.replace(
                                      /\*\*(.*?)\*\*/g,
                                      '<strong class="text-primary">$1</strong>',
                                    ),
                                  }}
                                  className="leading-relaxed text-default-700"
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Contact Information */}
              <Card className="backdrop-blur-sm border-2 border-primary-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                      <IconMail
                        className="text-primary-600 dark:text-primary-400"
                        size={20}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Butuh Bantuan?</h3>
                      <p className="text-sm text-default-600">
                        Tim support kami siap membantu Anda
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-default-800">
                        Email Support
                      </h4>
                      <p className="text-default-600">support@raehost.com</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-default-800">
                        Jam Operasional
                      </h4>
                      <p className="text-default-600">
                        24/7 (Respon dalam 1-24 jam)
                      </p>
                    </div>
                  </div>
                  <Divider className="my-4" />
                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      startContent={<IconMail size={18} />}
                      variant="flat"
                      onPress={onOpen}
                    >
                      Hubungi Support
                    </Button>
                    <Button
                      as={Link}
                      href="/faq"
                      startContent={<IconFileText size={18} />}
                      variant="bordered"
                    >
                      Lihat FAQ
                    </Button>
                  </div>
                </CardBody>
              </Card>

              {/* Legal Footer */}
              <Card className="dark:bg-slate-800/30">
                <CardBody>
                  <div className="text-center space-y-2">
                    <p className="text-sm text-default-600">
                      © {new Date().getFullYear()} RaeHost. Seluruh hak cipta
                      dilindungi undang-undang.
                    </p>
                    <p className="text-xs text-default-500">
                      Dokumen ini dapat berubah sewaktu-waktu tanpa
                      pemberitahuan sebelumnya. Versi terbaru selalu tersedia di
                      website resmi RaeHost.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Modal */}
          <Modal
            isOpen={isOpen}
            scrollBehavior="inside"
            size="2xl"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold">Hubungi Tim Support</h3>
                    <p className="text-sm text-default-600">
                      Kami siap membantu menyelesaikan masalah Anda
                    </p>
                  </ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
                      <Alert
                        color="primary"
                        description="Untuk pertanyaan terkait syarat dan ketentuan atau masalah teknis lainnya, silakan hubungi kami melalui:"
                        title="Informasi Kontak"
                        variant="flat"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border border-default-200">
                          <CardBody className="text-center p-6">
                            <IconMail
                              className="text-primary-500 mx-auto mb-3"
                              size={32}
                            />
                            <h4 className="font-semibold mb-2">
                              Email Support
                            </h4>
                            <p className="text-default-600 mb-3">
                              support@raehost.com
                            </p>
                            <Chip color="success" size="sm" variant="flat">
                              Respon 1-24 jam
                            </Chip>
                          </CardBody>
                        </Card>

                        <Card className="border border-default-200">
                          <CardBody className="text-center p-6">
                            <IconFileText
                              className="text-secondary-500 mx-auto mb-3"
                              size={32}
                            />
                            <h4 className="font-semibold mb-2">
                              Ticket System
                            </h4>
                            <p className="text-default-600 mb-3">
                              Dashboard → Tickets
                            </p>
                            <Chip color="secondary" size="sm" variant="flat">
                              Tracking mudah
                            </Chip>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Tutup
                    </Button>
                    <Button
                      as={Link}
                      color="primary"
                      href="/contact"
                      onPress={onClose}
                    >
                      Buka Halaman Kontak
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
}
