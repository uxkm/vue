'use client'

import { useState } from 'react'
import { Button, Upload } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { uploadApiSections } from '@/screens/pub/data/guide/uploadApiSections'

const SAMPLE = '/images/samples/avatar/avatar-sample.svg'
const sampleFile = {
  name: '제품소개서.pdf',
  size: 1843200,
  type: 'application/pdf',
  status: 'done'
}
const sampleImage = (name) => ({
  name,
  size: 245760,
  type: 'image/svg+xml',
  status: 'done',
  url: SAMPLE
})

function AttachmentForm () {
  const [files, setFiles] = useState([])
  const [lastAction, setLastAction] = useState('—')
  return (
    <form
      className="form form_vertical form_fit form_compact"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="form_field">
        <p className="form_field-label" id="attachments-label">
          첨부 파일
          <span className="form_field-required">
            <span aria-hidden="true">*</span>
            <span className="form_field-required-text">필수 항목</span>
          </span>
        </p>
        <div aria-labelledby="attachments-label">
          <Upload
            files={files}
            onChange={setFiles}
            onSelect={(selected) => {
              setLastAction(`추가 ${selected.length}개`)
            }}
            onRemove={(item) => {
              setLastAction(`삭제 ${item.name}`)
            }}
            multiple
            accept=".pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024}
            maxFiles={3}
            hint="PDF, DOC, DOCX · 파일당 최대 10MB"
          />
        </div>
        <p className="upload_hint">
          최근 액션: <code>{lastAction}</code>
        </p>
        {!files.length
          ? (
            <p className="form_field-error" role="alert">
              파일을 한 개 이상 첨부해 주세요.
            </p>
            )
          : null}
      </div>
      <div className="form_actions">
        <Button type="submit" label="제출" />
      </div>
    </form>
  )
}

const SECTIONS = [
  {
    title: '버튼 업로드',
    description: (
      <>
        기본은 <code>upload_trigger</code> + 숨김 file input입니다. <code>trigger</code>로 버튼을 교체할 수 있습니다.
      </>
    ),
    code: wrapPageExample(`<Upload buttonLabel="파일 선택" />
<Upload
  hint="PNG, JPG · 최대 5MB"
  trigger={<span className="btn btn_outline color_primary"><span className="btn_label">업로드</span></span>}
/>
<Upload disabled buttonLabel="비활성" />`, {
  name: 'UploadUploadExample',
  reactImports: [],
  compImports: ['Upload']
}),
    preview: (
      <div className="demo-stack">
        <Upload buttonLabel="파일 선택" />
        <Upload
          hint="PNG, JPG · 최대 5MB"
          trigger={(
            <span className="btn btn_outline color_primary">
              <span className="btn_label">업로드</span>
            </span>
          )}
        />
        <Upload
          trigger={(
            <>
              <span className="btn btn_filled color_primary btn_sm">
                <span className="btn_label">Small</span>
              </span>
              <span className="btn btn_filled color_primary btn_lg">
                <span className="btn_label">Large</span>
              </span>
            </>
          )}
        />
        <Upload disabled buttonLabel="비활성" />
      </div>
    )
  },
  {
    title: '드래그 앤 드롭',
    description: (
      <>
        <code>variant=&quot;drag&quot;</code>로 드롭존을 사용합니다. accept · maxSize · maxFiles로 검증합니다.
      </>
    ),
    code: wrapPageExample(`<Upload
  variant="drag"
  fit
  multiple
  accept="image/png,image/jpeg,.pdf"
  maxSize={5 * 1024 * 1024}
  maxFiles={3}
  description="PNG, JPG, PDF · 파일당 최대 5MB"
  hint="최대 3개까지 첨부할 수 있습니다."
/>`, {
  name: 'UploadExample2',
  reactImports: [],
  compImports: ['Upload']
}),
    preview: (
      <div className="demo-stack">
        <Upload
          variant="drag"
          fit
          multiple
          accept="image/png,image/jpeg,.pdf"
          maxSize={5 * 1024 * 1024}
          maxFiles={3}
          description="PNG, JPG, PDF · 파일당 최대 5MB"
          hint="최대 3개까지 첨부할 수 있습니다."
        />
        <Upload
          variant="drag"
          fit
          dragover
          title="파일을 놓으세요"
          description="is-dragover 상태"
        />
      </div>
    )
  },
  {
    title: '파일 목록',
    description: (
      <>
        <code>variant=&quot;list&quot;</code>와 <code>defaultFiles</code>로 진행·완료·오류 상태를 표시합니다.
      </>
    ),
    code: wrapPageExample(`<Upload
  variant="list"
  fit
  multiple
  defaultFiles={[
    { name: '프로젝트_제안서_v2.pdf', size: 2516582, status: 'uploading', progress: 60 },
    { name: '제품소개서.pdf', size: 1843200, status: 'done' },
    { name: '대용량_영상.mp4', size: 12582912, status: 'error', error: '…' }
  ]}
/>`, {
  name: 'UploadExample3',
  reactImports: [],
  compImports: ['Upload']
}),
    preview: (
      <Upload
        variant="list"
        fit
        multiple
        defaultFiles={[
          {
            name: '프로젝트_제안서_v2.pdf',
            size: 2516582,
            status: 'uploading',
            progress: 60
          },
          sampleFile,
          {
            name: '대용량_영상.mp4',
            size: 12582912,
            status: 'error',
            error: '파일 크기가 10MB를 초과합니다.'
          }
        ]}
      />
    )
  },
  {
    title: '사진 카드',
    description: (
      <>
        <code>variant=&quot;picture-card&quot;</code>로 이미지 카드형 첨부를 구성합니다.
      </>
    ),
    code: wrapPageExample(`<Upload
  variant="picture-card"
  multiple
  accept="image/*"
  maxFiles={5}
  buttonLabel="업로드"
  defaultFiles={[…]}
/>`, {
  name: 'UploadExample4',
  reactImports: [],
  compImports: ['Upload']
}),
    preview: (
      <Upload
        variant="picture-card"
        multiple
        accept="image/*"
        maxFiles={5}
        buttonLabel="업로드"
        hint="최대 5장 · JPG, PNG"
        defaultFiles={[sampleImage('프로필-1.svg'), sampleImage('프로필-2.svg')]}
      />
    )
  },
  {
    title: '아바타 업로드',
    description: (
      <>
        <code>variant=&quot;avatar&quot;</code>로 프로필 사진 교체 UI를 만듭니다.
      </>
    ),
    code: wrapPageExample(`<Upload
  variant="avatar"
  accept="image/*"
  avatarSrc="/images/samples/avatar/avatar-sample.svg"
  avatarAlt="프로필 사진"
/>`, {
  name: 'UploadUploadExample2',
  reactImports: [],
  compImports: ['Upload']
}),
    preview: (
      <Upload
        variant="avatar"
        accept="image/*"
        avatarSrc={SAMPLE}
        avatarAlt="프로필 사진"
      />
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 sm · md · lg입니다.
      </>
    ),
    code: wrapPageExample(`<Upload variant="drag" size="sm" title="SM 업로드" description="파일을 선택하세요." />
…`, {
  name: 'UploadSizeExample',
  reactImports: [],
  compImports: ['Upload']
}),
    preview: (
      <div className="demo-stack">
        {(['sm', 'md', 'lg']).map((size) => (
          <Upload
            key={size}
            variant="drag"
            size={size}
            title={`${size.toUpperCase()} 업로드`}
            description="파일을 선택하세요."
          />
        ))}
      </div>
    )
  },
  {
    title: '너비',
    description: (
      <>
        기본은 전체 너비입니다. <code>fit</code>으로 제한 너비를 사용합니다.
      </>
    ),
    code: wrapPageExample(`<Upload variant="drag" title="전체 너비" />
<Upload variant="drag" fit title="제한 너비" />`, {
  name: 'UploadExample7',
  reactImports: [],
  compImports: ['Upload']
}),
    preview: (
      <div className="demo-stack">
        <Upload variant="drag" title="전체 너비" />
        <Upload variant="drag" fit title="제한 너비" />
      </div>
    )
  },
  {
    title: '상태',
    description: <>비활성·오류 상태를 지원합니다.</>,
    code: wrapPageExample(`<Upload disabled hint="파일을 변경할 수 없습니다." defaultFiles={[…]} />
<Upload variant="drag" error title="업로드 오류" description="…" />`, {
  name: 'UploadStateExample',
  reactImports: [],
  compImports: ['Upload']
}),
    preview: (
      <div className="demo-stack">
        <Upload disabled hint="파일을 변경할 수 없습니다." defaultFiles={[sampleFile]} />
        <Upload
          variant="drag"
          error
          title="업로드 오류"
          description="허용되는 파일을 다시 선택해 주세요."
        />
      </div>
    )
  },
  {
    title: '조합 예시',
    description: (
      <>
        <code>files</code> · <code>onChange</code>는 같은 <code>UploadFileItem[]</code>로 왕복 제어합니다.
        <code>onSelect</code>는 새로 고른 <code>File[]</code>, <code>onRemove</code>는 삭제 항목을 페이지에 알립니다.
      </>
    ),
    code: wrapPageExample(`const [files, setFiles] = useState([])

<Upload
  files={files}
  onChange={setFiles}
  onSelect={(selected) => {
    // 업로드 API 호출 등
  }}
  onRemove={(item, index) => {
    // 삭제 확인·서버 동기화 등
  }}
  multiple
  accept=".pdf,.doc,.docx"
  maxSize={10 * 1024 * 1024}
  maxFiles={3}
/>`, {
      name: 'UploadExample',
      reactImports: ['useState'],
      compImports: ['Upload']
    }),
    preview: <AttachmentForm />
  }
]

/**
 * Upload 가이드 화면.
 * docs와 동일한 버튼·드롭존·목록·카드 예시와 API 문서를 모은다.
 */
export default function UploadGuide () {
  return (
    <GuideLayout
      category="폼"
      title="Upload"
      description="파일 선택·첨부. files · onChange · onSelect · onRemove로 페이지에서 제어하며 button · drag · list · picture-card · avatar 변형을 지원합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="UploadExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={uploadApiSections} />
    </GuideLayout>
  )
}
