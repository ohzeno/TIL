# TypeScript

# 환경설정

폴더 `npm init -y` 후 `npm i @types/node`

ts 설치 안돼있으면

`npm install typescript -g`

`node xxx.js`처럼 실행하려면

`tsc xxx.ts` 하면 js로 컴파일해줌

직접 실행하려면 

ts-node 설치 안돼있으면 `npm install ts-node -g`

`ts-node xxx.ts`

## 컴파일러 설정

`tsc  -init`

package.json에 "type": "module", → tsconfig에서 ts-node esm 설정

```json
---tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "outDir": "dist",  // 컴파일된 파일 모을 폴더
    "strict": true,  // 함수 인풋값 타입 설정하도록
		"strictNullChecks": false,  // 다른 타입 변수에 null값 넣을 수 있게 해줌
		
		// 다른 파일은 각각 모듈로. 설정하지 않으면 모든 파일이 전역으로 취급되어
		// 한쪽에서 const a하면 다른 파일에서 const a해도 오류남.
    "moduleDetection": "force",
		"allowJs": true  // src 폴더에 js파일 있어도 에러 발생하지 않도록. 
  },
  "ts-node": {
    "esm": true  // ts-node에서 CommonJs 대신 esm 사용하기 위함
  },
  "include": ["src"]  // tsc만 하면 src 내부 ts파일들 전부 컴파일
}
```