import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useAuth } from "../../Hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateChallenges } from "../../Store/challenges";

const columns = [
  {
    flex: 0.2,
    minWidth: 200,
    field: "title",
    headerName: "Title",
    renderCell: ({ value }) => {
      return (
        <Typography sx={{ fontWeight: "600" }} variant="subtitle2">
          {value}
        </Typography>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: "description",
    headerName: "Description",
    renderCell: ({ value }) => {
      return (
        <Typography noWrap variant="body2">
          {value}
        </Typography>
      );
    },
  },
  {
    flex: 0.15,
    field: "createdById",
    minWidth: 400,
    headerName: "Created By",
    renderCell: ({ row }) => {
      return (
        <Stack
          direction={"column"}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {renderAvatar(row)}
            <Typography sx={{ fontWeight: "600" }}>
              {row.createdByName}
            </Typography>
            <br></br>
          </Box>
          <Typography>{row.createdById}</Typography>
        </Stack>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: "Tag",
    field: "tag",
    renderCell: ({ row }) => {
      return <Chip size="small" label={row.tag} skin="light" color="primary" />;
    },
  },
  {
    flex: 0.15,
    minWidth: 50,
    headerName: "Vote",
    field: "vote",
    renderCell: ({ row }) => {
      return <VoteComponent row={row} />;
    },
  },
];

const renderAvatar = (row) => {
  const stateNum = Math.floor(Math.random() * 6);
  const states = [
    "success",
    "error",
    "warning",
    "info",
    "primary",
    "secondary",
  ];
  const color = states[stateNum];

  return (
    <Avatar
      skin="light"
      color={color}
      sx={{ mr: 1, width: 30, height: 30, fontSize: ".875rem" }}
    >
      {row?.createdByName?.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default function ListView({ rows, handleAdd }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredRow = React.useMemo(
    () =>
      rows.filter(
        (item) =>
          (item.title &&
            item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.description &&
            item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ) ?? [],
    [searchQuery, rows]
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Card>
      <CardHeader />
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        mb={2}
        p={"0 20px 0 20px"}
        gap={2}
      >
        <TextField
          placeholder="Search Challenge"
          value={searchQuery}
          onChange={handleSearch}
          size="small"
          InputProps={{
            endAdornment: <SearchOutlinedIcon color="primary" />,
          }}
        />

        <Button variant="contained" size="small" onClick={handleAdd}>
          CREATE CHALLENGE
        </Button>
      </Stack>

      <DataGrid
        rowHeight={70}
        autoHeight
        rows={filteredRow ?? []}
        columns={columns}
        disableRowSelectionOnClick
        localeText={{ noRowsLabel: "No Users" }}
      />
    </Card>
  );
}

function VoteComponent({ row }) {
  const dispatch = useDispatch();
  const { userId, userName } = useAuth();

  const isVoted = !!row?.vote?.find((item) => item === userId);

  const handleVote = () => {
    const payload = {
      ...row,
      vote: isVoted
        ? row.vote.filter((item) => item !== userId)
        : [...row.vote, userId],
    };
    dispatch(updateChallenges(payload));
  };

  return (
    <>
      {isVoted ? (
        <ThumbUpIcon
          onClick={handleVote}
          color="primary"
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "primary.dark",
            },
          }}
        ></ThumbUpIcon>
      ) : (
        <ThumbUpAltOutlinedIcon
          onClick={handleVote}
          color="primary"
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "primary.dark",
            },
          }}
        ></ThumbUpAltOutlinedIcon>
      )}

      <Typography marginLeft={"5px"} variant="body2">
        {row.vote.length}
      </Typography>
    </>
  );
}
