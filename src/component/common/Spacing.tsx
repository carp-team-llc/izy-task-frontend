
type data = {
  height?: number, 
  width?: number,
}

const Spacing = ({height, width}: data) => {
  return <div style={{ height: `${height || 0}px`, width: `${width || 0}px` }} />;
};

export default Spacing