import { useEffect, useState } from "react";
import { SparePartGetResponseDto } from "../types";
import { Link, useParams } from "react-router-dom";
import { fetchSparePart } from "../api";
import { Loading } from "../components/Loading";
import { SparePartDetailsFormTable } from "../components/SparePartDetailsFormTable";
import { JhFetchError } from "../components/errors/JhFetchError";

export const SparePartPage = () => {
  const [sparePartData, setSparePartData] = useState<SparePartGetResponseDto>();
  const [fetchError, setFetchError] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });
  const { spare_part_id } = useParams();

  useEffect(() => {
    fetchSparePart(spare_part_id!)
      .then((resp) => {
        switch (resp.status) {
          case 200:
            resp.json().then((data) => setSparePartData(data));
            break;
          case 404:
            setFetchError({
              show: true,
              message: "404. spare part does not exist",
            });
            break;
          default:
            setFetchError({
              show: true,
              message: `Error: Server returned something unexpected. HTTP status code: ${resp.status}`,
            });
        }
      })
      .catch(() =>
        setFetchError({
          show: true,
          message: "Server not available at the moment. Try again later",
        }),
      );
  }, []);

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/spare-parts">Spare Parts</a>
          </li>
          <li>
            <a href={`/spare-parts/${spare_part_id}`}>
              {sparePartData
                ? sparePartData.sparePart.name
                : "<spare_part_name>"}
            </a>
          </li>
        </ul>
      </div>
      {fetchError.show ? (
        <JhFetchError message={fetchError.message} />
      ) : sparePartData ? (
        <>
          <p className="text-4xl font-extrabold mt-5">
            {sparePartData.sparePart.name}
          </p>
          <div className="flex justify-start mt-8">
            <SparePartDetailsFormTable sparePart={sparePartData.sparePart} />
            <div className="ml-20">
              <p className="text-md text-gray-500">Related machine</p>
              <Link
                to={`/machines/${sparePartData.associatedMachine.machineId}`}
                className="text-xl font-extrabold underline hover:text-blue-800"
              >
                {sparePartData.associatedMachine.machineName}
              </Link>

              <p className="text-md text-gray-500 mt-8">
                {sparePartData.associatedProblems.length === 0 ? "No r" : "R"}
                elated problems
              </p>
              <ul>
                {sparePartData.associatedProblems.map((problem) => (
                  <li key={problem.problemId}>
                    <Link
                      to={`/machines/${sparePartData.associatedMachine.machineId}/${problem.problemId}`}
                      className="text-xl font-extrabold underline hover:text-blue-800"
                    >
                      {problem.problemName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
