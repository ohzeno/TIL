## gist_to_git

```sql
for folderName, gistUrl in gistUrls.items():
    # 폴더 이름으로 클론
    subprocess.run(['git', 'clone', gistUrl, folderName])

    # 클론한 폴더 내로 이동
    os.chdir(folderName)

    # 원격 레포지토리 GitHub쪽으로 변경
    subprocess.run(['git', 'remote', 'set-url', 'origin', gitUrls[folderName]])

    # 변경한 원격 레포지토리로 푸시
    subprocess.run(['git', 'push', '-u', 'origin', 'master'])

    # 상위 폴더로 돌아감
    os.chdir('..')
```

subprocess는 파이썬에서 쉘 명령을 실행할 수 있도록 해준다. 처음에는 이름을 보고 멀티프로세스 관련 모듈이라 생각했다.

네부캠 챌린지 과정의 gist 레포들에 commit들이 상당히 많이 있는데, gist의 commit은 contribution에 표시되지 않는다. 하루에 몇십 커밋을 했는데 contribution에 표시되지 않는다고 생각하니 아까웠다.

비록 정책때문에 public 레포를 만들 수는 없지만, github쪽에 private 레포들을 만들어주고 gist 레포들의 원격 저장소를 바꾸고 push하여 commit 기록들을 옮겨왔다.

