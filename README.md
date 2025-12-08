# DevTalk - 개발자 지식 공유 커뮤니티 서비스 (FE)

DevTalk은 개발자들이 편하게 질문하고 답하며 지식을 공유할 수 있는 커뮤니티 서비스입니다.

## 프로젝트 개요

- 개발 기간: 2025.09.22 ~ 2025.12.07
- 개발 인원: 1명 (개인 프로젝트)
- [BE Repo](https://github.com/100-hours-a-week/3-ian-kim-community-be)

## 주요 기능

- 회원가입/로그인
- 게시글 CRUD
- 게시글 목록 조회
- 게시글 좋아요
- 댓글 CRUD
- 댓글 목록 조회

## 기술 스택

- React, JavaScript
- Axios
- Vite

## 데모 영상

https://github.com/user-attachments/assets/36d27166-e254-40ab-942b-5eaebad67629

## 주요 개발 내용

### 페이지 조회 시 StrictMode로 인한 중복 조회 문제 해결

- 초기에는 첫 페이지를 조회하기 위해 useEffect에서 API를 호출했습니다.
- 하지만 리액트의 StrcitMode 때문에 useEffect가 두 번 실행되어, 같은 페이지를 두 번 조회하는 문제가 있었습니다.
- setPageNo가 비동기로 업데이트되기 전에 useEffect가 다시 호출되어 이런 문제가 발생한 것으로 생각했습니다.
- 그래서 useEffect를 사용하지 않기로 결정했고, 대신 Observer가 페이지 렌더링되자마자 타겟을 찾을 수 있도록 구현해 문제를 해결했습니다.

---

### useCallback으로 불필요한 렌더링 감소

- useInfiniteScroll 훅 내부에서 useEffect로 observer를 생성하고 있습니다. 그런데 새 페이지를 조회할 때 props로 받은 onIntersect 함수가 재생성되므로, 리렌더링으로 인해 useEffect가 불필요하게 여러 번 실행되고 있습니다.

  ```jsx
  // useInfiniteScroll.jsx
  useEffect(() => {
    console.log('useEffect 실행')

    // ...

    return () => {
      console.log('cleanup 실행')
      // ...
    }
  }, [hasNextPage, onIntersect])

  // PostListPage.jsx
  const onIntersect = async () => {
    try {
      const { content, page } = await getPosts(pageNo)
      setPageNo((prev) => prev + 1)
      setHasNextPage(page.number < page.totalPages)
      setPosts((prev) => [...prev, ...content])
    } catch (err) {}
  }
  ```

  - 마운트 시 StrictMode로 인한 useEffect → cleanup → useEffect
  - 페이지 조회로 posts state 변경 → 리렌더링 → onIntersect 함수 재생성 → 의존성 배열의 값이 변했으므로 cleanup → useEffect
  - 페이지 조회로 hasNextPage state 변경 → 리렌더링 → onIntersect 함수 재생성 → cleanup → useEffect
  - 페이지 조회로 pageNo state 변경 → 리렌더링 → onIntersect 함수 재생성 → cleanup → useEffect

- props로 전달하는 onIntersect 함수를 useCallback으로 감싸 리렌링되더라도 재생성되지 않도록 했습니다. stale closure 문제가 발생하지 않도록 의존성 배열에 useCallback 내부에서 사용하는 state를 추가했습니다.
  ```jsx
  // PostListPage.jsx
  const onIntersect = useCallback(async () => {
    try {
      const { content, page } = await getPosts(pageNo)
      setPageNo((prev) => prev + 1)
      setHasNextPage(page.number < page.totalPages)
      setPosts((prev) => [...prev, ...content])
    } catch (err) {}
  }, [pageNo])
  ```
  - 마운트 시 StrictMode로 인한 useEffect → cleanup → useEffect
  - 페이지 조회로 hasNextPage state 변경 → 의존성 배열의 값이 변했으므로 cleanup → useEffect
  - 페이지 조회로 pageNo state 변경 → 리렌더링 → onIntersect 함수 재생성 → cleanup → useEffect

---

### 로그인 유지

- 여러 컴포넌트에서 로그인 상태를 확인해야 하므로 전역 상태 관리 라이브러리인 zustand를 사용했습니다.
- zustand의 persist middleware는 상태에 영속성을 부여하기 위해 로컬 스토리지 등을 사용합니다.
- 하지만 로그인 여부를 로컬 스토리지에 저장하는 건 보안상 위험하다 생각해 서버에서 조회하는 방식으로 구현했습니다.
- 브라우저를 새로고침하면 메모리가 초기화되므로 최상위 컴포넌트인 App.jsx에서 서버로 로그인 여부를 조회했습니다.
- 이때 서버의 부담을 줄일 수 있도록 최소한의 정보(userId)만 응답하는 API를 만들었습니다.
- 프로필 이미지는 헤더에서 항상 필요하므로 imageName(서버에 저장된 파일명)을 로컬 스토리지에 저장했습니다.

---

### PostPage를 PostSection과 CommetSection으로 분리

- 기존에는 게시글 상세 정보 데이터와 댓글 목록 데이터를 모두 PostPage에서 관리했었습니다.
- 하지만 그렇게 하면 게시글 데이터가 변경될 때 CommentSection도 리렌더링되고, 댓글 데이터가 변경될 때 PostSection도 리렌더링되는 비효율 문제가 발생합니다.
- 이를 개선하기 위해 게시글 데이터는 PostSection에서 관리하고, 댓글 데이터는 CommentSection에서 관리하도록 분리했습니다.

---

### useEffect 분리로 불필요한 작업 최소화

- 초기에는 useEffect를 하나만 사용해 여러 작업을 수행했습니다.
- 그러다보니 다른 작업의 의존성 배열로 인해 리렌더링이 발생하면 다른 작업도 다시 수행되어야 했습니다.
- 이런 불필요한 작업을 최소화하기 위해 하나의 useEffect가 하나의 작업만 책임지도록 분리했습니다.

기존 코드

```jsx
useEffect(() => {
  const handleOutsideClick = () => {
    setIsDropdownOpen(false)
  }

  const getProfileImage = async () => {
    const response = await getImage(profileImageName)
    setProfileImageSrc(response.imageSrc)
  }

  if (profileImageName) {
    getProfileImage()
  }

  window.addEventListener('click', handleOutsideClick)

  return () => window.removeEventListener('click', handleOutsideClick)
}, [profileImageName])
```

수정 코드

```jsx
useEffect(() => {
  const getProfileImage = async () => {
    const response = await getImage(profileImageName)
    setProfileImageSrc(response.imageSrc)
  }

  if (profileImageName) {
    getProfileImage()
  }
}, [profileImageName])

useEffect(() => {
  const handleOutsideClick = () => {
    setIsDropdownOpen(false)
  }

  window.addEventListener('click', handleOutsideClick)

  return () => window.removeEventListener('click', handleOutsideClick)
}, [])
```
