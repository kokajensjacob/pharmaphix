type InstPRops = {
  instructions: string;
};

export const Instructions = (props: InstPRops) => {
  const newText = props.instructions.split("§").map((str) => (
    <div className="my-5 mx-5">
      {str.split("#").map((s) => (
        <div>{s}</div>
      ))}
    </div>
  ));
  return <div>{newText}</div>;
};
