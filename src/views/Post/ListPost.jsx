import { Add } from "@material-ui/icons";
import { Button, Grid, Paper, makeStyles } from "@material-ui/core";
import { css } from "emotion";
import { fromJS } from "immutable";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import moment from "moment";

import {
  createPost,
  deletePost,
  retreivePosts
} from "../../actions/post.creators";
import { useFetching } from "../../hook";
import AddPostModal from "../../components/Post/AddPostModal";
import DeleteButton from "../../components/Button/DeleteButton";
import Table from "../../components/Table/Table";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const ListPost = () => {
  useFetching(retreivePosts);
  const classes = useStyles();
  const dispatch = useDispatch();

  const posts = useSelector(state =>
    state.getIn(["post", "posts"], fromJS([]))
  ).toJS();

  const isCreating = useSelector(state =>
    state.getIn(["post", "isCreating"], false)
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "Url",
        id: "slug",
        accessor: row => `/${row.slug}`
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Created at",
        id: "created_at",
        accessor: row => moment(row.created_at).format("YYYY-MM-DD HH:mm")
      },
      {
        Header: "Action",
        id: "action",
        accessor: function actionCol(row) {
          return (
            <DeleteButton
              key={row.uuid}
              handleDelete={() => dispatch(deletePost(row.uuid))}
              isLoading={row.isDeleting}
              disabled={row.isDeleting}
            />
          );
        }
      }
    ],
    []
  );

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={7}>
        <Paper className={classes.paper}>
          <Table
            title="All posts"
            columns={columns}
            data={posts}
            isCreating={isCreating}
            renderAddButton={() => (
              <AddPostModal
                renderAddButton={handleOpen => (
                  <Button
                    className={css`
                      border-radius: 100%;
                      padding-top: 20px;
                      padding-bottom: 20px;
                      margin-top: 20px;
                      margin-bottom: 20px;
                      margin-right: 20px;
                    `}
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                  >
                    <Add />
                  </Button>
                )}
                createPost={data => dispatch(createPost(data))}
                isCreating={isCreating}
              />
            )}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ListPost;
