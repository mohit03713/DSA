import { redirect } from 'next/navigation'

export default function SubjectLabsRedirect({
  params,
}: {
  params: { subjectId: string }
}) {
  redirect(`/labs?subject=${params.subjectId}`)
}

