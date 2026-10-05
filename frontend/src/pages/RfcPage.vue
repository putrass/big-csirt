<template>
  <div class="min-h-screen bg-white font-geist text-[#111827]">
    <!-- Hero Banner -->
    <section class="bg-gradient-to-r from-[#0a1628] to-[#1a3a6b] text-white py-16 px-4 md:px-8 xl:px-12">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span class="text-blue-300 text-xs font-bold uppercase tracking-widest font-geist">STANDAR DOKUMEN CSIRT</span>
          <h1 class="font-grotesk font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mt-2 leading-tight">
            RFC 2350 — BIG-CSIRT
          </h1>
          <p class="font-geist text-blue-100 text-base sm:text-lg max-w-[680px] mt-3 opacity-90 leading-relaxed">
            Dokumen resmi yang mendeskripsikan struktur, layanan, kebijakan operasional, dan parameter keamanan tim CSIRT Badan Informasi Geospasial sesuai standar IETF RFC 2350.
          </p>
        </div>
        <div class="w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
          <img :src="getAssetUrl('assets/logo-csirt-D9xGTNl_.png')" alt="BIG-CSIRT Logo" class="w-full h-full object-contain filter drop-shadow-lg" />
        </div>
      </div>
    </section>

    <!-- Konten Dokumen RFC 2350 Lengkap -->
    <div class="max-w-[1000px] mx-auto px-4 md:px-8 py-16">
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-10 md:p-12 text-[#374151]">
        <article class="prose max-w-none text-base leading-relaxed">
          <div class="text-center pb-8 border-b border-gray-200 mb-8">
            <span class="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Versi 2.0 (Agustus 2026)
            </span>
            <h2 class="font-grotesk font-bold text-2xl sm:text-3xl text-[#0a1628] mt-4 mb-2">
              RFC 2350: Deskripsi BIG-CSIRT
            </h2>
            <p class="text-sm text-gray-500 m-0">Ditandatangani secara digital menggunakan Sertifikat Digital BSrE</p>
          </div>

          <h3 class="text-xl font-bold text-[#0a1628] mt-8 mb-4 border-l-4 border-blue-600 pl-3">
            1. Informasi Dokumen
          </h3>
          <p><strong>1.1 Tanggal Update Terakhir:</strong> Versi 2.0, diterbitkan pada Agustus 2026.</p>
          <p><strong>1.2 Daftar Distribusi untuk Pemberitahuan:</strong> Tidak ada daftar distribusi untuk pemberitahuan pembaruan dokumen.</p>
          <p><strong>1.3 Lokasi Dokumen:</strong> Dokumen deskripsi ini tersedia pada situs resmi: <a href="https://www.big.go.id" target="_blank" class="text-blue-600 hover:underline">https://www.big.go.id</a></p>
          <p><strong>1.4 Keaslian Dokumen:</strong> Dokumen ini ditandatangani digital menggunakan sertifikat digital BSrE oleh Ketua BIG-CSIRT.</p>

          <h3 class="text-xl font-bold text-[#0a1628] mt-10 mb-4 border-l-4 border-blue-600 pl-3">
            2. Informasi Data &amp; Kontak Resmi
          </h3>
          <ul class="list-none p-0 space-y-3">
            <li><strong>2.1 Nama Tim:</strong> BIG-CSIRT (Computer Security Incident Response Team Badan Informasi Geospasial)</li>
            <li><strong>2.2 Alamat Kantor:</strong> Jl. Raya Jakarta - Bogor KM. 46, Cibinong, Bogor, Jawa Barat 16911</li>
            <li><strong>2.3 Zona Waktu:</strong> Jakarta (WIB / GMT+0700)</li>
            <li><strong>2.4 Telepon:</strong> +62-21-875-7402 ext. 3315</li>
            <li><strong>2.5 Helpdesk WhatsApp:</strong> +62-812-9439-1960 (Selama jam kerja)</li>
            <li><strong>2.6 Email Resmi:</strong> <a href="mailto:csirt@big.go.id" class="text-blue-600 font-semibold hover:underline">csirt@big.go.id</a></li>
          </ul>

          <h4 class="font-bold text-lg text-gray-900 mt-6 mb-2">2.7 Kunci Publik PGP (Pretty Good Privacy)</h4>
          <p class="text-sm text-gray-600 mb-2">
            Gunakan PGP Key resmi berikut untuk mengirimkan komunikasi yang memuat informasi sensitif atau rahasia:
          </p>
          <pre class="bg-gray-50 p-4 rounded-xl text-xs overflow-x-auto border border-gray-200 font-mono text-gray-800 leading-tight">-----BEGIN PGP PUBLIC KEY BLOCK-----

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
nMcD6GuQFH2VXDXp
=sn3/
-----END PGP PUBLIC KEY BLOCK-----</pre>

          <h3 class="text-xl font-bold text-[#0a1628] mt-10 mb-4 border-l-4 border-blue-600 pl-3">
            3. Kebijakan Operasional &amp; Layanan
          </h3>
          <p>
            <strong>Layanan Reaktif:</strong> Triase insiden, koordinasi penanganan insiden siber, analisis kerentanan (vulnerability handling), serta mitigasi dan artifact handling.
          </p>
          <p>
            <strong>Layanan Proaktif:</strong> Pelaksanaan audit keamanan (security assessment), simulasi serangan siber (cyber security drill test), sosialisasi keamanan informasi, dan publikasi advisory teknis.
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAssetUrl } from '@/utils/assets';
</script>
