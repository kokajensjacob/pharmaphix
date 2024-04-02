import { useEffect, useRef, useState } from "react";
import { SparePartGetResponseDto } from "../types";
import { Link, useParams } from "react-router-dom";
import { fetchSparePart } from "../api";
import { Loading } from "../components/Loading";

export const SparePartPage = () => {
  const [sparePartData, setSparePartData] = useState<SparePartGetResponseDto>();
  const [editable, setEditable] = useState<boolean>(false);
  const [updatable, setUpdatable] = useState<boolean>(false);
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
      .catch(() => console.log("fetch failed yo"));
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
      {sparePartData ? (
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
          {editable ? (
            <div>
              <button onClick={() => setEditable(false)}>Cancel</button>
              <button disabled={!updatable}>Update</button>
            </div>
          ) : (
            <button onClick={() => setEditable(true)}>Edit</button>
          )}
          <form>
            <table>
              <tbody>
                <tr>
                  <th>In Stock</th>
                  <td>
                    <input
                      type="number"
                      disabled={!editable}
                      onChange={() => setUpdatable(true)}
                      defaultValue={sparePartData.sparePart.quantityInStock}
                    />
                  </td>
                </tr>
                <tr>
                  <th>In Workshop</th>
                  <td>
                    <input
                      type="number"
                      disabled
                      value={sparePartData.sparePart.quantityInRepair}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Optimal quantity</th>
                  <td>
                    <input
                      type="number"
                      disabled
                      value={sparePartData.sparePart.optimalQuantity}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Cost</th>
                  <td>
                    <input
                      type="number"
                      disabled
                      value={sparePartData.sparePart.cost}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Failure rate (times/year)</th>
                  <td>
                    <input
                      type="number"
                      disabled
                      value={sparePartData.sparePart.failureRate}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Repair time (years)</th>
                  <td>
                    <input
                      type="number"
                      disabled
                      value={sparePartData.sparePart.repairTime}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
