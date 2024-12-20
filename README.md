# React2

# 202030229 임승주

## 11월 27일 강의 내용

### 4. Context API vs Redux (저번주에 이어서)

- [Redux]
  - (단점)
    - 설정과 코드 복잡도: Context API에 비해 설정이 복잡하며, boilerplate 코드가 많이 필요함
    - 추가 라이브러리 필요: Redux 자체가 외부 라이브러리이므로 설치 및 유지 관리가 필요함
    - 작은 애플리케이션에는 과한 설정: 단순한 상태 관리가 필요한 작은 애플리케이션에서는 과도한 설정일 수 있음

| 항목            | Context API      | Redux               |
| --------------- | ---------------- | ------------------- |
| **규모**        | 작은 규모        | 대규모              |
| **복잡성**      | 간단한 상태      | 복잡한 상태         |
| **학습 난이도** | 낮음             | 높음                |
| **성능**        | 상황에 따라 다름 | 비교적 안정적       |
| **유연성**      | 낮음             | 높음                |
| **디버깅 도구** | 기본적으로 없음  | Redux DevTools 제공 |

## 11월 20일 강의 내용

### 1. Props 흐름의 이해

- Next.js의 데이터 흐름은 단방향으로 이루어 짐
- 즉, parents에서 child component의 방향으로 props의 흐름이 이루어 짐
- 따라서 계층 구조가 복잡해 지면 Props Drilling 문제가 발생함
- Props Drilling은 여러 개의 component를 지나 props가 전달 되면서 발생하는 문제
- Props Drilling은 다음과 같은 문제를 발생 시킬 수 있음
  1. 중간에 위치한 component에 불필요한 props를 전달해야 하는 문제
  2. 타겟 component까지 props가 전달되지 않을 경우 원인 규명의 어려움
  3. 필요 이상으로 코드가 복잡해지는 문제
- 이런 문제를 해결하려면 props를 전역을 사용하면 됨
- Next.js에서 props를 전역으로 사용하기 위해서 Context API, Redux 등을 사용함
- Component A, B, C, props-flow 페이지 상호간에는 계층구조를 가지고 있지 않음
- 아직 어느 쪽에서도 component 호출하지 않았기 때문
- 그러나 어느 쪽이든 component를 호출 하는 순간, 호출한 쪽은 parent가 되고, 호출 받은 쪽은 child가 됨
- 이것은 component간, component와 page간 모두에 적용됨
- 관계가 한번 성립되면 child가 parent를 호출할 수는 없음
- 예를 들어 A가 B를 호출한 경우, A는 parent, B는 child가 됨
- 이 관계는 아직 아무도 호출하지 않거나, 호출 받지 않은 C에게는 적용되지 않음
- 즉, C는 A,B 모두 호출 할 수 있게 됨. 이 경우 C가 parent, A와 B가 child가 됨
- A와 B의 관계, C와 A,B의 관계가 공존하게 됨
- A는 B만 호출 할 수 있고, C는 AB 모두를 호출 할 수 있으며 그 반대는 불가능함

### 2. Context API 개요

- Context는 UX구축에 많이 사용되는 React의 기능
- React는 16.3 버전부터 정식적으로 context api를 지원하고 있음
- 일반적으로 props는 부모에서 자식으로 전달되는 단방향 통신을 함
- Context API는 특정 component가 props를 사용하지 않고, 하위 component를 포함한 모든 component에 데이터를 공유할 수 있는 기능을 제공함
- 즉 "**전역**"으로 데이터를 사용할 수 있도록 해줌
- 예를 들어 사용자의 로그인 상태나, 쇼핑커트의 물품 수량 등을 표시할 때 사용함
- Context API는 createContext, Provider, useContext 개념만 알면 적용이 가능함
- 간혹 Consumer를 useContext대신 사용하는 경우가 있지만, function형 component에서는 많이 사용하지 않음
- 두가지의 차이는 다음과 같다

| 특징 | Consumer                                                          | useContext                                                         |
| ---- | ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| 사용 | 클래스형, 함수형 컴포넌트 모두 사용 가능                          | 함수형 컴포넌트에서 주로 사용                                      |
| 문법 | JSX 내에서 명시적으로 작성                                        | Hook으로 간결하게 사용                                             |
| 장점 | 클래스형 컴포넌트와의 호환성                                      | - 간결하고 직관적인 코드 작성, 함수형 컴포넌트와의 자연스러운 통합 |
| 단점 | -jsx 내에 추가적인 요소가 필요, - 코드가 다소 복잡해 보일 수 있음 | 클래스형 컴포넌트에서는 사용할 수 없음                             |

### 2. Context API - use client

- 앞서 작성한 코드 상단에 'use client' 지시문이 있음
- Next.kjs에서 'use client'를 사용하는 이유는 서버 컴포넌트와 클라이언트 컴포넌트를 구분하기 위해서임
- Next.js는 기본적으로 서버에서 렌더링하도록 설계되어, 클라이언트에서만 필요한 컴포넌트를 명시적으로 지정해야 할 필요가 있음
- 'use client'를 컴포넌트 상단에 선언하면 해당 컴포넌트는 클라이언트레서만 렌더링 되며, 주로 상태 관리나 브라우저 전용 API 사용이 필요한 경우에 사용됨

### 3.1 Directory 구조

- [Directory]
  - app: Routing Page 관리
  - components: 재사용 가능한 공통 컴포넌트 관리
  - context: context 컴포넌트 관리
  - features: 기능별 컴포넌트 관리
  - store: Redux store 설정 파일 관리
  - style: CSS, Sass 등 스타일 파일 관리
- [components Directory]
  - 애플리케이션 전반에서 재사용될 수 있는 공통 컴포넌트를 보관함
  - 특정 기능에 종속되지 않으며, 다양한 페이지나 기능에서 재사용할 수 있는 component를 모아 둠
  - (예시)
    - src/components/Button.js(버튼 컴포넌트)
    - src/components/NavBar.js(네비게이션 바)
    - src/components/Footer.js(푸터 컴포넌트)
    - src/components/Modal.js(모달 컴포넌트)
- [features Directory]
  - 특정 기능이나 도메인 별로 코드를 구성하는 데 사용함
  - 사용자 인증 기능, 프로필 관리 기능 등 각 기능과 관련된 상태 관리, API 요청, 슬라이스, 컴포넌트 등을 보관함
  - 재 사용이 불가능하거나 가능하더라도 많은 수정을 해야 하는 컴포넌트를 관리함
  - (예시)
    - src/features/counter/counterSlice.js(상태 관리)
    - src/features/counter/Counter.js(기능 관련 컴포넌트)
    - src/features/user/userSlice.js(사용자 관련 상태 컴포넌트)
    - src/features/user/userProfile.js(사용자 프로필 컴포넌트)

### 3.2 Redux 주요 File 역할

- [Redux Slice]
  - Slice는 Redux Toolkit에서 사용되는 용어로, 특정 기능과 관련된 상태와 reducer 함수의 모음을 나타냄
  - Slice라는 이름은 애플리케이션 상태의 한 부분을 의미함
  - Redux Toolkit의 createSlice 함수를 사용하면 특정 기능과 관련된 상태, 액션, reducer를 한 곳에서 정의할 수 있어 관리하기 용이함
  - (예시)
    - src/features/counter/counterSlice.js(counter 상태 관리)
    - src/features/counter/Counter.js(counter 기능 관련 컴포넌트)
- [Redux Provider]
- Redux Provider는 Redux의 상태 등을 공급하기 위한 파일임
- Provider는 사용하고자 하는 page에서 사용하면 됨
- 다만 전역적으로 사용할 때 layout 파일에 정의하면 'use client'를 사용해야 하기 때문에 별도의 component로 만들어서 사용하는 것이 좋음
- (예시)
- src/store/store.js(counter 상태 관리)
- src/store/CounterProvider(counter 기능 관련 컴포넌트)

### 4. Context API vs Redux

- [Context API]
  - React에서 기본으로 제공하는 상태 관리 도구로, 외부 라이브러리 설치 없이 사용 가능함
  - Context API는 주로 전역 상태를 관리하는 데 사용됨
  - React.createContext()로 생성한 Context 객체와 Provider 컴포넌트를 사용해 상태를 하위 컴포넌트에 전달함
  - (장점)
    - 간단하고 가볍다: 외부 라이브러리 설치 없이 기본 React 기능만으로 전역 상태 관리를 할 수 있음
    - 적은 설정 필요: 간단한 구조를 가지고 있어 설정과 사용이 간편함
    - 컴포넌트 트리의 깊이 제한 없음: 여러 단계에 걸쳐 상태를 전파할 수 있어 prop drilling 문제를 해결함
  - (단점)
    - 복잡한 상태 관리의 한계: 상태가 복잡라거나 다양한 액션을 통해 변경이 이루어져야 하는 경우, 관리가 어려워질 수 있음
    - 성능 문제: 상태가 업데이트 되면 해당 상태를 사용하는 모든 하위 컴포넌트가 다시 렌더링 되므로, 상태 범위가 넓을 경우 성능에 영향을 미칠 수 있음
    - 디버깅 도구 부족: 상태 변경 과정을 추적하고 관리하는 Redux DevTools와 같은 도구가 기본적으로 제공되지 않음
- [Redux]
  - Redux는 전역 상태를 관리하기 위한 독립적인 state 관리 라이브러리임
  - 상태의 변경을 예측 가능하게 하고, 전역 state 관리를 더 구조적으로 지원함
  - store, reducer, action 등의 개념을 사용해 state와 state dispatch를 관리함
  - (장점)
    - 명확한 상태 관리 구조: 액션과 reducer를 통해 state dispatch 과정을 예측 가능하게 만들고, 코드의 가독성을 높임
    - 미들웨어 지원: redux-thunk, redux-saga와 같은 미들웨어를 사용해 비동기 로직을 쉽게 처리할 수 있음
    - 디버깅 도구: Redux DevTools를 통해 상태 변화 및 디버깅이 용이함
    - 모든 프레임워크와 호환: React뿐만 아니라 다른 JavaScript 프레임워크와도 함께 할 수 있음

## 11월 13일 강의 내용

### UI 라이브러리

- UI 라이브러리, 프레임워크, 유틸리티 기능이 필수는 아님
- 다만 생산성 향상 및 UI의 일관성을 유지하는데 많은 도움을 받을 수 있음
- 3가지의 프레임워크
- Chakra UI
- TailwindCSS
- Headless UI

### Chakra UI

- 오픈소스 컴포넌트 라이브러리로, 모듈화 되어 있고 접근성이 뛰어나며 보기 좋은 UI를 만들 수 있다
- 버튼, 모달, 입력 등 다양한 내장 컴포넌트를 제공함
- dark mode 및 light mode를 모두 지원함
- Chakra UI의 useColorMode 훅을 사용해서 현재 사용하는 컬러 모드를 확인할 수 있음
- 기본 컴포넌트를 조합해서 새로운 컴포넌트를 쉽게 만들 수 있음
- 타입스크립트로 작성 되었으며 개발자에게 최고의 개발 경험을 제공함
- 사이트를 방문해 보면 React와 Next에 특화된 것으로 보임
- https://chakra-ui.com/

### TailwindCSS

- 다른 프레임워크와는 다르게 CSS 규칙만을 제공함
- 자바스크립트 모듈이나 리액트 컴포넌트를 제공하지 않기 때문에 필요한 경우 직접 만들어서 사용해야 함
- 변수값을 조정하여 개성있는 디자인을 만들 수 있음. 디자인의 자유도가 높음
- 다크모드 및 라이트모드를 쉽게 적용할 수 있음
- 빌드 시점에 사용하지 않는 클래스는 제거 되기 때문에 높은 수준의 최적화를 지원함
- CSS 클래스의 접두사를 활용해서 모바일, 데스크톱, 태블릿 화면에서 원하는 규칙을 지정할 수 있음
- https://tailwindcss.com/

### Headless UI

- TailwindCSS를 만든 Tailwind Labs 팀의 무료 오픈소스 프로젝트이다.
- TailwindCSS는 웹 컴포넌트 안에서 사용할 수 있는 CSS클래스만 제공함
- 따라서 모달이나 버튼 등 동적인 컴포넌트를 만들려면 직접 자바스크립트 코드를 작성해야 함
- 이런 단점을 보완하기 위해서 Headless UI가 탄생함
- Headless UI는 CSS클래스를 제공하는 것이 아니라 동적 컴포넌트만 제공함
- https://headlessui.com/

### 1. Project 생성

- Tailwind 사용을 위해 프로젝트를 다시 생성한다
- 프로젝트를 다시 생성하지 않고 설정할 수도 있지만 과정이 다소 복잡함
- 프로젝트는 Next.js 14로 한다
- 15.0.2 버전이 릴리즈 되어 있으나 아직 Tailwind와의 호환성이 안정적이지 않음

```
$ npx create-next-app@14
```

- 프로젝트 이름은 자유로 하고, 나머지는 모두 yes로 함

### 2. Tailwind CSS

- 구글에서 tailwind를 검색하고 사이트에 접속함
- Home 화면에서 Tailwind에서 가능한 것들을 확인할 수 있음
- Get started 버튼을 클릭하면 설치과정에서 부터 설정, 간단한 사용법을 확인한다.
- Framework Guides 탭에서 Next.js를 클릭하고 내용을 확인한다.
  - 프로젝트를 tailwind 사용으로 생성했으면 이 과정은 생략한다.
- App/tailwind/page.js 파일을 생성하고, 마지막에 있는 hello world!를 실행해 본다.
- Tailwind는 React를 기준으로 하고 있어서 바로 코드를 사용하면 오류가 발생할 수 있다
- Test 코드는 tailwindcss.com에 나와 있는것이 오류가 적음
- tailwindcss.com의 Doc를 참고하여 테스트해 보자
- 테스트 과정에서 img태그 등 몇가지는 추가로 설정하지 않으면 오류가 발생함
- class도 className으로 수정해야 함

### 3. Headless UI

- 구글에서 headless ui를 검색하고 사이트에 접속한다
- Home 화면에서 GitHub 아이콘을 클릭하면 일반 사항을 확인할 수 있다
- App/headless/page.js 파일을 생성한다
- Dropdown Menu를 테스트한다
- 버튼을 테스트하고 tailwind class를 수정해 본다

### 4. Chakra UI

- 구글에서 Chakra UI를 검색하고 사이트에 접속한다
- Home 화면에서 Start Building 버튼을 클릭하고 Next.js를 선택한다
- App/chakra/page.js 파일을 생성한다
- 지시대로 설치한다
- Snippets를 설치하면 src/components/ui 아래 추가 componen이 설치됨
- Layout에 provider를 설정한다
- tsconfig 설정을 확인해 본다. 전부 설정되어 있으나 없는 것이 있으면 추가해 준다
- next.config.mjs를 수정해 준다
- Component 메뉴에서 Accordion을 테스트한다

### 5. React-icon

- 구글에서 React icon을 검색하고 사이트에 접속한다
- Home 화면에서 원하는 아이콘을 클릭하면 사용코드를 확인할 수 있다
- App/react-icon/page.jsx 파일을 생성한다
- 아이콘을 사용해 본다

## 11월 06일 강의 내용

### Styled JSX

- Styled JSX는 CSS-in-JS라이브러리이다. 내장 모듈이기 때문에 설치가 필요 없다.
- 즉, CSS 속성 지정을 위해 자바스크립트를 사용할 수 있는 라이브러리이다.

### CSS-in-JS의 단점

- IDE나 코드 편집기 등 개발 도구에 대한 지원이 부족함
- 문법 하이라이팅, 자동 완성, 린트(lint)기능을 제공하지 않음
- 코드 내에서 CSS에 대한 의존성이 점점 커지기 때문에 앱 번들도 커지고 느려짐
- 서버에 미리 CSS를 생성해도 클라이언트에서 리액트 하이드레이션이 끝나면 CSS를 다시 생성해야 함
- 이 때문에 실행 시점에 부하가 커지며, 웹 앱이 계속 느려지게 됨. 기능을 추가 할 수록 이런 현상은 심해짐

### CSS Module

- CSS-in-JS의 단점을 회피하기 위한 좋은 방법은 바로 CSS Module이다.
- .module.css로 끝나는 파일에서 CSS 클래스를 가지고 옴
- Home.module.css 파일은 일반적인 CSS 파일이지만 CSS Module이 그 내용을 자바스크립트 객체로 변환함
- 변환한 객체에서 모든 키는 클래스 이름을 가리킴
- 클래스들은 컴포넌트 스코프를 가짐
- Styled JSX때 와 마찬가지로 이런 고유한 이름 때문에 다른 파일이라면 같은 class명을 사용해도 충돌이 안일어남
- 만일 전역 CSS를 선언하고 싶다면 styles/globals.css를 만들고 사용함
- 파일명은 반드시 globals가 아니어도 되지만 암묵적 합의는 가능하면 지키는 것이 좋음
- 또 한가지 방법은 class로 선언된 요소에 :global 키워드를 추가해 준다. .button :global{}
- 셀렉터 컴포지션은 통상적으로 사용할 수 있는 css를 만들고 compose 속성을 지정해서 일부 속성을 덮어쓰는 기능이다.

```css
.button-default {
  padding: 5px;
  border: none;
  border-radius: 5px;
}

.button-success {
  composes: button-default;
  background-color: green;
  color: white;
}

.button-danger {
  composes: button-default;
  background-color: red;
  color: white;
}
```

### SASS

- Next에서 기본으로 지원하는 전 처리기
- 단 패키지 설치가 필요함. $ npm install sass
- SASS 및 SCSS(Sassy CSS) 문법으로 CSS Module을 만들고 사용할 수 있음
- styles/Home.module.css 파일을 styles/Home.module.scss로 바꿔주면 좋음
- SASS 기본 설정을 변경해야 하는 경우 next.config.js 설정파일을 변경한다.

## 10월 30일 강의 내용

### 서버가 데이터 불러오기

- 서버에서는 두 가지 방법으로 HTTP 요청을 만들고 처리할 수 있다
  1. Node의 내장 HTTP 라이브러리를 사용할 수 있다.  
     다만 서드파티 HTTP 클라이언트와 비교했을 떄 설정하고 처리해야 할 작업이 더 많은 편이다.
  2. HTTP 클라이언트 라이브러리를 사용할 수 있다.

### 서버에서 REST API 사용하기

- REST API를 호출할 때는 public API를 호출할 것인지, private API를 호출할 것인지 먼저 확인해야 한다.
- Public API는 어떤 인증이나 권한도 필요없으며 누구나 사용 가능하다.

### REST API - 개요

- REST(Representational State Transfer)란 자원을 이름으로 구분하여 그 자원의 상태를 통신을 통해 주고 받는 것을 의미
  1. HTTP URL(Uniform Resource Identifier: 통일된 자원 식별자)를 이용해서 자원(Resource)을 명시함
  2. HTTP Method(POST, GET, PUT, DELETE, PATCH 등)를 통해 자원에 CRUD를 적용함
- CRUD란 데이터 처리의 기본적인 기능을 나타냄
  1. Create: 데이터 생성(POST)
  2. Read: 데이터 조회(GET)
  3. Update: 데이터 수정(PUT, PATCH)
  4. Delete: 데이터 삭제(DELETE)
- REST API란 REST의 규칙을 적용한 API를 의미함

### REST API - 기본 설계 규칙

- URL은 동사보다는 명사를, 대문자보다는 소문자를 사용하여야 함
- 주소의 마지막에 슬래시(/)를 포함하지 않음
- 단어를 연결할 때는 하이픈(-)을 사용함
- 파일확장자는 URL에 포함하지 않음
- URL에 메소드를 포함하지 않음

### Json Server

- Backend가 개발되기 전이나, 아직 외부 API.가 결정되지 않았다면 local에 Json Server를 구축하고 Frontend 개발을 하기에 적합한 node 패키지다.
- 다음 명령으로 json-server를 설치한다.

```
$ npm i -g json-server
```

- 설치가 잘 되었는지 version을 확인해 본다.

```
$ json-server --version
```

- data.json 파일을 만들어 다음을 입력한다

```jsx
{
  "token": {
    "access_token": "1t4a36kde5tdfed348trkjy4r5gtdfsd",
    "userId": 0
  },
  "test": [
    {
      "id": 1,
      "name": "kim",
      "title": "data.json 파일 만들기",
      "body": "project root에 생성"
    },
    {
      "id": 2,
      "name": "lee",
      "title": "json-server를 설치하기",
      "body": "백엔드를 만들기 전에 이렇게 json 파일로 데이터를 만들어서 테스트 해보자"
    }
  ]
}
```

### Axios란?

- Next.js에서 REST API를 다룰 때는 보통 axios와 fetch 중 하나를 선택하는 경우가 많다.
- 아래는 두가지 방법의 특징과 장단점을 비교한 내용이다.
  1. [Axios]
  - 간편한 문법: 기본적으로 JSON 데이터를 자동으로 변환해주므로, res.data로 쉽게 접근할 수 있다.
  - HTTP 요청 취소: 요청을 취소할 수 있는 기능이 내장되어 있다.
  - 요청 및 응답 인터셉터: 요청이나 응답을 가로채어 수정할 수 있는 기능이 있어, 인증 토큰 추가와 같은 작업이 간편하다.
  - 진보된 오류 처리: HTTP 오류 코드에 따라 에러를 더 쉽게 처리할 수 있다
  - 단점은 추가 패키지를 설치해야 하며, 코드 크기가 약간 증가한다는 것이다. 그러나 크게 차이가 안난다
  2. [Fetch API]
  - 내장 API: 브라우저에 내장되어 있어 별도의 설치가 필요 없다.
  - Promis 기반: 비동기 작업을 처리하는데 익숙한 구조다.
  - 스트림 처리: 데이터를 스트리밍으로 처리할 수 있는 기능이 있어, 큰 파일을 처리하는데 유용하다.
  - 단점은 json 변환 수동 처리: 응답에서 json으로 변환할 떄 res.json()을 호출해야 함
  - 에러 처리 복잡성: HTTP 오류 코드 (예: 404, 500)에 대한 처리가 약간 더 복잡할 수 있다. 기본적으로 fetch는 네트워크 오류만을 reject한다
  3. [결론]
  - 복잡한 요청이나 에러 처리가 필요한 경우에는 axios가 더 적합할 수 있다.
  - 간단한 요청이나 내장된 기능을 활용하고 싶다면 fetch를 사용하는 것도 좋은 선택이다.
  - 어떤 것을 선택할지는 프로젝트의 요구 사항과 개발자의 선호도에 따라 다를 수 있다.

### Axios 설치

- axios를 설치 하려면 다음 명령어를 사용 한다.

```
$ npm i axios
```

### Axios 사용하기

- 다음은 간단한 사용법이다.

```jsx
const res = await axios.get("https://api.example.com");
const products = res.data; // Axios에서 응답 본문의 데이터를 가져옴
```

- axios.get()을 통해 받아온 응답 객체인 res는 단순히 JSON 데이터만 담고 있는 것이 아니라, HTTP 통신과 관련된 여러 정보들을 함께 포함하고 있다.  
  예를 들어
  - res.status: HTTP 응답 상태 코드 (예: 200, 404, 500 등)
  - res.headers: 서버로부터 받은 헤더 정보
  - res.config: 요청에 대한 설정 정보
  - res.statusText: 응답 상태에 대한 설명 (예: "OK")
  - res.data: 서버가 실제로 전송한 데이터 (이 부분이 가장 중요한 응답 내용)
- 따라서 res.data는 서버가 전송한 실제 데이터에 접근하는 속성이다.
- 브라우저를 통해서 출력을 확인해 보자

```jsx
import axios from "axios";
export default async function RestApi() {
  const res = await axios.get("http://localhost:3001/test");
  const users = res.data;
  console.log(users);

  return (
    <>
      <h1>axios</h1>
      {users.map((user, id) => {
        return (
          <div key={id}>
            <h2>{user.id}</h2>
            <h3>{user.name}</h3>
            <h3>{user.title}</h3>
            <h3>{user.body}</h3>
          </div>
        );
      })}
    </>
  );
}
```

- 그런데 위의 코드는 비동기 데이터 로딩과 상태 관리가 제대로 고려되지 않았기 때문에 몇가지 문제가 있을 수 있다.
- 특히 Next.js와 같은 리액트 기반 앱에서 비동기 데이터를 처리할 때 렌더링 주기에 맞게 상태를 관리해야 한다
- [개선할 부분]
  1. useState와 useEffect 사용:
  - 비동기 데이터를 가져오는 작업은 컴포넌트의 상태(state)로 관리하는 것이 일반적이다. 현재 코드에서는 users 데이터가 비동기적으로 로드되는데, 이를 관리하기 위한 useState와 useEffect 훅이 빠져 있다.
  - 데이터를 로드하기 전에 컴포넌트가 렌더링되기 때문에, users 변수가 초기에는 존재하지 않아 undefined 에러가 발생할 가능성이 있다.
  2. Loading 상태 처리
  - 데이터를 불러오는 동안 사용자가 기다릴 수 있도록 로딩 상태를 추가하는 것이 좋다.

## 10월 23일 강의 내용

### Static Resource

- 정적 지원 중 이미지 파일은 SEO에 많은 영향을 미친다.
- 다운로드 시간이 많이 걸리고, 렌더링 후에 레이아웃이 변경되는 등 UX에 영향을 미침
- 이것을 누적 레이아웃 이동(CLS: Cumulative Layout Shift)라고 함
- image 컴포넌트를 사용하면 CLS문제를 해결함
- lazy loading: 이미지 로드 시점을 필요할 때까지 지연시키는 기술
- 이미지 사이즈 최적화로 사이즈를 1/10이하로 줄여줌
- Placeholder를 제공함

### 디렉토리 구조 구성

- Next.js에서는 특정 파일과 디렉토리가 지정된 위치에 있어야 함
- Node_modules/: Next.js 프로젝트의 의존성 패키지를 설치하는 디렉토리
- pages/: 애플리케이션의 페이지 파일을 저장하고 라우팅 시스템 관리
- public/: 컴파일 된 CSS및 자바스크립트 파일, 이미지, 아이콘 등의 정적 자원 관리
- styles/: 스타일링 포맷(CSS, SASS, LESS 등)과 관계없이 스타일링 모듈 관리
- pages/디렉토리를 src/디렉토리 안으로 옮길 수 있음
- public/과 node_modules/를 제외한 다른 디렉토리는 모두 src/로 옮길 수 있음

#### 컴포넌트 구성

- 컴포넌트는 세 가지로 분류하고 각 컴포넌트와 관련된 스타일 및 테스트 파일을 같은 곳에 두어야 함
- 코드를 더 효율적으로 구성하기 위해 아토믹 디자인 원칙에 따라 디렉토리를 구성함
- atoms: 가장 기본적인 컴포넌트 관리. 예) button, input, p와 같은 표준 HTML요소를 감싸는 용도로 사용되는 컴포넌트
- molecules: atom에 속한 컴포넌트 여러 개를 조합하여 복잡한 구조로 만든 컴포넌트 관리. 예) input과 label을 합쳐서 만든 새로운 컴포넌트
- organisms: molecules와 atoms를 섞어서 더 복잡하게 만든 컴포넌트 관리. 예) footer나 carousel 컴포넌트
- templates: 위의 모든 컴포넌트를 어떻게 배치할지 결정해서 사용자가 접근할 수 있는 페이지

#### 유틸리티 구성

- 컴포넌트를 만들지 않는 코드 파일을 유틸리티 스크립트라고 함
- 렌더링에 필요한 컴포넌트가 아닌 기타 필요한 스크립트가 있다면, utilities/디렉토리에 별도로 관리 하는 것이 좋음
- 각 유틸리티에 맞는 테스트 파일도 만듦

#### 정적 자원의 구성

- 정적 자원은 public/디렉토리에서 관리함

#### 스타일 파일의 구성

- 스타일 파일은 앱에서 어떤 스타일 관련 기술을 사용하는가에 따라 구성이 달라짐
- Emotion, styled-components, JSS와 같은 CSS-in-JS 프레임워크의 경우 컴포넌트별로 스타일 파일을 만듦. 이러면 스타일 변경도 쉬움
- 만일 컬러 팔레트, 테마, 미디어 쿼리와 같은 공통 스타일의 경우는 styles/디렉토리를 사용함

#### lib 파일 구성

- lib 파일은 서드파티 라이브러리를 감싸는 스크립트를 말함
- lib 파일은 특정 라이브러리에 특화된 것임
- 만일 GraphQL을 사용한다면, 클라이언트를 초기화 하고, 질의문과 뮤테이션을 저장하는 등의 작업이 필요함

### 데이터 불러오기

- Next는 클라이언트와 서버 모두에서 데이터를 불러올 수 있음
- 서버는 다음 두 가지 상황에서 데이터를 불러올수 있음
  1. 정적 페이지를 만들 때 getStaticProps 함수를 사용해서, 빌드 시점에 데이터를 불러올 수 있음
  2. 서버가 페이지를 렌더링할 때 getServerSideProps를 통해, 실행 도중 데이터를 불러올 수도 있음
- 데이터 베이스에서 데이터를 가져 올 수도 있지만 안전하지 않기 때문에 권장하지 않음. 데이터베이스의 접근은 백엔드에서 처리하는 것이 좋음
- Next는 프론트엔드만 담당하는 것이 좋음

## 10월 11일 강의 내용

### Page Project Layout - \_app

- \_app.jsx는 서버에 요청할 때 가장 먼저 실행되는 컴포넌트다.
- 페이지에 적용할 공통 레이아웃을 선언하는 곳임
- 기본 코드는 다음과 같다

```jsx
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

- Global CSS는 이곳에 추가됨
- props 중 Component는 서버에 요청한 페이지임

### Page Project Layout -\_document

- \_document.jsx는 \_app.jsx 다음에 실행됨
- 각 페이지에서 공통적으로 사용될 html, head, body 안에 들어갈 내용을 선언함
- onClick 같은 이벤트나 CSS는 이 곳에 선언하지 않음
- 기본 코드는 다음과 같음

```jsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

- 다음은 수정한 예

```jsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
      {/* 사용자 정의 메타 태그 */}
      <meta name="description" content="커스텀 설명입니다.">

      {/* 외부 스크립트 추가 */}
      <script src="..."></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### Page Project Layout -\_layout.jsx

- layout.jsx는 app 디렉토리 아래에 위치함
- layout.jsx는 Page Project에서 사용하던 \_app.jsx와 \_document.jsx를 대체함
- 이 파일은 삭제해도 프로젝트를 실행하면 자동으로 다시 생겨남
- 프로젝트를 생성할 때 생성된 기본 코드는 다음과 같음

```jsx
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Page Project Layout - meta data

- metadata에서 모든 페이지에 적용할 meta data를 선언할 수 있습니다.
- title의 경우에는 각 페이지에 맞게 작성하는 것이 SEO에 좋음
- 추가하지 않은 페이지는 layout.jsx에서 정의한 title이 적용됨

```jsx
export const metadata = {
  title: "Hello, Next.js!",
};
```

- 만일 공통되는 title과 함께 각 페이지의 title을 추가 하고 싶은 경우에는 layout.jsx의 title을 다음과 같이 추가한다

```jsx
export const metadata = {
  title: {
    default: "Next.js!",
    template: "%s | Next.js",
  },
  description: "Generated by Next.js",
};
```

- 각 페이지에 적용된 title이 없으면 default값이 적용
- 각 페이지에 적용된 title이 있으면 template값이 적용
- %s에 각 페이지에 title이 삽입되며, 위치는 바꿔도 됨

### Page Project Layout - RootLayout

- Children prop은 각각의 page.jsx를 받아 옴
- html 태그에 옵션을 추가하거나 수정할 수 있음. lang="ko"
- 공통 레이아웃은 body 태그에 추가하면 됨
- 이 때 children prop을 삭제하지 않도록 주의

```jsx
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Page Project Layout - Link component

- /componts/Navibar.jsx 파일을 만든 다음 코드를 추가한다

```jsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/foo">Foo</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
```

### Link vs. a vs. router.push

- a tag는 html 동기식으로 전체가 reload 되기 때문에, 외부 링크를 할 때 사용됨
- 일반적으로 내부 링크 이동시에는 사용하지 않는 것이 좋음
- router.push는 빌드 후, 이동할 주소가 html 상에 노출되지 않기 때문에 SEO에 취약함
- Link 컴포넌트는 빌드 후, a tag로 자동 변환됨
- a tag의 장점인 SEO 최적화, prefetch 가능, 우 클릭 기능들을 가짐
- 내부 페이지로의 이동할 때 이 방식을 사용해야 SPA 방식으로 전체 html중 필요한 부분만 비동기식으로 리렌더링 된다
- 따라서 특별한 경우가 아니면 Link 컴포넌트 사용을 권장함

### 1. Image component - local

- 정적 자원 중 이미지 파일은 SEO에 많은 영향을 미친다.
- 다운로드 시간이 많이 걸리고, 렌더링 후에 레이아웃이 변경되는 등 UX에 영향을 미침
- 이것을 누적 레이아웃 이동(CLS: Cumulative Layout Shift)이라고 함
- Image 컴포넌트를 사용하면 CLS문제를 해결함
- lazy loading: 이미지 로드 시점을 필요할 때까지 지연시키는 기술
- 이미지 사이즈 최적화로 사이즈를 1/10이하로 줄여줌
- Placeholder를 제공함
- WebP와 같은 최신 이미지 포맷 및 최신 포맷을 지원하지 않는 브라우저를 위해 png나 jpeg와 같은 예전 이미지 포맷도 제공함
- Pixabay나 Unplash와 같은 외부 이미지 서비스로 이미지를 제공할 수 있음
- 정적 자원은 기본적으로 public 디렉토리에 저장함
- 정적 자원은 번들링 이후에도 변하지 않기 때문
- 여러 종류의 정적 자원을 사용할 경우 public의 root에 각각 디렉토리를 만들어 사용함
- 이미지를 불러오는 방법은 직접 불러오는 방법과 import하는 방법 2가지가 있음
- 직접 불러올 때 경로는 /images/[이미지 이름.확장자] 로 하면 됨

```jsx
import Image from "next/image";

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
      <Image src="/images/person.jpg" alt="person" width={300} height={500} />
      <Image src="/images/woman.jpg" alt="woman" width={300} height={500} />
    </div>
  );
}
```

- Import하는 방법은 다음 소스처럼 이미지를 import한 후에 이름만 사용하면 됨

## 9월 25일 강의 내용

### 3-1. 라우팅 시스템

- React의 React Router, Reach Router 등은 클라이언트 라우팅만 구현할 수 있다.
- Next는 파일시스템 기반 페이지와 라우팅을 함
- 페이지는 /pages 디렉토리 안의 _.js, _.jsx, _.ts, _.tsx 파일에서 export한 React 컴포넌트다.
- 만알 컨텐츠를 분리해야 한다면?
  - /pages 아래 디렉토리를 만들고 라우팅 규칙을 만들면 됨
  - /pages 디렉토리 내부에는 계층적 구조로 라우팅 규칙을 만들 수 있다.
  - /pages/posts 안에 index.js와 [slug].js를 만들어 jsx를 반환함
  - /pages/posts/ 디렉토리 내에 Index.js만 간단하게 만들면 localhost:3000/posts로 접속이 가능
  - 다만 동적인 라우팅 규칙을 만들려면 [slug].js 파일리 필요
  - [slug].js는 매개 변수로 사용되며 주소창에서 입력하는 값을 모두 받을 수 있음
  - 동적 하우팅 규칙을 중첩할 수도 있음
  - 접근 경로를 ~posts/[date]/[slug]와 같이 만들 수 있음
  - [date] 디렉토리를 만들고 그 안에 [slug].js 파일을 저장하면 됨
  - [date]나 [slug]는 어떤 값이든 가질 수 있다.
  - 실제 앱에서는 경로 매개변수에 따라 서로 다른 동적 페이지를 렌더링하게 됨

## 9월 11일 강의 내용

### Transpile은 어떻게 동작하나

- Babel은 ECMAScript와 같은 자바스크립트 최신 버전이나, Typescript를 이전 버전의 코드로 변환시켜 주는 Transpile 도구다.
- 개발자가 작성한 코드 -> Parse -> Transform -> Generate -> 이전 버전의 코드
- Babel의 parser는 자바스크립트를 컴퓨터가 이해할 수 있는 코드 구조인 Abstract Syntax Tree(AST)로 변환해 주는 역할을 수행
- Babel의 traverse모듈은 전체 트리 상태(AST)를 유지하며 노드 교체, 제거, 추가를 담당
- 마지막 generator가 수정된 AST를 일반 코드로 변환해 주게 됨
- SWC도 Babel과 같은 자바스크립트 트랜스 컴파일러다.
- Next 12 이후 부터 Babel에서 SWC로 교체 됨
- SWC는 Rust로 작성되어 있어 Babel에 비해서 속도가 훨씬 빠름

### SWC를 프로젝트에 적용하려면

- 새로운 프로젝트에 적용하는 것은 다음 명령으로 프로젝트를 생성하면 바로 사용 가능  
  $ npx create-next-app@latest  
  or  
  $ npx create-next-app@12
- Next 12 이전 버전의 프로젝트에 적용하려면 다음과 같이 업그레이드 해줘야 함  
  $ npm install next@12  
  그리고 Babel을 설정했다면 설정 파일 (.Babelrc 또는 babel.config.js)을 삭제해 줌

### 렌더링 전략

- 렌더링 전략이란 웹 페이지 또는 웹 애플리케이션을 웹 브라우저에 제공하는 방법을 의미함
- 정적인 페이지 제작에는 Gatsby를 추천
- 서버 사이드 렌더링 전략을 원한다면 다른 프레임워크를 검토
- 그런데 Next.js에서는 이 모든 방법을 완전히 새로운 수준으로 제공
- 어떤 페이지는 빌드 시점에 정적으로 생성하고, 어떤 페이지는 실행 시점에 동적으로 생성할지 쉽게 정할 수 있음
- 또한 특정 페이지에 대한 요펑이 있을 때마다 페이지를 다시 생성할 수도 있음
- 그리고 반드시 클라이언트에서 렌더링해야 할 컴포넌트고 지정할 수 있음

### 서버 사이드 렌더링(SSR)

- 생소할 수도 있지만 웹 페이지를 제공하는 가장 흔한 방법임
- APM을 이용하는 일반적인 웹 페이지 생성이라 보면 됨
- 여기에 자바스크립트 코드가 적재되면 동적으로 페이지 내용을 렌더링함
- Next.js도 이와 같이 동적으로 페이지를 렌더링할 수 있음
- 그리고 여기에 스크립트 코드를 집어 넣어서 나중에 웹 페이지를 동적으로 처리할 수도 있는데 이를 하이드레이션이라고 함
- 서버 사이드 렌더링 -> 자바스키립트가 하이드레이션된 페이지를 전송 -> 클라이언트에서 DOM위에 각 스크립트 코드를 하이드레이션 페이지 새로 고침 없이 사용자와 웹 페이지간 상호 작용을 가능하게 함
- 리액트 라이드레이션 덕분에 이 상태에서 웹 앱은 싱글 페이지 애플리케이션(SPA) 처럼 작동할 수 있음
- CSR과 SSR의 장점을 모두 가지는 것
- 특정 렌더링 전략만 사용한다고 가정하면 SSR이 CSR에 비해 여러가지 장점이 있음

- [SSR의 장점]
  - 더 안전한 웹 애플리케이션
  - 더 뛰어난 웹 사이트 호환성
  - 더 뛰어난 SEO

### SSR이 최적의 렌더링 전략이 아닌 경우

- 클라이언트가 페이지를 요청할 때마다 페이지를 다시 렌더링할 수 있는 서버가 필요함
- 다른 방식에 비해 SSR이 더 많은 자원을 소모하고, 더 많은 부하를 보이며 유지 보수 비용도 증가함
- 페이지에 대한 요청을 처리하는 시간이 길어짐
- 페이지가 외부 API 또는 데이터 소스에 접근해야 한다면, 해당 페이지를 렌더링할 때마다 이를 다시 요청해야 함
- 페이지 간의 이동은 CSR에 비해 느림
- 중요한 것은 Next.js가 기본적으로 빌드 시점에 정적으로 페이지를 만든다는 것임
- 페이지에서 외부 API를 호출하거나 데이터베이스에 접근하는 등 동적 작업을 해야 한다면 해당하는 함수를 페이지에 export해야 함

### 클라이언트 사이드 렌더링(CSR)

- React 앱을 실행하면 렌더링 시작전에 빈 화면이 한동안 유지 되는 것이 보임
- 이는 서버에서 스크립트와 스타일만 포함된 HTML을 전송하기 때문
- 실제 렌더링은 클라이언트에서 이루어 짐
- CSR로 생성한 앱의 HTML을 보면 div태그 하나 밖에 없음, 그래서 빈화면만 보임
- 빌드 과정에서 js와 css파일을 HTML페이지에 불러오도록 만들고 root.div에 렌더링함

### CSR을 사용할 때의 주요 이점

- 네이티브 앱처럼 느껴지는 웹 앱
  - 전체 자바스크립트 번들을 다운로드 한다는 것은 렌더링할 모든 페이지가 이미 브라우저에 다운되어 있다는 뜻
  - 다른 페이지로 이동해도 서버에 요청할 필요 없이, 바로 페이지를 이동할 수 있음
  - 페이지를 바꾸기 위해 새로 고칠 필요 없음
- 쉬운 페이지 전환
  - 클라이언트에서의 내비게이션은 브라우저 화면을 새로 고칠 필요 없이 다른 페이지로 이동을 가능하게 만듬
  - 페이지 간 전환에 멋진 효과를 넣을 수도 있음. 애니메이션을 방해할 요소가 없기 때문
- 지연된 로딩과 성능
  - 웹 앱은 최소로 필요한 HTML만 렌더링함
  - 버튼을 누르면 나오는 모달도 실제 버튼이 눌렸을 때 동적으로 생성하게 됨
- 서버 부하 감소
  - 서버리스 환경에서 웹 앱을 제공할 수도 있음

### 장점은 단점이 될 수도 있다

- 네트워크 속도가 느린 환경에서는 번들이 모두 다운로드 될 때까지 계속 빈 페이지를 보아야 함
- 검색 로봇에게도 그 내용은 빈 것으로 보임
- 번들을 모두 받을 때까지 검색 로봇이 기다리기는 하지만 성능 점수는 낮을 것

- React,useEffect,Hook
- 최근 리액트는 함수형 컴포넌트 사용을 강조 하면서 life cycle함수 대신 Hook을 사용함

### 정적 사이트 생성(SSG: Static Site Generation)

- SSG는 일부 또는 전체 페이지를 빌드 시점에 미리 렌더링 함
- SSG는 SSR 및 CSR과 비교했을 때 다음과 같은 장점이 있음
  1. **쉬운 확장**
  - 정적 페이지는 단순 HTML 파일이므로 CDN을 통해 파일을 제공하거나, 캐시에 저장하기 쉬움
  2. **뛰어난 성능**
  - 빌드 시점에 HTML 페이지를 미리 렌더링하기 때문에 페이지를 요청해도 클라이언트나 서버가 무언가를 처리할 필여가 없음
  3. **더 안전한 API 요청**
  - 외부 API를 호출하거나, 데이터베이스에 접근하거나, 보호해야 할 데이터에 접근할 일이 없다. 필요한 모든 정보가 빌드 시점에 미리 페이지로 렌더링 되어 있기 때문
- SSG는 높은 확장성과 뛰어난 성능을 보이는 프론트엔드 애플리케이션을 만들고 싶을 때 가장 좋은 방법임
- 한 가지 문제점은 일단 웹 페이지를 만들고 나면 다음 배포 전까지 내용이 변하지 않는다는 것
- 조금이라도 수정하려면 필요한 데이터를 가져와서 수정하고 다시 생성하는 과정을 반복해야 함
- 이런 문제 때문에 나온 방법이 바로 "**증분 정적 재생성**(**ISR**: Incremental Static Regeneration)"이다.
- 예를 들어 동적 컨텐츠를 제공하지만 해당 컨텐츠 데이터를 로딩 하는데 시간이 오래 걸린다면, SSG와 ISR을 함께 사용하여 문제를 해결 할 수 있다.
- 많은 양의 데이터를 필요로 하는 복잡한 대시보드를 만든다면, 데이터를 불러 오기 위한 REST API호출에 수 초가 소요됨
- 만일 데이터가 자주 변하지 않는다면 SSG와 ISR을 사용해서 데이터를 10분동안 캐싱할 수 있다.

## 9월 04일 강의 내용

### 프로젝트의 기본 구조

- Next.js는 네비게이션을 구현할 때 react-router와 같은 라이브러리를 사용하지 않고, pages/ 디렉토리를 사용함
- pages/ 디렉토리 안의 모든 .js파일은 public 페이지가 됨
- pages/ 의 index.js파일을 복사해서, about.js로 이름을 바꾸면, http://localhost:3000/about 으로 접속할 수 있음
- public/ 디렉토리에는 웹 사이트의 모든 퍼블릭 페이지와 정적 콘텐츠가 있음
- styles/ 디렉토리에는 앱에서 사용하는 스타일시트를 넣음
- 용도가 정해져 있는 디렉토리는 pages/ 와 public/뿐임
- 나머지 디렉토리는 필요에 따라서 다른 목적으로 사용하거나 삭제해도 됨

### Next.js 14의 프로젝트의 기본 구조

- 프로젝트를 생성할 때 /src를 사용 여부를 선택할 수 있고, 일반적으로 사용함
- 14에서는 /public과 /src/app 디렉토리만 용도가 정해져 있음

### 타입스크립트 지원

- Next.js는 타입스크립트로 작성되었기 때문에 **고품질의 type definition**을 지원함
- 기본 언어를 타입스크립트로 지정하려면 root에 **tsconfig.json**이라는 설정파일 생성하면 됨

### 바벨과 웹팩 설정 커스터마이징

- 바벨이나 웹팩의 설정도 커스터마이징 할 수 있음
- 바벨은 **자바스크립트 트랜스컴파일러**이며, 최신 자바스크립트 코드를 **하위 호환성을 보장**하는 스크립트 코드로 변환하는 일을 담당함
- 하위 호환성이 보장되면 **어떤 웹 브라우저**에서든 자바스크립트 코드를 실행할 수 있음
- 바벨을 사용하면 브라우저나 Node.js 등에서 지원하지 않는 **새롭고 훌륭한 기능**을 현재의 환경에서도 실행 가능
- 바벨 설정을 커스터마이징 하려면, 프로젝트 Root에 **.babelrc** 라는 파일을 생성하면 됨
- 이 설정 파일을 비워 두면 오류거 발생하기 때문에 최소한 다음 내용을 저장해야 함

```js
{
  "presets":["next/babel"]
}
```

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
    >  이러한 단점을 보완하고자 나온 것이 **ISR(증분 정적 재생성)** 입니다.  
    >  **이미 생성된 페이지를 일정 시간이 지난 후에 다시 생성합니다.**(최신 데이터로 업데이트)
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
- 예를 들면 설정 파일을 만들지 않고도 어떤 페이지에서 서버 사이드 렌더링을 적용하고, 어떤 페이지에 정적 페이지 생성을 적용할지 지정할 수 있음
- Next.js는 fetch, window, document와 같은 웹 브라우저에서 제공하는 전역 객체나 canvas같은 **HTML요소에는 접근 할 수가 없다.**
