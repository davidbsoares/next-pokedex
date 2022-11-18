import COLORS from 'constants/colors';

interface subtitleProps {
  title: string;
  color: string | undefined;
}

const Subtitle = ({ title, color }: subtitleProps) => {
  return (
    <h2
      className="mt-4 mb-2 text-lg font-bold"
      style={{ color: color && COLORS.types[color] }}
    >
      {title}
    </h2>
  );
};

export default Subtitle;
