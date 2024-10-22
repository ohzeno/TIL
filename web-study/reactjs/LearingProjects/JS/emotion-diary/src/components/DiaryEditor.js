import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date())); // edit이면 useEffect에서 알아서 바꿔주니까 걍 new Date() 써도 됨
  const { onCreate, onEdit, onDelete } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content.length === 0) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (isEdit) {
        // 강의에서는 date를 넘겨주나, 그러면 일자까지만 있어서 현재 작성한 일기는 당일 초에 작성한 것이 된다.
        onEdit(originData.id, originData.created_date, content, emotion);
      } else {
        onCreate(new Date(), content, emotion); // 마찬가지로 강의에서는 date를 넘겨줌.
      }
      navigate("/", { replace: true });
    }
  };

  const handleDelete = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onDelete(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (!isEdit) return;
    setContent(originData.content);
    setEmotion(originData.emotion);
    setDate(getStringDate(new Date(parseInt(originData.created_date))));
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기 작성"}
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <MyButton text="삭제하기" type="negative" onClick={handleDelete} />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((item) => (
              <EmotionItem
                key={item.emotion_id}
                {...item}
                onClick={setEmotion} // 강의에서는 다른 함수로 감싸서 useCallback으로 보내주는데, 로직이 setEmotion밖에 없어서 그냥 보내주고 React.memo 쓰는거랑 차이가 없음.
                isSelected={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text="취소하기" onClick={() => navigate(-1)} />
            <MyButton
              text="작성 완료"
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
