<template>
  <div class="wbs">
    <!-- ========== 1) 로딩 상태: 실제 레이아웃과 동일한 스켈레톤 ========== -->
    <div
      v-if="loading"
      class="wbs-skeleton"
      aria-busy="true"
      aria-label="목록을 불러오는 중"
    >
      <!-- 스켈레톤: 히어로(제목·설명) + 진행률 요약 -->
      <header class="wbs-hero">
        <span class="wbs-skel wbs-skel--eyebrow"></span>
        <span class="wbs-skel wbs-skel--title"></span>
        <span class="wbs-skel wbs-skel--desc"></span>
        <!-- 스켈레톤: 전체 진행률 카드 -->
        <div v-if="showProgressMeta" class="wbs-summary">
          <div class="wbs-summary-main">
            <span class="wbs-skel wbs-skel--label"></span>
            <span class="wbs-skel wbs-skel--value"></span>
          </div>
          <span class="wbs-skel wbs-skel--bar"></span>
          <div class="wbs-skeleton__stats">
            <span
              v-for="n in 5"
              :key="'stat-' + n"
              class="wbs-skel wbs-skel--stat"
            ></span>
          </div>
        </div>
      </header>

      <!-- 스켈레톤: 탭 + 검색 sticky -->
      <div class="wbs-sticky" aria-hidden="true">
        <div class="wbs-tabs-bar wbs-skeleton__tabs">
          <span
            v-for="n in 4"
            :key="'tab-' + n"
            class="wbs-skel wbs-skel--tab"
          ></span>
        </div>
        <div class="wbs-panel-head">
          <div class="wbs-skeleton__search">
            <span class="wbs-skel wbs-skel--select"></span>
            <span class="wbs-skel wbs-skel--input"></span>
          </div>
          <span class="wbs-skel wbs-skel--switch"></span>
        </div>
      </div>
      <div class="wbs-filter-bar" aria-hidden="true">
        <span class="wbs-skel wbs-skel--chip" style="width: 88px; height: 32px"></span>
        <span class="wbs-skel wbs-skel--chip" style="width: 72px"></span>
        <span class="wbs-skel wbs-skel--chip" style="width: 96px"></span>
      </div>
      <!-- 스켈레톤: 목록 테이블 -->
      <section class="wbs-panel" aria-hidden="true">
        <div class="wbs-table-wrap">
          <div
            class="wbs-table"
            :class="{ 'is-progress-hidden': !showProgressMeta }"
          >
            <div class="wbs-table__head" role="presentation">
              <div class="col-name"><span class="wbs-skel wbs-skel--th"></span></div>
              <div class="col-type"><span class="wbs-skel wbs-skel--th"></span></div>
              <div class="col-id"><span class="wbs-skel wbs-skel--th"></span></div>
              <div class="col-pageurl"><span class="wbs-skel wbs-skel--th"></span></div>
              <div class="col-path"><span class="wbs-skel wbs-skel--th"></span></div>
              <div class="col-owner"><span class="wbs-skel wbs-skel--th"></span></div>
              <div v-if="showProgressMeta" class="col-start"><span class="wbs-skel wbs-skel--th"></span></div>
              <div v-if="showProgressMeta" class="col-expected"><span class="wbs-skel wbs-skel--th"></span></div>
              <div v-if="showProgressMeta" class="col-end"><span class="wbs-skel wbs-skel--th"></span></div>
              <div v-if="showProgressMeta" class="col-status"><span class="wbs-skel wbs-skel--th"></span></div>
              <div v-if="showProgressMeta" class="col-progress"><span class="wbs-skel wbs-skel--th"></span></div>
              <div class="col-planning"><span class="wbs-skel wbs-skel--th"></span></div>
              <div class="col-design"><span class="wbs-skel wbs-skel--th"></span></div>
              <div class="col-remark"><span class="wbs-skel wbs-skel--th"></span></div>
            </div>
            <ul class="wbs-table__list">
              <li
                v-for="n in skeletonRowCount"
                :key="'row-' + n"
                class="wbs-table__group"
              >
                <div class="wbs-table__row level-0">
                  <div class="col-name" role="presentation">
                    <span class="wbs-skel wbs-skel--toggle"></span>
                    <span class="wbs-skel wbs-skel--name" :style="{ width: (40 + (n % 5) * 10) + '%' }"></span>
                  </div>
                  <div class="col-type"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div class="col-id"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div class="col-pageurl"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div class="col-path"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div class="col-owner"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div v-if="showProgressMeta" class="col-start"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div v-if="showProgressMeta" class="col-expected"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div v-if="showProgressMeta" class="col-end"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div v-if="showProgressMeta" class="col-status"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div v-if="showProgressMeta" class="col-progress"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div class="col-planning"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div class="col-design"><span class="wbs-skel wbs-skel--cell"></span></div>
                  <div class="col-remark"><span class="wbs-skel wbs-skel--cell"></span></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <!-- ========== 2) 에러 상태: JSON 로드 실패 메시지 + 다시 시도 ========== -->
    <div
      v-else-if="error"
      class="wbs-state wbs-alert"
      role="alert"
    >
      <!-- 에러 메시지 문구 -->
      <p class="wbs-alert__title">{{ error }}</p>
      <!-- 현재 탭 데이터 재요청 -->
      <button type="button" class="wbs-btn" @click="loadTabData">다시 시도</button>
    </div>

    <!-- ========== 3) 정상 상태: 실제 WBS 목록 UI ========== -->
    <template v-else>
      <!-- 히어로: 프로젝트명·설명 -->
      <header class="wbs-hero">
        <p class="wbs-eyebrow">Publishing List</p>
        <h1 class="wbs-title">{{ projectName }}</h1>
        <p class="wbs-desc">{{ projectDesc }}</p>

        <!-- 전체 진행률·상태 통계 (showProgressMeta: false 면 숨김) -->
        <div v-if="showProgressMeta" class="wbs-summary">
          <!-- 진행률 숫자 + 현재 탭 태그 -->
          <div class="wbs-summary-main">
            <span class="wbs-summary-label">
              전체 진행률
              <span class="wbs-tag is-primary">{{ activeTabLabel }}</span>
            </span>
            <strong class="wbs-summary-value">{{ overallProgress }}%</strong>
          </div>
          <!-- 진행률 바 -->
          <div
            class="wbs-progress"
            role="progressbar"
            :aria-valuenow="overallProgress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="전체 진행률"
          >
            <span class="wbs-progress__bar" :style="{ width: overallProgress + '%' }"></span>
          </div>
          <!-- 상태별 건수 (전체/완료/진행중/대기/지연) -->
          <ul class="wbs-stats">
            <li v-for="stat in statusStats" :key="stat.key">
              <span
                class="wbs-badge is-dot"
                :class="'is-' + statusColor(stat.key)"
                :aria-label="stat.label"
              ></span>
              {{ stat.label }} {{ stat.count }}
            </li>
          </ul>
        </div>
      </header>

      <!-- sticky: 탭 + 검색 고정 (화면명 레이블·테이블은 스크롤) -->
      <div ref="sticky" class="wbs-sticky">
        <div
          class="wbs-tabs-bar"
          role="tablist"
          aria-label="퍼블리시 탭"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="wbs-tab"
            role="tab"
            :aria-selected="activeTab === tab.id ? 'true' : 'false'"
            :class="{ 'is-active': activeTab === tab.id }"
            @click="selectTab(tab.id)"
          >{{ tab.label }}</button>
        </div>

        <!-- 검색 / 모두 펼치기·접기 -->
        <div ref="panelHead" class="wbs-panel-head">
          <div class="wbs-search">
            <label class="wbs-search-label" for="wbs-search-category">검색 카테고리</label>
            <select
              id="wbs-search-category"
              v-model="searchCategory"
              class="wbs-select"
            >
              <option
                v-for="opt in searchCategories"
                :key="opt.value"
                :value="opt.value"
              >{{ opt.label }}</option>
            </select>
            <label class="wbs-search-label" for="wbs-search-input">검색</label>
            <div class="wbs-search-field">
              <input
                id="wbs-search-input"
                v-model="searchInput"
                class="wbs-input"
                type="search"
                :placeholder="searchPlaceholder"
                @keydown.enter.prevent="applySearch"
              >
              <button
                v-if="searchInput"
                type="button"
                class="wbs-input-clear"
                aria-label="검색어 지우기"
                @click="clearSearch"
              >×</button>
            </div>
          </div>
          <div class="wbs-actions">
            <label class="wbs-switch">
              <input
                type="checkbox"
                :checked="hasExpanded"
                @change="onExpandSwitch($event.target.checked)"
              >
              <span class="wbs-switch__ui" aria-hidden="true"></span>
              <span class="wbs-switch__label">{{ hasExpanded ? '모두 접기' : '모두 펼치기' }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- 필터: 버튼 + 선택 폴더의 하위 화면 칩 -->
      <div
        v-if="folders.length"
        class="wbs-filter-bar"
      >
        <button
          type="button"
          class="wbs-filter-btn"
          :class="{ 'is-active': !!activeFolderId }"
          :aria-expanded="filterSheetOpen ? 'true' : 'false'"
          aria-haspopup="dialog"
          :aria-label="activeFolderId ? ('필터, ' + filterSelectedLabel) : '필터'"
          @click="openFilterSheet"
        >
          <span class="wbs-filter-btn__label">{{ filterSelectedLabel || '필터' }}</span>
          <span class="wbs-filter-btn__icon" aria-hidden="true">▾</span>
        </button>
        <!-- 필터 | 하위 목록 -->
        <div
          v-if="activeFolderScreens.length"
          class="wbs-filter-selected"
        >
          <span class="wbs-filter-selected__sep" aria-hidden="true"></span>
          <ul
            class="wbs-filter-subs"
            aria-label="선택한 화면명 하위 목록"
          >
            <li
              v-for="screen in activeFolderScreens"
              :key="(screen.screenId || screen.screenName) + '-sub'"
            >
              <a
                v-if="screen.pageUrl"
                class="wbs-filter-sub"
                :href="screen.pageUrl"
                target="_blank"
                rel="noopener noreferrer"
              >{{ screen.screenName }}</a>
              <span
                v-else
                class="wbs-filter-sub is-static"
              >{{ screen.screenName }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 목록 패널: 테이블 -->
      <section class="wbs-panel" aria-label="퍼블리시 화면 목록">
          <!-- 화면 목록 테이블 (가로·세로 스크롤) -->
          <div class="wbs-table-wrap">
            <div
              class="wbs-table"
              :class="{ 'is-progress-hidden': !showProgressMeta }"
              role="table"
              aria-label="화면 목록"
            >
              <!-- 테이블 헤더 행 -->
              <div class="wbs-table__head" role="row">
                <!-- 화면명 -->
                <div class="col-name" role="columnheader">화면명</div>
                <!-- Screen Type -->
                <div class="col-type" role="columnheader">Screen Type</div>
                <!-- Screen ID -->
                <div class="col-id" role="columnheader">Screen ID</div>
                <!-- PageUrl -->
                <div class="col-pageurl" role="columnheader">PageUrl</div>
                <!-- File Path -->
                <div class="col-path" role="columnheader">File Path</div>
                <!-- 담당자 -->
                <div class="col-owner" role="columnheader">담당자</div>
                <!-- 시작일 / 예상일 / 종료일 / 상태 / 진행률 — showProgressMeta -->
                <div v-if="showProgressMeta" class="col-start" role="columnheader">시작일</div>
                <div v-if="showProgressMeta" class="col-expected" role="columnheader">예상일</div>
                <div v-if="showProgressMeta" class="col-end" role="columnheader">종료일</div>
                <div v-if="showProgressMeta" class="col-status" role="columnheader">상태</div>
                <div v-if="showProgressMeta" class="col-progress" role="columnheader">진행률</div>
                <!-- 기획 -->
                <div class="col-planning" role="columnheader">기획</div>
                <!-- 디자인 -->
                <div class="col-design" role="columnheader">디자인</div>
                <!-- 비고 -->
                <div class="col-remark" role="columnheader">비고</div>
              </div>

              <!-- 폴더(1뎁스) + 화면(2뎁스) 목록 -->
              <ul v-if="(displayFolders || []).length" class="wbs-table__list">
                <li
                  v-for="folder in (displayFolders || [])"
                  :key="folder.id"
                  :id="'wbs-folder-' + folder.id"
                  class="wbs-table__group"
                >
                  <!-- 1뎁스: 폴더 행 (클릭 시 펼침/접힘, 화면명 열 sticky) -->
                  <div
                    class="wbs-table__row level-0"
                    :class="'status-' + (folder.status || 'pending')"
                    role="row"
                  >
                    <!-- 화면명 (폴더) — 클릭 시 펼침/접힘, 가로 스크롤 시 sticky -->
                    <div class="col-name" role="cell">
                      <span class="name">
                        <button
                          type="button"
                          class="toggle"
                          :aria-label="isExpanded(folder.id) ? '폴더 접기' : '폴더 펼치기'"
                          :aria-expanded="isExpanded(folder.id) ? 'true' : 'false'"
                          @click="toggleFolder(folder.id)"
                        >{{ isExpanded(folder.id) ? '−' : '+' }}</button>
                        <button
                          type="button"
                          class="folder-name"
                          :aria-expanded="isExpanded(folder.id) ? 'true' : 'false'"
                          @click="toggleFolder(folder.id)"
                        >
                          {{ folder.name }}
                          <span class="folder-count">({{ folder.screens.length }})</span>
                        </button>
                      </span>
                    </div>
                    <!-- Screen Type -->
                    <div class="col-type" role="cell"></div>
                    <!-- Screen ID -->
                    <div class="col-id" role="cell"></div>
                    <!-- PageUrl -->
                    <div class="col-pageurl" role="cell"></div>
                    <!-- File Path -->
                    <div class="col-path" role="cell"></div>
                    <!-- 담당자 -->
                    <div class="col-owner" role="cell"></div>
                    <div v-if="showProgressMeta" class="col-start" role="cell"></div>
                    <div v-if="showProgressMeta" class="col-expected" role="cell"></div>
                    <div v-if="showProgressMeta" class="col-end" role="cell"></div>
                    <div v-if="showProgressMeta" class="col-status" role="cell"></div>
                    <div v-if="showProgressMeta" class="col-progress" role="cell"></div>
                    <!-- 기획 -->
                    <div class="col-planning" role="cell"></div>
                    <!-- 디자인 -->
                    <div class="col-design" role="cell"></div>
                    <!-- 비고 -->
                    <div class="col-remark" role="cell"></div>
                  </div>

                  <!-- 2뎁스: 폴더 하위 화면 행 -->
                  <ul
                    v-show="isExpanded(folder.id)"
                    class="wbs-table__screens"
                  >
                    <li
                      v-for="screen in folder.screens"
                      :key="folder.id + '-' + screen.screenId"
                      class="wbs-table__row level-1"
                      :class="'status-' + (screen.status || 'pending')"
                      role="row"
                    >
                      <!-- 화면명 -->
                      <div class="col-name" role="cell">
                        <span class="name name--child">
                          <span class="toggle-spacer"></span>
                          <a
                            v-if="screen.pageUrl"
                            class="wbs-link"
                            :href="screen.pageUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                          >{{ screen.screenName }}</a>
                          <template v-else>{{ screen.screenName }}</template>
                        </span>
                      </div>
                      <!-- Screen Type -->
                      <div class="col-type" role="cell">
                        <span class="wbs-tag is-muted">{{ screen.screenType || '-' }}</span>
                      </div>
                      <!-- Screen ID -->
                      <div class="col-id" role="cell">
                        <code>{{ screen.screenId || '-' }}</code>
                      </div>
                      <!-- PageUrl -->
                      <div class="col-pageurl" role="cell">
                        <a
                          v-if="screen.pageUrl"
                          class="path-link"
                          :href="screen.pageUrl"
                          :title="screen.pageUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                        ><code>{{ screen.pageUrl }}</code></a>
                        <span v-else class="path-empty">-</span>
                      </div>
                      <!-- File Path -->
                      <div class="col-path" role="cell">
                        <code v-if="screen.filePath" :title="screen.filePath">{{ screen.filePath }}</code>
                        <span v-else class="path-empty">-</span>
                      </div>
                      <!-- 담당자 -->
                      <div class="col-owner" role="cell">{{ screen.owner || '-' }}</div>
                      <div v-if="showProgressMeta" class="col-start" role="cell">{{ screen.start || '-' }}</div>
                      <div v-if="showProgressMeta" class="col-expected" role="cell">{{ screen.expected || '-' }}</div>
                      <div v-if="showProgressMeta" class="col-end" role="cell">{{ screen.end || '-' }}</div>
                      <div v-if="showProgressMeta" class="col-status" role="cell">
                        <span
                          class="wbs-badge"
                          :class="'is-' + statusColor(screen.status)"
                        >{{ statusLabel(screen.status) }}</span>
                      </div>
                      <div v-if="showProgressMeta" class="col-progress" role="cell">
                        <span class="pct">{{ screen.progress || 0 }}%</span>
                      </div>
                      <!-- 기획 -->
                      <div class="col-planning" role="cell">
                        <a
                          v-if="screen.planning"
                          class="path-link"
                          :href="screen.planning"
                          :title="screen.planning"
                          target="_blank"
                          rel="noopener noreferrer"
                        ><code>{{ screen.planning }}</code></a>
                        <span v-else class="path-empty">-</span>
                      </div>
                      <!-- 디자인 -->
                      <div class="col-design" role="cell">
                        <a
                          v-if="screen.design"
                          class="path-link"
                          :href="screen.design"
                          :title="screen.design"
                          target="_blank"
                          rel="noopener noreferrer"
                        ><code>{{ screen.design }}</code></a>
                        <span v-else class="path-empty">-</span>
                      </div>
                      <!-- 비고 (내용 있을 때만 클릭 → 상세 모달) -->
                      <div class="col-remark" role="cell">
                        <button
                          v-if="remarkHasContent(screen.remark)"
                          type="button"
                          class="remark-trigger"
                          @click="openRemarkModal(screen)"
                        >
                          <span class="remark-preview">{{ remarkPreview(screen.remark) }}</span>
                          <span
                            v-if="remarkItems(screen.remark).length > 1"
                            class="wbs-badge is-muted is-count"
                          >+{{ remarkItems(screen.remark).length - 1 }}</span>
                        </button>
                        <span v-else class="path-empty">-</span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>

              <!-- 검색/필터 결과 없음 -->
              <div v-else class="wbs-empty">검색 결과가 없습니다.</div>
            </div>
          </div>
        </section>
    </template>

    <!-- ========== 4) 화면명 필터 버텀시트 ========== -->
    <div
      v-if="filterSheetOpen"
      class="wbs-bottom-sheet"
      @keydown.esc="closeFilterSheet"
    >
      <div
        class="wbs-bottom-sheet__backdrop"
        @click="closeFilterSheet"
      ></div>
      <div
        class="wbs-bottom-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wbs-filter-sheet-title"
        tabindex="-1"
        ref="filterSheet"
      >
        <header class="wbs-bottom-sheet__header">
          <div class="wbs-bottom-sheet__handle" aria-hidden="true"></div>
          <h2
            id="wbs-filter-sheet-title"
            class="wbs-bottom-sheet__title"
          >화면명 필터</h2>
          <button
            type="button"
            class="wbs-btn is-ghost wbs-bottom-sheet__close"
            aria-label="닫기"
            @click="closeFilterSheet"
          >×</button>
        </header>
        <ul class="wbs-bottom-sheet__list" role="listbox" aria-label="화면명 목록">
          <li role="option" :aria-selected="!activeFolderId ? 'true' : 'false'">
            <button
              type="button"
              class="wbs-bottom-sheet__item"
              :class="{ 'is-active': !activeFolderId }"
              @click="pickFilterFolder(null)"
            >
              <span>전체</span>
              <span class="wbs-bottom-sheet__count">{{ folders.length }}</span>
            </button>
          </li>
          <li
            v-for="folder in (folders || [])"
            :key="'filter-' + folder.id"
            role="option"
            :aria-selected="activeFolderId === folder.id ? 'true' : 'false'"
          >
            <button
              type="button"
              class="wbs-bottom-sheet__item"
              :class="{ 'is-active': activeFolderId === folder.id }"
              @click="pickFilterFolder(folder.id)"
            >
              <span>{{ folder.name }}</span>
              <span class="wbs-bottom-sheet__count">{{ (folder.screens || []).length }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- ========== 5) 비고 상세 모달 (내용 있는 비고 클릭 시) ========== -->
    <div
      v-if="remarkModal.open"
      class="remark-modal"
      @keydown.esc="closeRemarkModal"
    >
      <!-- 모달 배경(클릭 시 닫기) -->
      <div class="remark-modal__backdrop" @click="closeRemarkModal"></div>
      <!-- 모달 다이얼로그 -->
      <div
        class="remark-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="remark-modal-title"
        tabindex="-1"
        ref="remarkDialog"
      >
        <!-- 모달 헤더: 화면명·Screen ID·닫기 -->
        <header class="remark-modal__header">
          <div>
            <p class="remark-modal__eyebrow">비고 히스토리</p>
            <h2 id="remark-modal-title" class="remark-modal__title">
              {{ remarkModal.screenName || '상세' }}
            </h2>
            <p
              v-if="remarkModal.screenId"
              class="remark-modal__meta"
            >{{ remarkModal.screenId }}</p>
          </div>
          <button
            type="button"
            class="wbs-btn is-ghost remark-modal__close"
            aria-label="닫기"
            @click="closeRemarkModal"
          >×</button>
        </header>
        <!-- 모달 본문: 비고 히스토리 목록 -->
        <div class="remark-modal__body">
          <ul v-if="remarkModal.items.length" class="remark-history">
            <li
              v-for="(item, index) in remarkModal.items"
              :key="index"
              class="remark-history__item"
            >
              <!-- 날짜·작성자 -->
              <div class="remark-history__head">
                <span class="remark-history__date">{{ item.date || '-' }}</span>
                <span
                  v-if="item.author"
                  class="remark-history__author"
                >{{ item.author }}</span>
              </div>
              <!-- 비고 본문 -->
              <p class="remark-history__text">{{ item.text }}</p>
            </li>
          </ul>
          <div v-else class="remark-modal__empty">등록된 비고 내역이 없습니다.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * PubIndex
 * - JSON 기반 퍼블리시 화면 목록 (탭 / 화면명 레이블 / 검색 / 폴더 펼침)
 * - 공통 컴포넌트 의존 없이 이 페이지만으로 동작
 *
 * 함수 스타일
 * - Vue 옵션(data / computed / watch / methods / 라이프사이클): function
 *   → Vue가 this 를 인스턴스로 바인딩해야 하므로 화살표 함수 사용 금지
 * - 콜백(map / filter / forEach / XHR / $nextTick): 화살표 함수
 *   → 바깥 this 를 그대로 쓰므로 var self = this 불필요
 */

// 프로젝트 메타·탭 목록
var INDEX_URL = '/static/data/publish/index.json'
// 탭별 폴더·화면 JSON 루트
var DATA_BASE = '/static/data/publish/'

// 상태 코드 → 한글 라벨
var STATUS_MAP = {
  done: '완료',
  active: '진행중',
  pending: '대기',
  delayed: '지연'
}

// 상태 코드 → 뱃지 색상 클래스 접미사 (is-success 등)
var STATUS_COLOR = {
  all: 'default',
  done: 'success',
  active: 'info',
  pending: 'muted',
  delayed: 'warning'
}

/** JSON 로드 (XHR). done(err, data) 콜백 */
var fetchJson = function (url, done) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onreadystatechange = function () {
    // 4 = 응답 완료
    if (xhr.readyState !== 4) return
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        // 본문을 JSON 으로 파싱해 성공 콜백
        done(null, JSON.parse(xhr.responseText))
      } catch (e) {
        done(new Error('JSON 형식 오류: ' + url))
      }
    } else {
      done(new Error('요청 실패 (' + xhr.status + '): ' + url))
    }
  }
  // 네트워크 단절 등
  xhr.onerror = () => {
    done(new Error('네트워크 오류: ' + url))
  }
  xhr.send()
}

export default {
  name: 'PubIndex',
  // Vue 옵션: function 유지 (this = 컴포넌트)
  data: function () {
    return {
      loading: true, // 최초·탭 전환 로딩
      error: '', // 로드 실패 메시지
      projectName: 'Publish List',
      projectDesc: 'PC / MOBILE 화면 퍼블리시 목록과 컴포넌트 가이드를 확인합니다.',
      // index.json 이 덮어쓸 수 있는 기본 탭
      tabs: [
        { id: 'pc', label: 'PC', base: 'pc/' },
        { id: 'mobile', label: 'MOBILE', base: 'mobile/' },
        { id: 'pc-guide', label: 'PC 컴포넌트 가이드', base: 'pc-guide/' },
        { id: 'mobile-guide', label: 'Mobile 컴포넌트 가이드', base: 'mobile-guide/' }
      ],
      activeTab: 'pc', // 현재 퍼블리시 탭 id
      folders: [], // 현재 탭의 1뎁스 폴더(+screens)
      expanded: {}, // { [folderId]: true } 펼침 여부
      searchCategory: 'all', // 검색 대상 컬럼
      searchCategories: [
        { value: 'all', label: '전체' },
        { value: 'screenName', label: '화면명' },
        { value: 'screenType', label: 'Screen Type' },
        { value: 'screenId', label: 'Screen ID' },
        { value: 'pageUrl', label: 'PageUrl' },
        { value: 'filePath', label: 'File Path' },
        { value: 'owner', label: '담당자' },
        { value: 'start', label: '시작일' },
        { value: 'expected', label: '예상일' },
        { value: 'end', label: '종료일' },
        { value: 'status', label: '상태' },
        { value: 'planning', label: '기획' },
        { value: 'design', label: '디자인' },
        { value: 'remark', label: '비고' }
      ],
      searchInput: '', // 입력 중인 검색어
      query: '', // Enter 적용된 실제 검색어
      activeFolderId: null, // 화면명 필터 선택값 (null = 전체)
      filterSheetOpen: false, // 화면명 필터 버텀시트
      /**
       * 진행·일정·상태 표시 여부
       * - true: 전체 진행률 + 시작일/예상일/종료일/상태/진행률 컬럼 표시
       * - false: 프로젝트 완료 후 숨김
       */
      showProgressMeta: true,
      skeletonRowCount: 10, // 로딩 스켈레톤 1뎁스 행 수
      // 비고 히스토리 모달
      remarkModal: {
        open: false,
        screenName: '',
        screenId: '',
        items: []
      }
    }
  },
  computed: {
    /** 현재 탭 메타 (id, label, base 경로) */
    activeTabMeta: function () {
      var id = this.activeTab
      // tabs 배열에서 현재 id 와 일치하는 항목 1개 (없으면 PC 기본값)
      return this.tabs.filter((tab) => tab.id === id)[0] || { id: 'pc', label: 'PC', base: 'pc/' }
    },
    /** 요약 영역에 표시할 탭 이름 */
    activeTabLabel: function () {
      return this.activeTabMeta.label || '목록'
    },
    /** 필터로 고른 화면명(번호 접두 제거) — 예: 0. 로그인 → 로그인 */
    filterSelectedLabel: function () {
      var id = this.activeFolderId
      if (!id) return ''
      var folders = this.folders || []
      for (var i = 0; i < folders.length; i++) {
        if (folders[i].id === id) {
          return String(folders[i].name || '').replace(/^\d+\.\s*/, '')
        }
      }
      return ''
    },
    /** 필터로 고른 폴더의 하위 화면(2뎁스) 목록 */
    activeFolderScreens: function () {
      var id = this.activeFolderId
      if (!id) return []
      var folders = this.folders || []
      for (var i = 0; i < folders.length; i++) {
        if (folders[i].id === id) return folders[i].screens || []
      }
      return []
    },
    /**
     * 목록에 실제로 그릴 폴더
     * - visibleFolders(검색 결과) 기준
     * - activeFolderId 가 있으면 해당 폴더만
     */
    displayFolders: function () {
      var list = this.visibleFolders || []
      var folderId = this.activeFolderId
      // 전체 선택(null)이면 필터 없이 검색 결과 전부
      if (!folderId) return list
      // 화면명 레이블로 고른 폴더만
      return list.filter((folder) => folder.id === folderId)
    },
    /** 하나라도 펼쳐져 있으면 true (모두 접기/펼치기 스위치) */
    hasExpanded: function () {
      var expanded = this.expanded || {}
      // expanded 객체에 true 인 키가 하나라도 있는지
      return Object.keys(expanded).some((id) => !!expanded[id])
    },
    /** 현재 탭 전체 화면(2뎁스) flat 목록 — 진행률·통계용 */
    allScreens: function () {
      var list = []
      // 폴더 → screens 를 한 배열로 펼침
      this.folders.forEach((folder) => {
        ;(folder.screens || []).forEach((screen) => {
          list.push(screen)
        })
      })
      return list
    },
    /** 전체 화면 진행률 평균(%) */
    overallProgress: function () {
      var screens = this.allScreens
      if (!screens.length) return 0
      // 각 screen.progress 합산 후 평균
      var sum = screens.reduce((acc, screen) => acc + (screen.progress || 0), 0)
      return Math.round(sum / screens.length)
    },
    /** 상태별 건수 (전체/완료/진행중/대기/지연) */
    statusStats: function () {
      var counts = { done: 0, active: 0, pending: 0, delayed: 0 }
      var total = 0
      // 화면 status 값별로 카운트
      this.allScreens.forEach((screen) => {
        total += 1
        if (counts[screen.status] !== undefined) counts[screen.status]++
      })
      // 템플릿 통계 리스트용 배열
      return [
        { key: 'all', label: '전체', count: total },
        { key: 'done', label: '완료', count: counts.done },
        { key: 'active', label: '진행중', count: counts.active },
        { key: 'pending', label: '대기', count: counts.pending },
        { key: 'delayed', label: '지연', count: counts.delayed }
      ]
    },
    /** 검색 카테고리에 맞는 input placeholder */
    searchPlaceholder: function () {
      // 카테고리 value → 안내 문구
      var map = {
        all: '화면명, Screen Type, Screen ID, PageUrl, File Path, 담당자, 시작일, 예상일, 종료일, 상태, 기획, 디자인, 비고로 검색',
        screenName: '화면명 검색',
        screenType: 'Screen Type 검색',
        screenId: 'Screen ID 검색',
        pageUrl: 'PageUrl 검색',
        filePath: 'File Path 검색',
        owner: '담당자 검색',
        start: '시작일 검색',
        expected: '예상일 검색',
        end: '종료일 검색',
        status: '상태 검색 (완료, 진행중, 대기, 지연)',
        planning: '기획 경로 검색',
        design: '디자인 경로 검색',
        remark: '비고 검색'
      }
      return map[this.searchCategory] || map.all
    },
    /**
     * 검색어(query)로 필터된 폴더 목록
     * - 폴더명 매칭 시 하위 화면 전부
     * - 아니면 매칭된 화면만 남김
     */
    visibleFolders: function () {
      var q = (this.query || '').toLowerCase()
      var category = this.searchCategory

      return this.folders
        .map((folder) => {
          // 검색어 없으면 원본 폴더 그대로
          if (!q) return folder

          // 폴더명 자체 매칭 여부 (전체/화면명 카테고리일 때만)
          var folderHit = category === 'all' || category === 'screenName'
            ? (folder.name || '').toLowerCase().indexOf(q) !== -1
            : false

          // 하위 화면 중 검색 조건에 맞는 것만
          var screens = (folder.screens || []).filter((screen) =>
            this.screenMatches(screen, q, category)
          )

          // 폴더명이 맞으면 하위 화면 전부 유지
          if (folderHit) {
            return {
              id: folder.id,
              name: folder.name,
              filePath: folder.filePath,
              screens: folder.screens || []
            }
          }

          // 아니면 매칭된 화면만 담아 반환
          return {
            id: folder.id,
            name: folder.name,
            filePath: folder.filePath,
            screens: screens
          }
        })
        .filter((folder) => {
          // 검색 중이면 화면이 1개 이상인 폴더만
          if (!q) return true
          return folder.screens && folder.screens.length
        })
    }
  },
  watch: {
    // 검색 적용 시 매칭 폴더 펼침 + 목록 높이 재계산
    query: function () {
      this.expandMatchedFolders()
      this.$nextTick(this.updateTableMaxHeight)
    },
    activeTab: function () {
      this.$nextTick(this.updateTableMaxHeight)
    },
    // 화면명 레이블 선택/해제 시 높이 (필터 시 none)
    activeFolderId: function () {
      this.$nextTick(this.updateTableMaxHeight)
    },
    // 폴더 추가·삭제·탭 데이터 교체 시 높이 재계산
    folders: function () {
      this.$nextTick(this.updateTableMaxHeight)
    },
    displayFolders: function () {
      this.$nextTick(this.updateTableMaxHeight)
    }
  },
  created: function () {
    // 마운트 전: 프로젝트 index.json 로드 시작
    this.bootstrap()
  },
  mounted: function () {
    // DOM 준비 후 목록 높이 맞추고, 리사이즈에도 재계산
    this.updateTableMaxHeight()
    window.addEventListener('resize', this.updateTableMaxHeight)
  },
  beforeDestroy: function () {
    // 리스너 정리 (메모리 누수 방지)
    window.removeEventListener('resize', this.updateTableMaxHeight)
  },
  methods: {
    /**
     * 목록 영역 max-height 갱신
     * - 기본(전체·검색 없음): 접힌 1뎁스가 모두 보이는 높이
     * - 검색 중 또는 화면명 레이블 선택: 제한 해제(none) → 내용 전부 표시
     * - --wbs-sticky-offset: 탭+검색 sticky 바 높이
     * - --wbs-thead-height: 테이블 헤더 높이 (1뎁스 행 sticky top)
     */
    updateTableMaxHeight: function () {
      var sticky = this.$refs.sticky
      var root = this.$el
      if (!root) return

      var headEl = root.querySelector('.wbs-table__head')
      var headH = headEl ? headEl.offsetHeight : 33

      // 탭 바 오프셋
      if (sticky) {
        root.style.setProperty('--wbs-sticky-offset', sticky.offsetHeight + 'px')
      }
      // 1뎁스(현재 화면명) 행이 헤더 바로 아래에 붙도록
      root.style.setProperty('--wbs-thead-height', headH + 'px')

      var isFiltered = !!(this.query && String(this.query).trim()) || !!this.activeFolderId
      if (isFiltered) {
        root.style.setProperty('--wbs-table-max', 'none')
        return
      }

      // 접힌 1뎁스 기준: 헤더 높이 + (행 높이 × 폴더 수)
      var count = (this.displayFolders || []).length
      var rowEl = root.querySelector('.wbs-table__row.level-0')
      var rowH = rowEl ? rowEl.offsetHeight : 36
      var collapsedH = headH + count * rowH

      if (collapsedH < 120) collapsedH = 120
      root.style.setProperty('--wbs-table-max', Math.ceil(collapsedH) + 'px')
    },
    /** 필터 버텀시트 열기 */
    openFilterSheet: function () {
      this.filterSheetOpen = true
      this.$nextTick(() => {
        var sheet = this.$refs.filterSheet
        if (sheet && sheet.focus) sheet.focus()
      })
    },
    /** 필터 버텀시트 닫기 */
    closeFilterSheet: function () {
      this.filterSheetOpen = false
    },
    /**
     * 버텀시트에서 화면명(폴더) 선택
     * - 버튼 문구·하위 칩 갱신 후 시트 닫기
     */
    pickFilterFolder: function (folderId) {
      this.selectFolder(folderId)
      this.closeFilterSheet()
    },
    /**
     * 화면명 필터 적용
     * - folderId: 해당 폴더만 표시 + 펼침
     * - null(전체): 필터 해제 + 모두 접기
     */
    selectFolder: function (folderId) {
      this.activeFolderId = folderId || null
      if (folderId) {
        // 선택한 폴더 펼침
        this.$set(this.expanded, folderId, true)
      } else {
        // 전체: 2뎁스 모두 접기
        this.expanded = {}
      }
      this.$nextTick(() => {
        this.updateTableMaxHeight()
        // 특정 폴더면 해당 행으로 스크롤
        if (!folderId) return
        var el = document.getElementById('wbs-folder-' + folderId)
        if (el && el.scrollIntoView) {
          el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        }
      })
    },
    /** 뱃지/닷용 색상 키 */
    statusColor: function (status) {
      return STATUS_COLOR[status] || 'muted'
    },
    /** 화면 1건이 검색어·카테고리에 맞는지 */
    screenMatches: function (screen, q, category) {
      // 검색 대상 필드를 문자열로 모음
      var fields = {
        screenName: String(screen.screenName || ''),
        screenType: String(screen.screenType || ''),
        screenId: String(screen.screenId || ''),
        pageUrl: String(screen.pageUrl || ''),
        filePath: String(screen.filePath || ''),
        owner: String(screen.owner || ''),
        start: String(screen.start || ''),
        expected: String(screen.expected || ''),
        end: String(screen.end || ''),
        status: this.statusLabel(screen.status),
        planning: String(screen.planning || ''),
        design: String(screen.design || ''),
        remark: this.remarkSearchText(screen.remark)
      }

      // 특정 카테고리면 그 필드만 검사
      if (category && category !== 'all') {
        return String(fields[category] || '').toLowerCase().indexOf(q) !== -1
      }

      // 전체: 어느 필드든 포함되면 매칭
      return Object.keys(fields).some((key) =>
        String(fields[key] || '').toLowerCase().indexOf(q) !== -1
      )
    },
    /** 비고 텍스트 정규화 (배열·개행 정리) */
    normalizeRemarkText: function (value) {
      if (value == null) return ''
      // 줄 배열이면 합친 뒤 빈 줄 정리
      if (Array.isArray(value)) {
        return value
          .map((line) => (line == null ? '' : String(line)))
          .join('\n')
          .replace(/\n{3,}/g, '\n\n')
          .trim()
      }
      // 문자열이면 CR 제거 후 trim
      return String(value).replace(/\r\n/g, '\n').trim()
    },
    /** 비고 → [{ date, author, text }] 목록 */
    remarkItems: function (remark) {
      if (!remark) return []
      // 배열: 문자열 항목 또는 객체 항목을 동일 형태로
      if (Array.isArray(remark)) {
        return remark.map((item) => {
          if (typeof item === 'string') {
            return { date: '', author: '', text: this.normalizeRemarkText(item) }
          }
          return {
            date: item.date || item.at || '',
            author: item.author || item.by || '',
            // text / content / message 중 있는 키 사용
            text: this.normalizeRemarkText(
              item.text != null
                ? item.text
                : item.content != null
                  ? item.content
                  : item.message
            )
          }
        }).filter((item) => !!item.text) // 본문 없는 항목 제외
      }
      // 단일 문자열 비고
      if (typeof remark === 'string' && remark.trim()) {
        return [{ date: '', author: '', text: this.normalizeRemarkText(remark) }]
      }
      return []
    },
    /** 비고 내용 존재 여부 */
    remarkHasContent: function (remark) {
      return this.remarkItems(remark).length > 0
    },
    /** 목록용 비고 미리보기 (최신 1건, 한 줄) */
    remarkPreview: function (remark) {
      var items = this.remarkItems(remark)
      if (!items.length) return '-'
      // 마지막(최신) 항목의 개행을 공백으로
      return items[items.length - 1].text.replace(/\s*\n\s*/g, ' ')
    },
    /** 검색용 비고 전체 텍스트 */
    remarkSearchText: function (remark) {
      // 날짜·작성자·본문을 이어 붙여 검색에 사용
      return this.remarkItems(remark).map((item) =>
        [item.date, item.author, item.text].join(' ')
      ).join(' ')
    },
    /** 비고 히스토리 모달 열기 (최신순) */
    openRemarkModal: function (screen) {
      // 비고 없으면 모달 열지 않음
      if (!screen || !this.remarkHasContent(screen.remark)) return
      this.remarkModal = {
        open: true,
        screenName: screen.screenName || '',
        screenId: screen.screenId || '',
        // 최신순으로 뒤집기
        items: this.remarkItems(screen.remark).slice().reverse()
      }
      // 다이얼로그에 포커스 (Esc 등)
      this.$nextTick(() => {
        if (this.$refs.remarkDialog) this.$refs.remarkDialog.focus()
      })
    },
    /** 비고 모달 닫기 */
    closeRemarkModal: function () {
      this.remarkModal = {
        open: false,
        screenName: '',
        screenId: '',
        items: []
      }
    },
    /** 상태 코드 → 표시 라벨 */
    statusLabel: function (status) {
      return STATUS_MAP[status] || status || '-'
    },
    /** 최초 진입: index.json → 프로젝트/탭 설정 후 첫 탭 데이터 로드 */
    bootstrap: function () {
      this.loading = true
      this.error = ''

      // /static/data/publish/index.json
      fetchJson(INDEX_URL, (err, data) => {
        if (err) {
          this.loading = false
          this.error = err.message
          return
        }

        // 프로젝트명·설명·탭 목록 반영
        if (data.project && data.project.name) {
          this.projectName = data.project.name
        }
        if (data.project && data.project.description) {
          this.projectDesc = data.project.description
        }
        if (data.tabs && data.tabs.length) {
          this.tabs = data.tabs
        }

        // 첫 탭 선택 후 해당 탭 폴더 JSON 로드
        this.activeTab = (this.tabs[0] && this.tabs[0].id) || 'pc'
        this.loadTabData()
      })
    },
    /** 퍼블리시 탭 전환 (검색·펼침·레이블 선택 초기화) */
    selectTab: function (tabId) {
      if (this.activeTab === tabId) return
      this.activeTab = tabId
      // 탭 바꾸면 검색/펼침/폴더 필터 초기화
      this.searchInput = ''
      this.query = ''
      this.expanded = {}
      this.activeFolderId = null
      this.filterSheetOpen = false
      this.loadTabData()
    },
    /**
     * 현재 탭의 index.json → 각 폴더 JSON 병렬 로드
     * slots 로 원본 순서 유지
     */
    loadTabData: function () {
      // 예: pc/ → /static/data/publish/pc/index.json
      var base = this.activeTabMeta.base || (this.activeTab + '/')
      var indexUrl = DATA_BASE + base + 'index.json'

      this.loading = true
      this.error = ''
      this.folders = []
      this.activeFolderId = null
      this.filterSheetOpen = false

      // 1) 탭 index: 폴더 메타 목록
      fetchJson(indexUrl, (err, data) => {
        if (err) {
          this.loading = false
          this.error = err.message
          return
        }

        var list = (data && data.folders) || []
        if (!list.length) {
          this.folders = []
          this.loading = false
          return
        }

        // 2) 각 폴더 JSON 병렬 요청 (완료 카운터 pending)
        var pending = list.length
        var failed = null
        var slots = new Array(list.length) // 인덱스 순서 유지용

        list.forEach((meta, i) => {
          var file = meta.file || (meta.id + '.json')
          // 절대/외부 URL 이면 그대로, 아니면 DATA_BASE + base 붙임
          var url = file.indexOf('/') === 0 || /^https?:\/\//i.test(file)
            ? file
            : DATA_BASE + base + file

          fetchJson(url, (fileErr, payload) => {
            if (fileErr && !failed) failed = fileErr
            if (!fileErr && payload) {
              // i번째 슬롯에 폴더+화면 저장
              slots[i] = {
                id: payload.id || meta.id,
                name: payload.name || meta.name,
                filePath: payload.filePath || '',
                screens: payload.screens || []
              }
            }

            pending -= 1
            if (pending > 0) return // 아직 다른 파일 대기

            // 전부 끝남
            if (failed) {
              this.loading = false
              this.error = failed.message || '화면 JSON을 불러오지 못했습니다.'
              this.folders = []
              return
            }

            // slots 순서대로 folders 구성
            var folders = []
            for (var n = 0; n < slots.length; n++) {
              if (slots[n]) folders.push(slots[n])
            }
            this.folders = folders
            this.expanded = {}
            this.loading = false // ← 스켈레톤 종료 시점 (확인용으로 주석 가능)
          })
        })
      })
    },
    /** Enter: 검색 적용 */
    applySearch: function () {
      // 입력값을 query 에 반영 → visibleFolders / watch(query) 동작
      this.query = (this.searchInput || '').trim()
      this.expandMatchedFolders()
    },
    /** 검색어 초기화 */
    clearSearch: function () {
      this.searchInput = ''
      this.query = ''
    },
    /** 검색 결과 폴더는 자동 펼침 */
    expandMatchedFolders: function () {
      if (!this.query) return
      this.visibleFolders.forEach((folder) => {
        this.$set(this.expanded, folder.id, true)
      })
    },
    /** 모두 펼치기/접기 스위치 */
    onExpandSwitch: function (checked) {
      if (checked) this.expandAll()
      else this.collapseAll()
    },
    /** 모든 1뎁스 폴더 펼침 */
    expandAll: function () {
      this.folders.forEach((folder) => {
        this.$set(this.expanded, folder.id, true)
      })
    },
    /** 모든 폴더 접기 */
    collapseAll: function () {
      this.expanded = {}
    },
    /** 해당 폴더가 펼쳐져 있는지 */
    isExpanded: function (folderId) {
      return !!this.expanded[folderId]
    },
    /** 1뎁스 폴더 +/- 토글 */
    toggleFolder: function (folderId) {
      // Vue 2: 새 키 반응성을 위해 $set 사용
      this.$set(this.expanded, folderId, !this.expanded[folderId])
    }
  }
}
</script>

<style lang="scss" scoped src="@/styles/pages/_wbs-index.scss"></style>
