export default function Spinner({color = 'white'}: {color?: 'white' | 'primary' | 'secondary'}) {
  return (
    <div className={`content-none text-${color} w-3 h-w-3 bg-transparent rounded-[10%] border-[12px] border-${color} animate-customSpinner`}></div>
  );
}
