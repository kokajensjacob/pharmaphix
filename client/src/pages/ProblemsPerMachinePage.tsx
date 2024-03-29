export const ProblemsPerMachinePage = () => {
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/machines">Machines</a>
          </li>
          <li>
            <a href="/machines/:machine_id">MachineName</a>
          </li>
        </ul>
      </div>
    </>
  );
};
