import { defineMessages } from "../define-messages.ts";
import type { Messages } from "./en.ts";

export const idMessages: Messages = defineMessages({
  auth: {
    common: {
      cancel: "Batal",
      continue: "Lanjutkan",
      email: "Email",
      emailPlaceholder: "nama@perusahaan.com",
      logIn: "Masuk",
      loggingIn: "Memproses masuk...",
      or: "atau",
      password: "Kata sandi",
      passwordHelper: "Minimal 15 karakter",
      sending: "Mengirim...",
      somethingWrong: "Terjadi kesalahan. Silakan coba lagi.",
    },
    forgotPassword: {
      action: "Kirim tautan pengaturan ulang",
      description:
        "Masukkan alamat email yang terhubung dengan akun Anda, lalu kami akan mengirimkan tautan pengaturan ulang.",
      errors: {
        email: "Masukkan alamat email yang valid",
        failed:
          "Tautan pengaturan ulang tidak dapat dikirim. Silakan coba lagi.",
      },
      success: "Periksa email Anda untuk tautan pengaturan ulang.",
      title: "Atur ulang kata sandi Anda",
    },
    login: {
      eyebrow: "Masuk",
      title: "Selamat datang kembali",
      errors: {
        email: "Masukkan alamat email yang valid",
        emailNotVerified:
          "Verifikasi alamat email Anda sebelum masuk. Periksa kotak masuk untuk tautan baru.",
        invalidCredentials: "Email atau kata sandi salah. Silakan coba lagi.",
        password: "Masukkan kata sandi Anda",
        passwordSignInOff:
          "Masuk dengan kata sandi dinonaktifkan di sini. Lanjutkan dengan {provider}.",
        passwordSignInOffGeneric:
          "Masuk dengan kata sandi dinonaktifkan di sini.",
        signInLocked:
          "Terlalu banyak kata sandi salah untuk alamat email ini. Coba lagi dalam 15 menit, atau atur ulang kata sandi.",
      },
      forgotPassword: "Lupa kata sandi?",
      noAccount: "Belum punya akun?",
      passwordInstead: "Masuk dengan kata sandi saja",
      resendFailed: "Email verifikasi tidak dapat dikirim ulang.",
      resendSuccess:
        "Email verifikasi telah dikirim. Periksa kotak masuk Anda.",
      resendVerification: "Kirim ulang email verifikasi",
    },
    password: {
      breached: "Pilih kata sandi yang pernah muncul dalam kebocoran data",
      tooLong: "Kata sandi maksimal 128 karakter",
      tooShort: "Kata sandi harus terdiri dari minimal 15 karakter",
    },
    resetPassword: {
      eyebrow: "Atur ulang kata sandi",
      title: "Buat kata sandi baru",
      label: "Kata sandi baru",
      submit: "Perbarui kata sandi",
      submitting: "Memperbarui kata sandi...",
      success:
        "Kata sandi Anda telah diatur ulang. Masuklah dengan kata sandi baru Anda.",
      errors: {
        invalidLink:
          "Tautan pengaturan ulang ini tidak valid atau telah kedaluwarsa.",
      },
    },
    secondStep: {
      eyebrow: "Masuk dua langkah",
      titleBackup: "Masukkan kode cadangan",
      titleCode: "Masukkan kode Anda",
      descriptionBackup: "Setiap kode cadangan hanya dapat digunakan sekali.",
      descriptionCode:
        "Buka aplikasi autentikator dan masukkan kode 6 digit yang ditampilkan.",
      labelBackup: "Kode cadangan",
      labelCode: "Kode 6 digit",
      checking: "Memeriksa...",
      useApp: "Gunakan kode dari aplikasi Anda",
      useBackup: "Kehilangan ponsel? Gunakan kode cadangan",
      errors: {
        backupCode: "Masukkan salah satu kode cadangan Anda.",
        backupInvalid: "Kode cadangan itu salah, atau sudah pernah digunakan.",
        code: "Masukkan kode 6 digit yang ditampilkan aplikasi autentikator Anda.",
        codeInvalid:
          "Kode itu salah. Periksa waktu di ponsel Anda lalu coba kode terbaru.",
        locked:
          "Terlalu banyak kode salah. Masuk dua langkah dikunci selama 15 menit.",
        restart: "Terlalu banyak kode salah. Masuk kembali untuk mencoba lagi.",
        timedOut: "Proses ini terlalu lama. Silakan masuk kembali.",
      },
    },
    signup: {
      eyebrow: "Buat akun",
      title: "Buat akun Anda",
      fullName: "Nama lengkap",
      fullNamePlaceholder: "Nama Lengkap",
      passwordPlaceholder: "Masukkan kata sandi",
      creating: "Membuat akun...",
      submit: "Daftar",
      goToLogIn: "Pergi ke halaman masuk",
      haveAccount: "Sudah punya akun?",
      success: {
        checkEmail: "Periksa email Anda untuk memverifikasi akun pengirim.",
        emailNotConnected:
          "Akun Anda telah dibuat, tetapi situs ini belum dapat mengirim email, sehingga email verifikasi alamat Anda tidak dapat dikirim. Mintalah administrator menyelesaikan penyiapan email di Pengaturan, Organisasi. Setelah itu, masuklah dan email verifikasi akan dikirim.",
      },
      rules: {
        closed: "Akun baru sedang tidak diterima.",
        domains: "Akun dapat dibuat dengan alamat email di {domains}.",
        open: "Siapa pun dapat membuat akun.",
        or: "atau",
        setup: "Situs ini belum disiapkan.",
      },
      errors: {
        email: "Masukkan alamat email yang valid",
        emailRegistered: "Email ini sudah terdaftar",
        fullName: "Masukkan nama lengkap Anda",
      },
      closed: {
        title: "Pendaftaran ditutup",
        description:
          "Akun baru sedang tidak diterima di situs ini. Jika Anda dikirimi dokumen untuk ditandatangani, gunakan tautan dalam email tersebut. Anda tidak memerlukan akun.",
      },
    },
    sso: {
      continueWith: "Lanjutkan dengan {provider}",
      errors: {
        notAllowed:
          "Alamat ini tidak memiliki akun di sini, dan aturan pendaftaran situs ini tidak mengizinkan pembuatan akun. Hubungi administrator.",
        cancelled: "Proses masuk dibatalkan.",
        emailNotFound:
          "Penyedia identitas Anda tidak membagikan alamat email, sehingga Anda tidak dapat masuk. Mintalah tim TI untuk menyertakan klaim email.",
        needsVerification:
          "Akun dengan alamat ini sudah ada dan alamatnya belum dikonfirmasi. Masuklah dengan kata sandi sekali, atau hubungi administrator.",
        linkedElsewhere:
          "Proses masuk ini sudah terhubung dengan akun lain di sini. Hubungi administrator.",
        generic: "Masuk tunggal tidak selesai. Silakan coba lagi.",
      },
    },
  },
  common: {
    and: "dan",
    lastUpdated: "Terakhir diperbarui {date}",
  },
  contact: {
    form: {
      company: "Perusahaan",
      email: "Surel",
      emailPlaceholder: "anda@contoh.com",
      errors: {
        botRejected:
          "Permintaan tidak dapat diterima. Silakan coba lagi beberapa saat.",
        email: "Masukkan alamat surel yang valid",
        generic: "Terjadi kesalahan. Silakan coba lagi.",
        message: "Masukkan pesan",
        messageTooLong: "Pesan maksimal 5000 karakter",
        name: "Masukkan nama Anda",
        reviewFields: "Periksa kembali kolom yang ditandai.",
        tooManyRequests: "Terlalu banyak permintaan. Silakan coba lagi nanti.",
        unavailable: "Formulir kontak sedang tidak tersedia.",
      },
      message: "Pesan",
      messagePlaceholder:
        "Sampaikan kebutuhan Anda, dan sertakan alamat surel akun, nama pengirim, judul dokumen, atau tautan yang membantu kami mengidentifikasi permohonan.",
      name: "Nama",
      namePlaceholder: "Nama Anda",
      sending: "Mengirim...",
      submit: "Kirim pesan",
      success:
        "Pesan Anda sudah dikirim. Kami akan menindaklanjuti ke {email} jika memerlukan keterangan tambahan.",
    },
    hero: {
      description:
        "Gunakan formulir di bawah untuk dukungan produk, permohonan privasi, akomodasi aksesibilitas, pemberitahuan hukum, atau pertanyaan tentang dokumen yang dikirim melalui Sakta.",
      title: "Kontak",
    },
    metadata: {
      description:
        "Hubungi Sakta untuk dukungan, pertanyaan privasi, permohonan aksesibilitas, atau pertanyaan hukum.",
      title: "Kontak | Sakta",
    },
  },
  dashboard: {
    card: {
      context: {
        completed: "Dikirim ke: {emails}",
        completedEmpty: "Dikirim ke: —",
        declined: "Ditolak oleh: {email}",
        draftFields: "{count} kolom dipasang",
        draftFieldsPlural: "{count} kolom dipasang",
        draftSigners: "{count} penandatangan",
        draftSignersPlural: "{count} penandatangan",
        expiredWaiting: "Kedaluwarsa {date} · sebelumnya menunggu: {emails}",
        sentWaiting: "Menunggu: {emails}",
        voided: "Dibatalkan pada {date}",
      },
      created: "Dibuat",
      sentBy: "Dikirim oleh",
      status: "Status: {status}",
      statuses: {
        completed: "Selesai",
        declined: "Ditolak",
        draft: "Draf",
        expired: "Kedaluwarsa",
        sent: "Dikirim",
        signedProgress: "{signed} dari {total} sudah menandatangani",
        voided: "Dibatalkan",
      },
    },
    empty: {
      install: {
        description: "Belum ada anggota organisasi Anda yang memulai amplop.",
        title: "Belum ada amplop",
      },
      mine: {
        description:
          "Unggah PDF dan kirimkan untuk ditandatangani dalam hitungan menit.",
        title: "Belum ada dokumen",
      },
      results: {
        description:
          "Coba judul, surel penandatangan, atau filter status lain.",
        reset: "Atur ulang filter",
        title: "Tidak ada dokumen yang cocok",
      },
    },
    error: {
      message: "Dokumen Anda tidak dapat dimuat. Silakan coba lagi.",
      retry: "Coba lagi",
    },
    filters: {
      All: "Semua",
      Completed: "Selesai",
      Declined: "Ditolak",
      Draft: "Draf",
      Sent: "Dikirim",
      Voided: "Dibatalkan",
      label: "Filter dokumen",
    },
    header: {
      action: "Amplop baru",
      allDescription: "Semua amplop di organisasi Anda, siapa pun pengirimnya.",
      allTitle: "Semua amplop",
      description:
        "Lacak draf, amplop yang dikirim, dan perjanjian yang selesai di satu tempat.",
      title: "Dokumen",
      viewEveryone: "Semua orang",
      viewLabel: "Amplop siapa",
      viewMine: "Saya",
    },
    pagination: {
      label: "Halaman",
      newer: "Lebih baru",
      older: "Lebih lama",
    },
    search: "Cari berdasarkan judul atau surel...",
    showing: "Menampilkan {shown} dari {total} amplop",
    showingOnPage: "Menampilkan {shown} dari {total} amplop di halaman ini",
    upload: "Unggah PDF",
  },
  templates: {
    card: {
      meta: "{pageCount} · {fieldCount} · {saved}",
      roleAriaLabel: "Penandatangan template {templateName}",
      roleItem: "{index}. {name}",
      saved: "Disimpan {date}",
    },
    counts: {
      field: "{count} kolom",
      fields: "{count} kolom",
      page: "{count} halaman",
      pages: "{count} halaman",
    },
    delete: {
      cancel: "Batal",
      confirm: "Hapus template",
      deleting: "Menghapus...",
      description: {
        removed: "“{templateName}” akan dihapus secara permanen.",
        retained: "Dokumen yang sudah Anda buat darinya tidak terpengaruh.",
      },
      error: "Template ini tidak dapat dihapus.",
      title: "Hapus template ini?",
      triggerAriaLabel: "Hapus template {templateName}",
      triggerLabel: "Hapus",
    },
    empty: {
      action: "Buka dokumen",
      description:
        "Buka dokumen yang sudah Anda siapkan atau kirim, lalu pilih Simpan sebagai template. Lain kali, Anda hanya perlu menyebut siapa yang menandatangani.",
      title: "Belum ada template",
    },
    error: {
      description: "Template Anda tidak dapat dimuat. Silakan coba lagi.",
      retry: "Coba lagi",
      title: "Template tidak dapat dimuat",
    },
    header: {
      description:
        "Dokumen yang sering Anda kirim, dengan kolom dan urutan tanda tangan yang sudah siap.",
      title: "Template",
    },
    sendToMany: "Kirim massal",
    use: "Gunakan template",
  },
  settings: {
    account: {
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      closure: {
        blockedReason:
          "Anda adalah satu-satunya administrator. Jadikan orang lain administrator terlebih dahulu, lalu tutup akun Anda.",
        cancel: "Batal",
        confirm: "Ajukan penutupan",
        confirmationLabel: 'Ketik "{phrase}" untuk mengonfirmasi:',
        dangerZone: "Zona berbahaya",
        hostedCopy:
          "Sebelum menutup akun, unduh dokumen yang ingin Anda simpan. Setelah penutupan, {productName} menyimpan jendela ekspor 30 hari lalu menghapus dokumen, template, dan catatan amplop yang tersimpan. Penandatangan tetap menyimpan salinan yang dikirimkan kepada mereka.",
        request: "Ajukan penutupan akun",
        requesting: "Mengajukan...",
        selfHostedCopy:
          "Sebelum menutup akun, unduh dokumen yang ingin Anda simpan. Setelah 30 hari, draf, amplop yang belum selesai, dan template dihapus. Dokumen selesai beserta jejak auditnya tetap ada di {productName}: kepemilikannya berpindah ke administrator karena merupakan catatan organisasi.",
        success:
          "Permintaan Anda telah kami terima. Unduh dokumen yang ingin Anda simpan dalam 30 hari.",
        title: "Ajukan penutupan akun?",
      },
      header: {
        description:
          "Kelola profil pengirim, kata sandi, masuk dua langkah, dan siklus hidup akun.",
        title: "Pengaturan",
      },
      password: {
        breached: "Pilih kata sandi yang pernah muncul dalam kebocoran data",
        correctFields: "Perbaiki kolom yang ditandai.",
        currentIncorrect: "Kata sandi saat ini salah",
        currentRequired: "Masukkan kata sandi saat ini",
        emailResetLink: "Kirimi saya tautan pengaturan ulang",
        helper: "Minimal 15 karakter",
        labelCurrent: "Kata sandi saat ini",
        labelNew: "Kata sandi baru",
        sending: "Mengirim...",
        success: {
          resetSent: "Tautan pengaturan ulang kata sandi telah dikirim.",
          updated: "Kata sandi diperbarui.",
        },
        title: "Kata sandi",
        tooShort: "Kata sandi harus terdiri dari minimal 15 karakter",
        updating: "Memperbarui...",
        update: "Perbarui kata sandi",
      },
      profile: {
        correctFields: "Perbaiki kolom yang ditandai.",
        emailDifferent: "Masukkan alamat email yang berbeda",
        emailInvalid: "Masukkan alamat email yang valid",
        emailNote:
          "Perubahan email diverifikasi terlebih dahulu melalui kotak masuk lama, lalu kotak masuk baru.",
        emailRegistered: "Email ini sudah terdaftar",
        fullNameRequired: "Masukkan nama lengkap Anda",
        labelEmail: "Email",
        labelFullName: "Nama lengkap",
        save: "Simpan perubahan",
        saving: "Menyimpan...",
        success: {
          emailSteps:
            "Jika perubahan email dapat dilanjutkan, Anda akan menerima langkah selanjutnya lewat email.",
          updated: "Profil diperbarui.",
          updatedWithEmailSteps:
            "Profil diperbarui. Jika perubahan email dapat dilanjutkan, Anda akan menerima langkah selanjutnya lewat email.",
        },
        title: "Profil",
      },
    },
    organization: {
      addresses: {
        sender: {
          envHelper: "Ditetapkan oleh variabel lingkungan RESEND_FROM_EMAIL.",
          helper:
            "Alamat asal email, pada domain yang Anda miliki. Subdomain seperti notifications@sign.yourcompany.com memisahkan email situs ini dari email sehari-hari Anda.",
          label: "Kirim email dari",
          placeholder: "sign@yourcompany.com",
        },
        support: {
          envHelper: "Ditetapkan oleh variabel lingkungan SUPPORT_EMAIL.",
          helper: "Tempat balasan dan pertanyaan penandatangan ditujukan.",
          label: "Alamat dukungan",
          placeholder: "help@yourcompany.com",
        },
        title: "Alamat email",
      },
      disclosure: {
        cancel: "Batal",
        description:
          "Opsional. Penandatangan membaca teks ini dan mencentang kotak persetujuan penggunaan catatan dan tanda tangan elektronik sebelum menandatangani. Kosongkan untuk memakai teks standar, atau tekan “Mulai dari teks standar” untuk menyuntingnya. Kata-kata yang dibaca setiap penandatangan disimpan bersama catatannya.",
        formatHelp:
          "Pisahkan paragraf dengan baris kosong. Awali baris dengan ## dan spasi untuk membuat judul. Tulis {sender} di tempat nama pengirim dan {contact} di tempat alamat yang dapat dihubungi.",
        label: "Teks pengungkapan",
        placeholder: "Teks standar",
        startFromStandard: "Mulai dari teks standar",
        title: "Yang disetujui penandatangan sebelum menandatangani",
        useStandard: "Gunakan teks standar",
      },
      email: {
        adding: "Menambahkan...",
        checkRecords: "Periksa catatan DNS",
        checking: "Memeriksa...",
        checkingEmail: "Memeriksa email…",
        dns: {
          caption: "Catatan DNS yang harus ditambahkan untuk {domain}",
          empty:
            "Resend tidak mencantumkan catatan apa pun untuk {domain}. Buka Resend untuk melihatnya.",
          found: "Ditemukan",
          name: "Nama",
          notFound: "Belum ditemukan",
          priority: "Prioritas {priority}",
          status: "Status",
          type: "Jenis",
          value: "Nilai",
        },
        openResend: "Buka Resend",
        sendTest: "Kirimi saya email uji",
        sending: "Mengirim...",
        setUp: "Siapkan {domain}",
        states: {
          capture: {
            line: "Ini adalah pengaturan pengembangan. Email disimpan ke folder di komputer ini, bukan dikirim.",
            title: "Email ditangkap, bukan dikirim",
          },
          domainMissing: {
            line: "{domain} belum ditambahkan ke akun Resend Anda. Siapkan di sini untuk mendapatkan catatan DNS yang membuktikan kepemilikan domain.",
            title: "{domain} perlu disiapkan",
          },
          domainPending: {
            line: "Tambahkan catatan ini di tempat DNS {domain} dikelola, lalu periksa. Perubahan DNS baru terlihat beberapa menit, kadang lebih lama.",
            mayAlreadySend:
              "Resend telah memverifikasi sebagian domain ini, sehingga pengiriman mungkin sudah berfungsi. Kirim email uji ke diri sendiri untuk memastikannya. Jika sampai, email berfungsi.",
            title: "Menunggu catatan DNS {domain}",
          },
          error: {
            line: "Resend tidak dapat dimintai keterangan tentang email situs ini: {message}",
            title: "Email tidak dapat diperiksa",
          },
          missingKey: {
            line: "Situs ini tidak memiliki kunci API Resend, sehingga tidak dapat mengirim apa pun: tidak ada konfirmasi pendaftaran maupun undangan menandatangani.",
            steps: {
              marketplace: {
                label: "Resend di Marketplace Vercel",
                text: "Buka Resend di Marketplace Vercel. Pilih Install (atau Connect Project jika tim Anda sudah memakai Resend) lalu hubungkan ke proyek ini.",
              },
              redeploy:
                "Buka Deployments, buka menu ••• pada deployment Production terbaru, lalu pilih Redeploy. Variabel lingkungan hanya sampai ke deployment yang dibuat setelah variabel ditambahkan, sehingga situs yang di-deploy sebelum Resend dihubungkan tetap tidak memiliki kunci sampai di-deploy ulang.",
              reload: "Setelah deployment baru siap, muat ulang halaman ini.",
              resendKeys: {
                label: "Kunci API Resend",
                text: "Buat kunci API di Resend dengan akses penuh agar halaman ini dapat menambahkan domain Anda dan memeriksa catatan DNS-nya.",
              },
              restart: "Mulai ulang aplikasi, lalu muat ulang halaman ini.",
              variable:
                "Di proyek ini pada Vercel, buka Settings, lalu Environment Variables, dan pastikan RESEND_API_KEY tercantum untuk Production.",
              variableNonVercel:
                "Tetapkan sebagai variabel lingkungan RESEND_API_KEY di tempat situs ini dijalankan.",
            },
            title: "Email belum terhubung",
          },
          ready: {
            line: "Email dikirim dari {senderAddress} dan {domain} telah terverifikasi.",
            title: "Email berfungsi",
          },
          restrictedKey: {
            line: "Kunci Resend situs ini hanya diizinkan mengirim email, sehingga tidak dapat memeriksa {domain} dari sini. Buka Resend untuk menambahkan domain dan melihat catatan DNS-nya.",
            secondLine:
              "Setelah itu, kirim email uji ke diri sendiri. Jika sampai, email berfungsi.",
            title: "Selesaikan domain di Resend",
          },
          testSender: {
            firstLine:
              "Email dikirim dari alamat uji bersama Resend ({senderAddress}). Resend hanya mengirimkannya kepada pemilik akun Resend, sehingga penandatangan dan pengguna baru belum menerima apa pun.",
            secondLine:
              'Masukkan alamat pada domain Anda sendiri di kolom "Kirim email dari" di atas lalu simpan. Catatan DNS yang harus ditambahkan akan muncul di sini.',
            title: "Email baru sampai kepada Anda saja",
          },
        },
        testSent: "Email uji dikirim ke {to}. Periksa kotak masuk tersebut.",
        title: "Pengaturan email",
      },
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      header: {
        description:
          "Pengaturan ini berlaku untuk semua orang yang memakai situs ini. Hanya Anda, sebagai administrator, yang dapat melihat dan mengubahnya.",
        eyebrow: "Administrator",
        title: "Organisasi",
      },
      legalLinks: {
        description:
          "Opsional. Tautan ke halaman di situs web Anda sendiri, ditampilkan di footer situs ini dan emailnya.",
        notice: {
          after:
            ". Periksa bahwa pemberitahuan ini sesuai untuk organisasi Anda.",
          before: "Tanpa tautan kebijakan privasi, penandatangan melihat ",
          link: "pemberitahuan yang disusun dari pengaturan ini",
        },
        privacy: {
          label: "Tautan kebijakan privasi",
          placeholder: "https://yourcompany.com/privacy",
        },
        terms: {
          label: "Tautan syarat",
          placeholder: "https://yourcompany.com/terms",
        },
        title: "Syarat dan kebijakan privasi Anda",
      },
      name: {
        helper:
          "Ditampilkan di header dan di setiap email yang dikirim situs ini.",
        label: "Nama organisasi",
      },
      retention: {
        description:
          "Opsional. Setelah sejumlah hari ini, amplop yang selesai, ditolak, atau dibatalkan dihapus beserta jejak auditnya. Pengirimnya dikirimi email 30 hari sebelumnya. Kosongkan untuk menyimpannya sampai seseorang menghapusnya. Banyak catatan wajib disimpan bertahun-tahun, jadi periksa ketentuan yang berlaku bagi Anda sebelum menetapkan ini.",
        label: "Lama penyimpanan (hari)",
        part11Helper:
          "Nonaktif saat mode Part 11 aktif: catatan tersebut hanya dihapus secara manual.",
        placeholder: "Simpan sampai dihapus",
        title: "Lama menyimpan dokumen selesai",
      },
      save: {
        label: "Simpan pengaturan organisasi",
        saving: "Menyimpan...",
      },
      saved: "Pengaturan organisasi disimpan.",
      signup: {
        domains: {
          helper: "Pisahkan beberapa domain dengan koma.",
          label: "Domain email",
          placeholder: "yourcompany.com",
        },
        legend: "Siapa yang dapat membuat akun",
        note: "Ini tentang orang yang mengirim dokumen. Orang yang dikirimi dokumen untuk ditandatangani tidak memerlukan akun.",
        options: {
          closed: {
            description: "Tidak ada orang baru yang dapat membuat akun.",
            label: "Tidak ada",
          },
          domains: {
            description:
              "Hanya orang yang alamat emailnya berada di salah satu domain Anda yang dapat membuat akun.",
            label: "Orang di organisasi saya",
          },
          open: {
            description:
              "Siapa pun yang menemukan situs ini dapat membuat akun.",
            label: "Siapa pun",
          },
        },
        part11Note:
          "Mode Part 11 aktif, sehingga aturan ini berlaku juga bagi penandatangan. Amplop Part 11 hanya dikirim kepada orang yang memiliki akun di sini dan identitasnya telah dikonfirmasi administrator di halaman Orang, jadi pilih aturan yang memungkinkan orang yang Anda kirimi dokumen membuat akun.",
      },
    },
    apiKeys: {
      copy: "Salin",
      copied: "Tersalin",
      done: "Selesai",
      form: {
        access: "Akses",
        creating: "Membuat...",
        create: "Buat kunci",
        expires: "Kedaluwarsa",
        expiry30: "Dalam 30 hari",
        expiry90: "Dalam 90 hari",
        expiryNever: "Tidak pernah",
        expiryYear: "Dalam satu tahun",
        name: "Nama",
        namePlaceholder: "Misalnya: Aplikasi Penagihan",
        scopeRead: "Hanya baca",
        scopeWrite: "Baca dan tulis",
      },
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      header: {
        descriptionAfter:
          ". Sebuah kunci bertindak sebagai administrator yang membuatnya: apa yang dikirimkannya tampil di dokumen mereka. Kunci melewati masuk dua langkah, jadi simpan di pengaturan rahasia aplikasi, jangan pernah di browser, dan cabut segera setelah kunci diduga bocor.",
        descriptionBefore:
          "Izinkan aplikasi lain membuat dan mengirim amplop melalui ",
        docsLink: "API Sakta",
        title: "Kunci API",
      },
      list: {
        ariaLabel: "Kunci API",
        empty: "Belum ada kunci.",
        loadError: "Kunci tidak dapat dimuat. {error}",
        meta: {
          expires: " Kedaluwarsa {date}.",
          lastUsed: "Terakhir dipakai {date}.",
          madeBy: "Dibuat oleh {ownerName} pada {date}.",
          notUsed: "Belum pernah dipakai.",
        },
        ownerClosing:
          "{ownerName} sedang menutup akunnya, sehingga aplikasi yang memakai kunci ini ditolak. Kunci tersebut dihapus bersama akunnya.",
        retry: "Coba lagi",
        scopeRead: "Hanya baca",
        scopeWrite: "Baca dan tulis",
        staleError: "Daftar mungkin sudah usang. {error}",
      },
      newKeyNotice:
        "Salin kunci untuk {name} sekarang. Kunci ini tidak ditampilkan lagi.",
      revoke: {
        ariaLabel: "Cabut {name}",
        cancel: "Batal",
        confirm:
          "Cabut kunci ini? Aplikasi yang memakainya berhenti berfungsi segera.",
        label: "Cabut",
        revoking: "Mencabut...",
        stoppedConfirm:
          "Cabut kunci ini? Kunci ini tidak dapat dipakai lagi selamanya.",
      },
      status: {
        active: "Aktif",
        expired: "Kedaluwarsa",
        revoked: "Dicabut",
        stopped: "Dihentikan",
      },
    },
    branding: {
      color: {
        default: "Gunakan yang bawaan",
        label: "Warna merek",
        helper:
          "Enam huruf dan angka, misalnya #1a73e8. Kosongkan untuk memakai warna bawaan. Disimpan dengan tombol di bawah.",
        lightWarning:
          "Warna ini terlalu terang untuk teks putih, sehingga warna yang lebih gelap dipakai.",
        pickerAriaLabel: "Pemilih warna",
      },
      description:
        "Opsional. Logo Anda tampil di header situs ini, pada halaman yang dilihat penandatangan, dan di bagian atas email. Warna Anda dipakai untuk tombol dan tautan.",
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      logo: {
        ariaLabel: "Gambar logo",
        empty: "Belum ada logo. Header menampilkan nama organisasi Anda.",
        fileHelper:
          "PNG, JPEG, atau WebP, maksimal 512 KB. Logo lebar dengan latar transparan paling baik. Logo langsung disimpan setelah Anda memilihnya.",
        invalidType: "Logo harus berupa gambar PNG, JPEG, atau WebP.",
        remove: "Hapus logo",
        removing: "Menghapus...",
        replace: "Ganti logo",
        subtitle: "Logo",
        title: "Logo dan warna",
        upload: "Unggah logo",
        uploading: "Mengunggah...",
        tooLarge: "Ukuran logo harus 512 KB atau kurang.",
      },
      preview: { button: "Tombol", link: "Tautan", status: "Status" },
    },
    embedding: {
      add: "Izinkan situs",
      adding: "Menambahkan...",
      ariaLabel: "Situs yang diizinkan menanamkan tanda tangan",
      descriptionAfter:
        ". Untuk amplop tersebut, tidak ada undangan yang dikirim lewat email: aplikasi yang masuk dan menyatakan identitas penandatangan, jadi daftarkan hanya situs yang Anda percaya. Halaman lain di Sakta tetap tidak dapat dibingkai.",
      descriptionBefore:
        "Izinkan aplikasi menampilkan halaman tanda tangan di dalam situsnya sendiri, untuk amplop yang dikirimnya melalui API dengan ",
      docsLink: "pengiriman tertanam",
      empty: "Belum ada situs, sehingga tanda tangan tertanam nonaktif.",
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      listError: "Daftar situs tidak dapat dimuat. {error}",
      remove: "Hapus",
      removeAriaLabel: "Hapus {origin}",
      removing: "Menghapus...",
      retry: "Coba lagi",
      site: { label: "Situs", placeholder: "https://app.example.com" },
      staleError: "Daftar mungkin sudah usang. {error}",
      title: "Tanda tangan tertanam",
    },
    part11: {
      description:
        "Untuk catatan yang diatur. Selama aktif, amplop hanya dikirim kepada orang yang memiliki akun di sini dan identitasnya telah dikonfirmasi administrator di halaman Orang. Setiap penandatangan memasukkan alamat email dan kata sandinya untuk membuka dokumen dan sekali lagi untuk menandatanganinya, lalu mengonfirmasi arti tanda tangannya, yang dicetak di samping namanya dan waktunya. Lima kali kata sandi salah mengunci akun untuk menandatangani dan mengirim email ke administrator. Amplop selesai tidak pernah dihapus oleh masa retensi atau permintaan data, dan pembatalan memerlukan alasan.",
      disclaimer:
        "Mengaktifkannya saja tidak membuat situs ini patuh. Organisasi Anda tetap harus memvalidasi sistem, menulis dan mengikuti prosedurnya sendiri, melatih staf, dan menyertifikasi tanda tangan elektroniknya kepada FDA.",
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      off: "Nonaktif",
      on: "Aktif",
      saving: "Menyimpan...",
      title: "Mode FDA 21 CFR Part 11",
      turnOff: "Nonaktifkan mode Part 11",
      turnOn: "Aktifkan mode Part 11",
    },
    people: {
      confirmIdentity: {
        ariaLabel: "Konfirmasi identitas {name}",
        cancel: "Batal",
        label: "Bagaimana Anda memeriksa identitas orang ini?",
        placeholder: "Misalnya: paspor dilihat langsung, catatan HR 4417",
        save: "Simpan",
        saving: "Menyimpan...",
        title: "Konfirmasi identitas",
      },
      description:
        "Semua orang yang memiliki akun di sini. Administrator dapat mengubah pengaturan ini, menjawab permintaan data penandatangan, dan menerima dokumen selesai dari akun yang ditutup. Ketika seseorang bukan lagi administrator, dokumen yang diterimanya dengan cara itu berpindah ke administrator yang tetap ada. Pertahankan setidaknya dua administrator agar satu orang yang keluar tidak mengunci semua orang.",
      empty: "Tidak ada yang cocok.",
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      identity: {
        confirmed: "Identitas dikonfirmasi",
        notConfirmed: "Identitas belum dikonfirmasi",
        takeBack: "Tarik kembali konfirmasi",
        takeBackAriaLabel: "Tarik kembali konfirmasi identitas {name}",
      },
      loading: "Memuat daftar orang...",
      pagination:
        "Menampilkan {shown} dari {total} orang pertama. Ketik bagian dari nama atau alamat email di atas untuk mencari yang lainnya.",
      resetTwoFactor: {
        ariaLabel: "Atur ulang masuk dua langkah untuk {name}",
        cancel: "Batal",
        confirm:
          "Nonaktifkan masuk dua langkah mereka dan keluar dari semua perangkat?",
        description: "Untuk orang yang kehilangan ponsel dan kode cadangannya.",
        reset: "Atur ulang",
        resetting: "Mengatur ulang...",
        title: "Atur ulang masuk dua langkah",
      },
      role: {
        admin: "Administrator",
        makeAdmin: "Jadikan administrator",
        makeAdminAriaLabel: "Jadikan {name} administrator",
        member: "Anggota",
        minimum: "Harus ada setidaknya satu administrator.",
        removeAdmin: "Hapus sebagai administrator",
        removeAdminAriaLabel: "Hapus {name} sebagai administrator",
        saving: "Menyimpan...",
      },
      search: {
        ariaLabel: "Orang",
        label: "Cari orang",
        placeholder: "Nama atau email",
      },
      status: {
        closing: "Menutup akun",
        emailNotConfirmed: "Email belum dikonfirmasi",
        signingLocked: "Penandatanganan dikunci",
        twoStepOn: "Dua langkah aktif",
        you: "Anda",
      },
      title: "Orang",
      unlock: {
        ariaLabel: "Buka kunci penandatanganan untuk {name}",
        title: "Buka kunci penandatanganan",
      },
    },
    security: {
      audit: {
        broken:
          "Rantai hash rusak pada peristiwa {sequence}: sebuah baris diubah atau dihapus.",
        chainAriaLabel: "Jejak audit situs",
        csv: "Unduh sebagai CSV",
        description:
          "Peristiwa masuk dan gagal masuk, perubahan cara orang masuk, serta perubahan pengaturan, peran, logo, konfirmasi identitas, dan kunci penandatanganan. Setiap amplop juga memiliki jejaknya sendiri, yang dapat diekspor pengirimnya dari halaman amplop.",
        downloadFiles: {
          auditTrail: "jejak audit",
          certificate: "sertifikat",
          documentAsSent: "dokumen yang dikirim",
          signedPdf: "PDF yang ditandatangani",
        },
        empty: "Belum ada catatan.",
        eventsPrefix: "peristiwa: {events}",
        failedAttempts: "{count} kali salah berturut-turut",
        intact: "Rantai hash utuh di {count} peristiwa.",
        refresh: "Muat ulang",
        sentBy: "dikirim oleh {email}",
        failureReasons: {
          accountTemporarilyLocked: "langkah kedua dikunci setelah kode salah",
          emailNotVerified: "alamat email belum dikonfirmasi",
          invalidBackupCode: "kode cadangan salah",
          invalidCode: "kode aplikasi autentikator salah",
          invalidEmailOrPassword: "email atau kata sandi salah",
          tooManyAttempts: "terlalu banyak kode salah, sudah keluar",
        },
        signInMethods: {
          authenticator: "dengan kode aplikasi autentikator",
          backupCode: "dengan kode cadangan",
        },
        deletion: {
          cancelled: "seharusnya dihapus pada {date}",
          scheduled: "akan dihapus pada {date}",
        },
        eventLabels: {
          accountClosureRequested: "Penutupan akun diajukan",
          accountDeleted: "Akun dihapus",
          apiKeyCreated: "Kunci API dibuat",
          apiKeyRevoked: "Kunci API dicabut",
          emailDomainChanged: "Domain email diubah",
          embedOriginAdded: "Situs diizinkan menanamkan tanda tangan",
          embedOriginRemoved:
            "Situs tidak lagi diizinkan menanamkan tanda tangan",
          envelopeDeleted: "Amplop selesai dihapus",
          envelopeDeletionCancelled: "Penghapusan amplop dibatalkan",
          envelopeDeletionScheduled: "Penghapusan amplop dijadwalkan",
          envelopeFileDownloaded: "Berkas anggota lain diunduh",
          identityVerificationRevoked: "Konfirmasi identitas ditarik kembali",
          identityVerified: "Identitas dikonfirmasi",
          logoChanged: "Logo diubah",
          part11ModeChanged: "Mode Part 11 diubah",
          passwordChanged: "Kata sandi diubah",
          passwordReset: "Kata sandi diatur ulang lewat tautan email",
          reauthenticationFailed: "Kata sandi salah saat menandatangani",
          roleChanged: "Peran diubah",
          settingsChanged: "Pengaturan diubah",
          signInFailed: "Gagal masuk",
          signInLocked: "Masuk dihentikan setelah kata sandi salah",
          signInSucceeded: "Berhasil masuk",
          sessionsRevoked: "Keluar dari semua perangkat",
          signedOut: "Sudah keluar",
          signingLocked: "Penandatanganan dikunci",
          signingUnlocked: "Penandatanganan dibuka",
          twoFactorBackupCodesRegenerated: "Kode cadangan baru dibuat",
          twoFactorDisabled: "Masuk dua langkah dinonaktifkan",
          twoFactorEnabled: "Masuk dua langkah diaktifkan",
          twoFactorRequirementChanged: "Kewajiban masuk dua langkah diubah",
          twoFactorReset: "Masuk dua langkah diatur ulang oleh administrator",
          webhookEndpointChanged: "Endpoint webhook diubah",
          webhookEndpointCreated: "Endpoint webhook ditambahkan",
          webhookEndpointDeleted: "Endpoint webhook dihapus",
        },
        details: {
          account: "Akun",
          logoRemoved: "Dihapus",
          logoReplaced: "Diganti",
          newSecret: "rahasia penandatangan baru",
          ownerNoLongerAdmin: "pemiliknya bukan lagi administrator",
          roleChange: "{target}: {from} menjadi {to}",
          turnedOff: "dinonaktifkan",
          turnedOn: "diaktifkan",
          turnedOnShort: "Diaktifkan",
          turnedOffShort: "Dinonaktifkan",
        },
        title: "Jejak audit situs",
      },
      description:
        "Masuk dua langkah meminta kode dari aplikasi autentikator (seperti 1Password, Google Authenticator, atau Microsoft Authenticator) setelah kata sandi. Saat diwajibkan, siapa pun yang belum menyiapkannya akan diminta melakukannya saat berikutnya membuka aplikasi, dan tidak dapat melakukan hal lain sebelum selesai. Sepuluh kali kata sandi salah untuk satu alamat email menghentikan masuk selama 15 menit.",
      durations: {
        day: "1 hari",
        days: "{count} hari",
        hour: "1 jam",
        hours: "{count} jam",
        minute: "1 menit",
        minutes: "{count} menit",
      },
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      required: "Wajib untuk semua orang",
      optional: "Opsional",
      saving: "Menyimpan...",
      sessions: {
        description:
          "Berapa lama seseorang tetap masuk. Perubahan berlaku untuk semua orang yang sedang masuk, mulai dari klik berikutnya. Siapa pun juga dapat keluar dari semua perangkat melalui Pengaturan mereka sendiri.",
        idleLabel: "Keluar setelah tidak aktif selama",
        maxLabel: "Paling lambat keluar setelah",
        never: "Tidak pernah",
        save: "Simpan batas sesi",
        saving: "Menyimpan...",
        title: "Sesi",
        weekDefault: "7 hari (bawaan)",
      },
      stopRequiring: "Hentikan kewajiban masuk dua langkah",
      require: "Wajibkan masuk dua langkah",
      success: "Batas sesi disimpan.",
      title: "Keamanan masuk",
    },
    sessions: {
      description:
        "Jika Anda masuk di komputer yang bukan milik Anda, atau kehilangan perangkat, keluar dari semua perangkat. Setiap browser yang masuk ke akun Anda, termasuk yang ini, harus masuk lagi.",
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      signOut: "Keluar dari semua perangkat",
      signingOut: "Keluar...",
      title: "Perangkat yang masuk",
    },
    signerData: {
      confirmHelper:
        "Ketik ulang email untuk mengonfirmasi penghapusan. Tindakan ini tidak dapat dibatalkan.",
      confirmLabel: "Konfirmasi penghapusan",
      description:
        "Saat penandatangan meminta data yang Anda simpan tentang mereka, unduh di sini. Saat mereka meminta data dihapus, Anda dapat menghapus setiap amplop selesai yang mereka tandatangani, beserta berkas dan jejak auditnya. Catatan yang ditandatangani sering kali wajib disimpan, jadi hapus hanya jika tidak ada undang-undang atau sengketa terbuka yang melarangnya.",
      download: "Unduh data mereka (JSON)",
      emailLabel: "Email penandatangan",
      emailPlaceholder: "jane@company.com",
      erase: "Hapus catatan penandatangan ini",
      error: "Permintaan itu tidak dapat diselesaikan.",
      keptPart11:
        " {count} catatan Part 11 dipertahankan: catatan itu hanya dihapus secara manual, setelah ketentuan yang berlaku mengizinkannya.",
      skippedInProgress:
        " {count} amplop yang masih menunggu tanda tangan dibiarkan: batalkan terlebih dahulu, lalu hapus lagi.",
      success:
        "Menghapus {deleted} amplop selesai dan menghapus penandatangan dari {drafts} draf.{skipped}{kept}",
      title: "Permintaan data penandatangan",
    },
    twoFactor: {
      backupCodes: {
        ariaLabel: "Kode cadangan",
        description:
          "Simpan kode cadangan ini di tempat yang aman, misalnya pengelola kata sandi. Setiap kunci hanya sekali pakai, sebagai pengganti kode dari aplikasi, jika Anda kehilangan ponsel. Anda tidak akan melihatnya lagi.",
        download: "Unduh kode",
        fileLine:
          "Setiap kode hanya sekali pakai, sebagai pengganti kode dari aplikasi autentikator Anda.",
        fileTitle: "Kode cadangan {productName}",
        new: "Kode cadangan baru dibuat. Kode lama sudah tidak berfungsi.",
      },
      cancel: "Batal",
      confirm: {
        continue: "Lanjut",
        newCodes: "Buat kode baru",
        off: "Nonaktifkan",
      },
      description:
        "Setelah kata sandi, {productName} meminta kode 6 digit dari aplikasi autentikator di ponsel Anda, seperti 1Password, Google Authenticator, atau Microsoft Authenticator. Seseorang yang mengetahui kata sandi Anda tetap tidak dapat masuk.",
      descriptionRequired: " Organisasi Anda mewajibkannya.",
      done: "Selesai",
      errors: {
        generic: "Terjadi kesalahan. Silakan coba lagi.",
        invalidCode:
          "Kode itu salah. Periksa waktu di ponsel Anda lalu coba kode terbaru.",
        invalidPassword: "Kata sandi itu salah.",
        passwordRequired: "Masukkan kata sandi Anda.",
        totpRequired: "Masukkan kode 6 digit yang ditampilkan aplikasi Anda.",
      },
      makeNewCodes: "Buat kode cadangan baru",
      setUp: "Siapkan masuk dua langkah",
      off: "Nonaktif",
      on: "Aktif",
      passwordLabel: "Kata sandi Anda",
      qrAriaLabel: "Kode QR untuk aplikasi autentikator Anda",
      scan: {
        manual: "Atau ketik kunci ini:",
        step: "Pindai kode ini dengan aplikasi autentikator Anda.",
      },
      status: {
        off: "Nonaktifkan masuk dua langkah",
        on: "Aktifkan masuk dua langkah",
      },
      steps: {
        backupCodes: "Simpan kode cadangan Anda",
        code: "Masukkan kode yang ditampilkan aplikasi Anda",
      },
      title: "Masuk dua langkah",
      totpLabel: "Kode 6 digit",
    },
    updates: {
      check: "Periksa pembaruan",
      checking: "Memeriksa...",
      checkError: "Pembaruan tidak dapat diperiksa. Silakan coba lagi.",
      docs: {
        beforeTheLink: "Silakan lihat",
        createFile: "Buat berkas",
        details: "untuk rinciannya.",
        guideLink: "panduan pembaruan",
        inRepository: "di repositori Anda sekali lalu tempelkan",
        itsContents: "isinya",
        newReleaseAfter:
          " untuk rinciannya, termasuk alur kerja GitHub yang melakukan ini untuk Anda.",
        newReleaseBefore:
          "Masukkan rilis baru ke repositori tempat situs ini dibangun, lalu deploy. Silakan lihat ",
        noWorkflow:
          "Tidak ada alur kerja itu? Salinan yang dibuat sebelum versi 0.2.0 tidak memilikinya.",
      },
      errorSuffix: " ",
      eyebrow: "Administrator",
      howTo: {
        merge:
          "Gabungkan pull request tersebut. Vercel melakukan deploy, dan proses build menerapkan perubahan basis data yang diperlukan versi baru.",
        pullRequest:
          "Alur ini membuka pull request berisi versi baru, dan Vercel membuat pratinjau. Perubahan kode Anda sendiri tetap disimpan; jika bertolak belakang dengan pembaruan, alur kerja akan menyebut berkas mana.",
        runWorkflowAfter: ". Alur itu juga berjalan sendiri seminggu sekali.",
        runWorkflowBefore: "Di repositori ",
        runWorkflowButton: "Jalankan alur kerja",
        runWorkflowMiddle: ", buka alur kerja Update Sakta lalu tekan ",
        title: "Cara memperbarui",
      },
      latest: " telah tersedia. Situs ini menjalankan {current}.",
      openWorkflow: "Buka alur kerja pembaruan",
      releaseLink: "Baca rilis di GitHub",
      releasesLink: "Lihat daftar rilis",
      upToDate:
        "Anda sudah menggunakan versi terbaru. {version} adalah rilis terbaru.",
      versionAfter: "). Versi baru diterbitkan di ",
      versionBefore: "Situs ini menjalankan Sakta versi ",
      versionBetween: " (commit ",
      whatsNew: "Yang baru",
    },
    webhooks: {
      add: "Tambahkan endpoint",
      adding: "Menambahkan...",
      cancel: "Batal",
      copy: "Salin",
      copied: "Tersalin",
      descriptionAfter:
        ". Setiap endpoint menerima peristiwa untuk semua amplop di instalasi ini. Jika aplikasi tidak menjawab, peristiwa dicoba lagi selama kurang lebih dua hari.",
      descriptionBefore:
        "Beritahu aplikasi lain saat amplop dikirim, dibuka, ditandatangani, selesai, ditolak, dibatalkan, atau kedaluwarsa. Setiap peristiwa dikirim ke URL sebagai JSON dan ditandatangani dengan rahasia endpoint, menurut cara ",
      docsLink: "Standard Webhooks",
      done: "Selesai",
      empty: "Belum ada endpoint.",
      events: { legend: "Peristiwa" },
      fields: {
        descriptionLabel: "Deskripsi (opsional)",
        descriptionPlaceholder: "Fungsi endpoint ini",
        urlLabel: "URL",
        urlPlaceholder: "https://app.example.com/webhooks/signudoc",
      },
      genericError: "Terjadi kesalahan. Silakan coba lagi.",
      log: {
        answered: ", dijawab {status}",
        attempts: ", {count} kali percobaan",
        ariaLabel: "Pengiriman terbaru",
        empty: "Belum ada yang dikirim.",
        loading: "Memuat...",
        hide: "Sembunyikan log",
        lastError: "{error}",
        nextTry: " Percobaannya berikutnya sekitar {date}.",
        noAnswer: "tidak ada jawaban",
        paused:
          "Endpoint ini nonaktif, sehingga tidak ada yang dikirim ke sana. Pengiriman yang menunggu akan keluar setelah endpoint diaktifkan.",
        refreshed: "Peristiwa uji berhasil dikirim (jawaban {status}).",
        refresh: "Muat ulang",
        resend: "Kirim lagi",
        sending: "Mengirim...",
        statuses: {
          delivered: "Terkirim",
          failed: "Gagal",
          pending: "Menunggu",
          retrying: "Mencoba lagi",
        },
        testFailed: "Peristiwa uji gagal dikirim: {error}.",
        title: "Log pengiriman",
      },
      newSecretNotice:
        "Salin rahasia penandatangan untuk {url} sekarang. Rahasia ini tidak ditampilkan lagi. Tekan Selesai setelah disalin, sebelum menambahkan endpoint lain atau membuat rahasia baru.",
      off: "Nonaktif",
      on: "Aktif",
      remove: "Hapus",
      removeAriaLabel: "Hapus {url}",
      removeConfirm: "Hapus endpoint ini dan log pengirimannya?",
      removing: "Menghapus...",
      retry: "Coba lagi",
      rotate: "Rahasia baru",
      secretTransition:
        " Rahasia lama juga masih menandatangani sampai {date}, dan rahasia baru lain dapat dibuat setelah itu.",
      status: {
        allEvents: "Semua peristiwa.",
        events: "{events}.",
      },
      test: { send: "Kirim uji", working: "Memproses..." },
      title: "Webhook",
      toggle: { off: "Nonaktifkan", on: "Aktifkan" },
      eventLabels: {
        completed: "Selesai",
        declined: "Ditolak",
        expired: "Kedaluwarsa",
        sent: "Dikirim",
        signerSigned: "Penandatangan menandatangani",
        signerViewed: "Penandatangan membukanya",
        voided: "Dibatalkan",
      },
      listAriaLabel: "Endpoint webhook",
    },
  },
  shell: {
    accountMenuAriaLabel: "Menu akun untuk {name}",
    emailNotice: {
      action: "Selesaikan pengaturan email",
      description:
        "Sebelum itu, penandatangan dan pengguna baru tidak akan menerima pesan dari situs ini.",
      title: "Email belum diatur.",
    },
    nav: {
      documents: "Dokumen",
      newEnvelope: "Amplop baru",
      settings: "Pengaturan",
      templates: "Templat",
    },
    sessionMenu: {
      dashboard: "Dasbor",
      logOut: "Keluar",
      openAriaLabel: "Buka menu akun",
      signingOut: "Sedang keluar...",
    },
    settingsLink: "Pengaturan",
    signOut: "Keluar",
    signingOut: "Sedang keluar...",
    twoStepSetup: {
      description:
        "Organisasi Anda mewajibkan masuk dua langkah di {productName}. Siapkan untuk {email} agar dapat melanjutkan. Prosesnya kurang dari satu menit dengan aplikasi autentikator di ponsel Anda.",
      eyebrow: "Satu langkah lagi",
      signOut: "Keluar",
    },
    workspaceAriaLabel: "Ruang kerja",
  },
  envelope: {
    steps: ["Unggah", "Penandatangan", "Tempatkan kolom", "Tinjau"],
    prepare: {
      actions: {
        addRadioButton: "+ Tambah tombol ke grup ini",
        back: "Kembali",
        closeFieldTools: "Tutup alat kolom",
        delete: "Hapus",
        done: "Selesai",
        next: "Lanjut →",
        openFieldTools: "Buka alat kolom",
        place: "Tempatkan",
        placing: "Menempatkan",
        retry: "Coba lagi",
      },
      choiceProblems: {
        dropdown_options:
          "Dropdown untuk {signer} perlu setidaknya dua pilihan. Pilih dropdown itu lalu tambahkan pilihannya.",
        radio_group_size:
          "Tombol radio untuk {signer} masih berdiri sendiri. Tambahkan tombol lain ke grupnya, atau hapus tombol itu.",
      },
      error: {
        generic: "Terjadi kesalahan. Silakan coba lagi.",
        loadDescription: "Terjadi kesalahan. Silakan coba lagi.",
        loadTitle: "Dokumen ini tidak dapat dimuat",
        saveNetwork: "Perubahan Anda tidak dapat disimpan. Coba lagi.",
      },
      fallbackSignerName: "seorang penandatangan",
      fieldSettings: {
        ariaLabel: "Pengaturan kolom",
        assignedTo: "Ditugaskan kepada",
        choices: "Pilihan",
        choicesPlaceholder: "Ya\nTidak\nBelum tahu",
        choicesReady:
          "Satu pilihan per baris. {count} dari maksimal {max}. Penandatangan memilih salah satu.",
        choicesTooFew: "Satu pilihan per baris. Tambahkan setidaknya dua.",
        optional: "Opsional",
        radioMeaning: "Arti tombol ini",
        radioPlaceholder: "Ya",
        radioReady:
          "{count} tombol dalam grup ini. Penandatangan memilih salah satu.",
        radioTooFew:
          "Tombol radio memerlukan setidaknya satu tombol lagi dalam grupnya.",
        required: "Wajib",
        requiredGroup: "Wajib (seluruh grup)",
        title: "Pengaturan kolom",
      },
      fieldTools: {
        checkbox: { label: "Kotak centang", placeholderLabel: "Kotak centang" },
        date: { label: "Tanggal", placeholderLabel: "Tanggal" },
        dropdown: { label: "Dropdown", placeholderLabel: "Dropdown" },
        initials: { label: "Inisial", placeholderLabel: "Inisial" },
        name: { label: "Nama", placeholderLabel: "Nama" },
        number: { label: "Angka", placeholderLabel: "Angka" },
        radio: { label: "Tombol radio", placeholderLabel: "Tombol radio" },
        signature: { label: "Tanda tangan", placeholderLabel: "Tanda tangan" },
        text: { label: "Teks", placeholderLabel: "Teks" },
      },
      fields: {
        emptyDescription:
          "Pilih kolom, lalu klik halaman untuk menempatkannya bagi penandatangan yang dipilih.",
        emptyTitle: "Belum ada kolom ditempatkan",
        placedMany: "{count} kolom ditempatkan",
        placedOne: "1 kolom ditempatkan",
        title: "Kolom",
      },
      inspector: {
        emptyHint:
          "Pilih kolom di halaman untuk mengubah pengaturannya, atau pilih alat kolom di sebelah kiri untuk menempatkan kolom baru.",
        noField: "Tidak ada kolom dipilih",
        placeHint: "Klik dokumen untuk menempatkan {field} bagi {signer}.",
        title: "Inspektur",
        toolReady: "{field} siap ditempatkan",
      },
      optionLabel: "Opsi {number}",
      page: {
        ariaDocument: "Halaman dokumen",
        ariaNext: "Halaman berikutnya",
        ariaPrevious: "Halaman sebelumnya",
        label: "Halaman {page} dari {count}",
      },
      placedRadioLabel: "Tombol radio: {label}",
      placement: {
        ariaPlace: "Tempatkan {field} di halaman {page}",
        clickFor: "untuk",
        clickPrefix: "Klik halaman untuk menempatkan",
        ready: "Siap ditempatkan",
        srPlace: "Tempatkan {field} di halaman dokumen",
      },
      save: {
        failed: "Gagal menyimpan",
        saved: "Tersimpan",
        saving: "Menyimpan...",
      },
      signerPanel: {
        newFieldsHere: "Kolom baru akan ditugaskan di sini",
        placing: "Menempatkan {field}",
        title: "Penandatangan dipilih",
      },
      signers: {
        fieldsMany: "{count} kolom ditempatkan",
        fieldsOne: "1 kolom ditempatkan",
        signatureNeeded: "Tanda tangan diperlukan",
        signatureReady: "Tanda tangan siap",
        title: "Penandatangan",
      },
      step: "Langkah 3 dari 4",
      title: '"Dokumen"',
      toolSheet: {
        ariaLabel: "Alat kolom",
        title: "Kolom",
      },
    },
    reminderIntervals: {
      everyDays: "Setiap {days} hari",
      everyDay: "Setiap hari",
      everyWeek: "Setiap minggu",
      off: "Nonaktif",
    },
    review: {
      actions: {
        back: "← Kembali",
        cancel: "Batal",
        send: "Kirim amplop",
        sending: "Sedang mengirim...",
        sendNow: "Kirim sekarang",
      },
      dialog: {
        notifiedFirst:
          "Penandatangan pertama ({name}) akan diberi tahu segera.",
        notifiedImmediate: "{name} akan diberi tahu segera.",
        notifiedParallel:
          "{name} akan diberi tahu segera, untuk menandatangani bersamaan.",
        permittedUseAfter: ".",
        permittedUseBefore:
          "Dengan mengirim, Anda menegaskan bahwa dokumen ini adalah perjanjian bisnis biasa dan bukan wasiat, perintah pengadilan, pemberitahuan konsumen yang diwajibkan hukum, atau ",
        permittedUseLink:
          "dokumen yang tidak dapat ditandatangani secara elektronik",
        signatureType:
          "Jenis tanda tangan: {type}. Jenis ini tidak dapat diubah setelah amplop dikirim.",
        signerOne: "penandatangan",
        signers: "penandatangan",
        summary:
          "“{title}” akan dikirim ke {signerCount} {signerLabel}. {firstSignerNotice} Permintaan kedaluwarsa dalam {deadlineDays} hari.",
        title: "Kirim amplop ini?",
      },
      document: {
        eyebrow: "Dokumen",
        meta: "{filename} - {pageCount} - {sizeLabel}",
        page: "{count} halaman",
        pageOne: "1 halaman",
      },
      empty: {
        action: "Kembali ke penempatan",
        description:
          "Tambahkan penandatangan dan tempatkan kolom sebelum meninjau ringkasan akhir amplop ini.",
        eyebrow: "Draf belum lengkap",
        title: "Belum ada yang ditinjau",
      },
      error: {
        description:
          "Ringkasan draf ini tidak dapat dimuat. Coba lagi setelah memeriksa langkah sebelumnya.",
        retry: "Coba lagi",
        sendFailed: "Gagal mengirim. Silakan coba lagi.",
        title: "Ringkasan tinjauan tidak dapat dimuat",
      },
      fields: {
        countMany: "({count} kolom)",
        countOne: "({count} kolom)",
        none: "Belum ada kolom ditempatkan (0 kolom)",
      },
      header: {
        description: "Langkah 4 dari 4 - Tinjau dan kirim",
        title: "Amplop baru",
      },
      notice: {
        opening: "Membuka tampilan detail amplop...",
        sent: "Amplop terkirim. {name} telah diberi tahu.",
      },
      settings: {
        deadline: "Batas waktu penandatanganan",
        deadlineOption: "{days} hari",
        explanation:
          "Tautan penandatanganan berhenti berfungsi saat batas waktu. Pengingat dikirim kepada penandatangan yang sedang giliran sampai mereka menandatangani. Keduanya dapat diubah kemudian dari halaman amplop.",
        reminders: "Pengingat otomatis",
        signatureType: "Jenis tanda tangan",
      },
      signature: {
        advanced: "Tanda tangan elektronik lanjutan melalui {providerName}",
        parallelBlocked:
          "Tanda tangan ini ditambahkan satu per satu, sehingga penandatangan tidak dapat menandatangani bersamaan. Beri setiap penandatangan langkahnya sendiri, atau pilih tanda tangan Sakta.",
        providerDescription:
          "Setiap penandatangan membuktikan identitasnya di {providerName} dan menandatangani dengan sertifikat atas nama mereka sendiri. {qualifiedNote}Jenis tanda tangan yang diperlukan suatu dokumen adalah pertanyaan hukum; ini bukan nasihat hukum.",
        qualified:
          "Tanda tangan elektronik tersertifikasi melalui {providerName}",
        qualifiedNote:
          "Tanda tangan tersertifikasi memerlukan sertifikat tersertifikasi, yang tidak dimiliki semua penandatangan. ",
        simple: "Tanda tangan Sakta",
        simpleDescription:
          "Penandatangan menandatangani di sini, dan PDF selesai disegel oleh instalasi ini.",
      },
      signingOrder: {
        copies: "Tembusan setelah semua selesai menandatangani",
        parallel:
          "Setelah dikirim, semua penerima bernomor 1 mendapat surel berisi tautan untuk menandatangani. Penandatangan dengan nomor yang sama menandatangani bersamaan, dan nomor berikutnya diundang setelah semuanya selesai.",
        sequential:
          "Setelah dikirim, Penandatangan 1 akan menerima surel berisi tautan untuk menandatangani. Setiap penandatangan diberi tahu bergiliran setelah penandatangan sebelumnya selesai.",
        signer: "Penandatangan {order}",
        signers: "{count} penandatangan",
        signerOne: "{count} penandatangan",
        title: "Urutan penandatanganan",
      },
    },
    signers: {
      actions: {
        addCopy: "+ Tambah penerima tembusan",
        addSigner: "+ Tambah penandatangan lain",
        back: "← Kembali",
        maximumReached: "Batas maksimum tercapai",
        next: "Lanjut →",
        remove: "Hapus",
      },
      checks: {
        accessCode: {
          hint: " (kode sudah disetel; ketik yang baru untuk mengubahnya)",
          label:
            "Kode akses yang Anda berikan sendiri, misalnya melalui telepon",
          placeholder: "Minimal 4 karakter",
          placeholderSaved: "••••••",
        },
        bothNotice:
          "Penandatangan ini memiliki kode melalui surel dan kode akses, jadi keduanya harus dimasukkan. Memilih satu opsi di bawah akan menghapus opsi lainnya.",
        description:
          "Secara default, siapa pun yang memegang tautan melalui surel dapat menandatangani. Pilih pemeriksaan jika identitas penandatangan penting.",
        legend: "Pemeriksaan tambahan sebelum menandatangani",
        options: {
          accessCode: "Minta kode akses yang Anda berikan sendiri",
          emailCode:
            "Kirim kode sekali pakai melalui surel saat mereka membuka tautan",
          none: "Tanpa pemeriksaan tambahan",
        },
        optional: "(opsional)",
        title: "Pemeriksaan tambahan sebelum menandatangani",
      },
      copyIntro: {
        description:
          "Orang-orang ini tidak menandatangani. Mereka menerima dokumen akhir dan sertifikatnya setelah semua selesai menandatangani.",
        optional: "(opsional)",
        title: "Kirim tembusan ke",
      },
      copyRecipient: {
        aria: {
          email: "Surel penerima tembusan {position}",
          name: "Nama penerima tembusan {position}",
          remove: "Hapus penerima tembusan {position}",
        },
        emailPlaceholder: "alex@perusahaan.com",
        label: "Tembusan {position}",
        namePlaceholder: "Alex Jones",
      },
      error: {
        description:
          "Daftar penandatangan draf ini tidak dapat dimuat. Coba lagi dan pastikan langkah unggah berhasil.",
        retry: "Coba lagi",
        title: "Pengaturan penandatangan tidak dapat dimuat",
      },
      fields: {
        email: "Surel",
        name: "Nama",
      },
      header: {
        description: "Langkah 2 dari 4 - Tambah penandatangan",
        title: "Amplop baru",
      },
      intro: {
        limit: "Maksimal {maxSigners} penandatangan per dokumen.",
        parallel:
          "Penandatangan yang menandatangani bersamaan diundang bersama, dan penandatangan berikutnya diundang setelah semuanya selesai.",
        part11:
          "Pada mode Part 11, setiap penandatangan menandatangani setelah penandatangan sebelumnya.",
        title: "Penandatangan akan menerima dokumen dengan urutan ini.",
      },
      route: {
        finishPlural: "selesai",
        finishSingular: "selesai",
        firstImmediate: "Menerima undangan segera setelah dikirim.",
        firstParallel:
          "Menerima undangan segera setelah dikirim, dan menandatangani bersamaan dengan penandatangan lain pada langkah 1.",
        parallel:
          "Menandatangani bersamaan dengan {previous}, setelah {previous} {finishVerb}.",
        sequential: "Menerima dokumen setelah {previous} {finishVerb}.",
      },
      signatureMeaning: {
        choose: "Pilih makna",
        description:
          "Mode Part 11 aktif. Makna tanda tangan dicetak di samping tanda tangan bersama nama penandatangan dan waktunya. Penandatangan harus memiliki akun di sini dengan alamat surel yang telah dikonfirmasi, dan administrator harus telah mengonfirmasi identitas mereka.",
        options: {
          approval: {
            label: "Persetujuan",
            statement: "Saya menyetujui dokumen ini.",
          },
          authorship: {
            label: "Penulisan",
            statement: "Saya adalah penulis dokumen ini.",
          },
          responsibility: {
            label: "Tanggung jawab",
            statement: "Saya bertanggung jawab atas dokumen ini.",
          },
          review: {
            label: "Peninjauan",
            statement: "Saya telah meninjau dokumen ini.",
          },
        },
        title: "Makna tanda tangan ini",
      },
      signer: {
        aria: {
          accessCode: "Kode akses penandatangan {order}",
          check: "Pemeriksaan penandatangan {order}: {label}",
          email: "Surel penandatangan {order}",
          meaning: "Makna tanda tangan penandatangan {order}",
          moveEarlier: "Pindahkan penandatangan {order} lebih awal",
          moveLater: "Pindahkan penandatangan {order} lebih lambat",
          name: "Nama penandatangan {order}",
          remove: "Hapus penandatangan {order}",
        },
        label: "Penandatangan {order}",
        moveEarlier: "Lebih awal",
        moveLater: "Lebih lambat",
        step: " · Langkah {step}",
        stepLabelMany: "Penandatangan {orders}",
        stepLabelOne: "Penandatangan {order}",
        together: "Menandatangani bersamaan dengan Penandatangan {order}",
      },
      validation: {
        accessCodeLength: "Gunakan 4 sampai 64 karakter.",
        accessCodeRequired: "Ketik kode yang akan Anda berikan kepada mereka.",
        duplicateCopy:
          "Alamat ini sudah menjadi penandatangan atau penerima tembusan.",
        duplicateSigner:
          "Setiap penandatangan harus memiliki alamat surel yang unik.",
        emailInvalid: "Masukkan alamat surel yang valid.",
        generic: "Terjadi kesalahan. Silakan coba lagi.",
        nameRequired: "Nama wajib diisi.",
      },
    },
    detail: {
      actions: {
        cancel: "Batal",
        cancelDeletion: "Batalkan penghapusan",
        change: "Ubah",
        continueEditing: "Lanjut mengedit",
        copyToDraft: "Salin ke draf baru",
        deleteDraft: "Hapus draf",
        deleteEnvelope: "Hapus amplop",
        downloadCertificate: "Unduh sertifikat",
        downloadSignedPdf: "Unduh PDF yang ditandatangani",
        exportAudit: "Ekspor jejak audit",
        save: "Simpan",
        saveTemplate: "Simpan sebagai templat",
        saving: "Menyimpan...",
        sendReminder: "Kirim pengingat",
        viewDocument: "Lihat dokumen",
        viewTemplates: "Lihat templat",
        voidEnvelope: "Batalkan amplop",
      },
      back: {
        all: "← Semua amplop",
        own: "← Dokumen",
      },
      copyRecipients: {
        completed: "Dokumen akhir dan sertifikatnya telah dikirim.",
        pending: "Menerima dokumen akhir setelah semua selesai menandatangani.",
        title: "Menerima tembusan",
      },
      created: "Dibuat {date}",
      deadline: {
        change: "Ubah batas waktu",
        changeReminders: "Ubah pengingat",
        expired:
          "Kedaluwarsa {date}. Tidak ada yang dapat menandatangani sampai Anda menetapkan batas waktu baru.",
        expires: "Kedaluwarsa {date}.",
        noDeadline:
          "Tanpa batas waktu. Setiap tautan penandatanganan berlaku tujuh hari.",
        reminderCooldown: "Anda dapat mengirim pengingat lagi setelah {date}.",
        remindersOff: "Pengingat otomatis nonaktif.",
        remindersOn: "Pengingat otomatis: {interval}.",
        setNew: "Tetapkan batas waktu baru",
      },
      deletion: {
        askedByAdmin:
          "{email} memintanya. Administrator mana pun dapat membatalkannya sampai saat itu.",
        askedByOther:
          "Seorang administrator ({email}) memintanya. Unduh PDF yang ditandatangani dan sertifikatnya sebelum itu jika perlu menyimpannya.",
        reason: "Alasan: {reason}",
        scheduled: "Dijadwalkan untuk dihapus pada {date}",
      },
      dialogs: {
        cancelDeletion: {
          confirm: "Batalkan penghapusan",
          description: [
            "Amplop tetap apa adanya dan tidak akan dihapus.",
            "Jika pengirimnya diberi tahu bahwa amplop akan dihapus, mereka akan diberi tahu bahwa tidak jadi.",
          ],
          title: "Batalkan penghapusan ini?",
        },
        copy: {
          body: [
            "Ini memulai draf baru dengan dokumen, orang, dan kolom yang sama. Apa pun yang sudah diisi tidak disalin.",
            "Kode akses tidak disalin: kode disimpan dalam bentuk hash, jadi tidak dapat dibawa. Anda dapat menetapkan yang baru sebelum mengirim.",
            "Tidak ada surel yang dikirim, dan amplop ini dibiarkan apa adanya.",
          ],
          confirm: "Salin ke draf baru",
          copying: "Menyalin...",
          title: "Salin ke draf baru",
        },
        deadline: {
          activeHint:
            "Tautan penandatanganan yang sudah dikirim tetap berfungsi sampai saat itu.",
          expiredHint:
            "Tautan penandatanganan yang sudah dikirim akan berfungsi lagi.",
          explanation: "Batas waktu baru dihitung mulai sekarang.",
          label: "Batas waktu penandatanganan",
          option: "{days} hari dari sekarang",
          save: "Simpan batas waktu",
          title: "Ubah batas waktu",
          titleExpired: "Tetapkan batas waktu baru",
        },
        deleteDraft: {
          confirm: "Hapus draf",
          description: [
            "Draf ini belum dikirim.",
            "Menghapusnya akan menghapus draf dan kolom yang ditempatkan secara permanen.",
          ],
          title: "Hapus draf ini?",
        },
        deleteFinished: {
          confirm: "Jadwalkan penghapusan",
          description: [
            "Amplop, PDF yang ditandatangani, sertifikat, dan jejak auditnya akan dihapus permanen dalam 14 hari. Tautan unduh yang sudah dikirim kepada penandatangan akan berhenti berfungsi saat itu.",
            "Pengirimnya menerima surel sekarang, berisi tautan untuk mengunduh apa yang perlu mereka simpan.",
            "Sampai saat itu administrator mana pun dapat membatalkan. Log audit instalasi mencatat permintaan ini, serta penghapusan beserta sidik jari dokumen.",
          ],
          title: "Jadwalkan penghapusan amplop ini?",
        },
        reason: {
          auditEnvelope: "Disimpan dalam jejak audit amplop.",
          auditInstall: "Disimpan dalam log audit instalasi.",
          optional: "Alasan (opsional)",
          required: "Alasan (wajib)",
        },
        reminders: {
          description:
            "Pengingat dikirim kepada penandatangan yang sedang giliran jika mereka tidak menerima kabar dari Anda selama ini. Pengingat berhenti setelah semua selesai menandatangani atau batas waktu terlewat.",
          label: "Kirim pengingat",
          save: "Simpan pengingat",
          title: "Pengingat otomatis",
        },
        signer: {
          description:
            "Tautan penandatanganan yang sudah dikirim kepada orang ini akan berhenti berfungsi. Jika mereka sedang giliran, undangan baru dikirim ke alamat yang sudah diperbaiki.",
          email: "Surel",
          name: "Nama",
          title: "Perbaiki penandatangan ini",
        },
        void: {
          confirm: "Batalkan amplop",
          description: [
            "Ini akan membatalkan proses penandatanganan.",
            "Penandatangan yang menerima amplop, termasuk yang sudah menandatangani, akan diberi tahu bahwa amplop dibatalkan.",
            "Tindakan ini tidak dapat dibatalkan.",
          ],
          title: "Batalkan amplop ini?",
        },
      },
      error: {
        backToDocuments: "Kembali ke dokumen",
        cancelDeletion: "Penghapusan tidak dapat dibatalkan.",
        cancelDeletionNetwork:
          "Server tidak dapat dihubungi. Muat ulang halaman untuk melihat apakah penghapusan dibatalkan.",
        copy: "Amplop tidak dapat disalin.",
        correctSigner: "Penandatangan tidak dapat diperbaiki.",
        deadline: "Batas waktu tidak dapat diubah.",
        deleteDraft: "Draf tidak dapat dihapus.",
        load: "Amplop tidak dapat dimuat",
        loadDescription: "Amplop ini tidak dapat dimuat. Silakan coba lagi.",
        notFound: "Amplop tidak tersedia",
        notFoundDescription:
          "Amplop tidak ditemukan, atau Anda tidak lagi memiliki akses.",
        notFoundEyebrow: "Tidak tersedia",
        nudge: "Pengingat tidak dapat dikirim sekarang.",
        reminders: "Pengingat tidak dapat diubah.",
        retry: "Coba lagi",
        scheduleDeletion: "Penghapusan amplop tidak dapat dijadwalkan.",
        scheduleDeletionNetwork:
          "Server tidak dapat dihubungi. Muat ulang halaman untuk melihat apakah penghapusan dijadwalkan.",
        void: "Amplop tidak dapat dibatalkan.",
      },
      savedTemplate: "Disimpan sebagai templat “{name}”.",
      sentBy: "Dikirim oleh {name}",
      signers: {
        title: "Penandatangan",
        total: "{count} orang",
      },
      status: {
        envelope: {
          completed: "Selesai",
          declined: "Ditolak",
          draft: "Draf",
          sent: "Terkirim",
          voided: "Dibatalkan",
        },
        expired: "Kedaluwarsa",
        signer: {
          declined: "Ditolak",
          pending: "Tertunda",
          signed: "Sudah menandatangani",
          waiting: "Menunggu",
        },
      },
      templatePrompt:
        "Sering mengirim dokumen seperti ini? Simpan kolom dan urutan penandatanganannya sebagai templat.",
      timeline: {
        events: "{count} peristiwa",
        title: "Linimasa",
      },
      viewDocumentAria: "Lihat {title} (membuka tab baru)",
    },
    upload: {
      action: {
        fromTemplate: "Mulai dari templat",
        next: "Lanjut →",
        remove: "Hapus",
      },
      dropzone: {
        ariaLabel: "Area unggah dokumen",
        browse: "klik untuk memilih berkas",
        constraint: "Hanya PDF - maks. 20 MB",
        drag: "Tarik dan lepas PDF Anda di sini",
        or: "atau",
        progressAriaLabel: "Progres unggahan",
        uploading: "Sedang mengunggah...",
        validating:
          "Memvalidasi PDF sebelum Anda melanjutkan ke pengaturan penandatangan.",
      },
      error: {
        generic: "Terjadi kesalahan. Silakan coba lagi.",
        invalidType:
          "Hanya berkas PDF yang didukung. Silakan unggah PDF yang valid.",
        locked:
          "PDF ini dilindungi kata sandi atau terenkripsi. Silakan unggah PDF yang tidak terkunci.",
        previewUnavailable:
          "PDF ini tidak dapat dirender di editor. Ekspor sebagai PDF standar lalu coba lagi.",
        tooLarge: "Berkas ini melebihi batas 20 MB.",
      },
      fileInputAriaLabel: "Unggah PDF",
      header: {
        description: "Langkah 1 dari 4 - Unggah dokumen",
        title: "Amplop baru",
      },
      title: {
        label: "Judul amplop",
        placeholder: "mis., NDA - Klien Bravo",
      },
    },
    placedField: {
      ariaLabel: "{name} · {label}",
      corners: {
        bottomLeft: "kiri bawah",
        bottomRight: "kanan bawah",
        topLeft: "kiri atas",
        topRight: "kanan atas",
      },
      resizeAriaLabel: "Ubah ukuran kolom {label} dari {corner}",
    },
    pdfPage: {
      ariaLabel: "Halaman PDF yang dirender {page}",
      error: {
        description: "Muat ulang halaman atau coba draf ini lagi sebentar.",
        title: "Halaman PDF ini tidak dapat dirender.",
      },
      loading: {
        description:
          "Menyiapkan PDF sumber agar kolom yang ditempatkan tetap sejajar dengan ukuran halaman yang tersimpan.",
        title: "Sedang merender halaman dokumen...",
      },
    },
  },
  footer: {
    accessibilityLong: "Pernyataan Aksesibilitas",
    accessibilityShort: "Aksesibilitas",
    ariaLabel: "Tautan footer",
    contact: "Kontak",
    english: "English",
    indonesian: "Bahasa Indonesia",
    languageAriaLabel: "Pilih bahasa",
    permittedUseLong: "Untuk apa ini digunakan",
    permittedUseShort: "Tanda tangan elektronik",
    poweredBy: "Didukung oleh {productName}",
    privacyLong: "Kebijakan Privasi",
    privacyNotice: "Pemberitahuan privasi",
    privacyShort: "Privasi",
    termsLong: "Syarat Layanan",
    termsShort: "Syarat",
  },
  landing: {
    actions: {
      goToDashboard: "Buka dasbor",
      logIn: "Masuk",
      startFree: "Mulai gratis",
    },
    closing: {
      body: "Tanpa kartu kredit. Tanpa biaya per amplop. Cukup unggah dan kirim.",
      note: "Gratis • tidak perlu akun penandatangan • hingga 25 penandatangan per dokumen",
      title: "Kirim perjanjian berikutnya. Gratis dari kami.",
    },
    comparison: {
      feature: "Fitur",
      included: "Termasuk",
      notIncluded: "Tidak termasuk",
      perSeatPlans: "Paket per pengguna",
      rows: {
        envelopes: {
          feature: "Amplop per bulan",
          perSeat: "Tergantung paket",
          signudoc: "Tidak terbatas",
        },
        price: {
          feature: "Harga",
          perSeat: "Per pengguna, setiap bulan",
          signudoc: "Gratis selamanya",
        },
        reminders: {
          feature: "Pengingat",
          perSeat: "Hanya paket lebih tinggi",
        },
        signers: {
          feature: "Penandatangan per dokumen",
          perSeat: "Tergantung paket",
          signudoc: "Hingga 25 orang",
        },
      },
    },
    faq: {
      items: [
        {
          answer:
            "Tidak. Anda masuk untuk mengirim dokumen, tetapi penandatangan cukup mengklik tautan lalu menandatangani. Tanpa akun, tanpa ribet.",
          question: "Apakah penandatangan memerlukan akun Sakta?",
        },
        {
          answer:
            "Tanda tangan, inisial, tanggal, teks, dan kotak centang. Semua yang biasanya dibutuhkan dokumen.",
          question: "Jenis kolom apa saja yang bisa saya pasang pada dokumen?",
        },
        {
          answer:
            "Bisa. Klik tombol pengingat, lalu mereka akan mendapat notifikasi. Anda tidak perlu mengirim ulang seluruh dokumen.",
          question:
            "Bisakah saya mengingatkan penandatangan yang terlalu lama?",
        },
        {
          answer:
            "Anda mendapat PDF final yang telah ditandatangani serta sertifikat anti-perubahan. Unduh keduanya dengan satu klik.",
          question:
            "Apa yang saya dapatkan setelah semua orang selesai menandatangani?",
        },
      ],
      marker: "Pertanyaan umum",
      title: "Jawaban singkat.",
    },
    hero: {
      headline: "Tandatangani PDF Secara Online, Gratis.",
      headlineAccent: "Tanpa syarat tersembunyi.",
      lead: "Unggah PDF, tambahkan kolom tanda tangan, lalu kirim. Selesai.",
      marker: "Perangkat lunak tanda tangan elektronik gratis",
      seeHowItWorks: "Lihat cara kerjanya",
    },
    metadata: {
      description:
        "Perangkat lunak tanda tangan elektronik gratis untuk usaha kecil. Unggah, kirim, tanda tangani — tanpa kerumitan ala perusahaan besar.",
    },
    nav: {
      ariaLabel: "Navigasi publik",
    },
    pricing: {
      allPlans: "Lihat semua paket",
      lead: "Semua di bawah ini sudah termasuk. Selamanya. Gratis. Lihat perbandingannya dengan paket tanda tangan elektronik per pengguna pada umumnya.",
      marker: "Harga",
      signersNote: "Penandatangan Anda tidak perlu membuat akun.",
      title: "Gratis lebih unggul dari $120 setahun.",
    },
    security: {
      lead: "Setiap PDF dienkripsi, setiap tindakan dicatat, dan setiap tautan tanda tangan diamankan secara kriptografis. Kode sumbernya terbuka agar Anda dapat memverifikasinya sendiri.",
      marker: "Keamanan",
      pillars: [
        {
          body: "Dokumen disimpan di penyimpanan privat yang terenkripsi. Semua koneksi menggunakan HTTPS dengan penerapan HSTS.",
          title: "Dienkripsi saat tersimpan dan saat dikirim",
        },
        {
          body: "Setiap pembukaan, tanda tangan, dan penolakan dicatat dengan cap waktu dan alamat IP. Unduh PDF sertifikat sebagai bukti.",
          title: "Catatan audit lengkap",
        },
        {
          body: "Setiap penandatangan mendapat token kriptografis yang unik. Tautan kedaluwarsa sesuai batas waktu yang ditetapkan pengirim dan tidak dapat ditebak atau dipakai ulang.",
          title: "Tautan tanda tangan yang aman",
        },
        {
          body: "Seluruh kode sumbernya terbuka. Periksa model keamanannya, audit logikanya, atau pasang sendiri di infrastruktur Anda.",
          title: "Sumber terbuka",
        },
      ],
      title: "Dokumen Anda tetap aman.",
    },
    workflow: {
      lead: "Unggah PDF, tentukan urutan tanda tangan, pasang kolom, lalu kirim. Penandatangan Anda bahkan tidak perlu membuat akun.",
      marker: "Cara kerja",
      steps: [
        {
          body: "Gunakan kontrak yang sudah Anda susun. Tidak perlu membuat ulang dari templat.",
          title: "Unggah PDF Anda",
        },
        {
          body: "Tentukan siapa yang menandatangani pertama, kedua, dan seterusnya. Setiap orang diundang setelah sebelumnya selesai.",
          title: "Tambahkan penandatangan",
        },
        {
          body: "Letakkan kolom tanda tangan, inisial, tanggal, teks, dan kotak centang di halaman.",
          title: "Pasang kolom",
        },
        {
          body: "Kirim tautan tanda tangan. Ingatkan yang belum selesai. Unduh PDF finalnya.",
          title: "Kirim dan pantau",
        },
      ],
      title: "Empat langkah. Satu dokumen yang ditandatangani.",
    },
  },
  pricingPage: {
    bottom: {
      body: "Sakta berbasis open source dengan lisensi MIT. Pasang di infrastruktur Anda sendiri, atau minta kami menyiapkan hosting khusus.",
      cta: "Bicara dengan kami",
      title: "Butuh instalasi sendiri?",
    },
    cards: {
      business: {
        cta: "Hubungi kami",
        footnote: "Faktur dengan NPWP tersedia.",
        name: "Bisnis",
        tagline: "Untuk perusahaan yang perlu menghubungkan sistem.",
      },
      free: {
        cta: "Mulai gratis",
        footnote: "Tanpa kartu kredit. Tanpa batas waktu.",
        name: "Gratis",
        tagline: "Untuk mencoba seluruh alur tanda tangan.",
      },
      standard: {
        cta: "Mulai gratis",
        footnote: "Ditagih tahunan, bisa dibatalkan kapan saja.",
        name: "Standar",
        tagline: "Untuk tim kecil yang menandatangani tiap minggu.",
      },
    },
    comparison: {
      feature: "Fitur",
      lead: "Setiap paket bisa menandatangani PDF, mencatat persetujuan, dan menghasilkan segel dokumen. Paket lebih tinggi menambahkan alat yang dibutuhkan tim yang berkembang.",
      rows: [
        {
          business: "Tidak terbatas",
          free: "Tidak terbatas",
          label: "Dokumen per bulan",
          standard: "Tidak terbatas",
        },
        {
          business: "Hingga 25 orang",
          free: "Hingga 25 orang",
          label: "Penandatangan per dokumen",
          standard: "Hingga 25 orang",
        },
        {
          business: "Termasuk",
          free: "Termasuk",
          label: "Menandatangani tanpa akun",
          standard: "Termasuk",
        },
        {
          business: "Termasuk",
          free: "Termasuk",
          label: "Urutan tanda tangan dan penerima salinan",
          standard: "Termasuk",
        },
        {
          business: "Termasuk",
          free: "Termasuk",
          label: "Catatan audit, PDF tersegel, dan sertifikat",
          standard: "Termasuk",
        },
        {
          business: "Termasuk",
          free: "Termasuk",
          label: "Halaman Verify publik",
          standard: "Termasuk",
        },
        {
          business: "Termasuk",
          free: "Tidak termasuk",
          label: "Templat yang dapat dipakai ulang",
          standard: "Termasuk",
        },
        {
          business: "Termasuk",
          free: "Tidak termasuk",
          label: "Tenggat dan pengingat otomatis",
          standard: "Termasuk",
        },
        {
          business: "Termasuk",
          free: "Tidak termasuk",
          label: "Logo dan warna merek sendiri",
          standard: "Termasuk",
        },
        {
          business: "Termasuk",
          free: "Tidak termasuk",
          label: "Kode akses dan kode sekali pakai lewat email",
          standard: "Termasuk",
        },
        {
          business: "Termasuk",
          free: "Tidak termasuk",
          label: "Kirim massal dari CSV",
          standard: "Tidak termasuk",
        },
        {
          business: "Termasuk",
          free: "Tidak termasuk",
          label: "API, webhook, dan tanda tangan tersemat",
          standard: "Tidak termasuk",
        },
        {
          business: "Termasuk",
          free: "Tidak termasuk",
          label: "Masuk tunggal (OpenID Connect)",
          standard: "Tidak termasuk",
        },
        {
          business: "Email prioritas",
          free: "Isu GitHub",
          label: "Dukungan",
          standard: "Email",
        },
      ],
      title: "Bandingkan semua paket",
    },
    cycle: {
      annual: "Tahunan",
      free: "Gratis selamanya",
      label: "Periode penagihan",
      monthly: "Bulanan",
      perMonth: "per bulan",
      perUser: "per pengguna",
      perYear: "per tahun",
      save: "Hemat 2 bulan",
    },
    featured: "Paling populer",
    hero: {
      eyebrow: "Harga",
      lead: "Alur tanda tangan yang sama seperti platform besar, dengan harga jauh lebih terjangkau. Tanpa kuota dokumen dan tanpa biaya tersembunyi.",
      note: "Harga dalam rupiah. Paket tahunan sudah termasuk dua bulan gratis.",
      title: "Setiap tanda tangan, dengan harga yang masuk akal di sini.",
    },
    included: "Termasuk",
    metadata: {
      description:
        "Harga tanda tangan elektronik yang sederhana dan transparan untuk tim Indonesia. Mulai gratis, lalu bayi hanya untuk pengguna yang Anda butuhkan.",
      title: "Harga | Sakta",
    },
    notIncluded: "Tidak termasuk",
  },
  email: {
    legalFooter: {
      contact: "Kontak",
      privacyNotice: "Pemberitahuan privasi",
      privacyPolicy: "Kebijakan Privasi",
      questions: "Ada pertanyaan? Hubungi {supportAddress}.",
      sentBy: "Dikirim menggunakan {productName}.",
      sentByOrganization:
        "Dikirim oleh {organizationName} menggunakan {productName}.",
      terms: "Syarat Layanan",
    },
    completedSender: {
      body: '"{title}" telah ditandatangani secara lengkap di {productName}.',
      cta: "Tinjau amplop yang telah selesai",
      dashboard:
        "PDF final yang telah ditandatangani dan sertifikatnya sudah tersedia di dasbor Anda.",
      greeting: "Hai {senderName},",
      subject: '"{title}" telah ditandatangani secara lengkap',
    },
    completedSigner: {
      attached:
        "Dokumen yang telah selesai dan sertifikatnya terlampir. Simpanlah keduanya: itulah salinan perjanjian Anda.",
      body: '"{title}" dari {senderName} telah ditandatangani secara lengkap di {productName}.',
      certificate: "Sertifikat yang disunting: {url}",
      copyOnly: "{senderName} meminta Anda menerima salinan.",
      downloadCertificate: "Unduh sertifikat yang disunting",
      downloadSigned: "Unduh PDF yang telah ditandatangani",
      greeting: "Hai {signerName},",
      htmlLinksIntro:
        "Tautan unduhan tersedia selama {days} hari. Tautan yang kedaluwarsa menawarkan pengiriman yang baru.",
      linksIntro:
        "Tautan unduhan (tersedia selama {days} hari; tautan yang kedaluwarsa menawarkan pengiriman yang baru):",
      ready: "Dokumen yang telah selesai dan sertifikatnya sudah tersedia.",
      signedPdf: "PDF yang telah ditandatangani: {url}",
      subject: '"{title}" telah ditandatangani secara lengkap',
    },
    declinedSender: {
      body: '{signerName} ({signerEmail}) menolak "{title}" di {productName}.',
      cta: "Tinjau amplop",
      greeting: "Hai {senderName},",
      reason: "Alasan yang diberikan: {reason}",
      subject: '"{title}" ditolak oleh {signerName}',
    },
    downloadLinks: {
      certificate: "Sertifikat: {url}",
      ctaCertificate: "Unduh sertifikat",
      ctaSigned: "Unduh PDF yang telah ditandatangani",
      greeting: "Hai {signerName},",
      intro:
        'Berikut tautan unduhan baru untuk "{title}" di {productName}. Tautan ini berlaku selama {days} hari.',
      keep: "Unduh dan simpan berkasnya: itulah salinan catatan Anda.",
      signedPdf: "PDF yang telah ditandatangani: {url}",
      subject: 'Tautan unduhan baru untuk "{title}"',
    },
    reminder: {
      introAutomatic:
        '{senderName} masih menunggu tanda tangan Anda atas "{envelopeTitle}" yang dikirim melalui {productName}.',
      introManual:
        '{senderName} mengirimi Anda pengingat untuk menandatangani "{envelopeTitle}" melalui {productName}.',
      subjectAutomatic:
        'Pengingat: {senderName} masih menunggu tanda tangan Anda atas "{envelopeTitle}"',
      subjectManual:
        '{senderName} mengirimi Anda pengingat untuk menandatangani "{envelopeTitle}"',
    },
    signingInvitation: {
      cta: "Tinjau dan tanda tangani dokumen",
      deadline: "Permintaan ini kedaluwarsa pada {deadline}.",
      greeting: "Hai {signerName},",
      newestLink:
        "Jika Anda menerima tautan undangan atau pengingat yang lebih baru, gunakan tautan yang terbaru.",
      noAccount: "Anda tidak perlu akun {productName} untuk menandatangani.",
      sent: "{senderName} mengirimi Anda “{envelopeTitle}” melalui {productName}.",
      subject: "{senderName} meminta tanda tangan Anda atas “{envelopeTitle}”",
    },
    signingCode: {
      body: 'Kode Anda untuk membuka "{title}" di {productName} adalah:',
      greeting: "Hai {signerName},",
      subject: 'Kode Anda untuk "{title}"',
      validity:
        "Kode ini berlaku selama {minutes} menit. Jika Anda baru saja tidak membuka tautan tanda tangan, abaikan email ini.",
    },
    voidNotification: {
      body: '{senderName} membatalkan "{title}" di {productName}.',
      greeting: "Hai {signerName},",
      outcomeSigned:
        "Proses penandatanganan dibatalkan, sehingga dokumen yang Anda tandatangani tidak akan diselesaikan. Tidak ada tindakan lebih lanjut yang diperlukan.",
      outcomeUnsigned:
        "Proses penandatanganan dibatalkan. Tidak ada tindakan lebih lanjut yang diperlukan.",
      subject: '"{title}" dibatalkan oleh {senderName}',
    },
  },
  done: {
    closeTab: "Anda dapat menutup tab ini.",
    emailNotice:
      "Anda akan menerima email berisi dokumen yang telah ditandatangani setelah semua pihak menandatanganinya.",
    fallbackTitle: "dokumen ini",
    recorded: 'Tanda tangan Anda telah dicatat untuk "{title}".',
    title: "Semua sudah selesai.",
  },
  verify: {
    form: {
      choose: "Pilih PDF yang telah ditandatangani atau sertifikat audit",
      checkError: "File tidak dapat diperiksa saat ini.",
      checking: "Memeriksa {fileName}...",
      fileLabel: "PDF untuk diverifikasi",
      finishedAt: " pada {date} UTC",
      matchBody:
        "Amplop {status}{finishedAt} dengan {signerCount} {signers}. ID amplop {envelopeId}.",
      matchTitle:
        'File ini tidak berubah. Ini adalah {fileKind} yang dihasilkan situs ini untuk "{title}".',
      noMatchBody:
        "Situs ini tidak menghasilkan file yang persis sama. File ini mungkin telah diubah, disimpan ulang oleh program lain, atau berasal dari tempat lain. Mintalah salinan yang tersimpan di situs ini kepada pengirim.",
      noMatchTitle: "Tidak cocok.",
      privacy:
        "File tetap berada di perangkat Anda. Hanya sidik jari SHA-256-nya yang dikirim.",
      readError: "File tidak dapat dibaca.",
      signersMany: "penandatangan",
      signersOne: "penandatangan",
      statuses: {
        completed: "selesai",
        declined: "ditolak",
        voided: "dibatalkan",
      },
      types: {
        certificate: "sertifikat audit",
        signedDocument: "dokumen yang ditandatangani",
      },
    },
    metadata: {
      description:
        "Periksa bahwa PDF yang telah ditandatangani atau sertifikat audit benar-benar file yang dihasilkan situs ini.",
      title: "Verifikasi dokumen",
    },
    page: {
      description:
        "Periksa bahwa PDF yang telah ditandatangani atau sertifikat audit benar-benar file yang dihasilkan situs ini saat tanda tangan selesai. Perubahan sekecil apa pun pada file menghasilkan sidik jari yang berbeda.",
      sealBody:
        "Dokumen dan sertifikat yang selesai juga memiliki segel digital. Buka file di Adobe Acrobat Reader atau pembaca PDF lain dan lihat panel tanda tangannya. Pembaca tersebut memberi tahu apakah dokumen telah diubah sejak disegel. Kecuali organisasi telah memasang sertifikat dari otoritas sertifikat, pembaca juga akan menyatakan identitas penandatangan tidak diketahui; itu wajar dan tidak memengaruhi pemeriksaan perubahan.",
      sealHeading: "Memeriksa segel di pembaca PDF",
      title: "Verifikasi dokumen",
    },
  },
  signing: {
    live: {
      aria: {
        agreeToElectronicRecords:
          "Saya menyetujui penggunaan catatan dan tanda tangan elektronik",
        confirmSignatureMeaning: "Saya mengonfirmasi makna tanda tangan saya",
        documentPage: "Halaman dokumen",
        drawSignatureCanvas: "Kanvas gambar tanda tangan",
        nextPage: "Halaman berikutnya",
        previousPage: "Halaman sebelumnya",
        signaturePreview: "Pratinjau {kind}",
      },
      assignedFields: "Bidang yang ditugaskan",
      beforeYouSign: {
        description:
          '{senderName} mengirimi Anda "{envelopeTitle}" untuk ditandatangani secara elektronik.',
        title: "Sebelum Anda menandatangani",
      },
      completedAlt: "{signerName} menyelesaikan {kind}",
      currentSigner: "Penandatangan saat ini",
      decline: {
        cancel: "Batal",
        confirm: "Tolak penandatanganan",
        confirming: "Menolak...",
        description:
          "Pengirim ({senderName}) akan diberi tahu bahwa Anda menolak. Tindakan ini tidak dapat dibatalkan.",
        dialogTitle: "Tolak penandatanganan?",
        reasonLabel: "Alasan (opsional)",
        reasonPlaceholder:
          "Saya ingin mendiskusikan beberapa ketentuan terlebih dahulu...",
        toolbarButton: "Tolak",
      },
      declinedConfirmation: {
        description:
          "Penolakan Anda telah dicatat. Tidak ada tindakan lebih lanjut, dan tautan ini tidak lagi membuka dokumen.",
        title: "Anda menolak untuk menandatangani",
      },
      defaultConsentErrorMessage:
        "Persetujuan Anda tidak dapat disimpan saat ini.",
      defaultDeclineErrorMessage:
        "Kami tidak dapat mencatat penolakan Anda saat ini. Muat ulang halaman atau minta tautan tanda tangan baru dari pengirim.",
      defaultSubmitErrorMessage:
        "Kami tidak dapat menyelesaikan penandatanganan saat ini. Muat ulang halaman atau minta tautan tanda tangan baru dari pengirim.",
      document: {
        allRequiredComplete: "Semua bidang wajib telah diisi",
        fieldAnswerTooLong:
          "Jawaban ini terlalu panjang untuk muat di kolomnya pada dokumen. Persingkat menjadi {maxCharacters} karakter atau kurang.",
        invalidNumberNotice:
          "Bidang angka yang ditandai merah tidak berisi angka. {numberEntryMessage}",
        lockedValuesHelper:
          "Nilai dari penandatangan sebelumnya tetap terlihat tetapi terkunci. Hanya bidang yang ditugaskan kepada Anda yang dapat diubah.",
        numberEntryMessage: "Masukkan angka, misalnya 1250 atau 12.5.",
        readyToFinish: "Siap diselesaikan",
        remainingFieldsMany: "{count} bidang wajib tersisa",
        remainingFieldsOne: "{count} bidang wajib tersisa",
        textFieldTooLong:
          "Kolom teks di halaman {page} sudah penuh: persingkat jawaban Anda menjadi {count} karakter atau kurang agar seluruhnya muat di dokumen.",
      },
      downloadPdf: "Unduh PDF",
      field: {
        canvasLabels: {
          checkbox: "Kotak centang",
          date: "Tanggal",
          dropdown: "Pilih",
          fallback: "Bidang",
          initials: "Inisial",
          name: "Nama",
          number: "Angka",
          radio: "Opsi",
          signature: "Tanda tangan",
          text: "Teks",
        },
        completionValues: {
          checked: "Dicentang",
          chooseOne: "Pilih salah satu",
          enterANumber: "Masukkan angka",
          enterText: "Masukkan teks",
          notANumber: "Bukan angka",
          optional: "Opsional",
          tapToSign: "Ketuk untuk menandatangani",
        },
        inputLabels: {
          checkbox: "Kotak centang",
          date: "Tanggal",
          dropdown: "Pilih salah satu",
          fallback: "Bidang",
          initials: "Inisial di sini",
          name: "Nama",
          number: "Masukkan angka",
          radio: "Opsi",
          signature: "Tanda tangani di sini",
          text: "Masukkan teks",
        },
        noAnswer: "Tidak ada jawaban",
        signatureKinds: {
          initials: "inisial",
          signature: "tanda tangan",
        },
        summaryLabels: {
          checkbox: "Kotak centang",
          choice: "Pilihan",
          date: "Tanggal",
          dropdown: "Menu pilihan",
          fallback: "Bidang",
          initials: "Inisial",
          name: "Nama",
          number: "Angka",
          signature: "Tanda tangan",
          textInput: "Input teks",
        },
        unchecked: "Tidak dicentang",
      },
      fieldStatus: {
        complete: "Lengkap",
        fixThis: "Perbaiki",
        required: "Wajib",
      },
      finish: {
        agreeAndContinue: "Setuju dan lanjutkan",
        back: "Kembali",
        bindingNotice:
          "Dengan mengklik Selesai, Anda mengonfirmasi bahwa tanda tangan elektronik Anda dimaksudkan untuk mengikat secara hukum bagi dokumen ini.",
        button: "Selesai",
        confirmMeaningCheckbox:
          "Saya mengonfirmasi makna ini. Nama saya, tanggal dan waktu, serta makna ini akan dicetak bersama tanda tangan saya.",
        description: 'Anda menandatangani "{envelopeTitle}" dari {senderName}.',
        continueToProvider: "Lanjutkan ke {providerName}",
        finishing: "Menyelesaikan...",
        finishSigning: "Selesaikan penandatanganan",
        meaningHeading: "Makna tanda tangan Anda",
        preparing: "Menyiapkan...",
        providerBindingNotice:
          "Selanjutnya, {providerName} meminta Anda mengonfirmasi identitas dan menyetujui tanda tangan. Setelah selesai, Anda kembali ke sini. Dengan melanjutkan, Anda mengonfirmasi bahwa tanda tangan Anda dimaksudkan untuk mengikat secara hukum bagi dokumen ini.",
        providerSignatureIntro:
          "Dokumen ini meminta {signatureLevel}, yang dibuat dengan sertifikat atas nama Anda sendiri.",
        reauthEmailLabel: "Alamat email",
        reauthHelper:
          "Masukkan alamat email dan kata sandi akun Anda untuk menandatangani.",
        reauthPasswordLabel: "Kata sandi",
        signatureLevels: {
          advanced: "tanda tangan elektronik tingkat lanjut",
          qualified: "tanda tangan elektronik berkualifikasi",
        },
        summaryRowLabel: "{label} · Halaman {page}",
        title: "Selesaikan penandatanganan?",
      },
      fromSender: "Dari {senderName}",
      pageLabel: "Halaman {page} dari {total}",
      providerProblems: {
        cancelled:
          "Anda tidak menyelesaikan penandatanganan di {providerName}. Tidak ada yang ditandatangani, jadi Anda dapat mencoba lagi.",
        expired:
          "Sesi penandatanganan Anda sebelumnya berakhir sebelum selesai. Tidak ada yang ditandatangani, jadi Anda dapat mencoba lagi.",
        failed:
          "{providerName} tidak dapat menyelesaikan tanda tangan Anda. Tidak ada yang ditandatangani. Coba lagi, atau minta bantuan pengirim.",
        name: "Sertifikat yang Anda gunakan di {providerName} tidak sesuai dengan nama tempat dokumen ini dikirim. Tidak ada yang ditandatangani. Jika namanya salah, minta pengirim mengirim ulang dokumen dengan nama yang tertera pada sertifikat Anda.",
      },
      signatureModal: {
        addInitials: "Tambahkan inisial Anda",
        addSignature: "Tambahkan tanda tangan Anda",
        applyInitials: "Terapkan inisial",
        applySignature: "Terapkan tanda tangan",
        cancel: "Batal",
        canvasClearedMany: "Kanvas dihapus {count} kali",
        canvasClearedOne: "Kanvas dihapus {count} kali",
        clear: "Hapus",
        description:
          "Dengan menandatangani, Anda menyetujui bahwa tanda tangan elektronik ini setara secara hukum dengan tanda tangan manual Anda.",
        drawnInitials: "Inisial yang digambar",
        drawnSignature: "Tanda tangan yang digambar",
        drawTab: "Gambar",
        drawWithMouseOrFinger: "Gambar dengan mouse atau jari",
        renderedInStyle: "Ditampilkan dengan gaya tanda tangan",
        typeInitials: "Ketik inisial",
        typeSignature: "Ketik tanda tangan",
        typeTab: "Ketik",
        typeYourInitials: "Ketik inisial Anda",
        typeYourSignature: "Ketik tanda tangan Anda",
      },
      toolbar: {
        currentSignerView: "Tampilan penandatangan saat ini",
        noFieldsOnPage: "Tidak ada bidang di halaman ini",
        readyToFinish: "Siap diselesaikan",
        remainingMany: "{count} masih wajib",
        remainingOne: "{count} masih wajib",
        signedValuesVisible: "Nilai terkunci terlihat",
      },
    },
    states: {
      "already-signed": {
        description: "Anda sudah menyelesaikan tanda tangan untuk dokumen ini.",
        title: "Anda sudah menandatangani",
      },
      completed: {
        description:
          "Semua orang telah menandatangani dokumen ini. Tidak ada tindakan lebih lanjut.",
        title: "Amplop ini telah selesai",
      },
      declined: {
        description:
          "Seorang penandatangan menolak dokumen ini. Tidak ada tindakan lebih lanjut.",
        title: "Amplop ini ditolak",
      },
      embeddedExpiredDescription:
        "Minta aplikasi yang Anda gunakan untuk tautan tanda tangan baru.",
      error: {
        description:
          "Kami tidak dapat memuat dokumen ini saat ini. Muat ulang halaman atau minta tautan tanda tangan baru dari pengirim.",
        title: "Terjadi kesalahan. Silakan coba lagi.",
      },
      expired: {
        description: "Minta tautan tanda tangan baru dari pengirim.",
        title: "Tautan ini telah kedaluwarsa",
      },
      voided: {
        description:
          "Pengirim membatalkan dokumen ini. Tidak ada tindakan lebih lanjut.",
        title: "Amplop ini dibatalkan",
      },
    },
    verification: {
      checkError: "Kode tidak dapat diperiksa saat ini.",
      codeAlreadySent:
        "Kode sudah dikirim ke {maskedEmail} kurang dari satu menit yang lalu, jadi tidak ada email baru yang dikirim. Gunakan kode itu, atau kirim yang baru setelah hitung mundur pada tombol berakhir.",
      codeResendReady:
        "Kode telah dikirim ke {maskedEmail}. Jika belum sampai, Anda dapat mengirim yang baru sekarang.",
      codeSent: "Kode telah dikirim ke {maskedEmail}.",
      continue: "Lanjutkan",
      emailHelper: "Alamat tempat dokumen ini dikirim ({maskedEmail}).",
      emailLabel: "Alamat email",
      firstCode: "Kirimi saya kode",
      intro:
        "{senderName} meminta pemeriksaan sebelum Anda membuka “{envelopeTitle}”.",
      methods: {
        access_code: {
          helper:
            "Pengirim memberikan kode ini kepada Anda secara terpisah, misalnya melalui telepon.",
          label: "Kode akses",
        },
        account: {
          helper:
            "Dokumen ini ditandatangani dengan akun Anda sendiri di sini. Masukkan kata sandi yang Anda gunakan untuk masuk.",
          label: "Kata sandi",
        },
        email_code: {
          helper:
            "Kami mengirim kode 6 digit ke alamat tempat dokumen ini dikirim.",
          label: "Kode dari email Anda",
        },
      },
      newCodeSent: "Kode baru telah dikirim ke {maskedEmail}.",
      resendError: "Kode tidak dapat dikirim saat ini.",
      resendIn: "Kirim kode baru dalam {seconds} detik",
      resendNew: "Kirim kode baru",
      step: "Langkah {step} dari {total}.",
      title: "Konfirmasi bahwa ini Anda",
    },
  },
  permittedUse: {
    hero: {
      description:
        "{platformName} mengumpulkan tanda tangan elektronik. Halaman ini menjelaskan dokumen mana yang dimaksud, dan mana yang tidak.",
      title: "Untuk apa ini",
    },
    metadata: {
      description:
        "Dokumen apa saja yang dapat ditandatangani di sini, dan seperti apa tanda tangan elektronik yang digunakan.",
      title: "Tanda tangan elektronik: untuk apa ini",
    },
    sections: {
      euLimits: {
        heading: "Perlu kehati-hatian (Uni Eropa)",
        intro:
          "eIDAS memberi wewenang kepada negara anggota untuk menentukan dokumen mana yang memerlukan bentuk yang lebih kuat. Biasanya yang termasuk:",
        items: [
          "Kontrak yang menimbulkan atau memindahkan hak atas properti tetap (selain sewa), yang di sebagian besar negara anggota wajib dibuat dalam bentuk akta notaris.",
          "Kontrak yang menurut undang-undang memerlukan pengadilan, otoritas publik, atau notaris.",
          "Kontrak penanggungan dan jaminan yang dibuat konsumen, serta perkara hukum keluarga atau warisan, di banyak negara anggota.",
          "Hal apa pun yang menurut hukum Anda wajib memakai tanda tangan elektronik terkualifikasi (QES), kecuali instalasi ini memiliki penyedia layanan penandatanganan dan amplop dikirim dengan tanda tangan terkualifikasi, dengan setiap penandatangan memegang sertifikat terkualifikasi.",
        ],
      },
      indonesia: {
        heading: "Di Indonesia",
        paragraphs: [
          "Hukum Indonesia, termasuk Undang-Undang Informasi dan Transaksi Elektronik (UU ITE) sebagaimana telah diubah serta PP Nomor 71 Tahun 2019, mengakui tanda tangan dan catatan elektronik. Situs ini menyimpan jejak audit dan salinan PDF tersegel dari setiap dokumen yang telah ditandatangani agar proses penandatanganan dapat dijelaskan kemudian.",
          "{platformName} tidak menerbitkan sertifikat elektronik tersertifikasi dari Penyelenggara Sertifikat Elektronik yang disetujui. Jika transaksi Anda memerlukannya, atau memerlukan notaris atau saksi, jangan gunakan situs ini untuk dokumen tersebut.",
        ],
      },
      usExcluded: {
        heading: "Jangan kirim dokumen ini (Amerika Serikat)",
        intro:
          "Undang-Undang ESIGN federal (15 U.S.C. 7003) dan Uniform Electronic Transactions Act (UETA) yang diadopsi negara bagian mengecualikan dokumen ini, sehingga tanda tangan elektronik mungkin tidak membuatnya sah:",
        items: [
          "Wasiat, kodisil (perubahan wasiat), dan trust testamenter.",
          "Adopsi, perceraian, dan perkara hukum keluarga lainnya.",
          "Perintah, pemberitahuan, dan dokumen resmi pengadilan, seperti memori dan gugatan.",
          "Pemberitahuan wanprestasi, eksekusi jaminan, pengosongan, atau penarikan kembali barang berdasarkan perjanjian kredit atau sewa tempat tinggal utama.",
          "Pemberitahuan pembatalan atau penghentian layanan utilitas (air, pemanas, listrik).",
          "Pemberitahuan pembatalan atau penghentian manfaat asuransi kesehatan atau jiwa (tidak termasuk anuitas).",
          "Pemberitahuan penarikan produk dan pemberitahuan cacat serius yang dapat membahayakan kesehatan atau keselamatan.",
          "Dokumen yang wajib menyertai pengangkutan atau penanganan bahan berbahaya, pestisida, atau bahan beracun dan berbahaya lainnya.",
          "Sebagian besar Uniform Commercial Code selain penjualan dan sewa (misalnya instrumen yang dapat dinegosiasi, seperti surat janji bayar yang akan dipindahtangankan).",
          "Hal lain yang oleh negara bagian atau negara Anda diwajibkan berupa dokumen kertas, akta notaris, atau saksi secara langsung, seperti banyak akta kepemilikan properti.",
        ],
      },
      whatItIs: {
        heading: "Apa itu {platformName}",
        items: [
          "Alat untuk perjanjian bisnis sehari-hari: kontrak penjualan dan layanan, NDA, surat penawaran kerja, pesanan pembelian, formulir persetujuan, dan dokumen sejenis.",
          "Di Amerika Serikat, tanda tangan yang dibuat di sini adalah tanda tangan elektronik menurut ESIGN dan UETA (serta ESRA Negara Bagian New York).",
          "Di Uni Eropa dan Britania Raya, tanda tangan ini adalah tanda tangan elektronik sederhana (SES) menurut eIDAS. Pengadilan tidak boleh menolaknya hanya karena bentuknya elektronik, tetapi Anda mungkin perlu membuktikan siapa yang menandatangani. Sertifikat audit, PDF tersegel, dan kode akses atau kode surel opsional membantu membuktikannya.",
        ],
      },
      whatItIsNot: {
        heading: "Batasan {platformName}",
        items: [
          "Bukan tanda tangan elektronik tingkat lanjut (AdES) atau terkualifikasi (QES) menurut eIDAS secara bawaan. Suatu instalasi dapat menambahkan penyedia layanan penandatanganan; setelah itu, pengirim dapat meminta setiap penandatangan untuk menandatangani dengan tanda tangan tingkat lanjut atau terkualifikasi atas nama mereka sendiri melalui penyedia tersebut. Tanpa penyedia itu, segel pada PDF jadi adalah segel instalasi itu sendiri—atau, jika organisasi membeli sertifikat segel, segel elektronik tingkat lanjut untuk organisasi, bukan untuk para penandatangan.",
          "Bukan sistem yang telah divalidasi terhadap FDA 21 CFR Part 11 secara bawaan. Administrator dapat mengaktifkan mode Part 11 (penandatangan menandatangani dengan akun dan kata sandi mereka sendiri yang sudah dikonfirmasi, dan setiap tanda tangan menunjukkan maknanya), tetapi organisasi Anda tetap harus memvalidasi instalasi, menulis dan mengikuti prosedurnya sendiri, serta menyertifikasi tanda tangan elektroniknya ke FDA.",
          "Bukan layanan yang tercakup dalam HIPAA. Jangan kirim informasi kesehatan yang dilindungi kecuali organisasi Anda memiliki perjanjian dan kontrol sendiri untuk setiap layanan yang digunakan instalasi ini.",
          "Bukan sistem keterangan konsumen selain persetujuan penggunaan catatan elektronik yang diberikan setiap penandatangan. Jika suatu undang-undang mengharuskan Anda menyampaikan pemberitahuan konsumen tertentu secara elektronik, pastikan aturannya sendiri terpenuhi.",
          "Bukan nasihat hukum. Pihak yang menjalankan instalasi ini yang menentukan dokumen apa saja yang boleh ditandatangani di sini.",
        ],
      },
      whoDecides: {
        heading: "Siapa yang menentukan",
        paragraphs: [
          "{productName} menjalankan situs ini dan menentukan penggunaan yang diizinkan. Sebelum setiap pengiriman, pengirim menegaskan bahwa dokumen tersebut bukan termasuk jenis yang tercantum di sini. Halaman ini adalah informasi umum, bukan nasihat hukum.",
        ],
      },
    },
  },
  legal: {
    accessibility: {
      hero: {
        description:
          "Pernyataan ini menjelaskan fitur aksesibilitas Sakta saat ini, keterbatasan yang diketahui, serta cara meminta bantuan atau memberi masukan.",
        title: "Pernyataan Aksesibilitas",
      },
      metadata: {
        description:
          "Baca pernyataan aksesibilitas Sakta, fitur yang tersedia, keterbatasan yang diketahui, dan cara meminta bantuan.",
        title: "Pernyataan Aksesibilitas | Sakta",
      },
      sections: {
        assistance: {
          heading: "4. Bantuan alternatif",
          paragraphs: [
            "Tergantung situasinya, kami mungkin dapat memberikan bantuan manual, jalur komunikasi alternatif, atau cara lain yang didukung untuk menyelesaikan alur kerja.",
          ],
          requestWithSupport:
            "Jika Anda membutuhkan bantuan membuat, mengirim, meninjau, atau menandatangani dokumen, kirim surel ke {supportAddress}. Sampaikan bagian alur kerja yang ingin Anda selesaikan, teknologi bantu yang Anda gunakan bila Anda bersedia membagikannya, serta jenis akomodasi yang akan membantu.",
        },
        commitment: {
          heading: "1. Komitmen",
          paragraphs: [
            "Kami ingin Sakta dapat digunakan oleh sebanyak mungkin orang, termasuk mereka yang mengandalkan navigasi papan ketik, pembaca layar, pembesaran tampilan, atau teknologi bantu lainnya. Kami mengikuti praktik baik aksesibilitas dan menjadikan masukan aksesibilitas sebagai prioritas produk.",
            "Sakta masih berada pada tahap peluncuran, sehingga sebagian pengalaman lebih mudah diakses daripada bagian lainnya. Pernyataan ini sengaja dibuat jujur mengenai kondisi produk saat ini dan bantuan yang tersedia sekarang.",
          ],
        },
        feedback: {
          contactWithSupport:
            "Masukan aksesibilitas membantu kami memprioritaskan perbaikan yang tepat. Jika Anda menemukan hambatan, kirim surel ke {supportAddress} atau gunakan halaman {contactLink}.",
          heading: "6. Masukan",
        },
        limitations: {
          heading: "3. Keterbatasan yang diketahui",
          items: [
            "Pratinjau PDF dirender pada canvas, sehingga bukan representasi semantis penuh dari dokumen asli bagi pembaca layar.",
            "Penyiapan dokumen di sisi pengirim saat ini sangat bergantung pada seret dan lepas serta penempatan kolom dengan pointer, yang belum sepenuhnya dapat diakses oleh pengguna tunanetra atau sebagian pengguna yang hanya memakai papan ketik.",
            "Beberapa PDF yang diunggah mungkin memuat gambar hasil pindai, tata letak kompleks, atau masalah aksesibilitas dari pihak ketiga yang tidak dapat diperbaiki sepenuhnya oleh Sakta saat ditampilkan.",
          ],
        },
        standards: {
          heading: "5. Standar dan upaya berkelanjutan",
          paragraphs: [
            "Di Indonesia, UU Nomor 8 Tahun 2016 tentang Penyandang Disabilitas mengakui aksesibilitas serta akses atas informasi dan komunikasi sebagai hak penyandang disabilitas. Kami memakai WCAG 2.2 Tingkat AA sebagai acuan teknis praktis saat merencanakan perbaikan, tetapi kami tidak menyatakan bahwa setiap bagian Sakta telah sepenuhnya mematuhinya saat ini.",
            "Fokus jangka dekat kami mencakup peningkatan aksesibilitas pengalaman PDF berbasis canvas, penguatan perilaku fokus pada dialog, pengurangan interaksi yang hanya memakai pointer, serta perluasan alternatif yang ramah papan ketik.",
          ],
        },
        works: {
          heading: "2. Bagian yang saat ini paling baik",
          items: [
            "Pembuatan akun, masuk, dasbor, pengaturan, dan sebagian besar formulir non-canvas memakai kontrol semantis serta dirancang untuk dapat dinavigasi dengan papan ketik.",
            "Pengalaman penandatanganan memakai kolom dan tombol HTML yang dapat difokuskan dengan papan ketik di atas pratinjau PDF, serta menyediakan ringkasan kolom yang ditugaskan di panel samping.",
            "Pesan status, tombol, dan label formulir dirancang untuk menyampaikan teks yang bermakna kepada teknologi bantu.",
          ],
        },
      },
    },
    privacy: {
      hero: {
        description:
          "Kebijakan ini menjelaskan data pribadi apa yang diproses Sakta, mengapa kami memprosesnya, siapa yang menerimanya, berapa lama kami menyimpannya, serta hak yang tersedia bagi Anda berdasarkan hukum Indonesia.",
        title: "Kebijakan Privasi",
      },
      metadata: {
        description:
          "Baca bagaimana Sakta mengumpulkan, menggunakan, membagikan, menyimpan, dan melindungi data pribadi sesuai UU PDP Indonesia.",
        title: "Kebijakan Privasi | Sakta",
      },
      sections: {
        changes: {
          heading: "13. Perubahan kebijakan ini",
          paragraphs: [
            "Kami dapat memperbarui kebijakan ini untuk menyesuaikan perubahan layanan atau hukum. Jika data yang kami kumpulkan atau tujuan pemrosesan berubah, kami akan memberi tahu Anda sebelum perubahan berlaku, sebagaimana diwajibkan Pasal 21 UU PDP.",
            "Versi terbaru selalu tersedia di /privacy dengan tanggal berlaku yang ditampilkan di bagian atas halaman.",
          ],
        },
        children: {
          heading: "12. Anak",
          paragraphs: [
            "Sakta tidak ditujukan kepada anak. Untuk kebijakan ini, yang dimaksud anak adalah orang yang berusia di bawah 18 (delapan belas) tahun dan belum menikah, sesuai UU PDP dan peraturan pelaksananya.",
            "Kami tidak dengan sengaja mengumpulkan data pribadi anak tanpa persetujuan orang tua atau wali. Jika Anda meyakini seorang anak telah memberikan data melalui Sakta, hubungi kami agar kami dapat meninjau catatannya dan, bila diwajibkan, memperoleh persetujuan wali atau menghapus datanya.",
          ],
        },
        contact: {
          contactWithSupport:
            "Untuk pertanyaan, permohonan, atau pengaduan tentang kebijakan ini, tuliskan ke {supportAddress} atau gunakan halaman {contactLink}.",
          heading: "14. Kontak dan pengaduan",
          paragraphs: [
            "Jika Anda tidak puas dengan tanggapan kami, Anda dapat mengajukan pengaduan kepada lembaga pelindungan data pribadi atau otoritas yang berwenang di Indonesia. Sampai lembaga PDP khusus terbentuk, pengaduan dapat disampaikan kepada kementerian terkait.",
          ],
        },
        cookies: {
          closing:
            "Cookie analitik bersifat opsional dan dapat diblokir atau dihapus di browser tanpa memengaruhi akses ke layanan; memblokirnya hanya menghilangkan statistik penggunaan. Pemrosesan opsional Vercel BotID hanya berlaku jika fitur tersebut diaktifkan. Anda dapat menghapus cookie lainnya dan cache lokal di browser, meskipun Anda mungkin perlu masuk kembali.",
          heading: "8. Cookie, verifikasi, dan penyimpanan lokal",
          intro:
            "Kami menggunakan cookie dan penyimpanan browser untuk menjalankan dan mengamankan layanan, serta analitik opsional untuk memahami halaman publik mana yang bermanfaat:",
          items: [
            "better-auth.session_token — menjaga Anda tetap masuk selama 7 hari.",
            "better-auth.session_data dan better-auth.account_data — cache autentikasi berumur pendek, berlaku 5 menit.",
            "dont_remember dan cookie OAuth/PKCE — menyimpan status masuk dan melindungi proses login selama 5 sampai 10 menit.",
            "sd_v_<prefiks hash token> — memverifikasi penandatangan setelah kode akses, pemeriksaan akun, atau kode surel, berlaku 8 jam.",
            "NEXT_LOCALE — mengingat pilihan bahasa Anda selama 365 hari. Cookie ini hanya dipakai untuk memilih bahasa dan dapat dibaca skrip.",
            "IndexedDB signudoc-draft-preview-cache — menyimpan pratinjau PDF draf di browser maksimal 24 jam.",
            "Google Tag Manager / Google Analytics — analitik opsional hanya pada halaman publik. Alat ini mencatat tampilan halaman dan interaksi agregat, serta tidak menerima isi dokumen, nama penandatangan, alamat surel, maupun token amplop. Cookie-nya dapat diblokir atau dihapus di browser; lihat alat opt-out di tools.google.com/dlpage/gaoptout.",
          ],
        },
        dataCategories: {
          heading: "2. Data pribadi yang kami proses",
          intro: "Kami memproses kategori data pribadi berikut:",
          items: [
            "Data akun: nama, alamat surel, kredensial sandi yang disimpan sebagai hash, status verifikasi surel, gambar profil, dan pengaturan akun.",
            "Data autentikasi dan sesi: pengenal sesi, alamat IP, user agent, peristiwa masuk, rahasia dan kode cadangan two-factor, serta pengenal OAuth/SSO bila Anda menggunakan masuk tunggal.",
            "Data dokumen dan alur kerja: PDF yang diunggah, judul, jumlah halaman, kolom yang dipasang, urutan penandatanganan, status amplop, templat, serta berkas turunan seperti miniatura, PDF tersegel, dan sertifikat.",
            "Data penandatangan: nama, surel, peran, locale, metode akses, tanda tangan ketik atau gambar, nilai kolom, pilihan kotak centang, alasan penolakan, dan cap waktu.",
            "Data audit dan keamanan: peristiwa audit, surel pelaku, alamat IP, user agent, pengenal token, hash kunci API, nilai hash-chain, dan catatan pengiriman webhook.",
            "Data komunikasi dan dukungan: pesan yang Anda kirim melalui formulir kontak atau surel, termasuk nama, surel, isi pesan, dan konteks pembatasan laju.",
            "Pengaturan organisasi: nama organisasi, alamat pengirim dan dukungan, pengaturan retensi, pemberitahuan persetujuan, dan konfigurasi mode hosted.",
            "Preferensi dan data lokal: pilihan bahasa Anda serta cache pratinjau draf di browser sebagaimana dijelaskan pada bagian 8.",
          ],
        },
        incidents: {
          heading: "11. Keamanan dan kegagalan pelindungan data pribadi",
          noticeItems: [
            "data pribadi yang terungkap;",
            "kapan dan bagaimana data terungkap; dan",
            "upaya penanganan dan pemulihan atas kejadian tersebut.",
          ],
          paragraphs: [
            "Kami menggunakan kontrol akses, pencatatan audit, pembatasan laju, header keamanan, enkripsi saat transmisi, dan penyimpanan objek privat untuk melindungi data pribadi. Tidak ada sistem yang sepenuhnya aman.",
            "Jika terjadi kegagalan pelindungan data pribadi, kami akan memberi tahu subjek data yang terdampak dan lembaga yang berwenang secara tertulis paling lambat 3 × 24 jam, sebagaimana diwajibkan Pasal 46 UU PDP. Pemberitahuan tersebut memuat sedikitnya:",
          ],
          publicNotice:
            "Jika kegagalan tersebut kemungkinan berdampak pada masyarakat, kami juga akan mengumumkannya secara terbuka.",
        },
        purposes: {
          heading: "4. Tujuan dan dasar hukum pemrosesan",
          intro:
            "Kami memproses data pribadi hanya untuk tujuan di bawah ini dan berdasarkan dasar hukum yang tersedia menurut Pasal 20 UU PDP:",
          rows: [
            {
              basis:
                "Dasar: pelaksanaan perjanjian dan kepentingan sah kami dalam mengamankan akun.",
              purpose:
                "Membuat akun, mengautentikasi pengguna, serta mengirim pesan verifikasi atau keamanan.",
            },
            {
              basis:
                "Dasar: pelaksanaan perjanjian dan pemenuhan kewajiban hukum atas catatan elektronik menurut UU ITE dan PP Nomor 71 Tahun 2019.",
              purpose:
                "Menyiapkan, mengirim, menandatangani, menolak, dan menyimpan amplop, termasuk jejak audit dan PDF tersegel.",
            },
            {
              basis: "Dasar: pelaksanaan perjanjian.",
              purpose:
                "Mengirim surel transaksional dan, jika diaktifkan, melampirkan dokumen atau sertifikat yang telah selesai.",
            },
            {
              basis:
                "Dasar: kepentingan sah dan pemenuhan kewajiban keamanan menurut UU PDP.",
              purpose:
                "Mendeteksi penipuan, penyalahgunaan, dan akses tanpa izin, serta menerapkan pembatasan laju dan kontrol keamanan.",
            },
            {
              basis:
                "Dasar: kepentingan sah, pelaksanaan perjanjian, dan kewajiban hukum.",
              purpose:
                "Memberikan dukungan serta menanggapi permohonan privasi, aksesibilitas, dan penutupan akun.",
            },
            {
              basis:
                "Dasar: kepentingan sah dan kewajiban hukum; kami tidak menggunakan data pribadi untuk iklan.",
              purpose:
                "Mengelola retensi, penghapusan, cadangan, dan perbaikan layanan.",
            },
            {
              basis:
                "Dasar: kewajiban hukum dan kepentingan sah untuk menetapkan, menjalankan, atau membela tuntutan hukum.",
              purpose:
                "Menangani pengaduan, sengketa, serta permintaan dari regulator atau pengadilan.",
            },
            {
              basis:
                "Dasar: kepentingan sah untuk memahami penggunaan situs publik; cookie analitik bersifat opsional.",
              purpose:
                "Mengukur kunjungan dan interaksi pada halaman publik, tanpa menerima isi dokumen maupun data penandatangan.",
            },
          ],
        },
        recipients: {
          closing:
            "Kami tidak menjual data pribadi, tidak menjalankan bisnis iklan, dan tidak mengonfigurasi SMS. Google memproses data penggunaan terbatas yang tidak memuat isi dokumen untuk analitik opsional sebagaimana dijelaskan di atas. Jika penyedia memproses data atas nama kami, kami menggunakan pengaturan kontrak sebagaimana diperlukan UU PDP.",
          heading: "5. Penerima dan penyedia layanan",
          intro:
            "Kami membagikan data pribadi hanya kepada penyedia yang memerlukannya untuk menjalankan Sakta, kepada pihak dalam amplop, atau ketika hukum mewajibkannya. Penerima utamanya adalah:",
          items: [
            "Vercel — hosting aplikasi, layanan edge dan jaringan, serta perlindungan bot BotID yang opsional.",
            "Vercel Blob — penyimpanan privat untuk dokumen yang diunggah, PDF hasil, sertifikat, dan cadangan.",
            "Neon atau penyedia PostgreSQL lain — hosting basis data untuk catatan akun, amplop, penandatangan, dan audit.",
            "Resend — pengiriman surel transaksional; surel dokumen selesai dapat memuat lampiran PDF atau sertifikat.",
            "Have I Been Pwned (api.pwnedpasswords.com) — pemeriksaan kebocoran sandi opsional yang hanya mengirim beberapa karakter awal hash SHA-1; pemeriksaan ini dapat dinonaktifkan.",
            "eID Easy dan CSC — penyedia tanda tangan elektronik opsional yang menerima nama dokumen, jenis MIME, digest SHA-256, dan metadata penandatanganan.",
            "Server timestamp RFC 3161 serta responder OCSP/CRL — menerima digest atau permintaan status sertifikat untuk memvalidasi segel.",
            "Penyedia OIDC/SSO yang Anda konfigurasi — menerima alihan autentikasi serta cakupan openid, email, dan profile ketika Anda masuk dengan cara tersebut.",
            "Endpoint webhook yang dikonfigurasi organisasi Anda — menerima payload peristiwa amplop dan penandatangan yang dipilih administrator.",
            "Penyedia log drain/SIEM opsional — menerima log keamanan dan audit jika diaktifkan.",
            "Google (Google Tag Manager dan Google Analytics) — pengukuran penggunaan opsional pada halaman publik; tidak ada data dokumen, penandatangan, atau amplop yang dikirim.",
          ],
        },
        requests: {
          heading: "10. Cara mengajukan permohonan",
          paragraphs: [
            "Kami dapat meminta keterangan untuk memverifikasi identitas Anda, misalnya kendali atas alamat surel, aktivitas akun terbaru, atau detail amplop. Kami tidak meminta data melebihi yang diperlukan.",
            "Kami menanggapi dalam waktu 30 hari setelah permohonan lengkap diterima. Jika kami memerlukan waktu tambahan atau menolak permohonan, kami akan menjelaskan alasannya. Permohonan tidak dikenakan biaya kecuali dianggap tidak wajar atau berulang; dalam hal itu kami dapat mengenakan biaya administrasi yang wajar atau menolaknya sesuai hukum.",
          ],
          requestWithSupport:
            "Untuk menggunakan hak Anda, tuliskan ke {supportAddress} atau gunakan halaman {contactLink}. Anda juga dapat meminta penutupan akun melalui pengaturan, sementara administrator organisasi dapat memakai alat ekspor dan penghapusan data penandatangan untuk amplop yang dikirim organisasi.",
        },
        retention: {
          closing:
            "Anda dapat meminta kami menghapus data penandatangan lebih awal. Kami akan melakukannya kecuali kewajiban hukum atau amplop yang masih berjalan melarangnya.",
          heading: "7. Retensi dan penghapusan",
          intro:
            "Kami menyimpan data pribadi hanya selama diperlukan untuk tujuan pengumpulannya, lalu menghapus atau menganonimkannya, dengan tunduk pada jangka waktu berikut:",
          items: [
            "Amplop draf yang belum dikirim dan dokumen sumbernya: dihapus setelah 30 hari tanpa aktivitas pengirim.",
            "Amplop selesai, ditandatangani, ditolak, dan dibatalkan: disimpan selama akun aktif, atau sesuai jangka retensi yang ditetapkan organisasi. Penghapusan terjadwal menunggu 14 hari dan terlebih dahulu memberi pengirim tautan unduhan.",
            "Penutupan akun: setelah pemberitahuan dan jendela ekspor 30 hari, dokumen dan catatan amplop yang tersimpan dihapus, kecuali catatan yang wajib disimpan untuk keamanan, pemenuhan hukum, atau sengketa.",
            "Log audit dan keamanan: disimpan selama diperlukan untuk menyelidiki insiden, memenuhi kewajiban hukum, dan menegakkan perjanjian.",
            "Salinan cadangan: disimpan maksimal 30 hari secara default, lalu dihapus pada rotasi cadangan.",
            "Catatan token unduhan penerima yang kedaluwarsa: dihapus setelah 365 hari.",
            "Amplop Part 11 dan catatan yang berada di bawah penahanan hukum tidak dihapus oleh tugas retensi otomatis.",
          ],
        },
        rights: {
          heading: "9. Hak Anda menurut UU PDP",
          intro:
            "Berdasarkan UU PDP, Anda dapat, dengan tunduk pada ketentuan undang-undang tersebut:",
          items: [
            "mendapatkan informasi yang jelas tentang identitas kami, tujuan, dan dasar hukum pemrosesan (Pasal 5);",
            "melengkapi, memperbarui, dan/atau memperbaiki data pribadi Anda (Pasal 6);",
            "mengakses data Anda dan memperoleh salinannya (Pasal 7);",
            "mengakhiri pemrosesan, menghapus, dan/atau memusnahkan data Anda (Pasal 8);",
            "menarik kembali persetujuan jika pemrosesan didasarkan pada persetujuan (Pasal 9);",
            "mengajukan keberatan atas keputusan yang hanya didasarkan pada pemrosesan otomatis dan berakibat hukum atau dampak signifikan (Pasal 10);",
            "menunda atau membatasi pemrosesan sesuai tujuannya (Pasal 11);",
            "menerima data dalam format terstruktur, lazim digunakan, dan dapat dibaca mesin, serta mengirimkannya ke pengendali lain sepanjang sistemnya dapat berkomunikasi secara aman (Pasal 13); dan",
            "menggugat dan menerima ganti rugi atas pelanggaran pemrosesan data pribadi (Pasal 12).",
          ],
          limitations:
            "Sebagian hak dapat dikecualikan dalam keadaan yang diatur Pasal 15 UU PDP, misalnya untuk penegakan hukum atau kepentingan umum. Kami juga dapat menyimpan catatan terbatas bila diperlukan untuk menetapkan, menjalankan, atau membela tuntutan hukum.",
        },
        scope: {
          heading: "1. Ruang lingkup, pengendali, dan narahubung privasi",
          paragraphs: [
            "Kebijakan Privasi ini menjelaskan bagaimana Sakta memproses data pribadi ketika Anda menggunakan layanan hosted di sakta.my.id, termasuk situs web, akun dan dasbor, halaman penandatanganan, surel, dan kanal dukungan. Kebijakan ini berlaku bagi pemegang akun, pengirim, penandatangan, penerima, dan pengunjung.",
            "Untuk keperluan UU Perlindungan Data Pribadi (UU PDP Nomor 27 Tahun 2022), Sakta berkedudukan sebagai pengendali data pribadi atas pemrosesan yang dijelaskan di sini. Pertanyaan tentang identitas pengendali dan narahubung privasi dapat disampaikan melalui kanal pada bagian 14.",
          ],
        },
        sources: {
          heading: "3. Sumber data",
          intro: "Kami memperoleh data dari:",
          items: [
            "Anda secara langsung saat mendaftar, mengunggah dokumen, mengundang penandatangan, mengisi kolom, menandatangani, menolak, atau menghubungi dukungan;",
            "penandatangan atau peserta lain dalam amplop yang Anda kirim;",
            "perangkat dan browser Anda secara otomatis saat Anda memakai layanan, termasuk alamat IP dan user agent;",
            "penyedia identitas atau tanda tangan opsional saat Anda memilih memakainya; dan",
            "administrator organisasi Anda saat membuat atau mengelola akun dan pengaturan.",
          ],
        },
        transfers: {
          heading: "6. Transfer ke luar Indonesia",
          paragraphs: [
            "Sebagian penyedia di atas dapat memproses data di luar Indonesia, termasuk di Amerika Serikat. Jika hal itu terjadi, kami berupaya memastikan negara tujuan memiliki tingkat pelindungan data pribadi yang setara atau lebih tinggi dari UU PDP, atau tersedia jaminan yang memadai dan mengikat, sebagaimana diwajibkan Pasal 56.",
            "Jika kedua kondisi tersebut tidak terpenuhi, kami akan meminta persetujuan Anda bila diwajibkan oleh Pasal 56 ayat (4) UU PDP. Anda dapat menghubungi kami untuk mengetahui jaminan yang berlaku bagi penyedia tertentu.",
          ],
        },
      },
    },
    terms: {
      hero: {
        description:
          "Syarat ini mengatur akses dan penggunaan Anda atas Sakta, layanan tanda tangan elektronik untuk pelaku usaha di Indonesia. Syarat ini mencakup perjanjian komersial sehari-hari dan bukan nasihat hukum.",
        title: "Syarat Layanan",
      },
      metadata: {
        description:
          "Baca syarat penggunaan layanan tanda tangan elektronik Sakta di Indonesia.",
        title: "Syarat Layanan | Sakta",
      },
      sections: {
        acceptableUse: {
          heading: "6. Keamanan akun dan penggunaan yang pantas",
          paragraphs: [
            "Jaga kredensial Anda, batasi akses ke akun, dan segera beri tahu Sakta jika Anda menduga ada penggunaan tanpa izin. Jangan gunakan Sakta untuk melanggar hukum, melanggar hak pihak lain, menyebarkan perangkat lunak berbahaya, mengganggu penerima, mengambil data secara paksa, mengganggu layanan, atau melewati pengaturan akses dan batas laju.",
            "Jangan gunakan Sakta untuk menyamar sebagai orang lain, mendapatkan tanda tangan dengan cara menipu, atau mengirim surel massal yang tidak berkaitan dengan alur penandatanganan yang nyata.",
          ],
        },
        contact: {
          contactWithSupport:
            "Pertanyaan tentang Syarat ini dapat dikirim ke {supportAddress} atau melalui halaman {contactLink}.",
          heading: "14. Kontak",
        },
        disclaimers: {
          heading: "10. Penafian",
          paragraphs: [
            'Sakta disediakan "sebagaimana adanya" dan "sebagaimana tersedia" sejauh diizinkan hukum. Sakta tidak menjamin, baik tersurat maupun tersirat, termasuk kelayakan untuk diperdagangkan, kesesuaian untuk tujuan tertentu, hak milik, tidak pelanggaran, akurasi, ketersediaan tanpa gangguan, atau kecukupan hukum untuk transaksi tertentu.',
            "Sakta tidak menjamin bahwa suatu alur kerja akan diterima oleh pengadilan atau regulator, atau sesuai untuk dokumen yang diatur ketat atau dikecualikan. Mintalah nasihat hukum tentang keberlakuan, penyimpanan, keterangan konsumen, notarisasi, atau ketentuan setempat.",
          ],
        },
        electronicSignatures: {
          heading: "5. Tanda tangan dan catatan elektronik",
          paragraphs: [
            "Untuk dokumen dalam batas yang diizinkan, Sakta dirancang untuk membuat dan menyimpan tanda tangan serta catatan elektronik sesuai hukum Indonesia, termasuk UU Informasi dan Transaksi Elektronik (UU ITE) sebagaimana telah diubah dan PP Nomor 71 Tahun 2019. Setiap amplop menyimpan jejak audit dan salinan PDF yang tersegel.",
            "Sakta tidak menerbitkan sertifikat digital tersertifikasi dari penyedia layanan kepercayaan yang disetujui, dan tidak menjanjikan bahwa suatu alur kerja memenuhi setiap aturan sektoral tentang verifikasi identitas, sertifikat, atau notarisasi.",
          ],
        },
        eligibility: {
          heading: "2. Kelayakan dan kewenangan",
          paragraphs: [
            "Anda dapat menggunakan Sakta hanya jika Anda mampu membuat perjanjian yang mengikat menurut hukum Indonesia dan hanya untuk tujuan usaha yang sah. Anda bertanggung jawab memastikan setiap pengirim, penandatangan, dan penerima memiliki kewenangan bertindak atas nama pihak yang diwakilinya.",
            "Anda juga bertanggung jawab menentukan apakah transaksi Anda memerlukan saksi, notaris, bentuk tertentu, atau aturan penyimpanan yang tidak disediakan Sakta.",
          ],
        },
        governingLaw: {
          heading: "13. Hukum yang mengatur dan perubahan",
          paragraphs: [
            "Syarat ini diatur oleh hukum Republik Indonesia, tanpa memperhatikan aturan konflik hukum. Sengketa yang tidak dapat diselesaikan secara musyawarah diajukan ke pengadilan yang berwenang di Indonesia. Jika versi Bahasa Indonesia dan Inggris berbeda, versi Bahasa Indonesia yang berlaku.",
            "Sakta dapat memperbarui Syarat ini dengan memuat versi revisi di halaman ini. Pembaruan berlaku saat dimuat, kecuali tanggal lain dinyatakan kemudian.",
          ],
        },
        indemnification: {
          heading: "12. Ganti rugi",
          paragraphs: [
            "Anda akan membela dan membebaskan Sakta, afiliasinya, penyedia layanan, pemberi lisensi, dan stafnya dari tuntutan, kerugian, kerusakan, kewajiban, biaya, dan pengeluaran, termasuk biaya hukum yang wajar, yang timbul dari dokumen Anda, penggunaan layanan, pelanggaran Syarat ini, atau pelanggaran hukum atau hak pihak lain, kecuali hukum wajib menentukan lain.",
          ],
        },
        intellectualProperty: {
          heading: "8. Kekayaan intelektual dan konten Anda",
          paragraphs: [
            "Antara Anda dan Sakta, Anda tetap memiliki dokumen dan data yang Anda unggah, dengan tunduk pada hak yang dibutuhkan Sakta dan penyedianya untuk menghosting, memproses, mengirim, menampilkan, mengamankan, dan menyimpan konten tersebut guna menjalankan layanan.",
            "Sakta, merek, perangkat lunak, dan tampilannya dilindungi hukum kekayaan intelektual. Kecuali hukum mengizinkan, Anda tidak boleh menyalin, menjual kembali, merekayasa balik, atau membuat karya turunan dari layanan ini.",
          ],
        },
        liability: {
          heading: "11. Pembatasan tanggung jawab",
          paragraphs: [
            "Sejauh diizinkan hukum, Sakta, afiliasinya, penyedia, pemberi lisensi, dan stafnya tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, konsekuensial, teladan, atau hukuman, maupun atas hilangnya keuntungan, pendapatan, reputasi, data, atau penggunaan yang timbul dari layanan atau Syarat ini.",
            "Sejauh diizinkan hukum, total tanggung jawab Sakta atas seluruh tuntutan yang timbul dari layanan atau Syarat ini tidak melebihi jumlah yang Anda bayarkan untuk layanan dalam 12 bulan sebelum peristiwa tersebut atau Rp1.000.000, mana yang lebih besar. Tidak ada ketentuan dalam Syarat ini yang meniadakan tanggung jawab yang tidak dapat ditiadakan berdasarkan UU Perlindungan Konsumen atau hukum wajib lainnya.",
          ],
        },
        overview: {
          heading: "1. Ringkasan",
          paragraphs: [
            "Dengan membuat akun, mengunggah dokumen, mengirim amplop, atau menandatangani melalui Sakta, Anda menyetujui Syarat ini. Jika Anda bertindak untuk perusahaan atau organisasi lain, Anda menyatakan berwenang mengikat organisasi tersebut pada Syarat ini.",
            "Sakta menyediakan perangkat lunak untuk menyiapkan, mengirim, menandatangani, dan menyimpan catatan elektronik. Sakta bukan firma hukum dan tidak memberikan nasihat hukum. Sakta tidak menentukan apakah suatu dokumen sah ditandatangani secara elektronik.",
            "Layanan ini ditujukan bagi pelaku usaha dan organisasi yang beroperasi di Indonesia serta perjanjian komersial mereka sehari-hari. Hukum Indonesia, termasuk UU Informasi dan Transaksi Elektronik (UU ITE) serta peraturan pelaksananya, mengatur tanda tangan dan catatan elektronik.",
          ],
        },
        permittedUse: {
          closing:
            "Jika dokumen masuk kategori yang diatur ketat, sensitif terhadap keselamatan, konsumen, warisan, pengadilan, atau hukum keluarga, jangan gunakan Sakta. Dengan mengirim amplop, Anda menegaskan bahwa dokumen tersebut merupakan perjanjian bisnis biasa dalam batas penggunaan yang diizinkan.",
          excluded: [
            "wasiat, warisan, dan trust testamenter;",
            "adopsi, perceraian, dan perkara hukum keluarga lainnya;",
            "penetapan dan perintah pengadilan, panggilan, gugatan, serta dokumen pengadilan resmi lainnya;",
            "pemberitahuan pembatalan atau penghentian layanan utilitas dasar seperti air, listrik, atau gas;",
            "pemberitahuan wanprestasi, percepatan penagihan, penarikan kembali, eksekusi jaminan, atau pengosongan tempat tinggal utama;",
            "pemberitahuan pembatalan manfaat asuransi kesehatan atau jiwa;",
            "pemberitahuan penarikan produk atau cacat serius yang dapat membahayakan kesehatan atau keselamatan;",
            "dokumen yang wajib menyertai pengangkutan atau penanganan bahan berbahaya, pestisida, atau barang berbahaya lainnya;",
            "keterangan konsumen yang diwajibkan undang-undang atau alur kerja lain yang memerlukan proses persetujuan elektronik tersendiri sebelum penyampaian.",
          ],
          excludedIntro:
            "Jangan gunakan Sakta untuk dokumen atau pemberitahuan yang menurut hukum memerlukan bentuk khusus, akta notaris, penyerahan fisik, atau proses persetujuan konsumen tersendiri, antara lain:",
          heading: "3. Penggunaan yang diizinkan dan dokumen yang dikecualikan",
          paragraphs: [
            "Sakta dipakai untuk perjanjian bisnis biasa dan catatan komersial sejenis, seperti NDA, rincian pekerjaan, perjanjian vendor dan layanan, serta persetujuan internal.",
          ],
        },
        sender: {
          heading: "4. Tanggung jawab pengirim",
          paragraphs: [
            "Pengirim bertanggung jawab atas konten yang diunggah, urutan penandatanganan, kolom yang dipasang, penerima yang diundang, dan kecukupan hukum dari proses tersebut. Anda harus memiliki hak yang dibutuhkan untuk mengunggah dokumen dan meminta tanda tangan.",
            "Pastikan data kontak penandatangan tetap akurat, hindari amplop yang menyesatkan, dan tangani pemberitahuan atau langkah luring yang diperlukan di luar Sakta.",
          ],
        },
        serviceChanges: {
          heading: "7. Perubahan layanan, ketersediaan, dan catatan",
          paragraphs: [
            "Sakta dapat mengubah, meningkatkan, menangguhkan, atau menghentikan fitur kapan saja. Kami dapat menambahkan batas ukuran dokumen, jumlah penandatangan, penyimpanan, atau retensi seiring perkembangan layanan, serta menghapus konten atau menangguhkan akun yang diduga melanggar Syarat ini atau menimbulkan risiko hukum, operasional, atau keamanan.",
            "Unduh dan simpan sendiri salinan dokumen yang telah selesai. Penyimpanan di Sakta bersifat kenyamanan dan mengikuti praktik retensi serta penghapusan dalam Kebijakan Privasi, termasuk kewajiban berdasarkan UU Perlindungan Data Pribadi (UU PDP Nomor 27 Tahun 2022).",
          ],
        },
        suspension: {
          closureWithSupport:
            "Permintaan penutupan akun dapat disampaikan melalui pengaturan atau dengan menulis ke {supportAddress}. Sebelum menutup akun, unduh dokumen yang ingin Anda simpan. Setelah penutupan, kami dapat menyediakan jangka waktu ekspor singkat, lalu menghapus berkas dokumen dan catatan amplop, kecuali informasi terbatas yang disimpan untuk keamanan, pencegahan penipuan, pemenuhan hukum, atau penyelesaian sengketa.",
          heading: "9. Penangguhan, penghentian, dan penutupan akun",
          paragraphs: [
            "Anda dapat berhenti menggunakan layanan kapan saja. Sakta dapat menangguhkan atau menghentikan akses jika kami beralasan meyakini Anda melanggar Syarat ini, menggunakan layanan di luar batas yang diizinkan, atau menimbulkan risiko keamanan, penipuan, atau hukum.",
          ],
        },
      },
    },
  },
});
