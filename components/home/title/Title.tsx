interface Props {
  title: string;
  subtitle: string;
}

const Title = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col px-4">
      <h3 className="text-heading">{title}</h3>
      <p className="text-description">{subtitle}</p>
    </div>
  );
};

export default Title;
