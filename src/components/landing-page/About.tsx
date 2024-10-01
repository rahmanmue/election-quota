import law from "@/assets/Lawyer-amico.svg";
const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="py-12">
        <div className="px-6 flex items-center flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={law}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Election Quota
              </h2>
              <p className="md:text-xl text-sm text-muted-foreground mt-4 text-justify">
                Election Quota adalah web untuk menghitung perolehan kursi
                partai politik menggunakan metode Sainte Lague yang merupakan
                metode untuk menentukan perolehan kursi partai politik di DPR
                atau DPRD. Penerapan metode ini didasarkan pada perolehan suara
                terbanyak partai politik dari hasil pembagian yang diurutkan
                sesuai dengan jumlah ketersediaan kursi di setiap dapil. Sainte
                Lague menggunakan bilangan pembagi suara berangka ganjil (1, 3,
                5, 7, 9 dan seterusnya) untuk mendapatkan kursi. Dasar hukum
                penerapan metode ini adalah UU nomor 7 tahun 2017 pasal 415 ayat
                2
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
