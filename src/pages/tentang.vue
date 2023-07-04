<template>
    <navbar />
    <div class="flex flex-col lg:mx-[12rem]">
      <p class="font-bold py-4">Latar Belakang</p>
      <p class="text-justify"> Investasi saham merupakan salah satu cara untuk menambah kekayaan, namun juga memiliki risiko yang tinggi karena harga saham dapat naik atau turun secara tajam tergantung pada kondisi pasar dan kondisi perusahaan. Sebelum memutuskan untuk berinvestasi dalam saham, sebaiknya pertimbangkan dengan cermat risiko dan tujuan investasi.</p>
      <p  class="text-justify">
        Pergerakan saham ini dapat memberikan petunjuk tentang arah pergerakan harga saham, tidak ada jaminan bahwa harga tersebut akan terjadi dengan pasti. Oleh karena itu, perlu menganalisis pergerakan saham yang dapat dilakukan bersama dengan analisis fundamental dan teknikal yang lainnya. Teknologi terkini, khususnya Deep Learning, telah memungkinkan pengembangan model prediksi harga saham yang lebih akurat(Anjayagni, Puspita, & Lestari:2020 ).
      </p>
      <p  class="text-justify">
        Long Short-Term Memory (LSTM) merupakan salah satu metode deep learning yang banyak digunakan untuk memprediksi harga saham karena kemampuannya dalam menangani masalah pemrosesan pada data sequentional (berurutan). Metode ini dapat mempelajari pola-pola yang terjadi dalam data historis harga saham dan menggunakannya untuk memprediksi harga saham di masa yang akan datang menggunakan model yang telah terlatih(Nuraini, Maydia: 2022).
        Selain itu, untuk mempermudah investor dalam membuat keputusan investasi, penggunaan metode LSTM pada penelitian ini menggunakan basis website agar pengguna lebih nyaman untuk mengakses dimanapun dan tidak banyak memakan penyimpanan maupun memori pada perangkat lunak pengguna.
      </p>
      <p  class="text-justify">
        Dari latar belakang ini, penulis memberikan penjelasan mengenai aspek alternatif pengambilan keputusan investasi bagi investor dan pengembangan teknologi dalam bidang deep learning mengenai keuntungan memanfaatkan metode LSTM  untuk memprediksi saham. Dengan demikian, latar belakang yang lengkap dapat menjadi dasar yang kuat untuk mengembangkan topik penelitian ini.
      </p>
      
    </div>
  </template>
  <script>
  import { ref } from "vue";
  import navbar from "../components/navbarComponent.vue";
  
  export default {
    components: {
      navbar,
    },
    setup() {
      return {};
    },
  };
  </script>
  