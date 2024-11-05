import { format, isToday } from 'date-fns';

export function formatMessageTime(date : Date) {
    const messageDate = new Date(date);
  
    // Jika pesan dikirim hari ini, tampilkan jam dan menit
    if (isToday(messageDate)) {
        return format(messageDate, 'HH:mm'); // Hanya jam dan menit
    }
  
    // Jika pesan bukan dari hari ini, tampilkan tanggal lengkap atau format lainnya
    return format(messageDate, 'HH:mm');
}
