import React from 'react';
import { APIDataContext } from "../App"
import { useTable } from 'react-table'
import { useMemo } from "react";
import "../styles/TableRankingsStyles.css"

const Men1800Rankings = () => {
    const { rankingsMen } = React.useContext(APIDataContext);

    const Top1800Mens = rankingsMen.slice(1600, 1800);
    const data = useMemo(() => Top1800Mens, []);
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
export default Men1800Rankings;