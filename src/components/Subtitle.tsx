import COLORS from 'constants/colors';

interface subtitleProps {
  title: string;
  color: string | undefined;
}

const Subtitle = ({ title, color }: subtitleProps) => {
  return (
    <h2
      className="text-lg font-bold mt-4 mb-2"
      style={{ color: color && COLORS.types[color] }}
    >
      {title}
    </h2>
  );
};

export default Subtitle;
