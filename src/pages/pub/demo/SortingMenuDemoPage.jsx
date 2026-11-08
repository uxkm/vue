'use client'

import { useCallback, useRef, useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cx } from '@/utils/cx'
import { GuideLayout } from '@/comp'

/** 정렬 기준 목록 */
const sortList = ['최신순', '인기순', '이름순', '오래된순']

/**
 * Sorting Menu 데모 화면.
 * 정렬 메뉴의 펼침·선택 동작을 확인한다.
 */
export default function SortingMenuDemoPage() {
  const [isSortingOpen, setIsSortingOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const sortingWrapRef = useRef(null)

  const close = useCallback(() => setIsSortingOpen(false), [])
  useClickOutside(sortingWrapRef, close, isSortingOpen)

  const current = selectedItem || sortList[0]

  return (
    // Header 사용법 (GuideLayout header* props)
    // - 헤더 숨김: export const meta = { header: false }
    // - headerLayout="inline" : 한 줄 (스크롤 시 전체 숨김)
    // - headerLayout="stacked": 상단 브랜드 + 하단 네비 (스크롤 시 상단만 숨김)
    // - hideNavOnScroll       : stacked일 때 네비까지 함께 위로 올림
    // 예) <GuideLayout headerLayout="stacked" hideNavOnScroll ... />
    <GuideLayout
      category="데모"
      title="Sorting Menu"
      description="정렬 드롭다운 열기/선택/외부 클릭 닫기 동작 확인 (useClickOutside)"
    >
      <div className="sorting-menu-demo">
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

        <p className="demo-status">
          선택: <strong>{current}</strong>
          {' '}· 메뉴: {isSortingOpen ? '열림' : '닫힘'}
        </p>
      </div>
    </GuideLayout>
  )
}
