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
          <p>Spare Part:</p>
          <p>{sparePartData.sparePart.name}</p>

          <p>Associated machine:</p>
          <Link to={`/machines/${sparePartData.associatedMachine.machineId}`}>
            {sparePartData.associatedMachine.machineName}
          </Link>

          <p>Associated problems:</p>
          <ul>
            {sparePartData.associatedProblems.map((problem) => (
              <li key={problem.problemId}>
                <Link
                  to={`/machines/${sparePartData.associatedMachine.machineId}/${problem.problemId}`}
                >
                  {problem.problemName}
                </Link>
              </li>
            ))}
          </ul>

          <p>Details:</p>
          <SparePartDetailsFormTable sparePart={sparePartData.sparePart} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
