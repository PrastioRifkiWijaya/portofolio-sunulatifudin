import { LearningStation } from "@/types/ular-tangga";

export const learningStations: LearningStation[] = [
  {
    id: 1,
    cell: 20,
    title: "Makna Kedudukan Pancasila",
    topic: "Pancasila sebagai Dasar Negara",
    videoId: "O1x06-F8Kow", // Contoh placeholder edukatif PPKn / Garuda
    scenario: "Pancasila tidak hanya sekadar simbol, tetapi berfungsi sebagai pandangan hidup dan dasar negara dalam mengatur penyelenggaraan pemerintahan.",
    reflectionQuestion: "Setelah menonton video, kesimpulan yang paling tepat mengenai fungsi Pancasila sebagai pandangan hidup bangsa adalah...",
    options: [
      "Pancasila hanya dihafalkan saat upacara bendera hari Senin",
      "Pancasila menjadi petunjuk arah dalam kehidupan sehari-hari masyarakat Indonesia",
      "Pancasila digunakan sebagai alat untuk menghukum pelanggar hukum",
      "Pancasila dapat diubah sesuai dengan kehendak pemimpin yang sedang menjabat"
    ],
    correctAnswer: 1,
    explanation: "Sebagai pandangan hidup bangsa (Way of Life), Pancasila adalah pedoman moral dan etika perilaku sehari-hari masyarakat Indonesia."
  },
  {
    id: 2,
    cell: 40,
    title: "Sistem Hukum di Indonesia",
    topic: "Negara Hukum",
    videoId: "C0DPdy98e4c", 
    scenario: "Setiap warga negara memiliki kedudukan yang sama di dalam hukum, tanpa pengecualian atau perlakuan khusus.",
    reflectionQuestion: "Berdasarkan tayangan tersebut, apa tujuan utama penegakan hukum dalam suatu negara yang demokratis?",
    options: [
      "Membatasi kebebasan warga negara sepenuhnya",
      "Melindungi pihak mayoritas dari pihak minoritas",
      "Menciptakan kepastian, ketertiban, dan keadilan dalam masyarakat",
      "Memberikan kekuasaan absolut pada pihak kepolisian"
    ],
    correctAnswer: 2,
    explanation: "Tujuan utama hukum adalah menciptakan ketertiban umum (order) sekaligus menjamin keadilan (justice) dan kepastian (certainty)."
  },
  {
    id: 3,
    cell: 60,
    title: "Harmoni Hak dan Kewajiban",
    topic: "Hak Asasi Manusia",
    videoId: "T-a4_3n9B2o", 
    scenario: "Hak Asasi Manusia bukan berarti kebebasan tanpa batas, melainkan dibatasi oleh hak orang lain dan aturan perundangan.",
    reflectionQuestion: "Apa yang akan terjadi jika warga negara hanya menuntut haknya tanpa melaksanakan kewajibannya?",
    options: [
      "Negara akan semakin cepat maju karena warganya kritis",
      "Akan timbul kekacauan sosial dan ketidakseimbangan dalam kehidupan bernegara",
      "Pemerintah akan lebih mudah mengatur rakyat",
      "Tidak ada dampak yang berarti bagi kehidupan berbangsa"
    ],
    correctAnswer: 1,
    explanation: "Pelaksanaan hak yang tidak diiringi dengan pemenuhan kewajiban akan menciptakan ketidakadilan dan merugikan hak orang lain."
  },
  {
    id: 4,
    cell: 80,
    title: "Ancaman Disintegrasi & Solusinya",
    topic: "Integrasi Nasional",
    videoId: "y4vP2MhV4B8", 
    scenario: "Perbedaan SARA sering kali dimanfaatkan oleh oknum tidak bertanggung jawab untuk memicu konflik horizontal di masyarakat.",
    reflectionQuestion: "Tindakan preventif paling efektif untuk mencegah konflik berbasis SARA di lingkungan sekolah adalah...",
    options: [
      "Mengelompokkan siswa berdasarkan asal daerahnya saja",
      "Membangun dialog lintas agama dan suku secara rutin dan terbuka",
      "Melarang siswa membicarakan tentang budaya dan agamanya sama sekali",
      "Memberikan sanksi fisik bagi siapapun yang berselisih paham"
    ],
    correctAnswer: 1,
    explanation: "Dialog yang terbuka akan menumbuhkan rasa saling mengerti (mutual understanding) dan mengikis prasangka (prejudice) antarkelompok."
  }
];
