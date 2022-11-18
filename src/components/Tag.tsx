import COLORS from 'constants/colors';

interface Props {
  type: string;
}

const Tag = ({ type }: Props) => {
  return (
    <div
      className="flex items-center justify-center w-20 h-5 text-sm capitalize shadow rounded-xl"
      style={{
        backgroundColor: COLORS.types[type],
      }}
    >
      {type}
    </div>
  );
};

export default Tag;
