
const Helper = {
  normalize (size: number) {
    const baseWidth = 1440;
    const screenWidth = window.innerWidth; 
    const scale = screenWidth / baseWidth; 
    return Math.round(size * scale); 
  }
}

export default Helper;