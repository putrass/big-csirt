<template>
  <q-page>
    <!-- Hero -->
    <div style="background:#0a1628;padding:4rem 0 2.5rem">
      <div class="container q-mx-auto q-px-lg" style="max-width:1200px">
        <div class="text-caption text-weight-bold q-mb-sm" style="color:#60a5fa;letter-spacing:2px;text-transform:uppercase">Kontak</div>
        <h1 class="text-white text-h3 text-weight-bold q-my-none">Hubungi Kami</h1>
        <p class="text-grey-4 q-mt-sm q-mb-none">Kami siap membantu Anda</p>
      </div>
    </div>

    <div class="container q-mx-auto q-px-lg q-py-xl" style="max-width:1200px">
      <div class="row q-col-gutter-xl">

        <!-- Form -->
        <div class="col-12 col-md-7">
          <div class="text-h6 text-weight-bold q-mb-lg">Kirim Pesan</div>
          <q-card flat bordered>
            <q-card-section>
              <q-form @submit="sendMsg" class="q-col-gutter-md row">
                <div class="col-12 col-sm-6">
                  <q-input v-model="form.name" label="Nama Lengkap *" filled dense
                    :rules="[v => !!v || 'Wajib diisi']" />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input v-model="form.email" type="email" label="Email *" filled dense
                    :rules="[v => !!v || 'Wajib diisi']" />
                </div>
                <div class="col-12">
                  <q-input v-model="form.subject" label="Subjek" filled dense />
                </div>
                <div class="col-12">
                  <q-input v-model="form.message" label="Pesan *" filled type="textarea" :rows="6"
                    :rules="[v => !!v || 'Wajib diisi']" />
                </div>
                <div class="col-12">
                  <q-btn type="submit" unelevated :loading="sending" label="Kirim Pesan" icon="send"
                    color="primary" no-caps />
                </div>
              </q-form>
            </q-card-section>
          </q-card>

          <!-- Success message -->
          <q-banner v-if="sent" class="q-mt-lg bg-positive text-white rounded-borders" inline-actions>
            <template #avatar><q-icon name="check_circle" /></template>
            Pesan Anda berhasil terkirim! Tim kami akan menghubungi Anda dalam 3×24 jam kerja.
          </q-banner>
        </div>

        <!-- Contact info sidebar -->
        <div class="col-12 col-md-5">
          <div class="text-h6 text-weight-bold q-mb-lg">Informasi Kontak</div>

          <div class="contact-info-item" v-for="info in contactInfo" :key="info.label">
            <q-icon :name="info.icon" size="24px" color="amber-8" class="q-mr-md" />
            <div>
              <div class="text-caption text-grey-6">{{ info.label }}</div>
              <div class="text-body2 text-weight-medium">{{ info.value }}</div>
            </div>
          </div>

          <!-- Sosial media -->
          <div class="q-mt-xl">
            <div class="text-caption text-grey-6 q-mb-md text-weight-bold">IKUTI KAMI</div>
            <div class="row q-gutter-sm">
              <a v-for="s in socials" :key="s.url" :href="s.url" target="_blank"
                class="social-btn" :style="`background:${s.color}22;border:1px solid ${s.color}44`">
                <i :class="s.icon" :style="`color:${s.color}`"></i>
              </a>
            </div>
          </div>

          <!-- Map -->
          <div class="q-mt-xl">
            <div class="text-caption text-grey-6 q-mb-sm text-weight-bold">LOKASI KAMI</div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.421!2d106.8271!3d-6.1753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f414b5a13eaf%3A0x3aef1e4b75d2c7a0!2sJl.+Medan+Merdeka+Barat+No.9%2C+Jakarta!5e0!3m2!1sid!2sid!4v1"
              width="100%" height="200" style="border:0;border-radius:8px" allowfullscreen loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { sendContact } from '@/services/api';

const $q = useQuasar();
const sending = ref(false);
const sent = ref(false);
const form = ref({ name: '', email: '', subject: '', message: '' });

const contactInfo = [
  { icon: 'place',    label: 'Alamat',  value: 'Jl. Medan Merdeka Barat No.9, Jakarta Pusat, DKI Jakarta 10110' },
  { icon: 'email',    label: 'Email',   value: 'csirt@big.go.id' },
  { icon: 'phone',    label: 'Telepon', value: '(021) 3860-666' },
  { icon: 'schedule', label: 'Jam Operasional', value: 'Senin – Jumat, 08.00 – 17.00 WIB' },
];
const socials = [
  { icon: 'fab fa-youtube',   url: 'https://www.youtube.com/@KemkomdigiTV', color: '#ff0000' },
  { icon: 'fab fa-instagram', url: 'https://www.instagram.com/kemkomdigi/', color: '#e1306c' },
  { icon: 'fab fa-facebook',  url: 'https://www.facebook.com/kemenkomdigi/', color: '#1877f2' },
  { icon: 'fab fa-x-twitter', url: 'https://x.com/kemkomdigi/', color: '#000' },
];

async function sendMsg() {
  sending.value = true;
  try {
    await sendContact(form.value);
    sent.value = true;
    form.value = { name: '', email: '', subject: '', message: '' };
    $q.notify({ type: 'positive', message: 'Pesan berhasil terkirim!' });
  } catch {
    $q.notify({ type: 'negative', message: 'Gagal mengirim pesan. Coba lagi.' });
  }
  sending.value = false;
}
</script>

<style scoped>
.contact-info-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.1rem;
  transition: transform .2s;
}
.social-btn:hover { transform: scale(1.15); }
</style>
