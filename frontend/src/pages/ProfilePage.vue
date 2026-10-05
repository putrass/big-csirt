<template>
  <div class="min-h-screen bg-white font-geist text-[#111827]">
    <!-- Hero Banner -->
    <section class="bg-gradient-to-r from-[#0a1628] to-[#1a3a6b] text-white py-16 px-4 md:px-8 xl:px-12">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span class="text-blue-300 text-xs font-bold uppercase tracking-widest font-geist">PROFIL RESMI</span>
          <h1 class="font-grotesk font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mt-2 leading-tight">
            Profil Lengkap BIG-CSIRT
          </h1>
          <p class="font-geist text-blue-100 text-base sm:text-lg max-w-[680px] mt-3 opacity-90 leading-relaxed">
            Computer Security Incident Response Team Badan Informasi Geospasial
          </p>
        </div>
        <div class="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
          <img :src="getAssetUrl('assets/logo-csirt-D9xGTNl_.png')" alt="BIG-CSIRT Logo" class="w-full h-full object-contain filter drop-shadow-lg" />
        </div>
      </div>
    </section>

    <!-- Konten Utama Profil -->
    <div class="max-w-[1200px] mx-auto px-4 md:px-8 py-16 flex flex-col gap-12">
      <!-- Tentang Kami -->
      <section class="flex flex-col gap-4">
        <h2 class="font-grotesk font-bold text-2xl sm:text-3xl text-[#0a1628] border-b-2 border-blue-600 pb-2 inline-block">
          Tentang BIG-CSIRT
        </h2>
        <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
          BIG-CSIRT adalah tim tanggap darurat insiden keamanan siber yang dibentuk di lingkungan Badan Informasi Geospasial (BIG). Tim ini bertanggung jawab langsung dalam melakukan deteksi dini, mitigasi, analisis investigasi, serta penanggulangan insiden keamanan siber pada infrastruktur teknologi informasi dan sistem informasi geospasial nasional.
        </p>
        <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
          Dalam menjalankan tugasnya, BIG-CSIRT berkoordinasi secara aktif dengan Badan Siber dan Sandi Negara (BSSN), CSIRT Sektor Pemerintah, serta komunitas keamanan siber di tingkat nasional dan internasional.
        </p>
      </section>

      <!-- Visi & Misi -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-[#f8fafc] border border-gray-200 p-8 rounded-2xl shadow-sm flex flex-col gap-3">
          <div class="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-2">
            V
          </div>
          <h3 class="font-grotesk font-bold text-xl text-[#0a1628]">Visi</h3>
          <p class="text-gray-600 leading-relaxed text-base">
            Terwujudnya pengelolaan keamanan informasi yang handal, tangguh, dan efektif di lingkungan Badan Informasi Geospasial sehingga dapat menjamin ketersediaan (availability), keutuhan (integrity), dan kerahasiaan (confidentiality) Aset Informasi Geospasial Nasional.
          </p>
        </div>

        <div class="bg-[#f8fafc] border border-gray-200 p-8 rounded-2xl shadow-sm flex flex-col gap-3">
          <div class="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-2">
            M
          </div>
          <h3 class="font-grotesk font-bold text-xl text-[#0a1628]">Misi</h3>
          <ul class="text-gray-600 leading-relaxed text-base list-disc pl-5 space-y-2">
            <li>Membangun koordinasi, pencegahan, dan penanganan insiden keamanan siber yang komprehensif.</li>
            <li>Mengamankan infrastruktur kritis dan data geospasial nasional dari ancaman siber.</li>
            <li>Meningkatkan kesadaran dan kapabilitas SDM di bidang keamanan siber.</li>
            <li>Memperkuat kolaborasi dengan BSSN dan National CSIRT.</li>
          </ul>
        </div>
      </section>

      <!-- Struktur Organisasi Tim -->
      <section class="flex flex-col gap-6">
        <h2 class="font-grotesk font-bold text-2xl sm:text-3xl text-[#0a1628] border-b-2 border-blue-600 pb-2 inline-block">
          Struktur Organisasi Tim
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col gap-3">
            <h4 class="font-grotesk font-bold text-lg text-blue-700">1. Unit Monitoring &amp; Aksi</h4>
            <p class="text-sm text-gray-600">Bertanggung jawab dalam pemantauan lalu lintas siber, deteksi anomali, penanganan tanggap darurat insiden, serta pelaksanaan security drill test &amp; uji penetrasi (pentest).</p>
          </div>
          <div class="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col gap-3">
            <h4 class="font-grotesk font-bold text-lg text-blue-700">2. Unit Penanganan Kerentanan</h4>
            <p class="text-sm text-gray-600">Bertanggung jawab meneliti, memverifikasi laporan kerentanan (vulnerability report), menganalisis dampak CVE, dan memberikan rekomendasi patch / mitigasi.</p>
          </div>
          <div class="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col gap-3">
            <h4 class="font-grotesk font-bold text-lg text-blue-700">3. Unit Pembinaan &amp; Publikasi</h4>
            <p class="text-sm text-gray-600">Bertanggung jawab dalam penyusunan advisory keamanan, materi edukasi kesadaran siber, infografis publik, serta workshop pelatihan keamanan siber berkala.</p>
          </div>
        </div>
      </section>

      <!-- Layanan Utama -->
      <section class="flex flex-col gap-6">
        <h2 class="font-grotesk font-bold text-2xl sm:text-3xl text-[#0a1628] border-b-2 border-blue-600 pb-2 inline-block">
          Layanan BIG-CSIRT
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="flex gap-4 items-start p-5 rounded-xl border border-gray-100 bg-[#f8fafc]">
            <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-bell text-lg"></i>
            </div>
            <div>
              <h4 class="font-grotesk font-bold text-base text-gray-900">Pemberian Peringatan Dini (Alerts &amp; Warnings)</h4>
              <p class="text-sm text-gray-600 mt-1">Diseminasi informasi ancaman aktif dan kerentanan kritis yang berpotensi mengeksploitasi sistem.</p>
            </div>
          </div>

          <div class="flex gap-4 items-start p-5 rounded-xl border border-gray-100 bg-[#f8fafc]">
            <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-shield-virus text-lg"></i>
            </div>
            <div>
              <h4 class="font-grotesk font-bold text-base text-gray-900">Penanganan Insiden Siber (Incident Handling)</h4>
              <p class="text-sm text-gray-600 mt-1">Triase, koordinasi, isolasi, pemulihan, dan analisis forensik digital terhadap insiden siber.</p>
            </div>
          </div>

          <div class="flex gap-4 items-start p-5 rounded-xl border border-gray-100 bg-[#f8fafc]">
            <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-search-dollar text-lg"></i>
            </div>
            <div>
              <h4 class="font-grotesk font-bold text-base text-gray-900">Penanganan Kerentanan (Vulnerability Handling)</h4>
              <p class="text-sm text-gray-600 mt-1">Asesmen keamanan aplikasi dan infrastruktur, verifikasi bug bounty, dan koordinasi remediasi.</p>
            </div>
          </div>

          <div class="flex gap-4 items-start p-5 rounded-xl border border-gray-100 bg-[#f8fafc]">
            <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-chalkboard-teacher text-lg"></i>
            </div>
            <div>
              <h4 class="font-grotesk font-bold text-base text-gray-900">Edukasi &amp; Pelatihan (Cybersecurity Awareness)</h4>
              <p class="text-sm text-gray-600 mt-1">Simulasi phishing, bimbingan teknis keamanan informasi, dan penyebaran konten edukasi.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Informasi Kontak Resmi -->
      <section class="bg-[#0a1628] text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex flex-col gap-3">
          <h3 class="font-grotesk font-bold text-2xl text-white">Butuh Bantuan Penanganan Insiden?</h3>
          <p class="text-gray-300 text-sm max-w-xl leading-relaxed">
            Laporkan segera setiap indikasi insiden siber ke kontak resmi BIG-CSIRT. Tim kami siap merespons laporan Anda.
          </p>
          <div class="text-xs text-blue-300 mt-2 space-y-1">
            <div><i class="fas fa-envelope mr-2"></i> csirt@big.go.id</div>
            <div><i class="fab fa-whatsapp mr-2"></i> +62-812-9439-1960 (Helpdesk WA)</div>
            <div><i class="fas fa-map-marker-alt mr-2"></i> Jl. Raya Jakarta - Bogor KM. 46, Cibinong 16911</div>
          </div>
        </div>
        <div>
          <router-link to="/hubungi-kami" class="bg-[#1b4fd8] hover:bg-[#153eb2] text-white font-geist font-semibold px-6 py-3 rounded-xl transition-all shadow-lg text-sm inline-block no-underline">
            Lapor Insiden Sekarang →
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAssetUrl } from '@/utils/assets';
</script>
