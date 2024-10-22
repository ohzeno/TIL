import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerText = `감정 일기장 - ${id}번 일기`;
  }, []);

  useEffect(() => {
    if (diaryList.length === 0) return;
    const diary = diaryList.find((item) => parseInt(item.id) === parseInt(id));
    if (!diary) {
      alert("존재하지 않는 일기입니다.");
      navigate("/", { replace: true });
      return;
    }
    setData(diary);
  }, [id, diaryList]);

  if (!data) return <div className="DiaryPage">로딩중입니다...</div>;
  const curEmotionData = emotionList.find(
    (item) => parseInt(item.emotion_id) === parseInt(data.emotion)
  );
  return (
    <div className="DiaryPage">
      <MyHeader
        headText={`${getStringDate(new Date(data.created_date))} 기록`}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          <MyButton text={"수정하기"} onClick={() => navigate(`/edit/${id}`)} />
        }
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div
            className={[
              "diary_img_wrapper",
              `diary_img_wrapper_${data.emotion}`,
            ].join(" ")}
          >
            <img src={curEmotionData.emotion_img} />
            <div className="emotion_descript">
              {curEmotionData.emotion_descript}
            </div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Diary;
