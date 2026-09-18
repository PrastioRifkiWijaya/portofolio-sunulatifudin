export type Family100Answer = {
  id: string;
  answer: string;
  points: number;
};

export type Family100Question = {
  id: string;
  question: string;
  category: string;
  answers: Family100Answer[];
};

export const family100DummyQuestions: Family100Question[] = [
  {
    id: "q1",
    category: "PANCASILA",
    question: "Siapa tokoh yang menyampaikan gagasan dasar negara pada sidang BPUPKI?",
    answers: [
      { id: "a1", answer: "Soekarno", points: 100 },
      { id: "a2", answer: "Mohammad Yamin", points: 80 },
      { id: "a3", answer: "Soepomo", points: 60 },
      { id: "a4", answer: "Radjiman Wedyodiningrat", points: 20 },
    ],
  },
  {
    id: "q2",
    category: "UUD 1945",
    question: "Sebutkan lembaga-lembaga negara dalam sistem ketatanegaraan Indonesia!",
    answers: [
      { id: "b1", answer: "DPR", points: 85 },
      { id: "b2", answer: "MPR", points: 75 },
      { id: "b3", answer: "Presiden", points: 60 },
      { id: "b4", answer: "Mahkamah Agung", points: 40 },
      { id: "b5", answer: "Mahkamah Konstitusi", points: 20 },
    ],
  },
  {
    id: "q3",
    category: "HAK & KEWAJIBAN",
    question: "Apa saja hak warga negara yang diatur dalam UUD 1945?",
    answers: [
      { id: "c1", answer: "Pendidikan", points: 90 },
      { id: "c2", answer: "Pekerjaan", points: 70 },
      { id: "c3", answer: "Agama", points: 55 },
      { id: "c4", answer: "Hukum", points: 40 },
      { id: "c5", answer: "Berserikat", points: 20 },
    ],
  },
  {
    id: "q4",
    category: "SEJARAH",
    question: "Sebutkan panitia yang terlibat dalam perumusan dasar negara!",
    answers: [
      { id: "d1", answer: "Panitia Sembilan", points: 88 },
      { id: "d2", answer: "BPUPKI", points: 72 },
      { id: "d3", answer: "PPKI", points: 54 },
    ],
  },
  {
    id: "q5",
    category: "BHINNEKA TUNGGAL IKA",
    question: "Apa saja keberagaman yang ada di Indonesia?",
    answers: [
      { id: "e1", answer: "Suku", points: 95 },
      { id: "e2", answer: "Agama", points: 80 },
      { id: "e3", answer: "Bahasa", points: 65 },
      { id: "e4", answer: "Budaya", points: 50 },
      { id: "e5", answer: "Adat Istiadat", points: 30 },
    ],
  },
  {
    id: "q6",
    category: "WAWASAN NUSANTARA",
    question: "Sebutkan pulau-pulau besar yang ada di Indonesia!",
    answers: [
      { id: "f1", answer: "Kalimantan", points: 90 },
      { id: "f2", answer: "Sumatera", points: 85 },
      { id: "f3", answer: "Papua", points: 75 },
      { id: "f4", answer: "Sulawesi", points: 60 },
      { id: "f5", answer: "Jawa", points: 50 },
    ],
  },
  {
    id: "q7",
    category: "IDEOLOGI NEGARA",
    question: "Sila keberapakah yang berlambangkan benda berikut ini dalam Garuda Pancasila?",
    answers: [
      { id: "g1", answer: "Bintang", points: 80 },
      { id: "g2", answer: "Rantai", points: 70 },
      { id: "g3", answer: "Pohon Beringin", points: 60 },
      { id: "g4", answer: "Kepala Banteng", points: 50 },
      { id: "g5", answer: "Padi dan Kapas", points: 40 },
    ],
  },
  {
    id: "q8",
    category: "NORMA & HUKUM",
    question: "Sebutkan macam-macam norma yang berlaku di masyarakat!",
    answers: [
      { id: "h1", answer: "Norma Agama", points: 95 },
      { id: "h2", answer: "Norma Kesopanan", points: 85 },
      { id: "h3", answer: "Norma Kesusilaan", points: 75 },
      { id: "h4", answer: "Norma Hukum", points: 60 },
    ],
  },
  {
    id: "q9",
    category: "DEMOKRASI",
    question: "Apa saja pilar atau asas pemilu di Indonesia?",
    answers: [
      { id: "i1", answer: "Langsung", points: 90 },
      { id: "i2", answer: "Umum", points: 80 },
      { id: "i3", answer: "Bebas", points: 70 },
      { id: "i4", answer: "Rahasia", points: 60 },
      { id: "i5", answer: "Jujur", points: 50 },
      { id: "i6", answer: "Adil", points: 40 },
    ],
  },
  {
    id: "q10",
    category: "KEMERDEKAAN",
    question: "Siapa saja tokoh pahlawan proklamasi kemerdekaan Indonesia?",
    answers: [
      { id: "j1", answer: "Soekarno", points: 95 },
      { id: "j2", answer: "Mohammad Hatta", points: 90 },
      { id: "j3", answer: "Sayuti Melik", points: 75 },
      { id: "j4", answer: "Ahmad Soebardjo", points: 60 },
      { id: "j5", answer: "Sukarni", points: 50 },
    ],
  },
];
