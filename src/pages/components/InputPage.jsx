import { useState } from 'react'
import DemoShell from '@/pages/DemoShell'
import { Input, Space } from '@/components'

export default function InputPage() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')

  return (
    <DemoShell category="폼" title="Input" description="React · Input — size · clearable · error">
      <Space vertical size={12}>
        <Input value={text} onChange={(v) => setText(v)} placeholder="내용을 입력하세요" clearable />
        <Input size="sm" value={text} onChange={(v) => setText(v)} placeholder="Small" />
        <Input
          size="lg"
          type="password"
          value={password}
          onChange={(v) => setPassword(v)}
          placeholder="비밀번호"
        />
        <Input value="읽기 전용" readOnly />
        <Input value="에러" error />
        <Input value="비활성" disabled />
        <p>입력값: {text || '-'}</p>
      </Space>
    </DemoShell>
  )
}
