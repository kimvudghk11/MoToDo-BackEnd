# 📝 MoToDo Backend
Node.js(Express) + MariaDB 기반의 일정 관리 & 친구 기능을 제공하는 백엔드 서버입니다.  
MoToDo는 단순한 할 일 관리 서비스가 아니라 **친구 기반 협업 기능**을 포함한 소셜 Todo 서비스이며,  
본 저장소는 해당 서비스를 위한 백엔드 API를 제공합니다.

---

## 🚀 Tech Stack

### **Backend**
- Node.js (Express.js)
- JWT Authentication
- bcrypt password hashing
- MySQL2 (Promise 기반)
- CORS
- dotenv 환경 변수 관리

### **Database**
- MariaDB (Cloudtype)
- Tables: `users`, `friends`, `todos`

### **Deployment & Tools**
- Cloudtype
- Postman API Test
- GitHub Version Control

---

## 📂 Folder Structure

```bash
MoToDo-BackEnd/
 ┣ src/
 ┃ ┣ config/
 ┃ ┃ ┣ db.js
 ┃ ┃ ┗ env.js
 ┃ ┣ controllers/
 ┃ ┣ middlewares/
 ┃ ┣ repositories/
 ┃ ┣ routes/
 ┃ ┣ sockets/
 ┃ ┣ utils/
 ┃ ┗ app.js
 ┣ server.js
 ┗ package.json
```
---

## 🏗 Architecture

MoToDo 백엔드는 Controller → Repository 중심의 2계층 구조로 구성되어 있습니다.

### ✔ Controller
- 요청 파싱 및 응답 처리
- 토큰 검증 및 인증 미들웨어 연결
- Repository에서 받아온 데이터를 JSON으로 가공 후 반환

### ✔ Repository
SQL 쿼리 실행 및 DB 접근 캡슐화
사용자, 친구, Todo 관련 쿼리 분리

### ✔ Middleware
- auth.js: JWT 토큰 검증
- errorHandler.js: 공통 에러 처리
- validateRequest.js: 요청 검증
- asyncHandler.js: 비동기 에러 핸들링

---

### 🧩 Why No Service Layer?

일반적인 Express 구조에서는 Service 계층을 도입하여<BR>
Controller와 비즈니스 로직을 분리하는 패턴을 사용합니다.

하지만 MoToDo의 기능은 다음과 같은 매우 단순한 CRUD 중심 로직으로 이뤄져 있으며:

- 사용자 정보 조회
- 친구 목록 조회
- 친구 추가
- Todo 생성 / 삭제 / 수정
- 로그인 / 회원가입

이와 같은 단순한 로직은 Controller ↔ Repository 구조만으로도 충분히 안정적으로 관리 가능합니다.

### 🟦 Architectural Decision

- MVP 단계(최소 기능 구현)에서는 계층 수를 줄이는 것이 속도와 유지보수 효율이 높음
- 비즈니스 규칙이 거의 없는 CRUD 로직에서는 Service 계층이 오히려 불필요한 복잡도 증가
- 추후 기능 확장(친구 승인, 공유 Todo, 알림 기능 등)이 필요할 경우
Service 계층을 도입할 수 있도록 여지를 남긴 구조로 설계

즉,
“왜 Service 계층을 생략했는지에 대한 설계적 근거가 명확한 구조” 입니다.