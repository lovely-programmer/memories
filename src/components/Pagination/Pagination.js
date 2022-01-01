import { Pagination, PaginationItem } from "@material-ui/lab";
import { useEffect } from "react";
import usestyles from "./styles";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/postAction";
import { useDispatch, useSelector } from "react-redux";

function Paginate({ page, update }) {
  const classes = usestyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    page && dispatch(getPosts(page));
  }, [dispatch, update, page]);

  return (
    <div>
      <Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        )}
      />
    </div>
  );
}

export default Paginate;
