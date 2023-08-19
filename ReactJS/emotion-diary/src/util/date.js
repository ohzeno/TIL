export const getStringDate = (date) => {
  /* 강의에서는 date.toISOString().slice(0, 10);를 사용. 
    DiaryItem쪽은(const strDate = new Date(parseInt(created_date)).toLocaleDateString();) 로컬 시간대고 여기는 UTC 시간대라 차이가 생김.
    로컬 시간대로 바꾼 후에 포맷 바꿔줌
  */
  return date
    .toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, "")
    .replace(/\s/g, "-");
};
