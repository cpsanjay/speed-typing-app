import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Graph from "./../Components/Graph";
import { useTheme } from "../Context/ThemeContext";
import { AccountCircle } from "@mui/icons-material";
import { CircularProgress } from "@material-ui/core";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [user, loading] = useAuthState(auth);
  const { theme } = useTheme();

  const fetchUserData = async () => {
    const resultRef = db.collection("Results");

    let tempData = [];
    let tempGraphData = [];
    console.log(auth.currentUser.uid);
    const { uid } = auth.currentUser;

    await resultRef
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
        });
      });
    setData(tempData);
    setGraphData(tempGraphData.reverse());
    setDataLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
  }, [loading]);

  if (loading || dataLoading) {
    return (
      <div className="center-screen">
        <CircularProgress size="100px" color={theme.title} />
      </div>
    );
  }
  return (
    <div className="canvas">
      <div className="user-profile">
        <div className="user">
          <div className="picture">
            <AccountCircle
              style={{
                display: "block",
                transform: "scale(6)",
                margin: "auto",
              }}
            />
          </div>
          <div className="info">
            <div className="email">{user.email}</div>
            <div className="joined-on">{user.metadata.creationTime}</div>
          </div>
        </div>
        <div className="total-items">
          <span> Total Test Taken - {data.length}</span>
        </div>
      </div>
      <div className="result-graph">
        <Graph graphData={graphData} type="date" />
      </div>
      <div className="table">
        <TableContainer style={{ maxHeight: "30rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: theme.title, textAlign: "center" }}>
                  WPM
                </TableCell>
                <TableCell style={{ color: theme.title, textAlign: "center" }}>
                  Accuracy
                </TableCell>
                <TableCell style={{ color: theme.title, textAlign: "center" }}>
                  Characters
                </TableCell>
                <TableCell style={{ color: theme.title, textAlign: "center" }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((i) => (
                <TableRow>
                  <TableCell
                    style={{ color: theme.title, textAlign: "center" }}
                  >
                    {i.wpm}
                  </TableCell>
                  <TableCell
                    style={{ color: theme.title, textAlign: "center" }}
                  >
                    {i.accuracy}
                  </TableCell>
                  <TableCell
                    style={{ color: theme.title, textAlign: "center" }}
                  >
                    {i.characters}
                  </TableCell>
                  <TableCell
                    style={{ color: theme.title, textAlign: "center" }}
                  >
                    {i.timeStamp.toDate().toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserPage;
