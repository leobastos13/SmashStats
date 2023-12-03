import React from 'react';
import { APIDataContext } from "../App"
import { useTable } from 'react-table'
import { useMemo } from "react";
//Este hook serve para guardar informação de um render para outro ou seja quando há um re-render a informação continua lá! Só funciona para valores e assim estes não precisam de ser calculados outra vez quando há um render!
import "../styles/TableRankingsStyles.css"

const Men1400Rankings = () => {
    const { rankingsMen } = React.useContext(APIDataContext);

    const Top1400Mens = rankingsMen.slice(1200, 1400);
    const data = useMemo(() => Top1400Mens, []);
    const columns = useMemo(() => [
        {
            Header: "Rank",
            accessor: "place"
        },
        {
            Header: "Country",
            accessor: "country"
        },
        {
            Header: "Player",
            accessor: "player"
        },
        {
            Header: "Points",
            accessor: "points"
        }
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    let HeaderGroups = headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                </th>
            ))}
        </tr>
    ))

    let Rows = rows.map((row) => {
        prepareRow(row);
        return (
            <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                        {cell.render("Cell")}
                    </td>
                ))}
            </tr>
        )
    })

    return (
        <div className="tableContainer tableWrapper">
            <table {...getTableProps}>
                <thead>
                    {HeaderGroups}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {Rows}
                </tbody>
            </table>
        </div>
    )
}
export default Men1400Rankings;