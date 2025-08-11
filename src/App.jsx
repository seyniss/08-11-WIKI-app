import './App.css'
import { useState, useRef, useEffect } from 'react'
import { searchWikiTitles } from './api/wiki'

function App() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])//검색결과 담는 곳
  const [loading, setLoading] = useState(false)//로딩여부
  const [err, setErr] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
    console.log(items)
  }, [])

  const handleSearch = async () => {
    const keyword = q.trim() //검색어 공백 제거

    if (!keyword) return

    try {
      setLoading(true)
      setErr('')

      const pages = await searchWikiTitles(keyword)
      setItems(pages)


    } catch (error) {
      console.log(error)
      setErr("검색 중 오류 발생")
      setItems([])
    } finally {

    }
  }
  return (
    <div className='app'>
      <h1>위키백과 검색</h1>
      

      <div className="search">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
          type="text" placeholder='검색어를 입력하세요(예:서울, 한글, 리액트) ' />
        <button
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "검색 중" : "검색" }
        </button>
      </div>
      {err && <div className="error">에러코드</div>}
      <ul className='list'>
        {items.map((p) => (
          <li key={p.id}>
            <div>
              <strong>{p.title}</strong>
              <p>{p.description || '요약없음'}</p>
              <a href={`https://ko.wikipedia.org/wiki/${encodeURIComponent(p.title)}`} target='_blank'>위키에서 보기</a>
            </div>
          </li>
        ))}

      </ul>
    </div>
  )
}

export default App
