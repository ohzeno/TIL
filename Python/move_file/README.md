## Move file

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