interface StatsProps {
  name: string;
  value: number;
}

const Stats = ({ name, value }: StatsProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-fit h-fit">
      <div className="flex items-center justify-center w-12 h-12 text-sm border border-black border-solid rounded-full">
        {value}
      </div>
      <span className="mt-2 text-sm capitalize">{name}</span>
    </div>
  );
};

export default Stats;
