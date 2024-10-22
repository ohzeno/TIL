# Move file

[최상위 폴더](../../../README.md)

[TOC]



```python
import os
import shutil

from_dir = 'D:\data\crawling\cookbook'
to_dir = 'E:\data\cookbook'
file_list = os.listdir(from_dir)  # from_dir의 파일리스트
if from_dir == to_dir:  # 실수로 경로 같게 적은 경우
    print('from_dir과 to_dir은 다른 경로여야 합니다.')
else:  # 경로 다르다면
    for file in file_list:  # 파일 목록에서 확장자 pt인 경우만
        if file.endswith('.pt'):
            try:  # 이동 시도
                shutil.move(os.path.join(from_dir, file), to_dir)
                print(f'{file} moved!')
            except Exception as err:
                # 이미 목표 위치에 파일이 존재하는 경우 시작위치 파일 삭제
                if err.args[0].endswith('already exists'):
                    os.remove(os.path.join(from_dir, file))
                print(err)
                print(f'{file} not moved!')

```

os를 이용해 파일 목록을 받아오고, shutil을 이용해 이동한다.

os.remove의 경우 휴지통으로 가지 않아서 주의해야 한다. 

시작, 도착 경로를 실수하지 않도록 if문을 넣어줬다.

----------------------------

리눅스 서버에서 ssd로 데이터를 옮기고 있었다. 몇백 기가 옮긴 후 다운로드가 안끝나길래 전체 데이터의 용량을 보니 ssd보다 컸다. 용량 확보를 위해 이미 받은 데이터를 ssd에서 외장하드로 옮기기 위해 위 코드를 작성했다.



## Move folder

```python
import os
import shutil

def createDirectory(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print("Error: Failed to create the directory.")
        
my_id = 'test'
from_dir = 'C:/Users/black/Desktop/cookbook/algorithm'
to_dir = 'C:/Users/black/Desktop/cookbook/algorithm/zeno'
file_list = os.listdir(from_dir)  # from_dir의 파일리스트
if from_dir == to_dir:  # 실수로 경로 같게 적은 경우
    print('from_dir과 to_dir은 다른 경로여야 합니다.')
else:  # 경로 다르다면
    for file in file_list:  # 파일 목록에서
        if file.isdigit():  # 날짜 폴더만
            tmp_dir = from_dir + f'/{file}'
            tmp_list = os.listdir(tmp_dir)
            if my_id in tmp_list:  # 날짜 폴더 안에 내 아이디 폴더 있으면
                tmp_from = tmp_dir + f'/{my_id}'
                tmp_file_list = os.listdir(tmp_from)  # 내 폴더 안 파일들
                tmp_to = to_dir + f'/{file}'
                createDirectory(tmp_to)  # 내 폴더에 날짜폴더 생성
                for tmp_file in tmp_file_list:  # 파일들 내 폴더쪽으로 이동
                    shutil.move(os.path.join(tmp_from, tmp_file), tmp_to)
                os.rmdir(tmp_from)  # 날짜폴더 안의 내 아이디 폴더 삭제
```

폴더 자체를 옮기는 것은 파일과 똑같이 shutil.move를 사용하면 된다.

폴더 내용물만 옮기려면 이전과 같이 os.listdir를 사용하여 받아온 파일들을 옮기고

폴더를 삭제해야 하는데, 폴더는 os.remove로 안된다. os.rmdir를 사용해야 한다.



## 삭제

- ### 휴지통을 거치지 않음

  - #### 파일

    - os.remove(파일경로)
      - 파일 삭제. 폴더 불가.

    - Path.unlink()

      ```py
      from pathlib import Path
      file_path = Path(os.path.join(dir1, sub_dir))
      file_path.unlink()
      ```

      파일 삭제. 폴더 불가.

  - #### 폴더

    - os.rmdir(폴더 경로)
      - 비어있는 폴더를 삭제. 내용물이 있으면 에러 발생.
      - 파일 불가.
    - shutil.rmtree(폴더경로)
      - 폴더와 폴더 내부 모든 파일/폴더를 삭제. 내용물이 있든 없든 삭제.
      - 파일 하나를 직접 지정하는건 불가.

    - Path.rmdir()
      - 비어있는 폴더를 삭제. 내용물이 있으면 에러 발생.
      - 파일 불가.

- ### 휴지통으로

  ```py
  from send2trash import send2trash
  send2trash(paths=파일 or 폴더 경로 리스트)
  ```

  파일, 폴더 모두 가능. 

  paths로 경로 리스트를 건내면 여럿 삭제도 가능.