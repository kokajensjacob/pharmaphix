import { useEffect, useState } from "react";
import { SparePartGetResponseDto } from "../types";
import { Link, useParams } from "react-router-dom";
import { fetchSparePart } from "../api";
import { Loading } from "../components/Loading";
import { SparePartDetailsFormTable } from "../components/SparePartDetailsFormTable";
import { FetchError } from "../components/errors/FetchError";

export const SparePartPage = () => {
  const [sparePartData, setSparePartData] = useState<SparePartGetResponseDto>();
  const [showFetchError, setShowFetchError] = useState<boolean>(false);
  const { spare_part_id } = useParams();

  useEffect(() => {
    fetchSparePart(spare_part_id!)
      .then((resp) => {
        switch (resp.status) {
          case 200:
            resp.json().then((data) => setSparePartData(data));
            break;
          case 404:
            console.log("fetch returned 404 yo"); // TO DO
            break;
          default:
            console.log("sum unexpected happaned"); // TO DO
        }
      })
      .catch(() => setShowFetchError(true));
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
      {showFetchError ? (
        <FetchError />
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
