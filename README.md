INTERNZ



<h4 align="center"> WITH SOPT 25기 동계 프로젝트</h4>
<div align="center">
  <img src="https://avatars2.githubusercontent.com/u/59135222?s=200&v=4"/>
</div>

<h5 align="center">인턴 경험의 모든 것, 인턴즈</h5>

## Service Description

**인턴을 준비하는 과정 속에서 인턴과 관련된 정보 부족으로 인해 많은 대학생들이 어려움을 겪고 있습니다. 저희는 이러한 대학생들의 고민을 해결하기 위해 맞춤 인턴 정보 추천, 캘린더를 통한 인턴 공고 관리, 프로필 타임라인과 스토리를 이용한 인턴 경험 공유 및 소통을 위한 서비스를 제공하고 있습니다. 인턴 경험의 시작부터 마무리까지, 인턴즈와 함께하세요!**

### 개발기간

2019.12.22 - 2020.01.04

## API WIKI

- [API 문서](https://github.com/INTENRZ/Server-Internz/wiki)

## Workflow

![workflow](https://jungah.s3.ap-northeast-2.amazonaws.com/INTERNZ+workflow.png)

## 주요기능	

- [x] 회원가입

  - [x] 회원가입 1(기본 정보)

    > 이메일/비밀번호/비밀번호 확인/핸드폰 번호/이름/닉네임/생년월일/성별 정보를 받아서 입력

  - [x] 회원가입 2(관심 직무 + 프로필 설정)

    > 최초 로그인 시 관심직무 3개 선택 + 한 줄 소개 및 프로필 사진 등록

- [x] 로그인

- [x] 홈 화면

  - [x] 맞춤 공고

    > 사용자가 처음 로그인을 할 때에 선택한 직무 3가지와 가장 일치율이 높은 직무 특성을 가지고 있는 공고들 3개를 추천
    > (만약 직무가 일치하는 공고가 3개가 안된다면, 나머지는 랜덤으로 추천)

  - [x] 추천 프로필

    > 사용자가 처음 로그인을 할 때에 선택한 직무 3가지와 가장 일치율이 높은 직무를 선택한 사용자의 프로필 4개를 추천
    > (만약 직무가 일치하는 프로필이 3개가 안된다면, 나머지는 랜덤으로 추천)

  - [x] 오늘의 스토리

    > 실시간으로 업로드 되는 사용자들의 스토리들 중에 가장 최신 스토리 4개를 추천

- [x] 공고 & 캘린더

  > 전체 공고/지난 공고 정렬

  - [x] 공고 필터

    > 보고 싶은 직무 1개 선택, 필터에 따라 정렬

  - [x] 공고 캘린더

    > 추가한 공고 캘린더에 표시

    - [x] 캘린더의 공고 삭제

      > 캘린더 특정 날짜의 공고를 삭제할 수 있음

- [x] 스토리

  > 전체 스토리 리스트 조회

  - [x] 스토리 탭바

    > 인턴/대외활동/공모전/동아리/자격증/기타에 따른 스토리 조회

  - [x] 스토리 정렬

    > 스토리를 조회순/최신순으로 정렬

  - [x] 스토리 상세글

    > 스토리 상세글 보기 + 댓글 개수

    - [x] 스토리 댓글 쓰기

      > 댓글 버튼을 누르면 댓글 보기 및 쓰기 가능

- [x] 타인 프로필 + 개인 프로필

  - [x] 타인 프로필

    - [x] 타인 프로필 접속

      > 추천 프로필에서 접속 + 스토리 하단에서 접속

    - [x] 타인 프로필 쪽지 보내기

      > 타인에게 쪽지 보내기  + 개인 프로필에서 주고 받은 쪽지 확인

  - [x] 개인 프로필

    > 개인프로필 정보 ->  회원가입시의 한 줄 소개 + 프로필 사진 + 관심 직무

    - [x] 개인 프로필 쪽지 리스트

      > 주고 받은 쪽지 리스트를 볼 수 있음

    - [x] 개인 프로필 타임라인 추가

      > 개인 프로필 하단 플러팅버튼에서 타임라인 추가 가능

    - [x] 개인 프로필 스토리 리스트 조회

      > 개인 프로필 > 타임라인 클릭 > 각각의 스토리 리스트 조회

    - [x] 개인 프로필 스토리 추가

      > 개인 프로필 > 타임라인 클릭 > 스토리 추가 플러팅버튼에서 스토리 추가 가능

    - [x] 개인 프로필 팔로우/팔로워 리스트

      > 팔로워 팔로잉 리스트 클릭 시 리스트를 볼 수 있음

  - [x] 스크랩

    - [x] 스크랩 하기
    
      > 마음에 드는 스토리를 스크랩 할 수 있음
      
    - [x] 스크랩 취소
    
      > 스크랩을 취소할 수 있음
      
    - [x] 스크랩한 스토리 목록
    
      > 스크랩한 스토리의 목록을 따로 모아보는 기능

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

- 홈 기능 구현(맞춤 공고, 추천 프로필, 오늘의 스토리)
- 캘린더 기능 구현(캘린더 공고 추가 및 삭제)
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

### :star2: 이소연

- 회원 가입 기능 구현
- 로그인 기능 구현
- 프로필 기능 구현
- 공고 조회 기능 구현
- RDS 관리

## Contact

[지현이](https://github.com/jiss02) 

[신정아](https://github.com/jungahshin)

[이소연](https://github.com/ujusy)

