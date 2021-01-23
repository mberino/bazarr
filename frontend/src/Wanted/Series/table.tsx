import React from "react";
import { Column } from "react-table";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { BasicTable, AsyncStateOverlay, ActionBadge } from "../../Components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  wanted: AsyncState<WantedEpisode[]>;
  //   search: (id: string) => void;
}

function mapStateToProps({ series }: StoreState): Props {
  const { wantedSeriesList } = series;
  return {
    wanted: wantedSeriesList,
  };
}

function Table(props: Props): JSX.Element {
  const columns: Column<WantedEpisode>[] = React.useMemo<
    Column<WantedEpisode>[]
  >(
    () => [
      {
        Header: "Name",
        accessor: "seriesTitle",
        Cell: (row) => {
          const target = `/series/${row.row.original.sonarrSeriesId}`;
          return (
            <Link to={target}>
              <span>{row.value}</span>
            </Link>
          );
        },
      },
      {
        Header: "Episode",
        accessor: "episode_number",
      },
      {
        accessor: "episodeTitle",
      },
      {
        Header: "Missing",
        accessor: "missing_subtitles",
        Cell: (row) => {
          return row.value.map((item, idx) => (
            <ActionBadge key={idx} onClick={() => {}}>
              <span className="mr-1">{item.code2}</span>
              <FontAwesomeIcon size="sm" icon={faSearch}></FontAwesomeIcon>
            </ActionBadge>
          ));
        },
      },
    ],
    []
  );

  return (
    <AsyncStateOverlay state={props.wanted}>
      {(data) => (
        <BasicTable
          emptyText="No Missing Episodes Subtitles"
          options={{ columns, data }}
        ></BasicTable>
      )}
    </AsyncStateOverlay>
  );
}

export default connect(mapStateToProps, {})(Table);
