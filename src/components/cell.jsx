export default function Cell({ value, onChange, rowIndex, colIndex, isErr, isHighlighted, isSelected, onSelect}) {
  const borderTop = rowIndex % 3 === 0 ? 'border-t-4' : 'border-t';
  const borderLeft = colIndex % 3 === 0 ? 'border-l-4' : 'border-l';
  const borderRight = colIndex === 8 ? 'border-r-4' : '';
  const borderBottom = rowIndex === 8 ? 'border-b-4' : '';

  let bgColor = 'bg-amber-50'
  if (isErr) bgColor = 'bg-red-300 text-white'
  else if (isSelected) bgColor = 'bg-blue-400 text-white';
  else if (isHighlighted) bgColor = 'bg-blue-100';
  else bgColor = 'bg-amber-50';

  return (
    <input
      type="text"
      maxLength={1}
      value={value || ''}
      onClick={onSelect}
      onChange={(e) => {
        const val = e.target.value;
        if (val === "" || /^[1-9]$/.test(val)) onChange(val);
      }}
      className={`w-12 h-12 text-center text-lg font-semibold border-[#344861] 
        ${borderTop} ${borderLeft} ${borderRight} ${borderBottom}
        ${bgColor} text-gray-800 focus:outline-none transition-all duration-150`}
    />
  );
}
