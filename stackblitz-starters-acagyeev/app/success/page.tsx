// app/success/page.tsx
export default function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <main className="max-w-md mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Order Confirmed 🖤</h1>
      <p className="mt-3 text-neutral-600 text-sm">
        Thanks for shopping Firosa Apparel. A confirmation email is on its way.
      </p>
      {searchParams.session_id && (
        <p className="mt-4 text-xs text-neutral-400">
          Ref: {searchParams.session_id}
        </p>
      )}
    </main>
  );
}