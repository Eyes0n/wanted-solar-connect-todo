# Solar Connext Todo App

## [🔗 배포 링크](https://solar-connect-todo-app.netlify.app)

## 구현 기능

✅ Spiner 컴포넌트 중앙 정렬

✅ 모든 함수의 매개변수 및 리턴 타입 지정

✅ toggleTodo함수 기능 구현

✅ removeTodo함수 기능 수정

✅ 로컬스토리지에서 불러오는 data가 null인 경우에 `[]` 으로 초기값 설정

✅ todo추가 시 nextId 1씩 증가로 수정 및 초기화 현상 수정

✅ antd DatePicker 완료 목표일 기능 추가

✅ 현재 날짜 출력 구현

✅ antd 모달로 todo 미입력 or 완료 안된 todo 삭제 시 경고 메시지 출력 구현


## 추가 기능 구현

✅ DatePicker 오늘 날짜 기준 이전 날짜 선택 불가 기능 구현

✅ DatePicker default 날짜를 오늘 날짜로 구현

✅ context api & useReducer 적용으로 인한 TodoService.tsx제거


## 버그

🛠 localStorage에 데이터 없을 때 에러 발생 빈 배열 초기값 설정으로 해결

🛠 todo 추가 시 초기화 되는 nextIdState -> 선언된 위치 수정으로 인한 해결

🛠 잘못 구현된 삭제 함수 -> filter조건 수정으로 해결

## 설치 및 시작 방법

```js
- git clone https://github.com/Eyes0n/wanted-solar-connect.git
- cd wanted-solar-connect-todo
- npm install
- npm start
```
