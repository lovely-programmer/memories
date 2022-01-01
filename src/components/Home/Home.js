import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPostBySearch } from "../../actions/postAction";
import Paginate from "../Pagination/Pagination";

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const handleSearch = (e) => {
    e.preventDefault();
    searchPost();
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl" className={classes.gridContainer}>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          align-items="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <form onSubmit={handleSearch}>
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="search Tags"
                variant="outlined"
              />
              <Button
                className={classes.searchButton}
                variant="contained"
                onClick={searchPost}
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form
              setCurrentId={setCurrentId}
              currentId={currentId}
              setUpdate={setUpdate}
            />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} update={update} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
