import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import Graph from "./Graph";

const ComparePage = () => {
  const { username } = useParams();
  const [user, loading] = useAuthState(auth);

  const [loggedInUserData, setLoggedInUserData] = useState([]);
  const [compareUserData, setCompareUserData] = useState([]);
  const [loggedInUserGraphData, setLoggedInUserGraphData] = useState([]);
  const [compareUserGraphData, setCompareUserGraphData] = useState([]);

  const getUid = async () => {
    const ref = db.collection("username").doc(`${username}`);
    const response = await ref.get();
    return response.data().uid;
  };

  const getData = async () => {
    const userUid = await getUid();
    const { uid } = auth.currentUser;
    const resultRef = db.collection("Results");

    let tempData = [];
    let tempGraphData = [];

    resultRef
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
          setLoggedInUserData(tempData);
          setLoggedInUserGraphData(tempGraphData);
        });
      });
    let tempData1 = [];
    let tempGraphData1 = [];

    resultRef
      .where("userId", "==", userUid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData1.push({ ...doc.data() });
          tempGraphData1.push([doc.data().timeStamp, doc.data().wpm]);
          setCompareUserData(tempData1);
          setCompareUserGraphData(tempGraphData1);
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="compare-page">
      <div className="compare-graph-single">
        {user !== null && (
          <div className="compare-name">{user.email.split("@")[0]}</div>
        )}

        <Graph graphData={loggedInUserGraphData} type="date" />
      </div>
      <div className="compare-graph-single">
        <div className="compare-name">{username}</div>
        <Graph graphData={compareUserGraphData} type="date" />
      </div>
    </div>
  );
};

export default ComparePage;
