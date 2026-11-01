<template>
  <DemoShell
    category="테스트"
    title="Sorting Menu (Basic)"
    description="정렬 드롭다운 열기/선택/외부 클릭 닫기 동작 확인 (document 클릭)"
  >
    <div class="menu-wrap newType">
      <div class="selection-wrap">
        <div class="list-items-sorting opts">
          <template v-if="sortList.length">
            <div
              ref="sortingWrap"
              class="sorting-wrap"
              :class="{ open: isSortingOpen }"
            >
              <button
                type="button"
                class="sort-btn"
                :aria-expanded="String(isSortingOpen)"
                @click.stop="toggleSorting"
              >
                {{ selectedItem || sortList[0] }}
              </button>

              <div
                v-if="isSortingOpen"
                class="sorting-menu"
              >
                <button
                  v-for="(item, index) in sortList"
                  :key="index"
                  type="button"
                  :class="{
                    active: (selectedItem || sortList[0]) === item
                  }"
                  @click.stop="selectItem(item)"
                >
                  {{ item }}
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <p class="test-status">
      선택: <strong>{{ selectedItem || sortList[0] }}</strong>
      · 메뉴: {{ isSortingOpen ? '열림' : '닫힘' }}
    </p>
  </DemoShell>
</template>

<script>
import DemoShell from '@/pages/DemoShell.vue'

export default {
  name: 'SortingMenuBasicTestPage',
  components: { DemoShell },
  data: function () {
    return {
      isSortingOpen: false,
      selectedItem: '',
      sortList: ['최신순', '인기순', '이름순', '오래된순']
    }
  },
  mounted: function () {
    document.addEventListener('click', this.onDocumentClick)
  },
  beforeUnmount: function () {
    document.removeEventListener('click', this.onDocumentClick)
  },
  methods: {
    toggleSorting: function () {
      this.isSortingOpen = !this.isSortingOpen
    },
    selectItem: function (item) {
      this.selectedItem = item
      this.isSortingOpen = false
    },
    onDocumentClick: function (e) {
      var wrap = this.$refs.sortingWrap
      if (!wrap || !this.isSortingOpen) return
      if (!wrap.contains(e.target)) {
        this.isSortingOpen = false
      }
    }
  }
}
</script>

<style scoped>
.menu-wrap {
  display: flex;
  justify-content: flex-end;
}

.sorting-wrap {
  position: relative;
  display: inline-block;
  min-width: 140px;
}

.sort-btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  background: #fff;
  color: var(--color-ink);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.sort-btn::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid currentColor;
  transition: transform 0.15s ease;
}

.sorting-wrap.open .sort-btn::after {
  transform: rotate(180deg);
}

.sorting-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  padding: 4px;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(21, 32, 43, 0.12);
}

.sorting-menu button {
  padding: 8px 10px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--color-ink);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}

.sorting-menu button:hover {
  background: var(--color-accent-soft);
}

.sorting-menu button.active {
  color: var(--color-accent);
  font-weight: 700;
}

.test-status {
  margin: 20px 0 0;
  font-size: 13px;
  color: var(--color-muted);
}

.test-status strong {
  color: var(--color-ink);
}
</style>
