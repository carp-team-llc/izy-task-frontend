const Helper = {

  // ham lay kich thuoc man hinh thay doi theo do cao
  normalize(size: number) {
    const baseWidth = 1440;
    const screenWidth = window.innerWidth;
    const scale = screenWidth / baseWidth;
    return Math.round(size * scale);
  },

  // ham lay ngay thang nam tu data
  formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },

  // ham lay ngay thang nam viet tat tu data 
  formatEngDate (dateString: string): string {
    const date = new Date(dateString);
  
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
  
    return `${month} ${day} ${year}`;
  },

  // ham lay ngay thang nam va gio phut giay tu data
  formatDateTime (dateString: string): string {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  },

  // ham lay gio, phut, giay tu ngay thang nam
  formatTime (dateString: string): string {
    const date = new Date(dateString);
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  },

};

export default Helper;
