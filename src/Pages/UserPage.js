import React, { useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { auth, db } from "../firebaseConfig";

const UserPage = () => {
  const [data, setData] = useState([]);
  console.log(auth.currentUser);

  const fetchUserData = async () => {
    const resultRef = db.collection("Results");

    let tempData = [];
    const { uid } = auth.currentUser;
    resultRef
      .where("userId", "==", uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
        });
      });
    setData(tempData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="canvas">
      <div className="table">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>WPM</TableCell>
                <TableCell>Accuracy</TableCell>
                <TableCell>Characters</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserPage;
