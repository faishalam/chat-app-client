import { format, isToday } from 'date-fns';

export function formatMessageTime(date : Date) {
    const messageDate = new Date(date);
  
    if (isToday(messageDate)) {
        return format(messageDate, 'HH:mm'); // Hanya jam dan menit
    }

    if(!messageDate) return
  
    return format(messageDate, 'HH:mm');
}
