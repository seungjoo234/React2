# React2
# 202030229 임승주
## 8월 28일 강의 내용
### Pages Router vs App Router
  - React로 개발하다 처음 Next를 사용하면 제일 먼저 놀라는 기능이 Router다.
  - 교재의 코드는 Next.js 13.1을 사용하기 때문에 Pages Router로 작성되고 있음
  - 강의는 App Router로 진행할 예정임
#### [Pages Router]
  - pages 디렉토리가 root이고, index.js가 index page가 됨
  - about.js는 /about, team.js는 /team 경로로 라우팅 됨
  - 클라이언트 중심의 라우팅이다.
#### [App Router]
  - app 디렉토리가 root이고 pages.js가 index page가 됨
  - /about/page.js는 /about, /login/page.js는 /page 경로로 라우팅 됨
  - 서버 중심의 라우팅이다.
  - 번들 사이즈가 작음

### Next.js 13 vs 14
  - Pages Router -> App Router
  - Date Fetching: 13까지는 getServerSideProps, getStaticProps 메소드를 이용해서 구현 했으나, 14에서는 SSG(정적 사이트 생성), SSR(서버측 렌더링) 및 ISR(증분적 정적 재생성)에서 하나의 API만을 사용해서 구현할 수 있게 됨
  - Tubopack: Rust 기반으로 개발된 새로운 번들러 사용으로 webpack보다 700배 빠르다고 발표함
  - 이미지 최적화: 13까지는 도구를 사용하였으나, 14부터는 자체적으로 지원하기 시작함
  - 보안 강화: XSS 공격에 대한 보호 기능이 강화되고, 보안 관련 헤더 설정을 더욱 쉽게 만들었다.

### Next.js 알아보기
  - Next.js는 리액트를 위해 만든 오픈소스 **자바스크립트 웹 프레임워크다.**
  - 리액트에는 없는 **다양한 기능을 제공함**
      - 서버 사이드 렌더링(SSR)
      - 정적 사이트 생성(SSG)
      - 증분 정적 재생성(ISR)
      > **SSG(정적 페이지 생성)** 는 미리 만들어 놓은 페이지를 서비스 하기 때문에 **속도는 빠르지만**, 한번 생성하고 나면 **수정이 불가능**합니다.   
         이러한 단점을 보완하고자 나온 것이 **ISR(증분 정적 재생성)** 입니다.   
         **이미 생성된 페이지를 일정 시간이 지난 후에 다시 생성합니다.**(최신 데이터로 업데이트)
  - [Chapter 1의 주요 내용]
    - Next.js 소개/ 다른 프레임워크와의 비교 / 리액트와의 차이점
    - 기본구조 타입스크립트를 사용하는 방법
    - 바벨과 웹팩 설정 커스텀마이징 (**Next.js14는 Webpack에서 Tubopack으로 바뀜**)
#### 1.1 준비하기
  - Node.js와 npm을 설치하거나, codesandbox.io 혹은 repl.it 등의 사이트를 이용함.
  - 이후 프로젝트별로 필요한 의존성 패키지를 npm욿 설치함
    - 잠시 확인을 위한 것이면 사이트를 이용해도 되지만, 그렇지 않은 경우라면 local에 환경을 설정하는 것이 좋다.
#### 1.2 Next.js가 제공하는 기능들
  - 코드 분할(Splitting): 페이지를 로딩 할 떄 번들을 여러 조각으로 나누어 필요한 부분만 전송.
  - 파일 기반 라우팅 (React에서는 React-RouterDom을 사용)
  - 경로 기반 프리패칭(Prefetching): 사용자가 다음에 이동할 수 있는 페이지를 미리 가져오는 기술
  - 이미지 최적화: Next/image 컴포넌트로 제공하는 이미지의 최적화 기술   
    (lazy loading- 지연, 이미지 사이즈 최적화- webp 변환, placeholder- 영역 확보)
  - 웹 애플리케이션의 국제화 지원: 다국어 지원(local에 맞는 URL로 라우팅)
#### 1.3 Next.js와 비슷한 프레임워크
  - **[Gatsby]**
    - 정적 웹 사이트를 만들 수 있는 프레임워크
    - 정적 사이트 생성만 지원
    - 클라이언트 사이드 렌더링만 지원함
    - 동적으로 변하는 복잡한 웹 사이트는 만들 수 없음
  - **[Angular Universal]**
    - 정적 사이트 생성과 서버 사이드 렌더링을 지원함
    - Nuxt나 Next와는 달리 대기업인 구글에서 만듦
    - Angular로 개발하는 경우 Angular Universal을 사용하는 것이 대부분임
#### 1.4 왜 Next.js 일까?
  - React에서 제공하지 않는 여러 기능을 지원함
  - 설정이나 개발 옵션 등 다양한 부분에서도 유용한 기능들을 제공함
  - 활동적인 커뮤니티가 있어 개발 단계별로 많은 지원을 받을 수 있다.
#### 1.5 리액트에서 Next.js로
  - Next.js의 기본 철학은 React와 거의 같음
  - "설정보다 관습"이라는 리액트의 철학을 계승   
    "CoC: Convention over Configuration"은 개발자가 해야 할 **결정의 수를 줄여**주면서도, **유연성은 잃지 않도록** 하는 소프트웨어 설계 패러다임이다.
  -  예를 들면 설정 파일을 만들지 않고도 어떤 페이지에서 서버 사이드 렌더링을 적용하고, 어떤 페이지에 정적 페이지 생성을 적용할지 지정할 수 있음
  -  Next.js는 fetch, window, document와 같은 웹 브라우저에서 제공하는 전역 객체나 canvas같은 **HTML요소에는 접근 할 수가 없다.**
