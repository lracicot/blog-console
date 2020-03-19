/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from "react";

import MaUTable from "@material-ui/core/Table";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableToolbar from "./TableToolbar";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from "react-table";

const Table = ({ columns, data, renderAddButton, title }) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value));
  };

  return (
    <TableContainer>
      <TableToolbar
        renderAddButton={renderAddButton}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        title={title}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <TableSortLabel
                    active={column.isSorted}
                    // react-table has a unsorted state which is not treated here
                    direction={column.isSortedDesc ? "desc" : "asc"}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: "All", value: data.length }
              ]}
              colSpan={3}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  renderAddButton: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isCreating: PropTypes.bool
};

export default Table;
