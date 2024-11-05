export function timeAgo(date: Date): string {
    // Memastikan date yang diberikan valid
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'Tanggal tidak valid';
    }

    // Menghitung selisih waktu dalam detik
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000); // Tahun

    if (interval > 1) return `${interval} tahun lalu`;
    interval = Math.floor(seconds / 2592000); // Bulan
    if (interval > 1) return `${interval} bulan lalu`;
    interval = Math.floor(seconds / 86400); // Hari
    if (interval > 1) return `${interval} hari lalu`;
    interval = Math.floor(seconds / 3600); // Jam
    if (interval > 1) return `${interval} jam lalu`;
    interval = Math.floor(seconds / 60); // Menit
    if (interval > 1) return `${interval} menit lalu`;

    return `${seconds} detik lalu`; // Detik
}
