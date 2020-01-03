# INTERNZ

<h4 align="center"> WITH SOPT 25기 동계 프로젝트</h4>
<div align="center">
  <img src="https://avatars2.githubusercontent.com/u/59135222?s=200&v=4"/>
</div>

<h5 align="center">인턴 경험의 모든 것, 인턴즈<h5>

## Service Description

**인턴을 준비하는 과정 속에서 인턴과 관련된 정보 부족으로 인해 많은 대학생들이 어려움을 겪고 있습니다. 저희는 이러한 대학생들의 고민을 해결하기 위해 맞춤 인턴 정보 추천, 캘린더를 통한 인턴 공고 관리, 프로필 타임라인과 스토리를 이용한 인턴 경험 공유 및 소통을 위한 서비스를 제공하고 있습니다. 인턴 경험의 시작부터 마무리까지, 인턴즈와 함께하세요!**

## API WIKI

- [API 문서](https://github.com/INTENRZ/Server-Internz/wiki)

## Workflow

![workflow](https://jungah.s3.ap-northeast-2.amazonaws.com/INTERNZ+workflow.png)



## ERD

![FINAL_ERD](https://user-images.githubusercontent.com/42693808/71553534-75313500-2a54-11ea-8ad5-a56448d0ec06.png)



## Server Architecture

![architecture](https://sopt25.s3.ap-northeast-2.amazonaws.com/INTERNZ_server_architecture.png)

## Getting started

- Install Node.js 10 LTS

- Clone the repository

```
git clone  <git lab template url> <project_name>
```

- Install dependencies

```
cd <project_name>
npm install
```

- Build and run the project

```
npm start
```

## Depenedncy

```
  "dependencies": {
​    "aws-sdk": "^2.596.0",
​    "cookie-parser": "~1.4.3",
​    "cron": "^1.7.2",
​    "debug": "~2.6.9",
​    "express": "~4.16.0",
​    "header-parser": "^1.0.0",
​    "http-errors": "~1.6.2",
​    "jade": "~1.11.0",
​    "jsonwebtoken": "^8.5.1",
​    "moment": "^2.24.0",
​    "morgan": "~1.9.0",
​    "multer": "^1.4.2",
​    "multer-s3": "^2.9.0",
​    "node-cron": "^2.0.3",
​    "pbkdf2": "^3.0.17",
​    "promise-mysql": "^3.3.2",
​    "rand-token": "^0.4.0"
  }
```

## Deploy

- GCP Compute Engine
- AWS S3
- AWS RDS

## Contributor

### 공통 구현 기능

- ERD 설계 및 DB 구축
- 소스 코드 수정 및 최적화
- API 문서 작성

### :blue_heart: 신정아

- 캘린더 기능 구현
- 홈 기능 구현
- 스토리 정렬 기능 및 전체조회 기능 구현
- 스토리 필터링 기능 구현
- 댓글 기능 구현
- S3 관리

### :two_hearts: 지현이

- 프로필 조회 기능 구현
- 팔로우 기능 구현
- 쪽지 기능 구현
- 스크랩 기능 구현
- 스토리 CRUD 구현
- 타임라인 CRUD 기능 구현
- 공고 필터 기능 구현
- EC2 배포 및 관리

### :cupid: 이소연

- 회원 가입 기능 구현
- 로그인 기능 구현
- 프로필 기능 구현
- 공고 조회 기능 구현
- RDS 관리

## Contact

[지현이](https://github.com/jiss02) 

[신정아](https://github.com/jungahshin)

[이소연](https://github.com/ujusy)

