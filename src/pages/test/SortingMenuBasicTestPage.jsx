import { useEffect, useRef, useState } from 'react'
import DemoShell from '@/pages/DemoShell'
import { cx } from '@/utils/cx'

const sortList = ['최신순', '인기순', '이름순', '오래된순']

export default function SortingMenuBasicTestPage() {
  const [isSortingOpen, setIsSortingOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const sortingWrapRef = useRef(null)

  // document click 으로 외부 클릭 시 닫기
  useEffect(() => {
    const onDocumentClick = (e) => {
      const wrap = sortingWrapRef.current
      if (!wrap || !isSortingOpen) return
      if (!wrap.contains(e.target)) setIsSortingOpen(false)
    }
    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [isSortingOpen])

  const current = selectedItem || sortList[0]

  return (
    <DemoShell
      category="테스트"
      title="Sorting Menu (Basic)"
      description="정렬 드롭다운 열기/선택/외부 클릭 닫기 동작 확인 (document 클릭)"
    >
      <div className="sorting-menu-test">
        <div className="menu-wrap newType">
          <div className="selection-wrap">
            <div className="list-items-sorting opts">
              {sortList.length > 0 && (
                <div
                  ref={sortingWrapRef}
                  className={cx('sorting-wrap', { open: isSortingOpen })}
                >
                  <button
                    type="button"
                    className="sort-btn"
                    aria-expanded={String(isSortingOpen)}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsSortingOpen((open) => !open)
                    }}
                  >
                    {current}
                  </button>

                  {isSortingOpen && (
                    <div className="sorting-menu">
                      {sortList.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          className={cx({ active: current === item })}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedItem(item)
                            setIsSortingOpen(false)
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="test-status">
          선택: <strong>{current}</strong>
          {' '}· 메뉴: {isSortingOpen ? '열림' : '닫힘'}
        </p>
      </div>
    </DemoShell>
  )
}
