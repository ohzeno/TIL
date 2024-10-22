import os
import shutil

def createDirectory(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print("Error: Failed to create the directory.")
my_id = 'strengthpy'
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

