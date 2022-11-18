import COLORS from 'constants/colors';

interface BarPointsColor {
  color: string | undefined;
  value: number;
}

const BarPoints = ({ color, value }: BarPointsColor) => {
  const percentage = (value / 200) * 100 || 0;
  return (
    <input
      className="flex-1 h-1 border-none rounded-lg appearance-none"
      type="range"
      step="1"
      min={0}
      max={150}
      value={percentage}
      readOnly
      style={{
        background: `-webkit-gradient(
          linear, 0% 0%, 100% 0%,
          color-stop( ${value}%,
          ${color && COLORS.types[color]} ),
          color-stop(${value}%, #f6f7f9))`,
      }}
    />
  );
};

export default BarPoints;
