import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [serachParams, setSearchParams] = useSearchParams();

  const id = serachParams.get("id");
  const mode = serachParams.get("mode");

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지입니다.</p>
      <button onClick={() => setSearchParams({ id: 1, mode: "edit" })}>
        수정하기
      </button>
      <button onClick={() => navigate("/home")}>홈으로</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
};

export default Edit;
