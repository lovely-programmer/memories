import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  Delete,
  MoreHoriz,
} from "@material-ui/icons";
import { format } from "timeago.js";
import makeStyles from "./styles.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/postAction";

function Post({ post, setCurrentId }) {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const history = useHistory();

  const userId = authData?.result?.googleId || authData?._id;
  const handleLike = (id) => {
    if (authData) {
      dispatch(likePost(id, userId));
    } else {
      history.push("/auth");
    }
  };

  const Likes = () => {
    if (post?.likes.length > 0) {
      return post.likes.includes(
        authData?.result?.googleId || authData?._id
      ) ? (
        <>
          {" "}
          <ThumbUpAlt fontSize="small" /> &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${
                post.likes.length > 1 ? "s" : ""
              }`}{" "}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" /> &nbsp;{post.likes.length}{" "}
          {post.likes.length === 1 ? "Like" : "Likes"}{" "}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" /> &nbsp;Like
      </>
    );
  };

  return (
    <div>
      <Card className={classes.card} raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={post?.selectedFile}
          title={post?.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post?.username}</Typography>
          <Typography variant="body2">{format(post?.createdAt)}</Typography>
        </div>

        {(authData?.result?.googleId === post?.creator ||
          authData?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post?._id)}
            >
              <MoreHoriz fontSize="default" />
            </Button>
          </div>
        )}

        <div className={classes.details}>
          <Typography color="textSecondary" variant="body2">
            {post?.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} gutterButtom variant="h5">
          {post?.title}
        </Typography>
        <CardContent>
          <Typography
            className={classes.cardContent}
            color="textSecondary"
            component="p"
            variant="body2"
          >
            {post?.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => handleLike(post?._id)}
          >
            <Likes />
          </Button>

          {(authData?.result?.googleId === post?.creator ||
            authData?._id === post?.creator) && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post?._id))}
            >
              <Delete fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;
