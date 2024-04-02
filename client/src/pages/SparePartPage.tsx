import { useState } from "react";
import { SparePart } from "../types";
import { useParams } from "react-router-dom";

export const SparePartPage = () => {
  const [sparePart, setSparePart] = useState<SparePart>();
  const { spare_part_id } = useParams();

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
              {sparePart ? sparePart.name : "<spare_part_name>"}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
