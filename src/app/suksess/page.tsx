// app/success/page.tsx  (Server component wrapper)
export const dynamic = "force-dynamic";

import SuccessClient from '@/components/SuccessClient';

export default function SuccessPage() {
  // server component only returns the client component
  return <SuccessClient />;
}
