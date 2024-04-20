// ResultTable.jsx
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";
import "./ResultTable.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ResultTable = ({ data, loading }) => {
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (data && !loading) {
      setShowTable(true);
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className="loading">
        <ScaleLoader
          color={"#36D7B7"}
          loading={loading}
          css={override}
          size={150}
        />
      </div>
    );
  }

  if (!data || !data.columns || !data.rows) {
    return null;
  }
  
  const columns = data.columns;
  const rows = data.rows;

  return (
    <div className={`table-responsive ${showTable ? "show" : ""}`}>
      <table className="table table-bordered">
        <colgroup>
          <col style={{ width: "50%" }} />
          <col style={{ width: "50%" }} />
        </colgroup>
        <tbody>
          {columns.map((column, index) => (
            <tr key={index} className={`row-animate`}>
              <td>{column}</td>
              <td>
                {column === "Candidate Feedback  report link" ? (
                  <a
                    href={rows[0][column]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {rows[0][column]}
                  </a>
                ) : (
                  rows[0][column]
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
