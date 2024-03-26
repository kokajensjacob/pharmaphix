export const ProblemPage = () => {
  return (
    <>
      <h1>Issue Name</h1> {/* will be replaced with fetch result */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
        exercitationem!
      </p>{" "}
      {/* description: replaced with fetch results*/}
      <div>
        <h3>Spare Parts Needed:</h3>
        <ul>
          <li>
            <div>Laser T50-X44</div>
            <div>5</div>
          </li>
          <li>
            <div>Wheel T5</div>
            <div>4</div>
          </li>
        </ul>
        <button>Use</button>
        <ul>
          <h3>Tools</h3>
          <li> Hammer</li>
          <li>Wrench</li>
        </ul>
      </div>
      <div>
        <h3>INSTRUCTIONS:</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat corrupti distinctio provident magnam vel iure non ipsum odio aperiam perspiciatis soluta officia, iste ducimus modi pariatur neque totam fuga cupiditate!</p>
      </div>
    </>
  );
};
