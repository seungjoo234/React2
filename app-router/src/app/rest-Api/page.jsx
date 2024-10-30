"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export default function RestApi() {
  const [users, setUsers] = useState(null); // 상태 과닐
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setUsers(res.data); // 상태 업데이트
      } catch (error) {
        console.error("Error fetching data.", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };
    fetchUsers();
  }, []); // 컴포넌트가 마운트 될때만 실행

  if (loading) return <h1>Loading ...</h1>; // 로딩 중일 때
  if (!users) return <h1>No Users Found</h1>; // 데이터가 없을 때

  return (
    <>
      <h1>axios</h1>
      {users.map((user, id) => {
        return (
          <div key={id}>
            <h2>{user.id}</h2>
            <h3>{user.title}</h3>
            <h3>{user.url}</h3>
            <h3>{user.thumbnailUrl}</h3>
          </div>
        );
      })}
    </>
  );
}
