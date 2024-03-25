import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table/Table";
import { Tab } from "./components/Tabs/Tabs";
import rawJson from "./data.json";

export interface User {
  first: string;
  last: string;
  photo: string;
  role: string;
}

type DataState = "loading" | "resolved";
type Tab = "members" | "groups";

function App() {
  const json = JSON.parse(JSON.stringify(rawJson));
  const users = Object.values(json.users) as User[];

  const [checked, setChecked] = useState(new Array(users.length).fill(false));
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [nonAdminUsers, setNonAdminUsers] = useState<User[]>(users);
  const [dataState, setDataState] = useState<DataState>("loading");
  const [currentTab, setCurrentTab] = useState<Tab>("members");

  const addAdmin = (user: User) => {
    setAdminUsers([...adminUsers, user]);
    setNonAdminUsers(
      nonAdminUsers.filter(
        (u) => u.first !== user.first && u.last !== user.last
      )
    );
  };

  const removeAdmin = (user: User) => {
    setNonAdminUsers([...nonAdminUsers, user]);
    setAdminUsers(
      adminUsers.filter((u) => u.first !== user.first && u.last !== user.last)
    );
  };

  const handleUserChange = (user: User, i: number) => {
    checked[i] ? removeAdmin(user) : addAdmin(user);
    setChecked([
      ...checked.slice(0, i),
      !checked[i],
      ...checked.slice(i + 1, users.length),
    ]);
  };

  useEffect(() => {
    setTimeout(() => setDataState("resolved"), 5000);
  });

  return dataState === "resolved" ? (
    <>
      <h1>Member Details</h1>
      <Tab
        title="Members"
        active={currentTab === "members"}
        onClick={() => setCurrentTab("members")}
      />
      <Tab
        title="Groups"
        active={currentTab === "groups"}
        onClick={() => setCurrentTab("groups")}
      />
      {currentTab === "members" && (
        <Table
          users={users}
          onUserChange={handleUserChange}
          checkedList={checked}
        />
      )}
      {currentTab === "groups" && (
        <>
          <h4>Admins</h4>
          <Table users={adminUsers} checkedList={checked} hideSelect />
          <h4>Regular Users</h4>
          <Table users={nonAdminUsers} checkedList={checked} hideSelect />
        </>
      )}
    </>
  ) : (
    <div className="loading">Loading...</div>
  );
}

export default App;
